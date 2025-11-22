import { useState, useRef, useCallback, useEffect, RefObject } from 'react';
import { updateOffset, isMobile } from 'helpers/helpers';

interface UseCarouselReturn {
  offset: number;
  resetKey: number;
  wrapperRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  resetCarousel: () => void;
  updateOffsetCallback: () => void;
}

export const useCarousel = (
  shouldResetOnOrientationChange: boolean = true
): UseCarouselReturn => {
  const [offset, setOffset] = useState<number>(0);
  const [resetKey, setResetKey] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateOffsetCallback = useCallback(() => {
    updateOffset(wrapperRef, contentRef, setOffset);
  }, []);

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

  useEffect(() => {
    updateOffsetCallback();

    const mobile = isMobile();
    const fallbackDelay = mobile ? 500 : 1000;
    const fallbackTimer = setTimeout(updateOffsetCallback, fallbackDelay);

    const handleOrientationChange = () => {
      if (shouldResetOnOrientationChange) {
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
  }, [updateOffsetCallback, resetCarousel, shouldResetOnOrientationChange]);

  return {
    offset,
    resetKey,
    wrapperRef,
    contentRef,
    resetCarousel,
    updateOffsetCallback,
  };
};
