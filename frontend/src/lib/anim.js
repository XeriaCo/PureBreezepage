// Shared animation grammar — one easing curve, one stagger rhythm, used everywhere
export const EASE = [0.16, 1, 0.3, 1]; // luxe ease-out (expo-like)

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const fadeUpSoft = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const stagger = (delayChildren = 0.1, staggerChildren = 0.1) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

export const viewportOnce = { once: true, amount: 0.25 };
