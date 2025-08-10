import { useRef } from 'react';
import { CustomCursor, Svg } from './components';

export default function Handwriting() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className='w-full h-full flex items-center justify-center'
    >
      <CustomCursor containerRef={containerRef} />
      <Svg />
      <div
        aria-hidden
        className='absolute bottom-0 left-1/2 h-px w-[90%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent'
      />
    </div>
  );
}
