from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import json
import re
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="PureBreeze API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class QuoteAnalyzeRequest(BaseModel):
    image_base64: str  # pure base64 string (no data: prefix)
    service_type: Optional[str] = "split_system"  # split_system | ducted | commercial | window
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None


class QuoteAnalyzeResponse(BaseModel):
    id: str
    dirtiness_level: int  # 1-10
    dirtiness_label: str  # Clean | Light Dust | Moderate | Heavy | Severe
    price_min: int
    price_max: int
    estimated_hours: float
    recommended_services: List[str]
    observations: List[str]
    urgency: str  # Low | Medium | High | Critical
    summary: str


class QuoteLead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    service_type: str
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None
    dirtiness_level: int
    dirtiness_label: str
    price_min: int
    price_max: int
    estimated_hours: float
    recommended_services: List[str]
    observations: List[str]
    urgency: str
    summary: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactRequest(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    service_type: Optional[str] = None
    suburb: Optional[str] = None
    message: Optional[str] = None


class ContactLead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    service_type: Optional[str] = None
    suburb: Optional[str] = None
    message: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Pricing base ranges (QLD AUD) ----------
PRICING_BASE = {
    "split_system":   {"min": 165, "max": 220, "hours": 1.0},
    "ducted":         {"min": 450, "max": 750, "hours": 3.0},
    "commercial":     {"min": 380, "max": 650, "hours": 2.5},
    "window":         {"min": 120, "max": 180, "hours": 0.75},
}


def build_quote_prompt(service_type: str) -> str:
    base = PRICING_BASE.get(service_type, PRICING_BASE["split_system"])
    return f"""You are PureBreeze's expert HVAC technician in Queensland, Australia.
Analyse the attached photo of an air conditioner unit and return a structured JSON assessment of how dirty it is and a fair cleaning quote.

Service type: {service_type}
Base price range for this service in Queensland AUD: ${base['min']}–${base['max']} (base {base['hours']} hours).
Scale price upward based on dirtiness: clean units sit near the minimum, severely dirty units can be up to 1.8x the max.

Return ONLY valid minified JSON (no markdown fences, no commentary) with this exact schema:
{{
  "dirtiness_level": integer 1-10,
  "dirtiness_label": "Clean" | "Light Dust" | "Moderate" | "Heavy" | "Severe",
  "price_min": integer AUD,
  "price_max": integer AUD,
  "estimated_hours": number,
  "recommended_services": [string, ...],
  "observations": [string, ...],
  "urgency": "Low" | "Medium" | "High" | "Critical",
  "summary": "one concise paragraph for the customer"
}}

Look for: dust build-up on filters/fins/vents, black mould, yellow/brown grime, rust, biofilm, corrosion, bent fins, visible debris.
If the image does NOT clearly show an air conditioner, still return the JSON but set dirtiness_level=0, dirtiness_label="Clean", price_min and price_max to the base range, and observations=["Image unclear — please upload a clearer photo of your AC unit"].
"""


SCHEMA_KEYS = {"dirtiness_level","dirtiness_label","price_min","price_max","estimated_hours","recommended_services","observations","urgency","summary"}


def parse_llm_json(text: str) -> dict:
    # Strip code fences if any
    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:json)?", "", cleaned).strip()
    cleaned = re.sub(r"```$", "", cleaned).strip()
    # Find first {...} block
    match = re.search(r"\{.*\}", cleaned, flags=re.DOTALL)
    if match:
        cleaned = match.group(0)
    return json.loads(cleaned)


def fallback_quote(service_type: str, reason: str) -> dict:
    base = PRICING_BASE.get(service_type, PRICING_BASE["split_system"])
    return {
        "dirtiness_level": 5,
        "dirtiness_label": "Moderate",
        "price_min": base["min"],
        "price_max": base["max"],
        "estimated_hours": base["hours"],
        "recommended_services": ["Full chemical clean", "Filter wash", "Sanitisation"],
        "observations": [reason],
        "urgency": "Medium",
        "summary": "A standard clean is recommended. Book a technician for a precise on-site quote."
    }


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "PureBreeze API running", "company": "PureBreeze", "location": "Queensland, Australia"}


@api_router.post("/quote/analyze", response_model=QuoteAnalyzeResponse)
async def analyze_quote(req: QuoteAnalyzeRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    # Strip any data URL prefix
    img_b64 = req.image_base64
    if img_b64.startswith("data:"):
        img_b64 = img_b64.split(",", 1)[1] if "," in img_b64 else img_b64

    service_type = req.service_type or "split_system"

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"quote-{uuid.uuid4()}",
            system_message="You are a concise HVAC analysis engine that replies ONLY with valid JSON."
        ).with_model("gemini", "gemini-3-flash-preview")

        image_content = ImageContent(image_base64=img_b64)
        user_message = UserMessage(
            text=build_quote_prompt(service_type),
            file_contents=[image_content]
        )
        response_text = await chat.send_message(user_message)
        data = parse_llm_json(response_text)
    except Exception:
        logger.exception("LLM analyze failed")
        data = fallback_quote(service_type, "AI analysis unavailable — using standard estimate.")

    # Normalise
    data.setdefault("dirtiness_level", 5)
    data.setdefault("dirtiness_label", "Moderate")
    data.setdefault("price_min", PRICING_BASE[service_type]["min"])
    data.setdefault("price_max", PRICING_BASE[service_type]["max"])
    data.setdefault("estimated_hours", PRICING_BASE[service_type]["hours"])
    data.setdefault("recommended_services", [])
    data.setdefault("observations", [])
    data.setdefault("urgency", "Medium")
    data.setdefault("summary", "")

    lead = QuoteLead(
        service_type=service_type,
        name=req.name,
        phone=req.phone,
        email=req.email,
        address=req.address,
        notes=req.notes,
        dirtiness_level=int(data["dirtiness_level"]),
        dirtiness_label=str(data["dirtiness_label"]),
        price_min=int(data["price_min"]),
        price_max=int(data["price_max"]),
        estimated_hours=float(data["estimated_hours"]),
        recommended_services=list(data["recommended_services"]),
        observations=list(data["observations"]),
        urgency=str(data["urgency"]),
        summary=str(data["summary"]),
    )
    doc = lead.model_dump()
    await db.quote_leads.insert_one(doc)

    return QuoteAnalyzeResponse(
        id=lead.id,
        dirtiness_level=lead.dirtiness_level,
        dirtiness_label=lead.dirtiness_label,
        price_min=lead.price_min,
        price_max=lead.price_max,
        estimated_hours=lead.estimated_hours,
        recommended_services=lead.recommended_services,
        observations=lead.observations,
        urgency=lead.urgency,
        summary=lead.summary,
    )


@api_router.post("/contact", response_model=ContactLead)
async def submit_contact(req: ContactRequest):
    lead = ContactLead(
        name=req.name,
        phone=req.phone,
        email=req.email,
        service_type=req.service_type,
        suburb=req.suburb,
        message=req.message,
    )
    await db.contact_leads.insert_one(lead.model_dump())
    return lead


@api_router.get("/leads/quotes", response_model=List[QuoteLead])
async def list_quote_leads():
    rows = await db.quote_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return rows


@api_router.get("/leads/contacts", response_model=List[ContactLead])
async def list_contact_leads():
    rows = await db.contact_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
