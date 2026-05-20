import React from "react";
import { motion } from "framer-motion";

const PHOTOS = [
  {
    src: "https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/0808184a9835460596de01d427a6829f_IMG_2554.jpeg",
    alt: "PureBreeze technician servicing a split system",
    caption: "Brisbane · Residence",
  },
  {
    src: "https://images.unsplash.com/photo-1631545806609-aaeed8b86259?auto=format&fit=crop&w=1200&q=85",
    alt: "Modern wall-mounted air conditioner",
    caption: "Noosa · Coastal home",
  },
  {
    src: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=1200&q=85",
    alt: "Air conditioning unit detail",
    caption: "Surfers Paradise · Apartment",
  },
  {
    src: "https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/380d01f5ca9b4284a3422cf2e914a624_IMG_2601.jpeg",
    alt: "Detailed coil cleaning",
    caption: "Yatala · Family home",
  },
  {
    src: "https://images.unsplash.com/photo-1581275288578-bf3d3b1f3f7f?auto=format&fit=crop&w=1200&q=85",
    alt: "AC in serene white interior",
    caption: "New Farm · Townhouse",
  },
  {
    src: "https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/077b3fc60c854fa98080d58f4f442ac5_IMG_2604.jpeg",
    alt: "Strip-down meticulous cleaning",
    caption: "Toowoomba · Heritage",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-32 lg:py-40 bg-glacier" data-testid="gallery-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#1F5AA8]" />
              <span className="eyebrow">The Atelier</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#0A2A4E] leading-[1.0] tracking-tight">
              Restorations
              <br />
              <span className="serif-italic text-[#1F5AA8]">from the field.</span>
            </h2>
          </motion.div>
          <p className="lg:col-span-4 text-base text-[#5A6B82] leading-[1.75] font-light">
            A small selection of recent work across Queensland — each
            documented before and after, each delivered with the same
            quiet attention to detail.
          </p>
        </div>

        {/* Editorial asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 group relative overflow-hidden aspect-[4/3] shadow-luxe"
          >
            <img src={PHOTOS[0].src} alt={PHOTOS[0].alt} className="absolute inset-0 w-full h-full object-cover img-luxe transition-transform duration-[1400ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A4E]/55 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="eyebrow text-white/75 mb-2">№ 01</div>
              <div className="font-display text-xl font-light">{PHOTOS[0].caption}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="md:col-span-5 group relative overflow-hidden aspect-[4/3] shadow-luxe"
          >
            <img src={PHOTOS[1].src} alt={PHOTOS[1].alt} className="absolute inset-0 w-full h-full object-cover img-luxe transition-transform duration-[1400ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A4E]/55 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="eyebrow text-white/75 mb-2">№ 02</div>
              <div className="font-display text-xl font-light">{PHOTOS[1].caption}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="md:col-span-4 group relative overflow-hidden aspect-square shadow-luxe"
          >
            <img src={PHOTOS[2].src} alt={PHOTOS[2].alt} className="absolute inset-0 w-full h-full object-cover img-luxe transition-transform duration-[1400ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A4E]/55 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="eyebrow text-white/75 mb-2">№ 03</div>
              <div className="font-display text-xl font-light">{PHOTOS[2].caption}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-4 group relative overflow-hidden aspect-square shadow-luxe"
          >
            <img src={PHOTOS[3].src} alt={PHOTOS[3].alt} className="absolute inset-0 w-full h-full object-cover img-luxe transition-transform duration-[1400ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A4E]/55 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="eyebrow text-white/75 mb-2">№ 04</div>
              <div className="font-display text-xl font-light">{PHOTOS[3].caption}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-4 group relative overflow-hidden aspect-square shadow-luxe"
          >
            <img src={PHOTOS[4].src} alt={PHOTOS[4].alt} className="absolute inset-0 w-full h-full object-cover img-luxe transition-transform duration-[1400ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A4E]/55 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="eyebrow text-white/75 mb-2">№ 05</div>
              <div className="font-display text-xl font-light">{PHOTOS[4].caption}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
