import { IoPlay } from 'react-icons/io5';

export default function VideoIndicators() {
  return (
    <>
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg z-10">
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
        </span>
        <span className="text-[10px] sm:text-xs font-medium text-white/90 tracking-wide uppercase">
          Video
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center ring-1 ring-white/20 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-black/50">
            <IoPlay className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1 drop-shadow-lg" />
          </div>
        </div>
      </div>
    </>
  );
}
