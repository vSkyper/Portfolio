import { motion as m } from 'framer-motion';
import { Cards } from './components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isMobile, updateOffset } from 'helpers/helpers';

export default function ProjectsCards() {
  const [offset, setOffset] = useState<number>(0);
  const [dragField, setDragField] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const dragFieldRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const contentRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  const handleImagesLoaded = () => {
    updateOffset(wrapperRef, contentRef, setOffset, setDragField);
  };

  const updateOffsetCallback = useCallback(() => {
    updateOffset(wrapperRef, contentRef, setOffset, setDragField);
  }, []);

  useEffect(() => {
    updateOffsetCallback();

    const mobile = isMobile();
    const fallbackDelay = mobile ? 500 : 1000;

    const fallbackTimer = setTimeout(updateOffsetCallback, fallbackDelay);

    const handleOrientationChange = () => {
      if (contentRef.current) {
        contentRef.current.style.transform = 'translateX(0px) translateZ(0)';
      }
      setTimeout(updateOffsetCallback, 100);
      setTimeout(updateOffsetCallback, 300);
    };

    window.addEventListener('resize', updateOffsetCallback);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', updateOffsetCallback);
      window.removeEventListener('orientationchange', handleOrientationChange);
      clearTimeout(fallbackTimer);
    };
  }, [updateOffsetCallback]);

  return (
    <div
      ref={wrapperRef}
      className='relative z-[1] pt-2 sm:pt-6 lg:pt-10 xl:pt-12'
    >
      <div
        ref={dragFieldRef}
        className='absolute inset-0 pointer-events-none'
        style={{
          left: `-${offset}px`,
          width: `${dragField}px`,
        }}
      />
      <m.div
        ref={contentRef}
        drag={offset > 0 ? 'x' : false}
        dragConstraints={dragFieldRef}
        whileTap={{ cursor: 'grabbing' }}
        className={`flex gap-3 sm:gap-6 outline-none ${
          offset > 0 ? 'cursor-grab' : 'cursor-default'
        }`}
      >
        <Cards onImagesLoaded={handleImagesLoaded} />
      </m.div>
    </div>
  );
}
