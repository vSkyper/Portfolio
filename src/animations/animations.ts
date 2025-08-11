import type { Variants } from 'framer-motion';

const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];
const fastEaseInOut: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

export const slideInLeftAnimation: Variants = {
  hidden: { opacity: 0, x: '-100%' },
  show: {
    opacity: 1,
    x: '0%',
    transition: { duration: 0.7, ease: easeInOut },
  },
};

export const slideInRightAnimation: Variants = {
  hidden: { opacity: 0, x: '100%' },
  show: {
    opacity: 1,
    x: '0%',
    transition: { duration: 0.7, ease: easeInOut },
  },
};

export const slideInTopAnimation: Variants = {
  hidden: { opacity: 0, y: '-100%' },
  show: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.7, ease: easeInOut },
  },
};

// Mobile-optimized version with less movement and faster duration
export const slideInTopAnimationMobile: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: fastEaseInOut },
  },
};

// Fade animation for very smooth mobile experience
export const fadeInAnimation: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease: easeInOut },
  },
};

export const containerAnimation: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
