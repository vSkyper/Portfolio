import { motion as m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Cards } from './components';
import { updateOffset } from 'helpers/helpers';

interface Props {
  images: string[];
}

export default function ImagesCards({ images }: Props) {
  const [offset, setOffset] = useState<number>(0);
  const [dragField, setDragField] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragFieldRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    <div ref={wrapperRef} className='relative pt-9 md:pt-16 mx-2 sm:mx-6'>
      <div
        ref={dragFieldRef}
        className='absolute inset-0 pointer-events-none'
        style={{
          left: `-${offset}px`,
          width: `${dragField}px`,
        }}
      ></div>
      <m.div
        ref={contentRef}
        drag={'x'}
        dragConstraints={dragFieldRef}
        whileTap={{ cursor: 'grabbing' }}
        className='flex gap-2 sm:gap-6 cursor-grab outline-none'
      >
        <Cards images={images} />
      </m.div>
    </div>
  );
}
