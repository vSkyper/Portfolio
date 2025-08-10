import type { Variants } from 'framer-motion';

const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];

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

export const containerAnimation: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
