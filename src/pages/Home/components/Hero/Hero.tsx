import { motion as m } from 'framer-motion';
import { containerAnimation, slideInTopAnimation } from 'animations/animations';
import { Handwriting, TechStack } from '../';

export default function Hero() {
  return (
    <section
      id='home'
      className='relative w-full flex flex-col items-center pt-28 sm:pt-32 pb-16'
    >
      <div className='container mx-auto w-11/12 flex flex-col items-center'>
        <m.div
          variants={containerAnimation}
          initial='hidden'
          animate='show'
          className='relative flex flex-col items-center w-full'
        >
          {/* Intro Badge */}
          <m.div
            variants={slideInTopAnimation}
            style={{ willChange: 'transform, opacity' }}
            className='mb-8 relative z-10'
          >
            <div className='inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/5'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
              </span>
              <span className='text-[10px] sm:text-xs font-semibold text-white/90 tracking-wide uppercase'>
                Hi, I'm Mateusz
              </span>
            </div>
          </m.div>

          {/* Handwriting SVG */}
          <div className='relative flex items-center justify-center w-full max-w-3xl sm:-mb-16 -mt-6 sm:-mt-24 pointer-events-none select-none'>
            <Handwriting />
          </div>

          <m.div
            variants={slideInTopAnimation}
            style={{ willChange: 'transform, opacity' }}
            className='mt-6 sm:mt-6 text-center max-w-xl relative z-20'
          >
            <p className='text-sm sm:text-lg bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/60 mb-8 sm:mb-8 leading-relaxed px-4 sm:px-0 font-medium'>
              Frontend Developer & Backend Enthusiast crafting digital
              experiences with code and creativity.
            </p>

            <button
              onClick={() => {
                const element = document.getElementById('projects');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.scrollY - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  });
                }
              }}
              className='group relative px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-bold rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] ring-1 ring-white/20'
            >
              <span className='relative z-10'>View My Work</span>
            </button>
          </m.div>
        </m.div>

        {/* Decorative separator line */}
        <div
          aria-hidden
          className='mt-12 sm:mt-14 h-px w-[80%] max-w-2xl mx-auto bg-linear-to-r from-transparent via-white/10 to-transparent'
        />

        <div className='mt-10 sm:mt-12 w-full relative z-10'>
          <TechStack />
        </div>
      </div>
    </section>
  );
}
