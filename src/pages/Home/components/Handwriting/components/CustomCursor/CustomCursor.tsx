import { useEffect, useRef } from 'react';
import { CustomCursorProps } from './interface';

export default function CustomCursor(props: CustomCursorProps) {
  const { containerRef } = props;

  const customCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const customCursor = customCursorRef.current;

    if (!container || !customCursor) return;

    if ('ontouchstart' in window) return;

    let rafId: number | null = null;
    let nextX = 0;
    let nextY = 0;

    const updatePos = () => {
      if (!customCursor) return;
      customCursor.style.left = `${nextX}px`;
      customCursor.style.top = `${nextY}px`;
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (rafId == null) {
        rafId = requestAnimationFrame(updatePos);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      customCursor.classList.remove('animate-custom-cursor-out');
      customCursor.classList.add('animate-custom-cursor');
      customCursor.style.left = `${clientX}px`;
      customCursor.style.top = `${clientY}px`;
    };

    const handleMouseLeave = () => {
      customCursor.classList.remove('animate-custom-cursor');
      customCursor.classList.add('animate-custom-cursor-out');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return (
    <div
      ref={customCursorRef}
      className='fixed opacity-0 px-8 py-2 pointer-events-none bg-primary text-secondary rounded-[50%] z-10 -rotate-12 -translate-x-1/2 -translate-y-3/4 [will-change:left,top]'
    >
      <div className='rotate-12 text-lg font-cursor'>Scroll</div>
    </div>
  );
}
