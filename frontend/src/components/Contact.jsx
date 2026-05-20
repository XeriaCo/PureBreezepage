import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const inputClass = "mt-2 rounded-xl border-[#DCE7F3] focus:border-[#1F5AA8] focus:ring-2 focus:ring-[#1F5AA8]/10 bg-white font-light text-base placeholder:text-[#A8B5C7] h-11";
const labelClass = "text-[11px] uppercase tracking-[0.22em] text-[#5A6B82] font-medium";

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service_type: "", suburb: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error("Please share at least your name and phone."); return; }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      setForm({ name: "", phone: "", email: "", service_type: "", suburb: "", message: "" });
      navigate("/thank-you", { state: { kind: "callback", reference: data?.id, name: form.name, phone: form.phone } });
    } catch {
      toast.error("Sorry, something went wrong. Please call 0490 507 878.");
    } finally { setLoading(false); }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-frost" data-testid="contact-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight leading-[1.1]">
              Get in <span className="text-[#7BA6D9] font-light-display">touch.</span>
            </h2>
            <p className="mt-5 text-base text-[#5A6B82] leading-[1.7] font-light max-w-md">
              Prefer to speak with us directly? We answer our own phones — always.
            </p>

            <div className="mt-10 space-y-4">
              <a href="tel:0490507878" className="flex items-center gap-4 p-5 rounded-2xl bg-white hairline shadow-card btn-lift" data-testid="contact-phone">
                <div className="w-11 h-11 rounded-full bg-[#F2F7FD] flex items-center justify-center text-[#1F5AA8]">
                  <Phone size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[#8597AE] font-medium">Telephone</div>
                  <div className="font-display text-base text-[#0A2A4E] font-medium mt-1">0490 507 878</div>
                </div>
              </a>

              <a href="mailto:hello@purebreeze.com.au" className="flex items-center gap-4 p-5 rounded-2xl bg-white hairline shadow-card btn-lift" data-testid="contact-email">
                <div className="w-11 h-11 rounded-full bg-[#F2F7FD] flex items-center justify-center text-[#1F5AA8]">
                  <Mail size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[#8597AE] font-medium">Email</div>
                  <div className="font-display text-base text-[#0A2A4E] font-medium mt-1">hello@purebreeze.com.au</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white hairline shadow-card">
                <div className="w-11 h-11 rounded-full bg-[#F2F7FD] flex items-center justify-center text-[#1F5AA8]">
                  <MapPin size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[#8597AE] font-medium">Service area</div>
                  <div className="font-display text-base text-[#0A2A4E] font-medium mt-1">All of Queensland</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 bg-white rounded-2xl p-8 lg:p-10 hairline shadow-luxe-lg"
            data-testid="contact-form"
          >
            <h3 className="font-display text-2xl text-[#0A2A4E] font-medium tracking-tight">Request a callback</h3>
            <p className="text-sm text-[#5A6B82] mt-1.5 font-light">We'll be in touch within one business hour.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label className={labelClass}>Name *</Label>
                <Input required value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} placeholder="Jane Doe" className={inputClass} data-testid="contact-name" />
              </div>
              <div>
                <Label className={labelClass}>Phone *</Label>
                <Input required value={form.phone} onChange={(e)=>setForm(f=>({...f,phone:e.target.value}))} placeholder="0400 000 000" className={inputClass} data-testid="contact-phone-input" />
              </div>
              <div>
                <Label className={labelClass}>Email</Label>
                <Input type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} placeholder="you@email.com" className={inputClass} data-testid="contact-email-input" />
              </div>
              <div>
                <Label className={labelClass}>Suburb</Label>
                <Input value={form.suburb} onChange={(e)=>setForm(f=>({...f,suburb:e.target.value}))} placeholder="Brisbane" className={inputClass} data-testid="contact-suburb" />
              </div>
              <div className="sm:col-span-2">
                <Label className={labelClass}>Service required</Label>
                <Input value={form.service_type} onChange={(e)=>setForm(f=>({...f,service_type:e.target.value}))} placeholder="Split system, ducted, commercial..." className={inputClass} data-testid="contact-service" />
              </div>
              <div className="sm:col-span-2">
                <Label className={labelClass}>Message</Label>
                <Textarea value={form.message} onChange={(e)=>setForm(f=>({...f,message:e.target.value}))} placeholder="Tell us about your system and preferred times..." className={`${inputClass} min-h-[100px] h-auto py-3`} data-testid="contact-message" />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="mt-8 pill pill-navy px-7 py-3.5 border-0 disabled:opacity-60" data-testid="contact-submit">
              {loading ? "Sending…" : (<span className="flex items-center gap-2">Send request <ArrowRight size={14} strokeWidth={1.5} /></span>)}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
