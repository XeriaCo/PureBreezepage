"""PureBreeze API tests - covers health, AI quote analyze (Gemini 3 Flash),
contact submissions, and lead listing endpoints."""
import os
import base64
import time
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    # fall back to reading frontend/.env directly so backend tests still work
    env_path = '/app/frontend/.env'
    with open(env_path) as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().rstrip('/')
                break

API = f"{BASE_URL}/api"

# Generated synthetic AC image with real visual features (slats, dust, grime)
IMG_PATH = '/tmp/ac.jpg'


@pytest.fixture(scope='session')
def ac_b64():
    with open(IMG_PATH, 'rb') as f:
        return base64.b64encode(f.read()).decode('ascii')


@pytest.fixture
def s():
    sess = requests.Session()
    sess.headers.update({'Content-Type': 'application/json'})
    return sess


# ---------- Health ----------
class TestHealth:
    def test_root(self, s):
        r = s.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert 'PureBreeze' in d.get('message', '')
        assert d.get('company') == 'PureBreeze'


# ---------- Quote Analyze ----------
class TestQuoteAnalyze:
    def _validate(self, d):
        for k in ['id', 'dirtiness_level', 'dirtiness_label', 'price_min',
                  'price_max', 'estimated_hours', 'recommended_services',
                  'observations', 'urgency', 'summary']:
            assert k in d, f"missing key {k}"
        assert isinstance(d['dirtiness_level'], int)
        assert 0 <= d['dirtiness_level'] <= 10
        assert d['dirtiness_label'] in ['Clean', 'Light Dust', 'Moderate', 'Heavy', 'Severe']
        assert isinstance(d['price_min'], int) and d['price_min'] > 0
        assert isinstance(d['price_max'], int) and d['price_max'] >= d['price_min']
        assert isinstance(d['estimated_hours'], (int, float)) and d['estimated_hours'] > 0
        assert isinstance(d['recommended_services'], list)
        assert isinstance(d['observations'], list)
        assert d['urgency'] in ['Low', 'Medium', 'High', 'Critical']
        assert isinstance(d['summary'], str)

    def test_analyze_split_system(self, s, ac_b64):
        payload = {
            'image_base64': ac_b64,
            'service_type': 'split_system',
            'name': 'TEST_Jane',
            'phone': '0400111222',
            'email': 'test_jane@example.com',
            'address': 'Brisbane',
            'notes': 'TEST split system'
        }
        r = s.post(f"{API}/quote/analyze", json=payload, timeout=120)
        assert r.status_code == 200, r.text
        d = r.json()
        self._validate(d)
        # Reasonable QLD pricing for split system base 165–220 (could scale up)
        assert d['price_min'] >= 100
        assert d['price_max'] <= 600

    def test_analyze_with_data_url_prefix(self, s, ac_b64):
        payload = {
            'image_base64': f"data:image/jpeg;base64,{ac_b64}",
            'service_type': 'split_system',
            'name': 'TEST_DataUrl'
        }
        r = s.post(f"{API}/quote/analyze", json=payload, timeout=120)
        assert r.status_code == 200, r.text
        self._validate(r.json())

    @pytest.mark.parametrize('stype', ['ducted', 'commercial', 'window'])
    def test_analyze_service_type_variants(self, s, ac_b64, stype):
        payload = {'image_base64': ac_b64, 'service_type': stype, 'name': f'TEST_{stype}'}
        r = s.post(f"{API}/quote/analyze", json=payload, timeout=120)
        assert r.status_code == 200, r.text
        d = r.json()
        # Validate structure
        assert 'dirtiness_level' in d
        assert d['urgency'] in ['Low', 'Medium', 'High', 'Critical']

    def test_analyze_persists_lead(self, s, ac_b64):
        unique = f'TEST_persist_{int(time.time())}'
        payload = {
            'image_base64': ac_b64,
            'service_type': 'split_system',
            'name': unique,
            'phone': '0400999000'
        }
        r = s.post(f"{API}/quote/analyze", json=payload, timeout=120)
        assert r.status_code == 200
        # Verify in /leads/quotes
        r2 = s.get(f"{API}/leads/quotes", timeout=20)
        assert r2.status_code == 200
        leads = r2.json()
        assert any(lead.get('name') == unique for lead in leads), \
            'New quote lead not found in /leads/quotes'


# ---------- Contact ----------
class TestContact:
    def test_submit_contact(self, s):
        payload = {
            'name': 'TEST_Bob',
            'phone': '0411222333',
            'email': 'bob@example.com',
            'service_type': 'split_system',
            'suburb': 'Brisbane',
            'message': 'TEST need a clean'
        }
        r = s.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d['name'] == 'TEST_Bob'
        assert d['phone'] == '0411222333'
        assert 'id' in d and len(d['id']) > 0
        assert 'created_at' in d

    def test_contact_minimal(self, s):
        payload = {'name': 'TEST_MinName', 'phone': '0400000000'}
        r = s.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200
        assert r.json()['name'] == 'TEST_MinName'

    def test_contact_missing_required(self, s):
        r = s.post(f"{API}/contact", json={'name': 'X'}, timeout=15)
        assert r.status_code == 422  # phone missing

    def test_contact_persisted(self, s):
        unique = f'TEST_ct_{int(time.time())}'
        s.post(f"{API}/contact", json={'name': unique, 'phone': '0400123456'}, timeout=15)
        r = s.get(f"{API}/leads/contacts", timeout=20)
        assert r.status_code == 200
        leads = r.json()
        assert any(l.get('name') == unique for l in leads)


# ---------- Leads (no _id leakage) ----------
class TestLeads:
    def test_quotes_no_objectid(self, s):
        r = s.get(f"{API}/leads/quotes", timeout=20)
        assert r.status_code == 200
        for row in r.json():
            assert '_id' not in row

    def test_contacts_no_objectid(self, s):
        r = s.get(f"{API}/leads/contacts", timeout=20)
        assert r.status_code == 200
        for row in r.json():
            assert '_id' not in row
