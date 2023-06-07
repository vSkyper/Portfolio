'use client';

import { Magra } from 'next/font/google';
import { useEffect, useRef } from 'react';
import { Svg } from './components';

const magra = Magra({
  subsets: ['latin'],
  weight: '400',
});

export default function Handwriting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const customCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const customCursor = customCursorRef.current;

    if (!container || !customCursor) return;

    customCursor.style.opacity = '1';

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      customCursor.style.left = `${clientX}px`;
      customCursor.style.top = `${clientY}px`;
    };

    const handleMouseEnter = () => {
      customCursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      customCursor.style.opacity = '0';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='w-full h-full flex items-center justify-center'
    >
      <div
        ref={customCursorRef}
        className='fixed opacity-0 px-8 py-2 -rotate-12 -translate-x-[50%] -translate-y-[75%] transition-opacity pointer-events-none bg-primary text-secondary rounded-[50%]'
      >
        <div className={`rotate-12 text-lg ${magra.className}`}>Scroll</div>
      </div>
      <Svg />
    </div>
  );
}
