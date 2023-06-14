import { motion as m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Cards } from './components';

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
    const updateOffset = () => {
      if (wrapperRef.current && contentRef.current) {
        const { width } = wrapperRef.current.getBoundingClientRect();

        const offSetWidth = contentRef.current.scrollWidth;
        const newOffset = offSetWidth - width;

        setTimeout(() => {
          setOffset(newOffset);
          setDragField(offSetWidth);
        }, 500);
      }
    };

    updateOffset();

    window.addEventListener('resize', updateOffset);
    return () => {
      window.removeEventListener('resize', updateOffset);
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
        className='flex gap-2 sm:gap-6 cursor-grab'
      >
        <Cards images={images} />
      </m.div>
    </div>
  );
}
