import { Contact, Handwriting, ProjectsCards, TechStack } from './components';
import { Navbar } from 'components';
import { motion as m } from 'framer-motion';
import { containerAnimation, slideInTopAnimation } from 'animations/animations';
import { isMobile } from 'helpers/helpers';

export default function Home() {
  const mobile = isMobile();

  return (
    <main className='relative w-full min-h-full overflow-hidden'>
      <Navbar />
      {/* decorative background glows */}
      <div
        aria-hidden
        className='pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-xl md:blur-3xl will-change-transform'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-[#F55644]/20 blur-xl md:blur-3xl will-change-transform'
      />

      {/* hello */}
      <section
        id='home'
        className='relative container mx-auto w-11/12 pt-24 sm:pt-24 md:pt-32 lg:pt-40 pb-8 sm:pb-10'
      >
        <m.div
          variants={containerAnimation}
          initial='hidden'
          animate='show'
          className='relative flex flex-col items-center'
        >
          <div
            className='absolute -inset-x-4 -top-6 h-px bg-linear-to-r from-transparent via-white/10 to-transparent'
            aria-hidden
          />
          <m.div
            variants={slideInTopAnimation}
            className='mb-2 sm:mb-4 text-xs sm:text-sm md:text-base text-white/60 font-medium tracking-wide uppercase'
          >
            Hi, I'm Mateusz
          </m.div>
          <div className='relative flex items-center justify-center w-full max-w-3xl'>
            <Handwriting />
          </div>

          <m.div
            variants={slideInTopAnimation}
            className='mt-6 sm:mt-8 text-center max-w-2xl'
          >
            <p className='text-base sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0'>
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
              className='px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95'
            >
              View My Work
            </button>
          </m.div>

          <div
            className='absolute -inset-x-4 -bottom-6 h-px bg-linear-to-r from-transparent via-white/10 to-transparent'
            aria-hidden
          />
        </m.div>
      </section>

      <TechStack />

      {/* projects */}
      <section
        id='projects'
        className='relative container mx-auto w-11/12 py-10 sm:py-14 md:py-16'
      >
        <m.div className='mb-8 sm:mb-10 md:mb-12 flex flex-col items-start'>
          <m.h2
            initial={mobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 max-[768px]:opacity-100! max-[768px]:transform-none!'
          >
            Featured <span className='text-white/40'>Work</span>
          </m.h2>
          <m.p
            initial={mobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='text-base sm:text-lg text-white/60 max-w-xl max-[768px]:opacity-100! max-[768px]:transform-none!'
          >
            A collection of projects that showcase my passion for building
            digital products. Drag to explore.
          </m.p>
        </m.div>
        <ProjectsCards />
      </section>

      {/* contact */}
      <section
        id='contact'
        className='relative container mx-auto w-11/12 py-12 sm:py-16 md:py-20'
      >
        <Contact />
      </section>
    </main>
  );
}
