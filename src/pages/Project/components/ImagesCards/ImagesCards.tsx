import { motion as m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Cards } from './components';
import { after, updateOffset } from 'helpers/helpers';
import { ImagesCardsProps } from './interface';

export default function ImagesCards(props: ImagesCardsProps) {
  const { images } = props;

  const [offset, setOffset] = useState<number>(0);
  const [dragField, setDragField] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragFieldRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const imagesLoaded = after(images.length, () => {
    updateOffset(wrapperRef, contentRef, setOffset, setDragField);
  });

  useEffect(() => {
    updateOffset(wrapperRef, contentRef, setOffset, setDragField);

    const updateOffsetListener = () =>
      updateOffset(wrapperRef, contentRef, setOffset, setDragField);

    window.addEventListener('resize', updateOffsetListener);
    return () => {
      window.removeEventListener('resize', updateOffsetListener);
    };
  }, []);

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
        drag={'x'}
        dragConstraints={dragFieldRef}
        whileTap={{ cursor: 'grabbing' }}
        className='flex gap-3 sm:gap-6 cursor-grab outline-none'
      >
        <Cards images={images} imagesLoaded={imagesLoaded} />
      </m.div>
    </div>
  );
}
