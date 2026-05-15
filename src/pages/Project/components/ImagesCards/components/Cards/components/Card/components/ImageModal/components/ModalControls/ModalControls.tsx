import { motion as m } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import type { ModalControlsProps } from './interface';

export default function ModalControls({
  onClose,
  isVideo,
  mobile,
}: ModalControlsProps) {
  return (
    <m.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: 0.1 }}
      onClick={onClose}
      className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-white/10 text-white/70 hover:text-white backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 hover:scale-110 hover:rotate-90 ${
        isVideo && mobile ? 'landscape:hidden' : ''
      }`}
      aria-label='Close modal'
    >
      <IoClose className='w-6 h-6 sm:w-8 sm:h-8' />
    </m.button>
  );
}
