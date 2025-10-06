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

  const wrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const dragFieldRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const contentRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

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

    const handleOrientationChange = () => {
      // Reset position and recalculate after orientation change
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
        className={`flex gap-3 sm:gap-6 outline-none ${
          offset > 0 ? 'cursor-grab' : 'cursor-default'
        }`}
      >
        <Cards images={images} imagesLoaded={onImageLoad} />
      </m.div>
    </div>
  );
}
