import { motion as m } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { Cards } from './components';
import { ImagesCardsProps } from './interface';
import { useCarousel } from 'hooks';

export default function ImagesCards({ images }: ImagesCardsProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [needsResetAfterModal, setNeedsResetAfterModal] =
    useState<boolean>(false);

  const {
    offset,
    resetKey,
    wrapperRef,
    contentRef,
    resetCarousel,
    updateOffsetCallback,
  } = useCarousel(false);

  const handleImagesLoaded = useCallback(() => {
    updateOffsetCallback();
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

  // Handle orientation changes manually to support modal logic
  useEffect(() => {
    const handleOrientationChange = () => {
      if (isModalOpen) {
        setNeedsResetAfterModal(true);
      } else {
        resetCarousel();
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [isModalOpen, resetCarousel]);

  return (
    <div ref={wrapperRef} className='relative z-1 pt-9 md:pt-10 pb-20 md:pb-24'>
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
      >
        <Cards images={images} onImagesLoaded={handleImagesLoaded} />
      </m.div>
    </div>
  );
}
