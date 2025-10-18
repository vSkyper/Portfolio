import { motion as m } from 'framer-motion';
import { Cards } from './components';
import { useEffect, useRef, useState, useCallback } from 'react';
import { isMobile, updateOffset } from 'helpers/helpers';

export default function ProjectsCards() {
  const [offset, setOffset] = useState<number>(0);
  const [resetKey, setResetKey] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Memoize callback to prevent unnecessary re-renders
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

    // Multiple updates to ensure layout is correct
    [100, 300, 500].forEach((delay) => {
      setTimeout(updateOffsetCallback, delay);
    });
  }, [updateOffsetCallback]);

  useEffect(() => {
    updateOffsetCallback();

    const mobile = isMobile();
    const fallbackDelay = mobile ? 500 : 1000;
    const fallbackTimer = setTimeout(updateOffsetCallback, fallbackDelay);

    const handleOrientationChange = () => {
      resetCarousel();
    };

    window.addEventListener('resize', updateOffsetCallback);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', updateOffsetCallback);
      window.removeEventListener('orientationchange', handleOrientationChange);
      clearTimeout(fallbackTimer);
    };
  }, [updateOffsetCallback, resetCarousel]);

  return (
    <div
      ref={wrapperRef}
      className='relative z-[1] pt-2 sm:pt-6 lg:pt-10 xl:pt-12'
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
        <Cards onImagesLoaded={handleImagesLoaded} />
      </m.div>
    </div>
  );
}
