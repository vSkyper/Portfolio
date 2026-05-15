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
      className="fixed top-6 left-6 sm:top-8 sm:left-8 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 hover:scale-105 hover:ring-white/20 group"
      aria-label="Go back to home"
    >
      <IoArrowBack className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="hidden sm:inline text-sm font-medium">Back</span>
    </m.button>
  );
}
