import { useEffect, useRef } from 'react';
import { CustomCursorProps } from './interface';

export default function CustomCursor(props: CustomCursorProps) {
  const { containerRef } = props;

  const customCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = customCursorRef.current;

    if (!container || !cursor || 'ontouchstart' in window) return;

    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;
    let isScrolling = false;
    let scrollTimeout: number;

    const toggleCursor = (show: boolean) => {
      cursor.classList.toggle('animate-custom-cursor', show);
      cursor.classList.toggle('animate-custom-cursor-out', !show);
    };

    const updatePosition = (x: number, y: number) => {
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    const onScroll = () => {
      isScrolling = true;
      toggleCursor(false);
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isScrolling) return;
      const { clientX, clientY } = e;

      if (clientX === lastX && clientY === lastY) return;
      lastX = clientX;
      lastY = clientY;

      if (cursor.classList.contains('animate-custom-cursor-out')) {
        toggleCursor(true);
      }

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updatePosition(lastX, lastY);
          rafId = null;
        });
      }
    };

    const onMouseEnter = (e: MouseEvent) => {
      if (isScrolling) return;
      lastX = e.clientX;
      lastY = e.clientY;
      updatePosition(lastX, lastY);
      toggleCursor(true);
    };

    const onMouseLeave = () => toggleCursor(false);

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll, { capture: true });
      if (rafId) cancelAnimationFrame(rafId);
      window.clearTimeout(scrollTimeout);
    };
  }, [containerRef]);

  return (
    <div
      ref={customCursorRef}
      className='fixed opacity-0 px-8 py-2 pointer-events-none bg-primary text-secondary rounded-[50%] z-10 -rotate-12 -translate-x-1/2 -translate-y-3/4 will-change-[left,top]'
    >
      <div className='rotate-12 text-lg font-cursor'>Scroll</div>
    </div>
  );
}
