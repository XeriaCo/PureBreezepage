# PureBreeze — AC Cleaning Service (Queensland, Australia)

## Original Problem Statement
Build an air conditioner cleaning service company website called **PureBreeze** for Queensland Australia.
- Phone: **0490 507 878**
- Email: **PureBreeze@gmail.com**
- Features: AI photo-quote page (upload AC photo → AI analyses dirtiness → returns a quote), lots of selling points, scary facts about dangers of uncleaned AC, benefits of clean AC, light blue + white design, modern/animated/clean, custom animated PureBreeze logo.

## User Choices (Feb 2026)
- **AI model**: Gemini 3 Flash (vision) via Emergent Universal LLM Key
- **Lead storage**: yes — save quote + contact submissions to MongoDB
- **Pricing**: reasonable Queensland market defaults
- **Contact**: both phone/email prominent AND contact form
- **Logo**: custom animated AC with blue breeze (SVG + CSS)

## Architecture
- **Backend**: FastAPI + MongoDB (motor). `emergentintegrations.llm.chat.LlmChat` with model `gemini-3-flash-preview` for vision quote analysis.
- **Frontend**: React + Tailwind + Shadcn UI + framer-motion. Fonts: Outfit (display) + DM Sans (body).
- **Design tokens**: light blue (#38BDF8 / #0EA5E9), deep blue (#0369A1), slate text, red-on-black for the "Scary Facts" contrast section.

## Endpoints
- `GET /api/` — health
- `POST /api/quote/analyze` — { image_base64, service_type, name?, phone?, email?, address?, notes? } → structured quote + persists to `quote_leads`
- `POST /api/contact` — { name, phone, email?, service_type?, suburb?, message? } → persists to `contact_leads`
- `GET /api/leads/quotes`, `GET /api/leads/contacts` — list (admin)

## Implemented Components
- Navbar (sticky glass), Hero (animated AC logo + breeze rings + stat chips), ScaryFacts (6-card bento, black bg + red accents), Benefits (6 cards), Services (4 pricing cards), AIQuote (drag-drop photo + form + result panel w/ dirtiness bar, urgency badge, price range, recommended services, observations), WhyChooseUs (technician image + 6 trust points), Testimonials (4 cards), FAQ (accordion), Contact (phone/email + form), Footer (12 QLD service areas).

## What's Been Implemented — Feb 2026 (v1)
- Full end-to-end MVP built and tested (100% backend, 100% frontend critical flows per iteration_1 report).
- Gemini 3 Flash vision integration verified working.
- MongoDB persistence for both lead types verified.
- All interactive elements have `data-testid`s.

## What's Been Implemented — Feb 2026 (v2)
- **Before/After Gallery** at `#gallery`: interactive drag-to-reveal comparison slider with 3 switchable pairs (Ducted Return · Brisbane, Split System · Gold Coast, Office AC · Sunshine Coast).
- **Booking Calendar** at `#book`: shadcn Calendar + 3 time slots (morning/midday/afternoon, 4 seats each) + details form → `POST /api/bookings`. Real-time availability shown via `GET /api/bookings/availability`. Confirmation card with formatted date & slot. Capacity enforced (409 when full).
- Hardened booking date validation: strict YYYY-MM-DD, past dates rejected.
- Navbar updated with Gallery and Book links.
- Tests: 16/16 backend + all new frontend flows green (iteration_2).

## P1 / Next Actions
- **Email notifications** on new leads / bookings (Resend integration) so PureBreeze gets alerted instantly.
- **Admin dashboard** at `/admin` to view leads + bookings (behind simple JWT auth).
- **SMS booking confirmations** (Twilio) to reduce no-shows.
- **Real before/after photos** — replace stock pairs with PureBreeze's own job photos when supplied.
- **Google reviews widget** for social proof.

## P2
- SMS follow-up via Twilio.
- Multi-photo quote (front, filter, coils) for higher accuracy.
- Service-area slug pages (/brisbane-ac-cleaning, etc.) for SEO.
- Stripe deposit capture on booking.

## Test credentials
N/A — no auth yet.
