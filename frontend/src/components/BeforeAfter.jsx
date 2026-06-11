import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { fadeUp, viewportOnce, EASE } from "@/lib/anim";

const BEFORE_IMG = "https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/380d01f5ca9b4284a3422cf2e914a624_IMG_2601.jpeg";
const AFTER_IMG  = "https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/077b3fc60c854fa98080d58f4f442ac5_IMG_2604.jpeg";

function CompareSlider() {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);
  const interactedRef = useRef(false);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });

  // Gentle hint sweep on first view, so visitors discover the handle
  useEffect(() => {
    if (!inView || interactedRef.current) return;
    const controls = animate(50, 66, {
      duration: 1.1,
      ease: "easeInOut",
      delay: 0.5,
      onUpdate: (v) => { if (!interactedRef.current) setPos(v); },
      onComplete: () => {
        if (interactedRef.current) return;
        animate(66, 50, {
          duration: 0.9,
          ease: "easeInOut",
          onUpdate: (v) => { if (!interactedRef.current) setPos(v); },
        });
      },
    });
    return () => controls.stop();
  }, [inView]);

  const updateFromEvent = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, x)));
  };

  const onPointerDown = (e) => {
    interactedRef.current = true;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromEvent(e);
  };
  const onPointerMove = (e) => { if (draggingRef.current) updateFromEvent(e); };
  const onPointerUp = () => { draggingRef.current = false; };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl shadow-luxe select-none cursor-ew-resize touch-pan-y"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      data-testid="before-after-slider"
    >
      {/* AFTER — full image underneath */}
      <img
        src={AFTER_IMG}
        alt="Air conditioner after PureBreeze service — pristine condition"
        className="absolute inset-0 w-full h-full object-cover img-luxe"
        loading="lazy"
        draggable={false}
      />
      {/* BEFORE — clipped on top */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={BEFORE_IMG}
          alt="Air conditioner before service — visible mould and dust build-up"
          className="absolute inset-0 w-full h-full object-cover img-luxe"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Divider + handle */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-luxe flex items-center justify-center text-[#0A2A4E]">
          <ChevronsLeftRight size={18} strokeWidth={1.6} />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-5 left-5 bg-white/95 text-[#0A2A4E] text-xs font-medium px-5 py-2 rounded-full shadow-card pointer-events-none">
        Before
      </div>
      <div className="absolute bottom-5 right-5 bg-[#1F5AA8] text-white text-xs font-medium px-5 py-2 rounded-full shadow-card pointer-events-none">
        After
      </div>
    </div>
  );
}

const PROOF = [
  { stat: "75 min", label: "Average turnaround" },
  { stat: "99.9%",  label: "Microbial reduction" },
  { stat: "0",      label: "Mess left behind" },
];

export default function BeforeAfter() {
  return (
    <section id="gallery" className="relative py-24 lg:py-36 bg-white" data-testid="before-after-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-4"
          >
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="w-8 h-px bg-[#7BA6D9]" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#7BA6D9] font-medium">Real results</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight leading-[1.1]">
              Seeing is <span className="text-[#7BA6D9] font-light-display">believing.</span>
            </h2>
            <p className="mt-5 text-base text-[#5A6B82] leading-[1.7] font-light max-w-md">
              The same unit, the same day — photographed before and after a PureBreeze
              deep clean. Drag the handle to see exactly what was living inside.
            </p>

            <div className="mt-10 grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-5">
              {PROOF.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
                  className="lg:flex lg:items-baseline lg:gap-3"
                >
                  <div className="font-display text-2xl lg:text-3xl text-[#0A2A4E] font-medium tracking-tight">{p.stat}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#8597AE] font-light mt-1 lg:mt-0">{p.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-8"
          >
            <CompareSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
