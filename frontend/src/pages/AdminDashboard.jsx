import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { adminApi, isAuthed, clearToken } from "@/lib/adminApi";
import {
  LayoutDashboard, Calendar, FileImage, Phone, Target, BookOpen, Users,
  MessageSquare, LogOut, ExternalLink, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

const NAV = [
  { key: "overview",    label: "Overview",    icon: <LayoutDashboard size={16} /> },
  { key: "bookings",    label: "Bookings",    icon: <Calendar size={16} /> },
  { key: "quotes",      label: "Photo Quotes",icon: <FileImage size={16} /> },
  { key: "contacts",    label: "Contacts",    icon: <Phone size={16} /> },
  { key: "wleads",      label: "Wingman · Leads",       icon: <Target size={16} /> },
  { key: "wresearch",   label: "Wingman · Research",    icon: <BookOpen size={16} /> },
  { key: "wcompetitors",label: "Wingman · Competitors", icon: <Users size={16} /> },
  { key: "chats",       label: "Live Chat",   icon: <MessageSquare size={16} /> },
];

const SLOT_LABEL = { morning: "Morning", midday: "Midday", afternoon: "Afternoon" };
const STATUS_COLOR = {
  pending:   "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-sky-100 text-sky-800 border-sky-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-slate-100 text-slate-500 border-slate-200",
};

function SectionHeader({ title, subtitle, onRefresh }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh} className="rounded-full" data-testid="admin-refresh">
          <RefreshCw size={14} className="mr-2" /> Refresh
        </Button>
      )}
    </div>
  );
}

function StatTile({ label, value, accent }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5">
      <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{label}</div>
      <div className={`mt-2 font-display text-3xl font-bold tracking-tighter ${accent || "text-slate-900"}`}>
        {value ?? "—"}
      </div>
    </div>
  );
}

function Overview({ stats, onRefresh }) {
  return (
    <div data-testid="admin-overview">
      <SectionHeader title="Overview" subtitle="Your business at a glance" onRefresh={onRefresh} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatTile label="Bookings today" value={stats?.bookings_today} accent="text-sky-600" />
        <StatTile label="Pending bookings" value={stats?.bookings_pending} accent="text-amber-600" />
        <StatTile label="Confirmed" value={stats?.bookings_confirmed} accent="text-emerald-600" />
        <StatTile label="Total bookings" value={stats?.bookings_total} />
        <StatTile label="Photo quotes" value={stats?.quotes_total} />
        <StatTile label="Contact leads" value={stats?.contacts_total} />
        <StatTile label="Chat sessions" value={stats?.chats_total} />
        <StatTile label="Wingman items" value={(stats?.wingman_leads_total || 0) + (stats?.wingman_research_total || 0) + (stats?.wingman_competitors_total || 0)} accent="text-violet-600" />
      </div>

      <div className="mt-10 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-100 p-6">
        <div className="flex items-start gap-3">
          <Target size={20} className="text-sky-600 mt-0.5" />
          <div>
            <h3 className="font-display text-lg font-bold tracking-tight text-slate-900">Emergent Wingman integration</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Your dashboard is ready to receive leads, market research and competitor intel from Emergent Wingman.
              Point Wingman at the webhook URLs below — no auth required, all inbound data is timestamped and stored.
            </p>
            <div className="mt-4 space-y-1 font-mono text-xs text-slate-700">
              <div>POST <span className="text-sky-700">{process.env.REACT_APP_BACKEND_URL}/api/wingman/leads</span></div>
              <div>POST <span className="text-sky-700">{process.env.REACT_APP_BACKEND_URL}/api/wingman/research</span></div>
              <div>POST <span className="text-sky-700">{process.env.REACT_APP_BACKEND_URL}/api/wingman/competitors</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingsView({ onRefresh }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    try { setRows(await adminApi.bookings()); } catch { toast.error("Failed to load bookings"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    try { await adminApi.updateBooking(id, status); toast.success("Updated"); load(); }
    catch { toast.error("Update failed"); }
  };

  return (
    <div data-testid="admin-bookings">
      <SectionHeader title="Bookings" subtitle={`${rows.length} total`} onRefresh={() => { load(); onRefresh?.(); }} />
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr className="text-left text-xs uppercase tracking-widest">
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={6} className="p-6 text-center text-slate-500">Loading…</td></tr>}
              {!loading && rows.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No bookings yet.</td></tr>
              )}
              {rows.map((b) => (
                <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50" data-testid={`booking-row-${b.id}`}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{format(new Date(b.booking_date), "EEE, d MMM")}</div>
                    <div className="text-xs text-slate-500">{SLOT_LABEL[b.time_slot] || b.time_slot}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{b.name}</div>
                    <a href={`tel:${b.phone}`} className="text-xs text-sky-600">{b.phone}</a>
                  </td>
                  <td className="px-4 py-3 capitalize">{b.service_type.replace("_", " ")}</td>
                  <td className="px-4 py-3 text-slate-700 max-w-xs truncate">{b.address}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-bold border ${STATUS_COLOR[b.status] || ""}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => setStatus(b.id, e.target.value)}
                      className="text-xs border rounded-lg px-2 py-1 bg-white"
                      data-testid={`booking-status-${b.id}`}
                    >
                      {["pending","confirmed","completed","cancelled"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function QuotesView() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    try { setRows(await adminApi.quotes()); } catch { toast.error("Failed"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  return (
    <div data-testid="admin-quotes">
      <SectionHeader title="Photo Quotes" subtitle={`${rows.length} total`} onRefresh={load} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {rows.map((q) => (
            <div key={q.id} className="rounded-2xl bg-white border border-slate-200 p-5" data-testid={`quote-card-${q.id}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{q.service_type.replace("_", " ")}</span>
                <Badge variant="outline" className="text-[10px]">{q.urgency}</Badge>
              </div>
              <div className="mt-2 font-display text-2xl font-bold tracking-tighter">${q.price_min}–${q.price_max}</div>
              <div className="text-xs text-slate-500">Dirtiness {q.dirtiness_level}/10 · {q.dirtiness_label}</div>
              <p className="mt-3 text-sm text-slate-700 line-clamp-3">{q.summary}</p>
              {(q.name || q.phone) && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-sm">
                  <div className="font-semibold text-slate-900">{q.name || "—"}</div>
                  <a className="text-sky-600 text-xs" href={`tel:${q.phone}`}>{q.phone}</a>
                </div>
              )}
              <div className="text-[10px] text-slate-400 mt-3">{format(new Date(q.created_at), "d MMM yyyy, h:mma")}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactsView() {
  const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { setRows(await adminApi.contacts()); } catch {} finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  return (
    <div data-testid="admin-contacts">
      <SectionHeader title="Contact leads" subtitle={`${rows.length} total`} onRefresh={load} />
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-left text-xs uppercase tracking-widest text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Suburb</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="p-6 text-center text-slate-500">Loading…</td></tr>}
            {!loading && rows.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-slate-500">No contacts yet.</td></tr>}
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold">{c.name}</td>
                <td className="px-4 py-3"><a href={`tel:${c.phone}`} className="text-sky-600">{c.phone}</a></td>
                <td className="px-4 py-3">{c.suburb || "—"}</td>
                <td className="px-4 py-3 max-w-sm truncate">{c.message || "—"}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{format(new Date(c.created_at), "d MMM, h:mma")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WingmanLeads() {
  const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { setRows(await adminApi.wingmanLeads()); } catch {} finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  return (
    <div data-testid="admin-wingman-leads">
      <SectionHeader title="Wingman · Leads" subtitle="Leads discovered by Emergent Wingman" onRefresh={load} />
      {loading ? <div className="text-slate-500">Loading…</div> : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          <Target size={28} className="mx-auto mb-3 text-slate-400" />
          <div className="font-semibold text-slate-700">No Wingman leads yet.</div>
          <div className="text-sm mt-1">When Wingman finds prospects they will appear here automatically.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {rows.map((l) => (
            <div key={l.id} className="rounded-2xl bg-white border border-slate-200 p-5" data-testid={`wingman-lead-${l.id}`}>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-900">{l.name || l.company || "Lead"}</div>
                {l.score != null && <span className="text-xs font-bold text-violet-600">{l.score}/100</span>}
              </div>
              {l.company && <div className="text-sm text-slate-500">{l.company}</div>}
              <div className="mt-3 space-y-1 text-sm text-slate-700">
                {l.phone && <div>📞 <a href={`tel:${l.phone}`} className="text-sky-600">{l.phone}</a></div>}
                {l.email && <div>✉️ <a href={`mailto:${l.email}`} className="text-sky-600">{l.email}</a></div>}
                {l.suburb && <div>📍 {l.suburb}</div>}
              </div>
              {l.notes && <p className="mt-3 text-sm text-slate-600 line-clamp-3">{l.notes}</p>}
              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                <span>{l.source || "wingman"}</span>
                <span>{format(new Date(l.created_at), "d MMM")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WingmanResearch() {
  const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { setRows(await adminApi.wingmanResearch()); } catch {} finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  return (
    <div data-testid="admin-wingman-research">
      <SectionHeader title="Wingman · Research" subtitle="Market research & insights delivered by Wingman" onRefresh={load} />
      {loading ? <div className="text-slate-500">Loading…</div> : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          <BookOpen size={28} className="mx-auto mb-3 text-slate-400" />
          <div className="font-semibold text-slate-700">No research yet.</div>
          <div className="text-sm mt-1">Wingman insights on pricing, trends and SEO will appear here.</div>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white border border-slate-200 p-5" data-testid={`wingman-research-${r.id}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-slate-900">{r.title}</h3>
                {r.category && <Badge variant="outline" className="text-[10px]">{r.category}</Badge>}
              </div>
              {r.summary && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{r.summary}</p>}
              {r.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest bg-sky-50 text-sky-700 border border-sky-100 rounded-full px-2 py-0.5">{t}</span>
                  ))}
                </div>
              )}
              {r.url && (
                <a href={r.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-sky-600">
                  Source <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WingmanCompetitors() {
  const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { setRows(await adminApi.wingmanCompetitors()); } catch {} finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  return (
    <div data-testid="admin-wingman-competitors">
      <SectionHeader title="Wingman · Competitors" subtitle="Queensland competitors tracked by Wingman" onRefresh={load} />
      {loading ? <div className="text-slate-500">Loading…</div> : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          <Users size={28} className="mx-auto mb-3 text-slate-400" />
          <div className="font-semibold text-slate-700">No competitors tracked yet.</div>
          <div className="text-sm mt-1">Wingman competitor intel will appear here automatically.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map((c) => (
            <div key={c.id} className="rounded-2xl bg-white border border-slate-200 p-5" data-testid={`wingman-competitor-${c.id}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{c.name}</h3>
                  {c.suburb && <div className="text-sm text-slate-500">{c.suburb}</div>}
                </div>
                {c.rating != null && (
                  <div className="text-right">
                    <div className="font-display text-xl font-bold text-sky-600">{c.rating}★</div>
                    <div className="text-[10px] text-slate-500">{c.review_count || 0} reviews</div>
                  </div>
                )}
              </div>
              {c.price_range && <div className="mt-2 text-sm text-slate-700 font-semibold">{c.price_range}</div>}
              {c.strengths?.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold">Strengths</div>
                  <ul className="mt-1 text-sm text-slate-700 list-disc ml-4">
                    {c.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
              {c.weaknesses?.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-widest text-red-700 font-bold">Weaknesses</div>
                  <ul className="mt-1 text-sm text-slate-700 list-disc ml-4">
                    {c.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
              {c.website && (
                <a href={c.website} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-sky-600">
                  Visit <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatsView() {
  const [convos, setConvos] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const load = async () => {
    try { setConvos(await adminApi.chats()); } catch {}
  };
  useEffect(() => { load(); }, []);

  const openChat = async (id) => {
    setActive(id);
    try { const res = await adminApi.chatMessages(id); setMessages(res.messages); } catch {}
  };

  return (
    <div data-testid="admin-chats">
      <SectionHeader title="Live Chat" subtitle={`${convos.length} conversation${convos.length === 1 ? "" : "s"}`} onRefresh={load} />
      <div className="grid md:grid-cols-12 gap-4">
        <div className="md:col-span-4 rounded-2xl bg-white border border-slate-200 overflow-hidden max-h-[70vh] overflow-y-auto">
          {convos.length === 0 && (
            <div className="p-6 text-sm text-slate-500 text-center">No chats yet.</div>
          )}
          {convos.map((c) => (
            <button
              key={c.conversation_id}
              onClick={() => openChat(c.conversation_id)}
              className={`w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 ${active === c.conversation_id ? "bg-sky-50" : ""}`}
              data-testid={`chat-convo-${c.conversation_id}`}
            >
              <div className="font-semibold text-slate-900 text-sm">{c.visitor_name || "Anonymous visitor"}</div>
              <div className="text-xs text-slate-500 mt-0.5">{c.message_count} messages · {format(new Date(c.last_message_at), "d MMM, h:mma")}</div>
              {c.visitor_phone && <div className="text-xs text-sky-600 mt-0.5">{c.visitor_phone}</div>}
            </button>
          ))}
        </div>

        <div className="md:col-span-8 rounded-2xl bg-white border border-slate-200 p-5 min-h-[50vh]">
          {!active && <div className="text-slate-500 text-sm">Select a conversation to view the transcript.</div>}
          {active && (
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.role === "user" ? "bg-slate-100 text-slate-800" : "bg-sky-500 text-white"}`}>
                    {m.text}
                    <div className={`text-[10px] mt-1 ${m.role === "user" ? "text-slate-500" : "text-sky-100"}`}>
                      {format(new Date(m.created_at), "h:mma")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!isAuthed()) navigate("/admin/login", { replace: true });
  }, [navigate]);

  const loadStats = async () => {
    try { setStats(await adminApi.stats()); } catch {}
  };
  useEffect(() => { loadStats(); }, []);

  if (!isAuthed()) return <Navigate to="/admin/login" replace />;

  const logout = () => { clearToken(); navigate("/admin/login", { replace: true }); };

  return (
    <div className="min-h-screen bg-slate-50 flex" data-testid="admin-dashboard">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col flex-shrink-0 sticky top-0 h-screen">
        <div className="px-5 py-6 border-b border-white/10">
          <div className="font-display font-bold text-lg">PureBreeze</div>
          <div className="text-[10px] uppercase tracking-widest text-sky-400 mt-0.5">Admin Console</div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => setTab(n.key)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm text-left transition-colors ${
                tab === n.key ? "bg-sky-500 text-white" : "text-slate-300 hover:bg-white/5"
              }`}
              data-testid={`admin-nav-${n.key}`}
            >
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <a href="/" className="block text-xs text-slate-400 hover:text-white">← Back to site</a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-xs text-slate-300 hover:text-white"
            data-testid="admin-logout"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        {tab === "overview"     && <Overview stats={stats} onRefresh={loadStats} />}
        {tab === "bookings"     && <BookingsView onRefresh={loadStats} />}
        {tab === "quotes"       && <QuotesView />}
        {tab === "contacts"     && <ContactsView />}
        {tab === "wleads"       && <WingmanLeads />}
        {tab === "wresearch"    && <WingmanResearch />}
        {tab === "wcompetitors" && <WingmanCompetitors />}
        {tab === "chats"        && <ChatsView />}
      </main>
    </div>
  );
}
