import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Sparkles } from "lucide-react";

const PAIRS = [
  {
    id: "p0",
    label: "Split System · Brisbane",
    before: "https://images.pexels.com/photos/7031717/pexels-photo-7031717.jpeg",
    after: "https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/0808184a9835460596de01d427a6829f_IMG_2554.jpeg",
  },
  {
    id: "p1",
    label: "Ducted Return · Brisbane",
    before: "https://static.prod-images.emergentagent.com/jobs/b709f5ab-53d0-4ea5-b4b8-9d180465e97f/images/0d662876af8c568d48d6c53e9a756f60340763c543224f5eae53618964224d.png",
    after: "https://static.prod-images.emergentagent.com/jobs/b709f5ab-53d0-4ea5-b4b8-9d180465e97f/images/92a2813178e78b5d984a568c8656e0b699106225dacea72c8bca9f4819eb04eb.png",
  },
  {
    id: "p2",
    label: "Split System · Gold Coast",
    before: "https://images.pexels.com/photos/7031717/pexels-photo-7031717.jpeg",
    after: "https://static.prod-images.emergentagent.com/jobs/b709f5ab-53d0-4ea5-b4b8-9d180465e97f/images/92a2813178e78b5d984a568c8656e0b699106225dacea72c8bca9f4819eb04eb.png",
  },
  {
    id: "p3",
    label: "Office AC · Sunshine Coast",
    before: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg",
    after: "https://images.pexels.com/photos/5824517/pexels-photo-5824517.jpeg",
  },
  {
    id: "p4",
    label: "Wall Unit · Toowoomba",
    before: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg",
    after: "https://static.prod-images.emergentagent.com/jobs/b709f5ab-53d0-4ea5-b4b8-9d180465e97f/images/92a2813178e78b5d984a568c8656e0b699106225dacea72c8bca9f4819eb04eb.png",
  },
  {
    id: "p5",
    label: "Holiday Rental · Noosa",
    before: "https://images.pexels.com/photos/7031717/pexels-photo-7031717.jpeg",
    after: "https://images.pexels.com/photos/5824517/pexels-photo-5824517.jpeg",
  },
  {
    id: "p6",
    label: "Split System Filter · Yatala",
    before: "https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/26227b8665724128a113d07e6005d540_IMG_2603.jpeg",
    after: "https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/b2c554b5006b47c093a38ee6879e6f3b_IMG_2594.jpeg",
  },
];

function ComparisonSlider({ before, after, label, testId }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(3, Math.min(97, x)));
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const stopDrag = () => { dragging.current = false; };

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-3xl border border-sky-100 shadow-[0_20px_60px_-20px_rgba(14,165,233,0.25)] select-none aspect-[4/3] bg-slate-100"
      data-testid={testId}
      onPointerDown={(e) => { dragging.current = true; setFromClientX(e.clientX); }}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerLeave={stopDrag}
      onPointerCancel={stopDrag}
    >
      {/* AFTER (full) */}
      <img src={after} alt="After clean" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      {/* BEFORE (clipped from left) */}
      <img
        src={before}
        alt="Before clean"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold tracking-widest uppercase shadow-lg">
        Before
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-sky-500 text-white text-xs font-bold tracking-widest uppercase shadow-lg">
        After
      </div>
      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-slate-900 text-xs font-semibold">
        {label}
      </div>

      {/* divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.4)] cursor-ew-resize"
        style={{ left: `calc(${pos}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-sky-500">
          <ArrowLeftRight size={18} className="text-sky-600" />
        </div>
      </div>

      {/* range input for accessibility / touch */}
      <input
        type="range"
        min="3" max="97" step="1" value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label={`Compare before and after for ${label}`}
        data-testid={`${testId}-range`}
      />
    </div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState(PAIRS[0].id);
  const current = PAIRS.find((p) => p.id === active) || PAIRS[0];

  return (
    <section id="gallery" className="relative py-24 lg:py-32 bg-white" data-testid="gallery-section">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 -left-40 w-[460px] h-[460px] bg-sky-100/70 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-4 py-2 mb-5">
            <Sparkles size={14} className="text-sky-600" />
            <span className="text-xs font-bold tracking-widest uppercase text-sky-700">Before / After</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
            Drag the slider. <br /><span className="text-sky-500">See the transformation.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600 max-w-xl">
            Real PureBreeze jobs across Queensland. No filters, no stock photos — just the PureBreeze difference.
          </p>
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-8"
          >
            <ComparisonSlider
              before={current.before}
              after={current.after}
              label={current.label}
              testId={`gallery-slider-${current.id}`}
            />
            <p className="mt-3 text-xs text-slate-500 text-center">
              Tip: drag the centre handle left/right to reveal the clean.
            </p>
          </motion.div>

          <div className="lg:col-span-4 space-y-3">
            {PAIRS.map((p) => {
              const selected = p.id === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p.id)}
                  className={`group w-full flex items-center gap-4 p-3 rounded-2xl border text-left transition-all ${
                    selected
                      ? "border-sky-400 bg-sky-50 shadow-md"
                      : "border-sky-100 bg-white hover:border-sky-200"
                  }`}
                  data-testid={`gallery-thumb-${p.id}`}
                  aria-pressed={selected}
                >
                  <div className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-sky-100">
                    <img src={p.before} alt="" className="absolute inset-0 w-1/2 h-full object-cover" />
                    <img src={p.after} alt="" className="absolute inset-0 left-1/2 w-1/2 h-full object-cover" />
                    <div className="absolute inset-y-0 left-1/2 w-px bg-white" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-slate-900">{p.label}</div>
                    <div className={`text-xs mt-0.5 ${selected ? "text-sky-700" : "text-slate-500"}`}>
                      {selected ? "Now viewing" : "Tap to compare"}
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 text-white">
              <div className="font-display text-2xl font-bold tracking-tight">Your AC could be next.</div>
              <a
                href="#book"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-white text-sky-700 hover:bg-sky-50 px-5 py-2.5 text-sm font-bold btn-lift"
                data-testid="gallery-cta-quote"
              >
                Book now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
