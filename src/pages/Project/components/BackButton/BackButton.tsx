import { motion as m } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <m.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      style={{ willChange: 'transform, opacity' }}
      onClick={() => navigate('/')}
      className="fixed top-6 left-4 sm:top-8 sm:left-8 z-40 flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/90 hover:text-white ring-1 ring-white/15 hover:ring-white/30 transition-all duration-300 hover:scale-105 shadow-lg group"
      aria-label="Go back to home"
    >
      <IoArrowBack className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium tracking-wide">Back</span>
    </m.button>
  );
}
