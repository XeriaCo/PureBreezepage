from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import json
import re
import uuid
import bcrypt
import jwt
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Any, Dict
from datetime import datetime, timezone, timedelta

from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')
JWT_SECRET = os.environ.get('JWT_SECRET', 'dev-secret-change-me')
JWT_ALG = "HS256"
JWT_DAYS = 7
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin')
ADMIN_PASSWORD_HASH = bcrypt.hashpw(ADMIN_PASSWORD.encode(), bcrypt.gensalt()).decode()

LOGIN_MAX_ATTEMPTS = 5
LOGIN_LOCKOUT_MIN = 15

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(title="PureBreeze API")
api_router = APIRouter(prefix="/api")
bearer = HTTPBearer(auto_error=False)


# ================= AUTH =================
def create_admin_token() -> str:
    payload = {
        "sub": "admin",
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(days=JWT_DAYS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


def verify_admin_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        if payload.get("role") != "admin":
            raise HTTPException(401, "Not an admin token")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid token")


async def require_admin(creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer)) -> dict:
    if not creds or not creds.credentials:
        raise HTTPException(401, "Missing bearer token")
    return verify_admin_token(creds.credentials)


async def _check_lockout(ip: str):
    record = await db.login_attempts.find_one({"ip": ip})
    if not record:
        return
    if record.get("count", 0) >= LOGIN_MAX_ATTEMPTS:
        last = datetime.fromisoformat(record["last_at"])
        if datetime.now(timezone.utc) - last < timedelta(minutes=LOGIN_LOCKOUT_MIN):
            remaining = LOGIN_LOCKOUT_MIN - int((datetime.now(timezone.utc) - last).total_seconds() // 60)
            raise HTTPException(429, f"Too many failed attempts. Try again in ~{max(1, remaining)} min.")
        # expired — reset
        await db.login_attempts.delete_one({"ip": ip})


async def _record_failed(ip: str):
    await db.login_attempts.update_one(
        {"ip": ip},
        {"$inc": {"count": 1}, "$set": {"last_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )


async def _clear_attempts(ip: str):
    await db.login_attempts.delete_one({"ip": ip})


# ================= MODELS =================
class QuoteAnalyzeRequest(BaseModel):
    image_base64: str
    service_type: Optional[str] = "split_system"
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None


class QuoteAnalyzeResponse(BaseModel):
    id: str
    dirtiness_level: int
    dirtiness_label: str
    price_min: int
    price_max: int
    estimated_hours: float
    recommended_services: List[str]
    observations: List[str]
    urgency: str
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


class BookingRequest(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    address: str
    service_type: str = "split_system"
    booking_date: str
    time_slot: str
    notes: Optional[str] = None


class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    address: str
    service_type: str
    booking_date: str
    time_slot: str
    notes: Optional[str] = None
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class BookingStatusUpdate(BaseModel):
    status: str  # pending | confirmed | completed | cancelled


class AdminLogin(BaseModel):
    password: str


# ----- Wingman -----
class WingmanLead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    source: Optional[str] = None  # e.g. "google-maps", "facebook"
    suburb: Optional[str] = None
    score: Optional[int] = None  # 0-100 lead quality
    notes: Optional[str] = None
    raw: Optional[Dict[str, Any]] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class WingmanResearchItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    summary: Optional[str] = None
    category: Optional[str] = None  # "market", "pricing", "trend", "seo"
    url: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    raw: Optional[Dict[str, Any]] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class WingmanCompetitor(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    website: Optional[str] = None
    suburb: Optional[str] = None
    rating: Optional[float] = None
    review_count: Optional[int] = None
    price_range: Optional[str] = None  # "$120-$200"
    strengths: List[str] = Field(default_factory=list)
    weaknesses: List[str] = Field(default_factory=list)
    raw: Optional[Dict[str, Any]] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ----- Chat -----
class ChatMessage(BaseModel):
    conversation_id: str
    message: str
    visitor_name: Optional[str] = None
    visitor_phone: Optional[str] = None


class ChatReply(BaseModel):
    conversation_id: str
    assistant_message: str
    created_at: str


# ================= Pricing base =================
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

Return ONLY valid minified JSON with this exact schema:
{{"dirtiness_level": int 1-10, "dirtiness_label": "Clean"|"Light Dust"|"Moderate"|"Heavy"|"Severe",
"price_min": int, "price_max": int, "estimated_hours": number,
"recommended_services": [string], "observations": [string], "urgency": "Low"|"Medium"|"High"|"Critical", "summary": string}}
"""


SCHEMA_KEYS = {"dirtiness_level","dirtiness_label","price_min","price_max","estimated_hours","recommended_services","observations","urgency","summary"}


def parse_llm_json(text: str) -> dict:
    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:json)?", "", cleaned).strip()
    cleaned = re.sub(r"```$", "", cleaned).strip()
    m = re.search(r"\{.*\}", cleaned, flags=re.DOTALL)
    if m:
        cleaned = m.group(0)
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


# ================= Public Routes =================
@api_router.get("/")
async def root():
    return {"message": "PureBreeze API running", "company": "PureBreeze", "location": "Queensland, Australia"}


@api_router.post("/quote/analyze", response_model=QuoteAnalyzeResponse)
async def analyze_quote(req: QuoteAnalyzeRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")
    img_b64 = req.image_base64
    if img_b64.startswith("data:"):
        img_b64 = img_b64.split(",", 1)[1] if "," in img_b64 else img_b64
    service_type = req.service_type or "split_system"
    try:
        chat = LlmChat(api_key=EMERGENT_LLM_KEY, session_id=f"quote-{uuid.uuid4()}",
                       system_message="You are a concise HVAC analysis engine that replies ONLY with valid JSON."
                       ).with_model("gemini", "gemini-3-flash-preview")
        image_content = ImageContent(image_base64=img_b64)
        um = UserMessage(text=build_quote_prompt(service_type), file_contents=[image_content])
        response_text = await chat.send_message(um)
        data = parse_llm_json(response_text)
    except Exception:
        logger.exception("LLM analyze failed")
        data = fallback_quote(service_type, "AI analysis unavailable — using standard estimate.")

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
        service_type=service_type, name=req.name, phone=req.phone, email=req.email,
        address=req.address, notes=req.notes,
        dirtiness_level=int(data["dirtiness_level"]),
        dirtiness_label=str(data["dirtiness_label"]),
        price_min=int(data["price_min"]), price_max=int(data["price_max"]),
        estimated_hours=float(data["estimated_hours"]),
        recommended_services=list(data["recommended_services"]),
        observations=list(data["observations"]),
        urgency=str(data["urgency"]), summary=str(data["summary"]),
    )
    await db.quote_leads.insert_one(lead.model_dump())
    return QuoteAnalyzeResponse(
        id=lead.id, dirtiness_level=lead.dirtiness_level, dirtiness_label=lead.dirtiness_label,
        price_min=lead.price_min, price_max=lead.price_max, estimated_hours=lead.estimated_hours,
        recommended_services=lead.recommended_services, observations=lead.observations,
        urgency=lead.urgency, summary=lead.summary,
    )


@api_router.post("/contact", response_model=ContactLead)
async def submit_contact(req: ContactRequest):
    lead = ContactLead(**req.model_dump())
    await db.contact_leads.insert_one(lead.model_dump())
    return lead


# ---- Bookings ----
TIME_SLOT_LABELS = {
    "morning": "Morning (7am – 11am)",
    "midday": "Midday (11am – 2pm)",
    "afternoon": "Afternoon (2pm – 5pm)",
}
SLOT_CAPACITY = 4


def _parse_booking_date(s: str) -> datetime:
    try:
        return datetime.strptime(s, "%Y-%m-%d")
    except (ValueError, TypeError):
        raise HTTPException(400, "Invalid date (expected YYYY-MM-DD)")


@api_router.post("/bookings", response_model=Booking)
async def create_booking(req: BookingRequest):
    if req.time_slot not in TIME_SLOT_LABELS:
        raise HTTPException(400, "Invalid time slot")
    d = _parse_booking_date(req.booking_date)
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    if d < today:
        raise HTTPException(400, "booking_date cannot be in the past")
    existing = await db.bookings.count_documents({
        "booking_date": req.booking_date, "time_slot": req.time_slot,
        "status": {"$ne": "cancelled"},
    })
    if existing >= SLOT_CAPACITY:
        raise HTTPException(409, "Sorry, that slot is fully booked. Please pick another.")
    booking = Booking(**req.model_dump())
    await db.bookings.insert_one(booking.model_dump())
    return booking


@api_router.get("/bookings/availability")
async def booking_availability(date: str):
    _parse_booking_date(date)
    out = {}
    for slot, label in TIME_SLOT_LABELS.items():
        used = await db.bookings.count_documents({
            "booking_date": date, "time_slot": slot, "status": {"$ne": "cancelled"},
        })
        out[slot] = {"label": label, "remaining": max(0, SLOT_CAPACITY - used), "capacity": SLOT_CAPACITY}
    return {"date": date, "slots": out}


# Public lead lists (kept for backward compat) — consider removing or locking down later
@api_router.get("/leads/quotes", response_model=List[QuoteLead])
async def list_quote_leads_public():
    return await db.quote_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.get("/leads/contacts", response_model=List[ContactLead])
async def list_contact_leads_public():
    return await db.contact_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.get("/leads/bookings", response_model=List[Booking])
async def list_bookings_public():
    return await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


# ================= ADMIN =================
@api_router.post("/admin/login")
async def admin_login(req: AdminLogin, request: Request):
    ip = request.client.host if request.client else "unknown"
    await _check_lockout(ip)
    if not bcrypt.checkpw(req.password.encode(), ADMIN_PASSWORD_HASH.encode()):
        await _record_failed(ip)
        raise HTTPException(401, "Incorrect password")
    await _clear_attempts(ip)
    return {"token": create_admin_token(), "expires_in_days": JWT_DAYS}


@api_router.get("/admin/me")
async def admin_me(_: dict = Depends(require_admin)):
    return {"role": "admin", "ok": True}


@api_router.get("/admin/stats")
async def admin_stats(_: dict = Depends(require_admin)):
    pending = await db.bookings.count_documents({"status": "pending"})
    confirmed = await db.bookings.count_documents({"status": "confirmed"})
    today_iso = datetime.now().strftime("%Y-%m-%d")
    today_bookings = await db.bookings.count_documents({"booking_date": today_iso})
    return {
        "bookings_total": await db.bookings.count_documents({}),
        "bookings_pending": pending,
        "bookings_confirmed": confirmed,
        "bookings_today": today_bookings,
        "quotes_total": await db.quote_leads.count_documents({}),
        "contacts_total": await db.contact_leads.count_documents({}),
        "wingman_leads_total": await db.wingman_leads.count_documents({}),
        "wingman_research_total": await db.wingman_research.count_documents({}),
        "wingman_competitors_total": await db.wingman_competitors.count_documents({}),
        "chats_total": await db.chat_conversations.count_documents({}),
    }


@api_router.get("/admin/bookings", response_model=List[Booking])
async def admin_bookings(_: dict = Depends(require_admin)):
    return await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.patch("/admin/bookings/{booking_id}", response_model=Booking)
async def admin_update_booking(booking_id: str, upd: BookingStatusUpdate, _: dict = Depends(require_admin)):
    if upd.status not in ("pending", "confirmed", "completed", "cancelled"):
        raise HTTPException(400, "Invalid status")
    res = await db.bookings.find_one_and_update(
        {"id": booking_id}, {"$set": {"status": upd.status}},
        return_document=True, projection={"_id": 0},
    )
    if not res:
        raise HTTPException(404, "Booking not found")
    return res


@api_router.get("/admin/quotes", response_model=List[QuoteLead])
async def admin_quotes(_: dict = Depends(require_admin)):
    return await db.quote_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.get("/admin/contacts", response_model=List[ContactLead])
async def admin_contacts(_: dict = Depends(require_admin)):
    return await db.contact_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


# ================= WINGMAN (integration-ready) =================
# These POST endpoints accept data pushed by Emergent Wingman (or any external system).
# They are intentionally UNauthenticated for simple webhook compatibility; if you need
# to protect them, add an X-Wingman-Token header check later.

@api_router.post("/wingman/leads", response_model=WingmanLead)
async def push_wingman_lead(item: WingmanLead):
    await db.wingman_leads.insert_one(item.model_dump())
    return item


@api_router.get("/wingman/leads", response_model=List[WingmanLead])
async def list_wingman_leads(_: dict = Depends(require_admin)):
    return await db.wingman_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.post("/wingman/research", response_model=WingmanResearchItem)
async def push_wingman_research(item: WingmanResearchItem):
    await db.wingman_research.insert_one(item.model_dump())
    return item


@api_router.get("/wingman/research", response_model=List[WingmanResearchItem])
async def list_wingman_research(_: dict = Depends(require_admin)):
    return await db.wingman_research.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.post("/wingman/competitors", response_model=WingmanCompetitor)
async def push_wingman_competitor(item: WingmanCompetitor):
    await db.wingman_competitors.insert_one(item.model_dump())
    return item


@api_router.get("/wingman/competitors", response_model=List[WingmanCompetitor])
async def list_wingman_competitors(_: dict = Depends(require_admin)):
    return await db.wingman_competitors.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


# ================= CHAT =================
CHAT_SYSTEM = (
    "You are the PureBreeze customer-care assistant for a Queensland Australia AC cleaning company. "
    "Phone: 0490 507 878. Email: PureBreeze@gmail.com. "
    "Services: Split $165+, Ducted $450+, Commercial $380+, Window $120+. Same-day service. "
    "Be concise (under 60 words), warm, helpful. Encourage booking via the on-site booking page or calling. "
    "You cannot confirm exact appointment times — direct users to the booking calendar or phone."
)


@api_router.post("/chat/message", response_model=ChatReply)
async def chat_message(req: ChatMessage):
    convo_id = req.conversation_id or str(uuid.uuid4())
    now_iso = datetime.now(timezone.utc).isoformat()

    # persist user message
    await db.chat_messages.insert_one({
        "conversation_id": convo_id, "role": "user", "text": req.message,
        "visitor_name": req.visitor_name, "visitor_phone": req.visitor_phone, "created_at": now_iso,
    })
    # upsert conversation meta
    await db.chat_conversations.update_one(
        {"conversation_id": convo_id},
        {"$setOnInsert": {"conversation_id": convo_id, "created_at": now_iso},
         "$set": {"last_message_at": now_iso, "visitor_name": req.visitor_name, "visitor_phone": req.visitor_phone},
         "$inc": {"message_count": 1}},
        upsert=True,
    )

    # generate reply
    try:
        chat = LlmChat(api_key=EMERGENT_LLM_KEY, session_id=convo_id,
                       system_message=CHAT_SYSTEM).with_model("gemini", "gemini-3-flash-preview")
        reply_text = await chat.send_message(UserMessage(text=req.message))
    except Exception:
        logger.exception("Chat LLM failed")
        reply_text = ("Thanks for reaching out! A PureBreeze team member will be with you shortly. "
                      "For urgent help call 0490 507 878.")

    reply_iso = datetime.now(timezone.utc).isoformat()
    await db.chat_messages.insert_one({
        "conversation_id": convo_id, "role": "assistant", "text": reply_text, "created_at": reply_iso,
    })
    return ChatReply(conversation_id=convo_id, assistant_message=reply_text, created_at=reply_iso)


@api_router.get("/admin/chats")
async def admin_chats(_: dict = Depends(require_admin)):
    convos = await db.chat_conversations.find({}, {"_id": 0}).sort("last_message_at", -1).to_list(500)
    return convos


@api_router.get("/admin/chats/{conversation_id}")
async def admin_chat_messages(conversation_id: str, _: dict = Depends(require_admin)):
    msgs = await db.chat_messages.find({"conversation_id": conversation_id}, {"_id": 0}).sort("created_at", 1).to_list(1000)
    return {"conversation_id": conversation_id, "messages": msgs}


# ================= App wiring =================
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
