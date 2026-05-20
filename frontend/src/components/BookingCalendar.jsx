import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarDays, Clock, CheckCircle2, Sun, CloudSun, Sunset, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICES = [
  { value: "split_system", label: "Split System" },
  { value: "ducted", label: "Ducted System" },
  { value: "commercial", label: "Commercial" },
  { value: "window", label: "Window / Portable" },
];

const SLOT_META = {
  morning:  { icon: <Sun size={16} strokeWidth={1.4} />,      label: "Morning",   time: "7am – 11am" },
  midday:   { icon: <CloudSun size={16} strokeWidth={1.4} />, label: "Midday",    time: "11am – 2pm" },
  afternoon:{ icon: <Sunset size={16} strokeWidth={1.4} />,   label: "Afternoon", time: "2pm – 5pm" },
};

function toISODate(d) {
  if (!d) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const inputClass = "mt-2 rounded-none border-0 border-b border-[#DCE7F3] focus:border-[#1F5AA8] focus:ring-0 px-0 bg-transparent font-light text-base placeholder:text-[#A8B5C7]";
const labelClass = "text-[11px] uppercase tracking-[0.22em] text-[#5A6B82] font-medium";

export default function BookingCalendar() {
  const [date, setDate] = useState(undefined);
  const [slot, setSlot] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [loadingAvail, setLoadingAvail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", service_type: "split_system", notes: "",
  });

  useEffect(() => {
    const iso = toISODate(date);
    if (!iso) { setAvailability(null); return; }
    let cancelled = false;
    let timer;
    const fetchOnce = async (silent) => {
      if (!silent) setLoadingAvail(true);
      try {
        const { data } = await axios.get(`${API}/bookings/availability`, { params: { date: iso } });
        if (!cancelled) setAvailability(data);
      } catch {
        if (!cancelled && !silent) setAvailability(null);
      } finally {
        if (!cancelled && !silent) setLoadingAvail(false);
      }
    };
    fetchOnce(false);
    timer = setInterval(() => fetchOnce(true), 20000);
    return () => { cancelled = true; clearInterval(timer); };
  }, [date]);

  const submit = async (e) => {
    e.preventDefault();
    if (!date) return toast.error("Please choose a date.");
    if (!slot) return toast.error("Please choose a time slot.");
    if (!form.name || !form.phone || !form.address) {
      return toast.error("Name, phone and address are required.");
    }
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API}/bookings`, {
        ...form,
        email: form.email || null,
        notes: form.notes || null,
        booking_date: toISODate(date),
        time_slot: slot,
      });
      setConfirmation(data);
      toast.success("Booking received. We will confirm by phone shortly.");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Couldn't book right now. Please call 0490 507 878.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setConfirmation(null);
    setDate(undefined);
    setSlot(null);
    setAvailability(null);
    setForm({ name: "", phone: "", email: "", address: "", service_type: "split_system", notes: "" });
  };

  return (
    <section id="book" className="relative py-32 lg:py-40 bg-white" data-testid="booking-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-12 h-px bg-[#1F5AA8]" />
            <span className="eyebrow">Live Availability</span>
            <span className="w-12 h-px bg-[#1F5AA8]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#0A2A4E] leading-[1.0] tracking-tight">
            Reserve a date.
            <br />
            <span className="serif-italic text-[#1F5AA8]">We do the rest.</span>
          </h2>
          <p className="mt-8 text-lg text-[#5A6B82] leading-[1.75] font-light">
            Same-day availability across Queensland. Cancellation up to two hours before.
          </p>
        </motion.div>

        {confirmation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white shadow-luxe-lg p-12 text-center hairline"
            data-testid="booking-confirmation"
          >
            <div className="mx-auto w-14 h-14 bg-[#0A2A4E] text-white flex items-center justify-center mb-8">
              <CheckCircle2 size={22} strokeWidth={1.4} />
            </div>
            <div className="eyebrow mb-4">Confirmed</div>
            <h3 className="font-display text-4xl text-[#0A2A4E] font-light tracking-tight">
              Your booking is received.
            </h3>
            <p className="mt-4 text-sm text-[#8597AE] font-light tracking-wide">
              Reference · <span className="font-mono text-[#0A2A4E]">{confirmation.id.slice(0, 8).toUpperCase()}</span>
            </p>
            <div className="mt-10 inline-flex flex-col gap-3 p-8 bg-[#F2F7FD] text-left min-w-[280px]">
              <div className="flex items-center gap-3 text-sm text-[#0A2A4E] font-light">
                <CalendarDays size={14} strokeWidth={1.4} className="text-[#1F5AA8]" />
                <span>{format(new Date(confirmation.booking_date), "EEEE, d MMMM yyyy")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#0A2A4E] font-light">
                <Clock size={14} strokeWidth={1.4} className="text-[#1F5AA8]" />
                <span>{SLOT_META[confirmation.time_slot]?.label} · {SLOT_META[confirmation.time_slot]?.time}</span>
              </div>
            </div>
            <p className="mt-8 text-sm text-[#5A6B82] font-light">
              We will call <span className="text-[#0A2A4E]">{confirmation.phone}</span> within one business hour.
            </p>
            <Button
              onClick={reset}
              className="mt-8 rounded-none bg-[#0A2A4E] hover:bg-[#061A33] text-white px-10 py-6 text-[11px] uppercase tracking-[0.24em] font-medium"
              data-testid="booking-new"
            >
              Make another reservation
            </Button>
          </motion.div>
        ) : (
          <form
            onSubmit={submit}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            data-testid="booking-form"
          >
            {/* Calendar card */}
            <div className="lg:col-span-5 bg-white p-8 lg:p-10 shadow-luxe hairline">
              <div className="eyebrow mb-6">Select Date</div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => { setDate(d); setSlot(null); }}
                disabled={{ before: new Date(new Date().setHours(0,0,0,0)) }}
                className="rounded-none"
                data-testid="booking-calendar"
              />
            </div>

            {/* Slots + details */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white p-8 lg:p-10 shadow-luxe hairline">
                <div className="eyebrow mb-6">
                  {date ? `Available · ${format(date, "EEE, d MMM")}` : "Pick a date first"}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.keys(SLOT_META).map((key) => {
                    const meta = SLOT_META[key];
                    const slotInfo = availability?.slots?.[key];
                    const remaining = slotInfo?.remaining ?? 0;
                    const disabled = !date || loadingAvail || remaining <= 0;
                    const selected = slot === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSlot(key)}
                        className={`relative p-5 border text-left transition-all ${
                          selected
                            ? "border-[#0A2A4E] bg-[#0A2A4E] text-white"
                            : disabled
                              ? "border-[#E5ECF4] bg-[#F8FAFC] text-[#A8B5C7] cursor-not-allowed"
                              : "border-[#E5ECF4] bg-white text-[#0A2A4E] hover:border-[#1F5AA8] btn-lift"
                        }`}
                        data-testid={`booking-slot-${key}`}
                        aria-pressed={selected}
                      >
                        <div className={`flex items-center gap-2 ${selected ? "text-[#7BA6D9]" : "text-[#1F5AA8]"}`}>
                          {meta.icon}
                          <span className="text-[10px] uppercase tracking-[0.24em] font-medium">{meta.label}</span>
                        </div>
                        <div className={`font-display text-lg font-light mt-3 ${selected ? "text-white" : "text-[#0A2A4E]"}`}>
                          {meta.time}
                        </div>
                        {date && slotInfo && (
                          <div className={`text-[10px] uppercase tracking-[0.22em] mt-3 font-medium ${
                            selected ? "text-white/70" : remaining > 0 ? "text-[#1F5AA8]" : "text-[#A8B5C7]"
                          }`}>
                            {remaining > 0 ? `${remaining} reservations remaining` : "Fully reserved"}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {!date && (
                  <p className="mt-5 text-xs text-[#8597AE] font-light">Select a date to view available slots.</p>
                )}
              </div>

              <div className="bg-white p-8 lg:p-10 shadow-luxe hairline">
                <div className="eyebrow mb-8">Your Details</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label className={labelClass}>Full name</Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Jane Doe"
                      className={inputClass}
                      data-testid="booking-name"
                    />
                  </div>
                  <div>
                    <Label className={labelClass}>Phone</Label>
                    <Input
                      required
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="0400 000 000"
                      className={inputClass}
                      data-testid="booking-phone"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className={labelClass}>Address</Label>
                    <Input
                      required
                      value={form.address}
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                      placeholder="12 Example Street, Brisbane QLD"
                      className={inputClass}
                      data-testid="booking-address"
                    />
                  </div>
                  <div>
                    <Label className={labelClass}>Email</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@email.com"
                      className={inputClass}
                      data-testid="booking-email"
                    />
                  </div>
                  <div>
                    <Label className={labelClass}>Service</Label>
                    <Select
                      value={form.service_type}
                      onValueChange={(v) => setForm((f) => ({ ...f, service_type: v }))}
                    >
                      <SelectTrigger className={inputClass} data-testid="booking-service">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label className={labelClass}>Notes <span className="opacity-50">(optional)</span></Label>
                    <Textarea
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      placeholder="Access instructions, number of units, etc."
                      className={`${inputClass} min-h-[80px]`}
                      data-testid="booking-notes"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-10 w-full rounded-none bg-[#0A2A4E] hover:bg-[#061A33] text-white py-7 text-[12px] uppercase tracking-[0.24em] font-medium btn-lift disabled:opacity-60"
                  data-testid="booking-submit"
                >
                  {submitting ? "Booking…" : (<span className="flex items-center justify-center gap-3">Confirm reservation <ArrowRight size={14} strokeWidth={1.5} /></span>)}
                </Button>
                <p className="mt-4 text-xs text-[#8597AE] text-center font-light">
                  No card required · confirmed by phone within one business hour
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
