'use client';

import useElementOnScreen from 'hooks/useElementOnScreen';

export default function Projects() {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  return (
    <div className='w-full h-full pt-3 sm:pt-9'>
      <div
        ref={containerRef}
        className={`text-2xl sm:text-3xl  ${
          isVisible && 'animate-change-font-family'
        }`}
      >
        Projects
      </div>
    </div>
  );
}
