// Spring Physics Animation Presets for Tactile Kids Living UI

export const springTactile = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 26,
};

export const springBouncy = {
  type: 'spring' as const,
  stiffness: 450,
  damping: 18,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: springTactile },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

export const popIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: springBouncy },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const buttonTap = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.95 },
  transition: springTactile,
};

export const cardInteractive = {
  whileHover: { y: -3, scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: springTactile,
};
