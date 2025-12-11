import { Svg } from './components';

export default function Handwriting() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Svg />
      <div
        aria-hidden
        className='absolute bottom-0 left-1/2 h-px w-[90%] -translate-x-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent'
      />
    </div>
  );
}
