import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarDays, Clock, CheckCircle2, Sun, CloudSun, Sunset } from "lucide-react";
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
  morning:  { icon: <Sun size={18} />,      label: "Morning",   time: "7am – 11am" },
  midday:   { icon: <CloudSun size={18} />, label: "Midday",    time: "11am – 2pm" },
  afternoon:{ icon: <Sunset size={18} />,   label: "Afternoon", time: "2pm – 5pm" },
};

function toISODate(d) {
  if (!d) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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

  // fetch availability when date changes
  useEffect(() => {
    const iso = toISODate(date);
    if (!iso) { setAvailability(null); return; }
    let cancelled = false;
    (async () => {
      setLoadingAvail(true);
      try {
        const { data } = await axios.get(`${API}/bookings/availability`, { params: { date: iso } });
        if (!cancelled) setAvailability(data);
      } catch {
        if (!cancelled) setAvailability(null);
      } finally {
        if (!cancelled) setLoadingAvail(false);
      }
    })();
    return () => { cancelled = true; };
  }, [date]);

  const submit = async (e) => {
    e.preventDefault();
    if (!date) return toast.error("Please pick a date.");
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
      toast.success("Booking received! We'll confirm by phone shortly.");
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
    <section id="book" className="relative py-24 lg:py-32 bg-sky-50" data-testid="booking-section">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-100 px-4 py-2 mb-5 shadow-sm">
            <CalendarDays size={14} className="text-sky-600" />
            <span className="text-xs font-bold tracking-widest uppercase text-sky-700">Online Booking</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
            Pick a day. Pick a slot. <br /><span className="text-sky-500">We'll do the rest.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            Same-day availability across Queensland. Free cancellation up to 2 hours before.
          </p>
        </motion.div>

        {confirmation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 max-w-2xl mx-auto rounded-[2rem] bg-white border border-sky-100 p-10 text-center shadow-[0_20px_60px_-20px_rgba(14,165,233,0.25)]"
            data-testid="booking-confirmation"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-display text-3xl font-bold tracking-tight text-slate-900">
              Booking received!
            </h3>
            <p className="mt-3 text-slate-600">
              Confirmation ID: <span className="font-mono text-slate-900">{confirmation.id.slice(0, 8)}</span>
            </p>
            <div className="mt-6 inline-flex flex-col gap-2 p-5 rounded-2xl bg-sky-50 border border-sky-100 text-left">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CalendarDays size={15} className="text-sky-600" />
                <span className="font-semibold">{format(new Date(confirmation.booking_date), "EEEE, d MMMM yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Clock size={15} className="text-sky-600" />
                <span className="font-semibold">{SLOT_META[confirmation.time_slot]?.label} · {SLOT_META[confirmation.time_slot]?.time}</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              We'll call <span className="font-semibold text-slate-900">{confirmation.phone}</span> within 1 business hour to confirm.
            </p>
            <Button
              onClick={reset}
              className="mt-6 rounded-full bg-sky-500 hover:bg-sky-600 text-white px-8"
              data-testid="booking-new"
            >
              Make another booking
            </Button>
          </motion.div>
        ) : (
          <form
            onSubmit={submit}
            className="mt-12 grid lg:grid-cols-12 gap-6 items-start"
            data-testid="booking-form"
          >
            {/* Calendar */}
            <div className="lg:col-span-5 rounded-[2rem] bg-white border border-sky-100 p-6 shadow-[0_12px_40px_-20px_rgba(14,165,233,0.2)]">
              <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Choose date</div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => { setDate(d); setSlot(null); }}
                disabled={{ before: new Date(new Date().setHours(0,0,0,0)) }}
                className="rounded-xl"
                data-testid="booking-calendar"
              />
            </div>

            {/* Slots + details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-[2rem] bg-white border border-sky-100 p-6 sm:p-8 shadow-[0_12px_40px_-20px_rgba(14,165,233,0.2)]">
                <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">
                  {date ? `Slots for ${format(date, "EEE, d MMM")}` : "Pick a date first"}
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
                        className={`relative p-4 rounded-2xl border text-left transition-all ${
                          selected
                            ? "border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                            : disabled
                              ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                              : "border-sky-100 bg-white text-slate-800 hover:border-sky-300 btn-lift"
                        }`}
                        data-testid={`booking-slot-${key}`}
                        aria-pressed={selected}
                      >
                        <div className="flex items-center gap-2">
                          {meta.icon}
                          <span className="font-display text-base font-semibold">{meta.label}</span>
                        </div>
                        <div className={`text-xs mt-1 ${selected ? "text-sky-50" : "text-slate-500"}`}>
                          {meta.time}
                        </div>
                        {date && slotInfo && (
                          <div className={`text-[10px] uppercase tracking-widest mt-2 font-bold ${
                            selected ? "text-white" : remaining > 0 ? "text-emerald-600" : "text-red-500"
                          }`}>
                            {remaining > 0 ? `${remaining} spots left` : "Fully booked"}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {!date && (
                  <p className="mt-4 text-xs text-slate-500">Select a date on the calendar to see available slots.</p>
                )}
              </div>

              <div className="rounded-[2rem] bg-white border border-sky-100 p-6 sm:p-8 shadow-[0_12px_40px_-20px_rgba(14,165,233,0.2)]">
                <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">Your details</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Full name *</Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Jane Doe"
                      className="mt-1.5 rounded-xl"
                      data-testid="booking-name"
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
                      data-testid="booking-phone"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs font-semibold text-slate-700">Address *</Label>
                    <Input
                      required
                      value={form.address}
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                      placeholder="12 Example St, Brisbane QLD"
                      className="mt-1.5 rounded-xl"
                      data-testid="booking-address"
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
                      data-testid="booking-email"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Service</Label>
                    <Select
                      value={form.service_type}
                      onValueChange={(v) => setForm((f) => ({ ...f, service_type: v }))}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl" data-testid="booking-service">
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
                    <Label className="text-xs font-semibold text-slate-700">Notes (optional)</Label>
                    <Textarea
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      placeholder="Access instructions, number of units, etc."
                      className="mt-1.5 rounded-xl min-h-[70px]"
                      data-testid="booking-notes"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white py-6 text-base font-semibold shadow-xl shadow-sky-500/30 btn-lift disabled:opacity-70"
                  data-testid="booking-submit"
                >
                  {submitting ? "Booking…" : "Confirm booking"}
                </Button>
                <p className="mt-3 text-xs text-slate-500 text-center">
                  No card required · we'll confirm by phone within 1 business hour.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
