import { motion as m } from 'framer-motion';
import { Cards } from './components';
import { useEffect, useRef, useState } from 'react';
import { updateOffset } from 'helpers/helpers';

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
    <div ref={wrapperRef} className='relative pt-2 sm:pt-6 lg:pt-10 xl:pt-12'>
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
        <Cards />
      </m.div>
    </div>
  );
}
