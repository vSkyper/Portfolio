import { motion as m, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function ImageModal(props: ImageModalProps) {
  const { isOpen, onClose, imageSrc, imageAlt } = props;

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[20] flex items-center justify-center p-4'
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' />

          {/* Modal Content */}
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='relative z-10 flex items-center justify-center'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative bg-white/[0.05] ring-1 ring-white/20 rounded-2xl p-2 backdrop-blur-md'>
              {/* Close button */}
              <button
                onClick={onClose}
                className='absolute -top-2 -right-2 z-10 w-8 h-8 bg-white/10 hover:bg-white/20 ring-1 ring-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200'
                aria-label='Close modal'
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </button>

              {/* Image */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className='rounded-xl max-w-[90vw] max-h-[90vh] w-auto h-auto block'
              />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
