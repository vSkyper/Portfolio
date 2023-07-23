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
    </div>
  );
}
