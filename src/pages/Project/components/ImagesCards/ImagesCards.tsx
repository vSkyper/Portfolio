import { motion as m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Cards } from './components';
import { after, updateOffset } from 'helpers/helpers';
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

  // Enhanced image loaded callback to track progress
  const onImageLoad = () => {
    imagesLoaded();
    setImagesLoadedCount((prev) => prev + 1);
  };

  useEffect(() => {
    // Initial calculation
    updateOffset(wrapperRef, contentRef, setOffset, setDragField);

    // Fallback: Recalculate after a delay to ensure all images are rendered
    const fallbackTimer = setTimeout(() => {
      updateOffset(wrapperRef, contentRef, setOffset, setDragField);
    }, 1000);

    const updateOffsetListener = () =>
      updateOffset(wrapperRef, contentRef, setOffset, setDragField);

    window.addEventListener('resize', updateOffsetListener);

    return () => {
      window.removeEventListener('resize', updateOffsetListener);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Recalculate when images are loaded
  useEffect(() => {
    if (imagesLoadedCount > 0) {
      updateOffset(wrapperRef, contentRef, setOffset, setDragField);
    }
  }, [imagesLoadedCount]);

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
        drag={offset > 0 ? 'x' : false} // Only enable drag if there's content to scroll
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
