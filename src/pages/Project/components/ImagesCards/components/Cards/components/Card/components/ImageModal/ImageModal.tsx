import { motion as m, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  isVideo: boolean;
}

const getGoogleDriveEmbedUrl = (url: string): string => {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return url;
};

export default function ImageModal(props: ImageModalProps) {
  const { isOpen, onClose, src, alt, isVideo } = props;

  const clearSelection = () => {
    window.getSelection()?.removeAllRanges();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    document.body.focus();
  };

  const handleClose = () => {
    clearSelection();
    onClose();

    // Trigger synthetic mousemove to refresh Framer Motion drag detection
    setTimeout(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
      clearSelection();
    }, 0);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    clearSelection();
    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(
      new CustomEvent('modalStateChange', { detail: { isOpen: true } })
    );

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
      clearSelection();
      window.dispatchEvent(
        new CustomEvent('modalStateChange', { detail: { isOpen: false } })
      );
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePopState = () => handleClose();

    window.history.pushState({ modalOpen: true }, '');
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence mode='wait'>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, pointerEvents: 'auto' }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-8'
          onClick={handleClose}
        >
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 bg-black/90'
          />

          {/* Modal Content */}
          <m.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='relative z-10 max-w-full max-h-full flex flex-col items-center'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <m.button
              onClick={handleClose}
              className='absolute top-2 right-2 lg:-top-12 lg:-right-12 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 lg:bg-white/10 lg:hover:bg-white/20 ring-1 ring-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:rotate-90 backdrop-blur-md'
              aria-label='Close modal'
            >
              <IoClose className='w-5 h-5' />
            </m.button>

            <div className='relative bg-[#1a1a1a] ring-1 ring-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50'>
              {/* Image or Video */}
              <div className='relative'>
                {isVideo ? (
                  <iframe
                    key={src}
                    src={getGoogleDriveEmbedUrl(src)}
                    className='w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] aspect-video block bg-black'
                    allow='autoplay; fullscreen'
                    allowFullScreen
                    loading='eager'
                  />
                ) : (
                  <img
                    src={src}
                    alt={alt}
                    className='max-w-[90vw] max-h-[85vh] w-auto h-auto block object-contain bg-black'
                  />
                )}
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
