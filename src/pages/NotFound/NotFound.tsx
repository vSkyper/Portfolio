import { motion as m } from 'framer-motion';
import { Link } from 'react-router';
import { containerAnimation, slideInTopAnimation } from 'animations/animations';

export default function NotFound() {
  return (
    <main className='relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black text-white'>
      <m.div
        variants={containerAnimation}
        initial='hidden'
        animate='show'
        className='relative flex flex-col items-center w-full px-4'
      >
        <m.div variants={slideInTopAnimation} className='mb-6 relative z-10'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md shadow-lg shadow-black/5'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-red-500'></span>
            </span>
            <span className='text-xs font-semibold text-red-400/90 tracking-wide uppercase'>
              Error 404
            </span>
          </div>
        </m.div>

        <m.h1
          variants={slideInTopAnimation}
          className='text-6xl sm:text-8xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/60 mb-4 text-center pb-4 leading-normal sm:leading-normal'
        >
          Page Not Found
        </m.h1>

        <m.p
          variants={slideInTopAnimation}
          className='text-sm sm:text-lg text-white/60 mb-10 max-w-lg text-center leading-relaxed'
        >
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </m.p>

        <m.div variants={slideInTopAnimation}>
          <Link
            to='/'
            className='group relative inline-flex px-8 py-3 text-sm font-bold rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] ring-1 ring-white/20'
          >
            <span className='relative z-10'>Return Home</span>
          </Link>
        </m.div>
      </m.div>

      {/* Decorative background effects */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-red-500/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none -z-10' />
    </main>
  );
}
