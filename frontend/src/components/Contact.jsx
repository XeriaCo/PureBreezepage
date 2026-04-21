import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service_type: "", suburb: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please enter at least your name and phone.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thanks! We'll call you within 1 business hour.");
      setForm({ name: "", phone: "", email: "", service_type: "", suburb: "", message: "" });
    } catch {
      toast.error("Sorry, something went wrong. Please call 0490 507 878.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-white" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-4 py-2 mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            <span className="text-xs font-bold tracking-widest uppercase text-sky-700">Contact</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
            Let's get your air <br /><span className="text-sky-500">crystal clean.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600 max-w-md">
            Prefer to chat? Call or email us — we answer our own phones, every time.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href="tel:0490507878"
              className="group flex items-center gap-4 p-5 rounded-3xl bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-100 btn-lift"
              data-testid="contact-phone"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center group-hover:bg-sky-600">
                <Phone size={22} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Phone</div>
                <div className="font-display text-2xl font-bold text-slate-900 tracking-tight">0490 507 878</div>
              </div>
            </a>

            <a
              href="mailto:PureBreeze@gmail.com"
              className="group flex items-center gap-4 p-5 rounded-3xl bg-white border border-sky-100 btn-lift"
              data-testid="contact-email"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white">
                <Mail size={22} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Email</div>
                <div className="font-display text-lg font-semibold text-slate-900 tracking-tight">PureBreeze@gmail.com</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-sky-100">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <MapPin size={22} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Service area</div>
                <div className="font-display text-lg font-semibold text-slate-900 tracking-tight">All of Queensland, Australia</div>
                <div className="text-sm text-slate-500">Brisbane · Gold Coast · Sunshine Coast · Toowoomba</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[2rem] bg-white border border-sky-100 p-7 sm:p-10 shadow-[0_20px_60px_-20px_rgba(14,165,233,0.25)]"
          data-testid="contact-form"
        >
          <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900">Request a callback</h3>
          <p className="text-sm text-slate-500 mt-1">We'll call within 1 business hour.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold text-slate-700">Name *</Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Jane Doe"
                className="mt-1.5 rounded-xl"
                data-testid="contact-name"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-slate-700">Phone *</Label>
              <Input
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="0400 000 000"
                className="mt-1.5 rounded-xl"
                data-testid="contact-phone-input"
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
                data-testid="contact-email-input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-slate-700">Suburb</Label>
              <Input
                value={form.suburb}
                onChange={(e) => setForm((f) => ({ ...f, suburb: e.target.value }))}
                placeholder="Brisbane"
                className="mt-1.5 rounded-xl"
                data-testid="contact-suburb"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs font-semibold text-slate-700">Service needed</Label>
              <Input
                value={form.service_type}
                onChange={(e) => setForm((f) => ({ ...f, service_type: e.target.value }))}
                placeholder="Split system / ducted / commercial…"
                className="mt-1.5 rounded-xl"
                data-testid="contact-service"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs font-semibold text-slate-700">Message</Label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell us about your unit and preferred times…"
                className="mt-1.5 rounded-xl min-h-[90px]"
                data-testid="contact-message"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-sky-500 hover:bg-sky-600 text-white py-6 text-base font-semibold shadow-lg shadow-sky-500/30 btn-lift disabled:opacity-70"
            data-testid="contact-submit"
          >
            {loading ? "Sending…" : (<span className="flex items-center gap-2"><Send size={16} /> Send request</span>)}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
