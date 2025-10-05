import { motion as m } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Cards } from './components';
import { after, updateOffset, isMobile } from 'helpers/helpers';
import { ImagesCardsProps } from './interface';

export default function ImagesCards(props: ImagesCardsProps) {
  const { images } = props;

  const [offset, setOffset] = useState<number>(0);
  const [dragField, setDragField] = useState<number>(0);
  const [imagesLoadedCount, setImagesLoadedCount] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragFieldRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const imagesLoaded = after(images.length, () => {
    updateOffset(wrapperRef, contentRef, setOffset, setDragField);
  });

  const onImageLoad = useCallback(() => {
    imagesLoaded();
    setImagesLoadedCount((prev) => prev + 1);
  }, [imagesLoaded]);

  const updateOffsetCallback = useCallback(() => {
    updateOffset(wrapperRef, contentRef, setOffset, setDragField);
  }, []);

  useEffect(() => {
    updateOffsetCallback();

    const mobile = isMobile();
    const fallbackDelay = mobile ? 500 : 1000;

    const fallbackTimer = setTimeout(updateOffsetCallback, fallbackDelay);

    window.addEventListener('resize', updateOffsetCallback);

    return () => {
      window.removeEventListener('resize', updateOffsetCallback);
      clearTimeout(fallbackTimer);
    };
  }, [updateOffsetCallback]);

  useEffect(() => {
    if (imagesLoadedCount > 0) {
      updateOffsetCallback();
    }
  }, [imagesLoadedCount, updateOffsetCallback]);

  return (
    <div ref={wrapperRef} className='relative z-[1] pt-9 md:pt-16'>
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
        className={`flex gap-3 sm:gap-6 outline-none will-change-transform ${
          offset > 0 ? 'cursor-grab' : 'cursor-default'
        }`}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
        }}
      >
        <Cards images={images} imagesLoaded={onImageLoad} />
      </m.div>
    </div>
  );
}
