import { motion as m } from 'framer-motion';
import { Cards } from './components';
import { useCallback } from 'react';
import { useCarousel } from 'hooks';

export default function ProjectsCards() {
  const { offset, resetKey, wrapperRef, contentRef, updateOffsetCallback } =
    useCarousel();

  const handleImagesLoaded = useCallback(() => {
    updateOffsetCallback();
  }, [updateOffsetCallback]);

  return (
    <div ref={wrapperRef} className='relative z-1 pt-2 sm:pt-3'>
      <m.div
        key={resetKey}
        ref={contentRef}
        drag={offset > 0 ? 'x' : false}
        dragConstraints={offset > 0 ? { left: -offset, right: 0 } : undefined}
        initial={{ x: 0 }}
        whileTap={{ cursor: 'grabbing' }}
        className={`flex gap-3 sm:gap-4 outline-none will-change-transform select-none ${
          offset > 0 ? 'cursor-grab' : 'cursor-default'
        }`}
      >
        <Cards onImagesLoaded={handleImagesLoaded} />
      </m.div>
    </div>
  );
}
