"""Admin auth, Wingman webhook/GET, Chat (Gemini 3 Flash), and regressions."""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().rstrip('/')
                break
API = f"{BASE_URL}/api"
ADMIN_PASSWORD = "1302"


@pytest.fixture
def s():
    sess = requests.Session()
    sess.headers.update({'Content-Type': 'application/json'})
    return sess


@pytest.fixture
def admin_token(s):
    # ensure attempts cleared from prior runs by waiting briefly if locked
    r = s.post(f"{API}/admin/login", json={"password": ADMIN_PASSWORD}, timeout=15)
    if r.status_code == 429:
        pytest.skip(f"IP locked out from prior run: {r.text}")
    assert r.status_code == 200, r.text
    d = r.json()
    assert "token" in d and len(d["token"]) > 20
    assert d.get("expires_in_days") == 7
    return d["token"]


@pytest.fixture
def auth_s(s, admin_token):
    s.headers.update({"Authorization": f"Bearer {admin_token}"})
    return s


# ---------- Admin Login ----------
class TestAdminLogin:
    def test_login_success(self, s):
        r = s.post(f"{API}/admin/login", json={"password": ADMIN_PASSWORD}, timeout=15)
        if r.status_code == 429:
            pytest.skip("locked out")
        assert r.status_code == 200, r.text
        d = r.json()
        assert "token" in d
        assert d["expires_in_days"] == 7

    def test_login_wrong_password(self, s):
        r = s.post(f"{API}/admin/login", json={"password": "wrong-xyz"}, timeout=15)
        # may be 401 or 429 if prior attempts; accept either but assert detail shape
        assert r.status_code in (401, 429), r.text
        if r.status_code == 401:
            assert r.json().get("detail") == "Incorrect password"

    def test_admin_me_requires_token(self, s):
        r = s.get(f"{API}/admin/me", timeout=15)
        assert r.status_code in (401, 403)

    def test_admin_me_with_token(self, auth_s):
        r = auth_s.get(f"{API}/admin/me", timeout=15)
        assert r.status_code == 200
        assert r.json().get("role") == "admin"


# ---------- Admin endpoints require auth ----------
class TestAdminAuthGuards:
    ENDPOINTS = [
        "/admin/stats", "/admin/bookings", "/admin/quotes", "/admin/contacts",
        "/admin/chats", "/wingman/leads", "/wingman/research", "/wingman/competitors",
    ]

    @pytest.mark.parametrize("ep", ENDPOINTS)
    def test_unauthed_returns_401(self, s, ep):
        r = s.get(f"{API}{ep}", timeout=15)
        assert r.status_code in (401, 403), f"{ep} -> {r.status_code}: {r.text}"

    @pytest.mark.parametrize("ep", ENDPOINTS)
    def test_authed_returns_200(self, auth_s, ep):
        r = auth_s.get(f"{API}{ep}", timeout=20)
        assert r.status_code == 200, f"{ep} -> {r.status_code}: {r.text}"

    def test_stats_fields(self, auth_s):
        r = auth_s.get(f"{API}/admin/stats", timeout=15)
        assert r.status_code == 200
        d = r.json()
        for k in ["bookings_total", "bookings_pending", "bookings_confirmed",
                  "bookings_today", "quotes_total", "contacts_total",
                  "wingman_leads_total", "wingman_research_total",
                  "wingman_competitors_total", "chats_total"]:
            assert k in d
            assert isinstance(d[k], int)


# ---------- Booking PATCH ----------
class TestAdminBookingPatch:
    def test_patch_status_flow(self, s, auth_s):
        # create a booking
        payload = {
            "name": "TEST_PatchBook", "phone": "0400999111",
            "address": "Brisbane", "service_type": "split_system",
            "booking_date": "2031-01-05", "time_slot": "morning",
        }
        r = s.post(f"{API}/bookings", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        bid = r.json()["id"]

        # patch to confirmed
        r2 = auth_s.patch(f"{API}/admin/bookings/{bid}", json={"status": "confirmed"}, timeout=15)
        assert r2.status_code == 200, r2.text
        assert r2.json()["status"] == "confirmed"
        assert "_id" not in r2.json()

        # verify via GET admin bookings
        r3 = auth_s.get(f"{API}/admin/bookings", timeout=20)
        found = next((b for b in r3.json() if b["id"] == bid), None)
        assert found and found["status"] == "confirmed"

    def test_patch_invalid_status(self, auth_s, s):
        payload = {
            "name": "TEST_BadStatus", "phone": "0400999112",
            "address": "Brisbane", "booking_date": "2031-01-06", "time_slot": "midday",
        }
        r = s.post(f"{API}/bookings", json=payload, timeout=15)
        bid = r.json()["id"]
        r2 = auth_s.patch(f"{API}/admin/bookings/{bid}", json={"status": "weird"}, timeout=15)
        assert r2.status_code == 400

    def test_patch_unknown_id(self, auth_s):
        r = auth_s.patch(f"{API}/admin/bookings/{uuid.uuid4()}", json={"status": "confirmed"}, timeout=15)
        assert r.status_code == 404


# ---------- Wingman webhooks (POST unauth) + GET auth ----------
class TestWingman:
    def test_lead_push_unauth_and_list_auth(self, s, auth_s):
        payload = {"name": f"TEST_WLead_{int(time.time())}", "company": "Acme",
                   "phone": "0400000001", "email": "a@b.com",
                   "source": "google-maps", "suburb": "Brisbane", "score": 80}
        r = s.post(f"{API}/wingman/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        assert r.json()["name"] == payload["name"]

        r2 = auth_s.get(f"{API}/wingman/leads", timeout=20)
        assert r2.status_code == 200
        assert any(x.get("name") == payload["name"] for x in r2.json())

    def test_research_push_unauth_and_list_auth(self, s, auth_s):
        payload = {"title": f"TEST_Research_{int(time.time())}", "summary": "QLD market",
                   "category": "market", "tags": ["hvac", "qld"]}
        r = s.post(f"{API}/wingman/research", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        r2 = auth_s.get(f"{API}/wingman/research", timeout=20)
        assert r2.status_code == 200
        assert any(x.get("title") == payload["title"] for x in r2.json())

    def test_competitor_push_unauth_and_list_auth(self, s, auth_s):
        payload = {"name": f"TEST_Comp_{int(time.time())}", "website": "https://x.com",
                   "suburb": "Brisbane", "rating": 4.5, "review_count": 120,
                   "price_range": "$150-$250", "strengths": ["fast"], "weaknesses": ["pricey"]}
        r = s.post(f"{API}/wingman/competitors", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        r2 = auth_s.get(f"{API}/wingman/competitors", timeout=20)
        assert r2.status_code == 200
        assert any(x.get("name") == payload["name"] for x in r2.json())


# ---------- Chat (Gemini 3 Flash) ----------
class TestChat:
    def test_chat_new_conversation_and_persist(self, s, auth_s):
        r = s.post(f"{API}/chat/message",
                   json={"conversation_id": "", "message": "Hi, how much for a split system clean?"},
                   timeout=90)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["conversation_id"] and len(d["conversation_id"]) > 8
        assert isinstance(d["assistant_message"], str) and len(d["assistant_message"]) > 0
        assert "created_at" in d
        convo_id = d["conversation_id"]

        # follow up on same conversation
        r2 = s.post(f"{API}/chat/message",
                    json={"conversation_id": convo_id, "message": "Do you come to Redcliffe?"},
                    timeout=90)
        assert r2.status_code == 200, r2.text
        assert r2.json()["conversation_id"] == convo_id

        # admin can see conversation list + messages
        r3 = auth_s.get(f"{API}/admin/chats", timeout=15)
        assert r3.status_code == 200
        assert any(c.get("conversation_id") == convo_id for c in r3.json())

        r4 = auth_s.get(f"{API}/admin/chats/{convo_id}", timeout=15)
        assert r4.status_code == 200
        body = r4.json()
        assert body["conversation_id"] == convo_id
        msgs = body["messages"]
        # 2 user + 2 assistant = 4 messages
        assert len(msgs) >= 4
        roles = [m["role"] for m in msgs]
        assert "user" in roles and "assistant" in roles
        # chronological order check
        times = [m["created_at"] for m in msgs]
        assert times == sorted(times)


# ---------- Regression ----------
class TestRegression:
    def test_root(self, s):
        r = s.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert r.json().get("company") == "PureBreeze"

    def test_availability(self, s):
        r = s.get(f"{API}/bookings/availability", params={"date": "2031-02-01"}, timeout=15)
        assert r.status_code == 200
        assert "slots" in r.json()

    def test_contact(self, s):
        r = s.post(f"{API}/contact", json={"name": "TEST_Reg", "phone": "0400123321"}, timeout=15)
        assert r.status_code == 200
        assert r.json()["name"] == "TEST_Reg"

    def test_booking_create(self, s):
        r = s.post(f"{API}/bookings", json={
            "name": "TEST_RegBook", "phone": "0400123321",
            "address": "Brisbane", "booking_date": "2031-02-02", "time_slot": "afternoon"
        }, timeout=15)
        assert r.status_code == 200
        assert r.json()["status"] == "pending"
