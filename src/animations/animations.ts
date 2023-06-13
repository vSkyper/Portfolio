export const slideInLeftAnimation = {
  hidden: { opacity: 0, x: '-100%' },
  show: {
    opacity: 1,
    x: '0%',
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};

export const slideInRightAnimation = {
  hidden: { opacity: 0, x: '100%' },
  show: {
    opacity: 1,
    x: '0%',
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};

export const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
