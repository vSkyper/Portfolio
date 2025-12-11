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
          className='fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-8'
          onClick={handleClose}
        >
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 bg-black/80'
          />

          {/* Close button */}
          <m.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            onClick={handleClose}
            className='absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-white/10 text-white/70 hover:text-white backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 hover:scale-110 hover:rotate-90'
            aria-label='Close modal'
          >
            <IoClose className='w-6 h-6 sm:w-8 sm:h-8' />
          </m.button>

          {/* Modal Content */}
          <m.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className='relative z-10 max-w-full max-h-full flex flex-col items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_100px_-20px_rgba(0,0,0,0.7)]'>
              {/* Image or Video */}
              <div className='relative'>
                {isVideo ? (
                  <div
                    className='relative aspect-video bg-black'
                    style={{
                      width: 'min(95vw, calc(70dvh * 1.7778))',
                    }}
                  >
                    <iframe
                      key={src}
                      src={getGoogleDriveEmbedUrl(src)}
                      className='absolute inset-0 w-full h-full'
                      allow='autoplay; fullscreen'
                      allowFullScreen
                      loading='eager'
                    />
                  </div>
                ) : (
                  <img
                    src={src}
                    alt={alt}
                    className='max-w-[95vw] max-h-[85vh] w-auto h-auto block object-contain bg-black'
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
