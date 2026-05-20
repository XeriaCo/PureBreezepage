import React from "react";
import { motion } from "framer-motion";

export default function BeforeAfter() {
  return (
    <section id="gallery" className="relative py-24 lg:py-32 bg-white" data-testid="before-after-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight">
            Real results. <span className="text-[#7BA6D9] font-light-display">You can see and feel.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-luxe"
          >
            <img
              src="https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/380d01f5ca9b4284a3422cf2e914a624_IMG_2601.jpeg"
              alt="Air conditioner before service — visible mould and dust build-up"
              className="absolute inset-0 w-full h-full object-cover img-luxe"
              loading="lazy"
            />
            <div className="absolute bottom-5 left-5 bg-white text-[#0A2A4E] text-xs font-medium px-5 py-2 rounded-full shadow-card">
              Before
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-luxe"
          >
            <img
              src="https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/077b3fc60c854fa98080d58f4f442ac5_IMG_2604.jpeg"
              alt="Air conditioner after PureBreeze service — pristine condition"
              className="absolute inset-0 w-full h-full object-cover img-luxe"
              loading="lazy"
            />
            <div className="absolute bottom-5 left-5 bg-[#1F5AA8] text-white text-xs font-medium px-5 py-2 rounded-full shadow-card">
              After
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
