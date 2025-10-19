import { motion as m, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-[9999] flex items-center justify-center p-4'
          onClick={handleClose}
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
                onClick={handleClose}
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

              {/* Image or Video */}
              <div className='rounded-xl overflow-hidden bg-black'>
                {isVideo ? (
                  <iframe
                    key={src}
                    src={getGoogleDriveEmbedUrl(src)}
                    className='w-[90vw] sm:w-[70vw] aspect-video block'
                    allow='autoplay; fullscreen'
                    allowFullScreen
                    loading='eager'
                  />
                ) : (
                  <img
                    src={src}
                    alt={alt}
                    className='max-w-[90vw] max-h-[90vh] w-auto h-auto block'
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
