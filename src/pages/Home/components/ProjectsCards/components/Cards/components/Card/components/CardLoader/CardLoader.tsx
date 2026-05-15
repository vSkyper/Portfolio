import { motion as m } from 'framer-motion';

export default function CardLoader() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10"
      aria-hidden="true"
    >
      <div className="relative">
        <m.div
          className="w-12 h-12 rounded-full border-2 border-white/10 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <m.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
        </m.div>
      </div>
    </div>
  );
}
