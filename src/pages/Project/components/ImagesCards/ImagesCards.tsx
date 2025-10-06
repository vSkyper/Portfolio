import { motion as m } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Cards } from './components';
import { updateOffset, isMobile } from 'helpers/helpers';
import { ImagesCardsProps } from './interface';

export default function ImagesCards(props: ImagesCardsProps) {
  const { images } = props;

  const [offset, setOffset] = useState<number>(0);
  const [resetKey, setResetKey] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [needsResetAfterModal, setNeedsResetAfterModal] =
    useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateOffsetCallback = useCallback(() => {
    updateOffset(wrapperRef, contentRef, setOffset);
  }, []);

  const handleImagesLoaded = useCallback(() => {
    updateOffsetCallback();
  }, [updateOffsetCallback]);

  const resetCarousel = useCallback(() => {
    setOffset(0);
    if (contentRef.current) {
      contentRef.current.style.transform = 'translateX(0px) translateZ(0)';
    }
    setResetKey((prev) => prev + 1);

    [100, 300, 500].forEach((delay) => {
      setTimeout(updateOffsetCallback, delay);
    });
  }, [updateOffsetCallback]);

  // Handle modal state changes
  useEffect(() => {
    const handleModalStateChange = (
      event: CustomEvent<{ isOpen: boolean }>
    ) => {
      const modalIsOpen = event.detail.isOpen;
      setIsModalOpen(modalIsOpen);

      if (!modalIsOpen && needsResetAfterModal) {
        setNeedsResetAfterModal(false);
        resetCarousel();
      }
    };

    window.addEventListener(
      'modalStateChange',
      handleModalStateChange as EventListener
    );
    return () => {
      window.removeEventListener(
        'modalStateChange',
        handleModalStateChange as EventListener
      );
    };
  }, [needsResetAfterModal, resetCarousel]);

  // Handle resize and orientation changes
  useEffect(() => {
    updateOffsetCallback();

    const mobile = isMobile();
    const fallbackTimer = setTimeout(updateOffsetCallback, mobile ? 500 : 1000);

    const handleOrientationChange = () => {
      if (isModalOpen) {
        setNeedsResetAfterModal(true);
      } else {
        resetCarousel();
      }
    };

    window.addEventListener('resize', updateOffsetCallback);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', updateOffsetCallback);
      window.removeEventListener('orientationchange', handleOrientationChange);
      clearTimeout(fallbackTimer);
    };
  }, [updateOffsetCallback, isModalOpen, resetCarousel]);

  return (
    <div
      ref={wrapperRef}
      className='relative z-[1] pt-9 md:pt-16 pb-20 md:pb-24'
    >
      <m.div
        key={resetKey}
        ref={contentRef}
        drag={offset > 0 ? 'x' : false}
        dragConstraints={offset > 0 ? { left: -offset, right: 0 } : undefined}
        initial={{ x: 0 }}
        whileTap={{ cursor: 'grabbing' }}
        className={`flex gap-3 sm:gap-6 outline-none will-change-transform select-none ${
          offset > 0 ? 'cursor-grab' : 'cursor-default'
        }`}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          pointerEvents: 'auto',
        }}
      >
        <Cards images={images} onImagesLoaded={handleImagesLoaded} />
      </m.div>
    </div>
  );
}
