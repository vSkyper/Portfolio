import { motion as m, AnimatePresence } from 'framer-motion';
import { useEffect, useCallback } from 'react';
import { isMobile } from 'helpers/helpers';
import { createPortal } from 'react-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ModalControls, VideoPlayer } from './components';
import type { ImageModalProps } from './interface';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const clearSelection = () => {
  window.getSelection()?.removeAllRanges();
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
  document.body.focus();
};

export default function ImageModal({
  isOpen,
  onClose,
  src,
  alt,
  isVideo,
  onNext,
  onPrev,
}: ImageModalProps) {
  const mobile = isMobile();

  const handleClose = useCallback(() => {
    clearSelection();
    onClose();

    // Trigger synthetic mousemove to refresh Framer Motion drag detection
    setTimeout(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
      clearSelection();
    }, 0);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    clearSelection();
    document.addEventListener('keydown', handleKeyDown);

    // Lock scroll on both body and html to ensure it works across browsers/devices
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    window.dispatchEvent(
      new CustomEvent('modalStateChange', { detail: { isOpen: true } }),
    );

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Restore scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      clearSelection();
      window.dispatchEvent(
        new CustomEvent('modalStateChange', { detail: { isOpen: false } }),
      );
    };
  }, [isOpen, onNext, onPrev, handleClose]);

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
  }, [isOpen, handleClose]);

  return createPortal(
    <AnimatePresence mode="wait">
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
            animate={{
              opacity: 1,
              backdropFilter: mobile ? 'none' : 'blur(16px)',
            }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 touch-none ${
              mobile ? 'bg-black/95' : 'bg-black/80'
            }`}
          />

          <ModalControls
            onClose={handleClose}
            isVideo={isVideo}
            mobile={mobile}
          />

          {/* Navigation Arrows */}
          {onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className={`absolute left-2 sm:left-8 ${
                mobile ? 'bottom-8 translate-y-0' : 'top-1/2 -translate-y-1/2'
              } sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 p-3 sm:p-4 rounded-full aspect-square flex items-center justify-center bg-black/60 hover:bg-black/80 text-white backdrop-blur-md ring-1 ring-white/20 transition-all duration-300 z-9999 pointer-events-auto ${
                isVideo && mobile ? 'landscape:hidden' : ''
              } ${mobile ? 'landscape:p-2.5! landscape:left-3!' : ''}`}
            >
              <IoChevronBack className={`w-6 h-6 sm:w-8 sm:h-8 ${mobile ? 'landscape:w-5! landscape:h-5!' : ''}`} />
            </button>
          )}
          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className={`absolute right-2 sm:right-8 ${
                mobile ? 'bottom-8 translate-y-0' : 'top-1/2 -translate-y-1/2'
              } sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 p-3 sm:p-4 rounded-full aspect-square flex items-center justify-center bg-black/60 hover:bg-black/80 text-white backdrop-blur-md ring-1 ring-white/20 transition-all duration-300 z-9999 pointer-events-auto ${
                isVideo && mobile ? 'landscape:hidden' : ''
              } ${mobile ? 'landscape:p-2.5! landscape:right-3!' : ''}`}
            >
              <IoChevronForward className={`w-6 h-6 sm:w-8 sm:h-8 ${mobile ? 'landscape:w-5! landscape:h-5!' : ''}`} />
            </button>
          )}

          {/* Modal Content */}
          <m.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 max-w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative ring-1 ring-white/10 rounded-xl sm:rounded-2xl overflow-hidden ${
                mobile
                  ? 'bg-transparent'
                  : 'bg-black/40 backdrop-blur-xl shadow-[0_0_100px_-20px_rgba(0,0,0,0.7)]'
              } ${
                isVideo && mobile
                  ? 'landscape:rounded-none landscape:ring-0'
                  : ''
              }`}
            >
              {/* Image or Video */}
              <div className="relative">
                {isVideo ? (
                  <VideoPlayer key={src} src={src} mobile={mobile} />
                ) : (
                  <TransformWrapper
                    minScale={1}
                    maxScale={4}
                    centerOnInit
                    wheel={{ step: 0.1 }}
                  >
                    <TransformComponent wrapperClass="!max-w-[95vw] !max-h-[85vh] flex items-center justify-center">
                      <img
                        src={src}
                        alt={alt}
                        className="max-w-[95vw] max-h-[85vh] w-auto h-auto block object-contain bg-black"
                      />
                    </TransformComponent>
                  </TransformWrapper>
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
