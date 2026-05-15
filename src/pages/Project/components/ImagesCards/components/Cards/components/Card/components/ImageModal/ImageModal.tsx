import { motion as m, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { isMobile } from 'helpers/helpers';
import { createPortal } from 'react-dom';
import { ModalControls, VideoPlayer } from './components';
import type { ImageModalProps } from './interface';

export default function ImageModal({
  isOpen,
  onClose,
  src,
  alt,
  isVideo,
}: ImageModalProps) {
  const mobile = isMobile();

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

    // Lock scroll on both body and html to ensure it works across browsers/devices
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    window.dispatchEvent(
      new CustomEvent('modalStateChange', { detail: { isOpen: true } }),
    );

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);

      // Restore scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      clearSelection();
      window.dispatchEvent(
        new CustomEvent('modalStateChange', { detail: { isOpen: false } }),
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
          className={`fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-8 ${
            isVideo && mobile ? 'landscape:p-0' : ''
          }`}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 bg-black/80 touch-none'
          />

          <ModalControls
            onClose={handleClose}
            isVideo={isVideo}
            mobile={mobile}
          />

          {/* Modal Content */}
          <m.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className='relative z-10 max-w-full max-h-full flex flex-col items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_100px_-20px_rgba(0,0,0,0.7)] ${
                isVideo && mobile
                  ? 'landscape:rounded-none landscape:ring-0'
                  : ''
              }`}
            >
              {/* Image or Video */}
              <div className='relative'>
                {isVideo ? (
                  <VideoPlayer src={src} mobile={mobile} />
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
    document.body,
  );
}
