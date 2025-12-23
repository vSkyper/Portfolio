import { Contact, Handwriting, ProjectsCards, TechStack } from './components';
import { Navbar } from 'components';
import { motion as m } from 'framer-motion';
import { containerAnimation, slideInTopAnimation } from 'animations/animations';
import { isMobile } from 'helpers/helpers';

export default function Home() {
  const mobile = isMobile();

  return (
    <main className='relative w-full'>
      <Navbar />

      {/* Full Screen Intro Section (Hello + TechStack) */}
      <section
        id='home'
        className='relative h-screen w-full flex flex-col items-center justify-center overflow-hidden'
      >
        {/* Decorative background glows - Enhanced */}
        <div
          aria-hidden
          className='pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px] opacity-40 mix-blend-screen'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#F55644]/15 blur-[100px] opacity-40 mix-blend-screen'
        />

        {/* Content Wrapper */}
        <div className='container mx-auto w-11/12 flex flex-col items-center justify-center flex-1'>
          <m.div
            variants={containerAnimation}
            initial='hidden'
            animate='show'
            className='relative flex flex-col items-center w-full'
          >
            {/* Intro Badge */}
            <m.div
              variants={slideInTopAnimation}
              className='mb-8 sm:mb-8 mt-12 sm:mt-0 relative z-10'
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
            <div className='relative flex items-center justify-center w-full max-w-3xl -mt-6 sm:-mt-10 md:-mt-14 lg:-mt-24 pointer-events-none select-none'>
              <Handwriting />
            </div>

            <m.div
              variants={slideInTopAnimation}
              className='mt-6 sm:mt-6 text-center max-w-xl relative z-20'
            >
              <p className='text-sm sm:text-base md:text-lg bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/60 mb-8 sm:mb-8 leading-relaxed px-4 sm:px-0 font-medium'>
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

          <div className='mt-16 sm:mt-14 w-full relative z-10'>
            <TechStack />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id='projects'
        className='relative container mx-auto w-11/12 py-6 sm:py-8 md:py-10'
      >
        <div className='mb-4 sm:mb-6 md:mb-8 flex flex-col items-start'>
          <m.div
            initial={mobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={mobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-xl sm:text-2xl font-bold tracking-tight text-white mb-2'
          >
            Featured <span className='text-white/40'>Work</span>
          </m.div>

          <m.div
            initial={mobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={mobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='text-xs sm:text-sm text-white/60 max-w-xl'
          >
            A collection of projects that showcase my passion for building
            digital products. Drag to explore.
          </m.div>
        </div>
        <ProjectsCards />
      </section>

      {/* Contact Section */}
      <section
        id='contact'
        className='relative container mx-auto w-11/12 py-8 sm:py-10 md:py-12'
      >
        <Contact />
      </section>
    </main>
  );
}
