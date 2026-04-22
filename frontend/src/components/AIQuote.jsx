import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Upload, Sparkles, Camera, CheckCircle2, AlertCircle, Clock, DollarSign, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICE_TYPES = [
  { value: "split_system", label: "Split System" },
  { value: "ducted", label: "Ducted System" },
  { value: "commercial", label: "Commercial" },
  { value: "window", label: "Window / Portable" },
];

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AIQuote() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [form, setForm] = useState({
    service_type: "split_system",
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const inputRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please upload an image (JPG, PNG or WEBP).");
      return;
    }
    if (f.size > 12 * 1024 * 1024) {
      toast.error("Image too large. Please keep under 12MB.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setQuote(null);
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const clearPhoto = () => {
    setFile(null);
    setPreview(null);
    setQuote(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a photo of your AC unit first.");
      return;
    }
    setLoading(true);
    setQuote(null);
    try {
      const dataUrl = await fileToBase64(file);
      const base64 = dataUrl.split(",", 2)[1];
      const { data } = await axios.post(`${API}/quote/analyze`, {
        image_base64: base64,
        service_type: form.service_type,
        name: form.name || null,
        phone: form.phone || null,
        email: form.email || null,
        address: form.address || null,
        notes: form.notes || null,
      }, { timeout: 90000 });
      setQuote(data);
      toast.success("Quote ready!");
      // scroll to result
      setTimeout(() => {
        document.getElementById("quote-result")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    } catch (err) {
      console.error(err);
      toast.error("Sorry, something went wrong. Please call 0490 507 878.");
    } finally {
      setLoading(false);
    }
  };

  const urgencyColor = (u) => ({
    Low: "text-emerald-600 bg-emerald-50 border-emerald-200",
    Medium: "text-amber-700 bg-amber-50 border-amber-200",
    High: "text-orange-700 bg-orange-50 border-orange-200",
    Critical: "text-red-700 bg-red-50 border-red-200",
  }[u] || "text-slate-700 bg-slate-50 border-slate-200");

  const dirtinessBar = (lvl) => {
    const pct = Math.min(100, Math.max(0, lvl * 10));
    const color = lvl <= 3 ? "bg-emerald-500" : lvl <= 6 ? "bg-amber-500" : "bg-red-500";
    return (
      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden" data-testid="dirtiness-bar">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${pct}%` }} />
      </div>
    );
  };

  return (
    <section id="ai-quote" className="relative py-24 lg:py-32 bg-white" data-testid="ai-quote-section">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-sky-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-cyan-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs tracking-widest uppercase text-slate-500">§ 03</span>
            <span className="h-px w-10 bg-slate-300" />
            <span className="font-mono text-xs tracking-widest uppercase text-slate-500">Photo quote</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.02]">
            Snap a photo. <br />
            <span className="serif-italic text-sky-600">Know the price</span> in seconds.
          </h2>
          <p className="mt-5 text-lg text-slate-600 max-w-xl leading-relaxed border-l-2 border-sky-200 pl-5">
            Our vision engine inspects your unit for mould, dust and damage — then returns a transparent price instantly.
            No call required, no pressure to book.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-2 gap-8 items-start">
          {/* Upload + form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] bg-white border border-sky-100 p-7 sm:p-10 shadow-[0_20px_60px_-20px_rgba(14,165,233,0.25)]"
            data-testid="ai-quote-form"
          >
            {/* dropzone */}
            {!preview ? (
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
                className={`drop-zone ${dragActive ? "drag-active" : ""} rounded-2xl cursor-pointer p-10 text-center flex flex-col items-center justify-center min-h-[220px]`}
                data-testid="ai-quote-dropzone"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                  <Upload size={24} />
                </div>
                <p className="font-display text-lg font-semibold text-slate-900">Drop a photo or click to browse</p>
                <p className="text-sm text-slate-500 mt-1">JPG, PNG or WEBP · up to 12MB</p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                  data-testid="ai-quote-file-input"
                />
                <div className="mt-4 flex items-center gap-2 text-xs text-sky-700 font-medium">
                  <Camera size={14} /> Tip: good lighting = better quote
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-sky-100" data-testid="ai-quote-preview">
                <img src={preview} alt="AC preview" className="w-full h-64 object-cover" />
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                  data-testid="ai-quote-clear-photo"
                  aria-label="Remove photo"
                >
                  <X size={16} />
                </button>
                {loading && (
                  <div className="absolute inset-0 bg-sky-500/10 overflow-hidden pointer-events-none">
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent scan-line" />
                  </div>
                )}
              </div>
            )}

            {/* form fields */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label className="text-xs font-semibold text-slate-700">Service type</Label>
                <Select
                  value={form.service_type}
                  onValueChange={(v) => setForm((f) => ({ ...f, service_type: v }))}
                >
                  <SelectTrigger className="mt-1.5 rounded-xl" data-testid="ai-quote-service-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Full name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Doe"
                  className="mt-1.5 rounded-xl"
                  data-testid="ai-quote-name"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-700">Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="0400 000 000"
                  className="mt-1.5 rounded-xl"
                  data-testid="ai-quote-phone"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-700">Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@email.com"
                  className="mt-1.5 rounded-xl"
                  data-testid="ai-quote-email"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-700">Suburb / Address</Label>
                <Input
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Brisbane, QLD"
                  className="mt-1.5 rounded-xl"
                  data-testid="ai-quote-address"
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs font-semibold text-slate-700">Notes (optional)</Label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Age of unit, issues you've noticed…"
                  className="mt-1.5 rounded-xl min-h-[70px]"
                  data-testid="ai-quote-notes"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white py-6 text-base font-semibold shadow-xl shadow-sky-500/30 btn-lift disabled:opacity-70"
              data-testid="ai-quote-submit"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning your unit…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles size={18} /> Generate My Quote
                </span>
              )}
            </Button>

            <p className="mt-3 text-xs text-slate-500 text-center">
              100% free · no obligation · Queensland-owned
            </p>
          </motion.form>

          {/* Result panel */}
          <div id="quote-result" className="lg:sticky lg:top-28">
            {!quote ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-[2rem] bg-gradient-to-br from-sky-500 to-cyan-600 text-white p-8 sm:p-10 relative overflow-hidden"
                data-testid="ai-quote-intro-panel"
              >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                <div className="relative">
                  <Sparkles size={28} />
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-tight">
                    How it works
                  </h3>
                  <ol className="mt-6 space-y-4">
                    {[
                      "Take or upload a clear photo of your AC unit's front, filter or coils.",
                      "Our AI (trained on thousands of AC units) grades the dirtiness on a 1–10 scale.",
                      "You get a transparent price range, urgency level and recommended services instantly.",
                      "Book in with one tap — or compare before calling us.",
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="w-7 h-7 rounded-full bg-white text-sky-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-sky-50">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-8 pt-6 border-t border-white/20 flex items-center gap-3 text-sm">
                    <CheckCircle2 size={18} /> 100% free, no data sold, no spam.
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-[2rem] bg-white border border-sky-100 p-8 shadow-[0_20px_60px_-20px_rgba(14,165,233,0.25)]"
                data-testid="ai-quote-result"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={14} /> Analysis complete
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${urgencyColor(quote.urgency)}`}
                    data-testid="quote-urgency-badge">
                    <AlertCircle size={12} /> {quote.urgency} urgency
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Your unit looks <span className="text-sky-600">{quote.dirtiness_label}</span>
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-black text-slate-900 tracking-tighter" data-testid="quote-dirtiness-level">
                    {quote.dirtiness_level}
                  </span>
                  <span className="text-slate-500">/ 10 dirtiness</span>
                </div>
                <div className="mt-3">{dirtinessBar(quote.dirtiness_level)}</div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-sky-50 border border-sky-100 p-4" data-testid="quote-price-box">
                    <div className="flex items-center gap-2 text-xs text-slate-600 uppercase tracking-wider">
                      <DollarSign size={14} /> Estimated quote
                    </div>
                    <div className="mt-1 font-display text-2xl font-bold text-slate-900">
                      ${quote.price_min}–${quote.price_max}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">AUD inc. GST</div>
                  </div>
                  <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-4" data-testid="quote-hours-box">
                    <div className="flex items-center gap-2 text-xs text-slate-600 uppercase tracking-wider">
                      <Clock size={14} /> Time on-site
                    </div>
                    <div className="mt-1 font-display text-2xl font-bold text-slate-900">
                      ~{quote.estimated_hours} hrs
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">ready same-day</div>
                  </div>
                </div>

                {quote.summary && (
                  <p className="mt-5 text-sm text-slate-600 leading-relaxed" data-testid="quote-summary">
                    {quote.summary}
                  </p>
                )}

                {quote.recommended_services?.length > 0 && (
                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Recommended services</div>
                    <ul className="mt-2 space-y-2">
                      {quote.recommended_services.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700" data-testid={`quote-service-${i}`}>
                          <CheckCircle2 size={14} className="mt-0.5 text-sky-500" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {quote.observations?.length > 0 && (
                  <div className="mt-5">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">AI observations</div>
                    <ul className="mt-2 space-y-1.5">
                      {quote.observations.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600" data-testid={`quote-observation-${i}`}>
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => (window.location.href = "tel:0490507878")}
                    className="flex-1 rounded-full bg-sky-500 hover:bg-sky-600 text-white py-5 font-semibold shadow-lg shadow-sky-500/30 btn-lift"
                    data-testid="quote-book-call"
                  >
                    Book by phone · 0490 507 878
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.hash = "contact")}
                    className="flex-1 rounded-full border-slate-200 py-5 font-semibold btn-lift"
                    data-testid="quote-contact-form-cta"
                  >
                    Get in touch
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
