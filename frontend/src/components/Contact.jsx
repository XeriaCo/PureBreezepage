import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
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
      toast.error("Please share at least your name and phone.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thank you. We will be in touch within one business hour.");
      setForm({ name: "", phone: "", email: "", service_type: "", suburb: "", message: "" });
    } catch {
      toast.error("Sorry, something went wrong. Please call 0490 507 878.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 lg:py-40 bg-glacier" data-testid="contact-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

          {/* LEFT — Address card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#1F5AA8]" />
              <span className="eyebrow">Get in touch</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#0A2A4E] leading-[1.0] tracking-tight">
              Reserve
              <br />
              <span className="serif-italic text-[#1F5AA8]">your service.</span>
            </h2>
            <p className="mt-8 text-lg text-[#5A6B82] leading-[1.75] font-light max-w-md">
              Prefer to speak with us directly? We answer our own phones —
              always.
            </p>

            <div className="mt-12 space-y-1">
              <a
                href="tel:0490507878"
                className="group flex items-center justify-between py-8 border-t border-[#E5ECF4]"
                data-testid="contact-phone"
              >
                <div>
                  <div className="eyebrow mb-2">Telephone</div>
                  <div className="font-display text-2xl text-[#0A2A4E] font-light tracking-tight">0490 507 878</div>
                </div>
                <Phone size={18} strokeWidth={1.4} className="text-[#7BA6D9] group-hover:text-[#1F5AA8] transition-colors" />
              </a>

              <a
                href="mailto:PureBreeze@gmail.com"
                className="group flex items-center justify-between py-8 border-t border-[#E5ECF4]"
                data-testid="contact-email"
              >
                <div>
                  <div className="eyebrow mb-2">Email</div>
                  <div className="font-display text-2xl text-[#0A2A4E] font-light tracking-tight">PureBreeze@gmail.com</div>
                </div>
                <Mail size={18} strokeWidth={1.4} className="text-[#7BA6D9] group-hover:text-[#1F5AA8] transition-colors" />
              </a>

              <div className="flex items-center justify-between py-8 border-t border-b border-[#E5ECF4]">
                <div>
                  <div className="eyebrow mb-2">Service area</div>
                  <div className="font-display text-2xl text-[#0A2A4E] font-light tracking-tight">All of Queensland</div>
                  <div className="text-xs text-[#8597AE] mt-2 uppercase tracking-[0.18em]">Brisbane · Gold Coast · Sunshine Coast · Toowoomba</div>
                </div>
                <MapPin size={18} strokeWidth={1.4} className="text-[#7BA6D9]" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 bg-white p-10 lg:p-14 shadow-luxe-lg"
            data-testid="contact-form"
          >
            <h3 className="font-display text-3xl text-[#0A2A4E] font-light tracking-tight">Request a callback</h3>
            <p className="text-sm text-[#5A6B82] mt-2 font-light">We'll be in touch within one business hour.</p>

            <div className="divider-hair my-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-[11px] uppercase tracking-[0.22em] text-[#5A6B82] font-medium">Name</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Doe"
                  className="mt-3 rounded-none border-0 border-b border-[#DCE7F3] focus:border-[#1F5AA8] focus:ring-0 px-0 bg-transparent font-light text-base placeholder:text-[#A8B5C7]"
                  data-testid="contact-name"
                />
              </div>
              <div>
                <Label className="text-[11px] uppercase tracking-[0.22em] text-[#5A6B82] font-medium">Phone</Label>
                <Input
                  required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="0400 000 000"
                  className="mt-3 rounded-none border-0 border-b border-[#DCE7F3] focus:border-[#1F5AA8] focus:ring-0 px-0 bg-transparent font-light text-base placeholder:text-[#A8B5C7]"
                  data-testid="contact-phone-input"
                />
              </div>
              <div>
                <Label className="text-[11px] uppercase tracking-[0.22em] text-[#5A6B82] font-medium">Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@email.com"
                  className="mt-3 rounded-none border-0 border-b border-[#DCE7F3] focus:border-[#1F5AA8] focus:ring-0 px-0 bg-transparent font-light text-base placeholder:text-[#A8B5C7]"
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <Label className="text-[11px] uppercase tracking-[0.22em] text-[#5A6B82] font-medium">Suburb</Label>
                <Input
                  value={form.suburb}
                  onChange={(e) => setForm((f) => ({ ...f, suburb: e.target.value }))}
                  placeholder="Brisbane"
                  className="mt-3 rounded-none border-0 border-b border-[#DCE7F3] focus:border-[#1F5AA8] focus:ring-0 px-0 bg-transparent font-light text-base placeholder:text-[#A8B5C7]"
                  data-testid="contact-suburb"
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-[11px] uppercase tracking-[0.22em] text-[#5A6B82] font-medium">Service required</Label>
                <Input
                  value={form.service_type}
                  onChange={(e) => setForm((f) => ({ ...f, service_type: e.target.value }))}
                  placeholder="Split system, ducted, commercial..."
                  className="mt-3 rounded-none border-0 border-b border-[#DCE7F3] focus:border-[#1F5AA8] focus:ring-0 px-0 bg-transparent font-light text-base placeholder:text-[#A8B5C7]"
                  data-testid="contact-service"
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-[11px] uppercase tracking-[0.22em] text-[#5A6B82] font-medium">Message</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your system and preferred times..."
                  className="mt-3 rounded-none border-0 border-b border-[#DCE7F3] focus:border-[#1F5AA8] focus:ring-0 px-0 bg-transparent font-light text-base min-h-[100px] placeholder:text-[#A8B5C7]"
                  data-testid="contact-message"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-12 rounded-none bg-[#0A2A4E] hover:bg-[#061A33] text-white px-10 py-7 text-[12px] uppercase tracking-[0.24em] font-medium btn-lift border-0 disabled:opacity-60"
              data-testid="contact-submit"
            >
              {loading ? "Sending…" : (<span className="flex items-center gap-3">Send Request <ArrowRight size={14} strokeWidth={1.5} /></span>)}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
