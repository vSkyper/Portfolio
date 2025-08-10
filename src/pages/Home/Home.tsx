import { Contact, Handwriting, ProjectsCards } from './components';
import { motion as m } from 'framer-motion';
import { containerAnimation, slideInTopAnimation } from 'animations/animations';

export default function Home() {
  return (
    <main className='relative w-full min-h-full overflow-hidden'>
      {/* decorative background glows */}
      <div
        aria-hidden
        className='pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-[#F55644]/20 blur-3xl'
      />

      {/* hello */}
      <section className='relative container mx-auto w-11/12 pt-10 sm:pt-12 md:pt-16 lg:pt-20 pb-4'>
        <m.div
          variants={containerAnimation}
          initial='hidden'
          animate='show'
          className='relative'
        >
          <div
            className='absolute -inset-x-4 -top-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent'
            aria-hidden
          />
          <m.div
            variants={slideInTopAnimation}
            className='mb-2 text-xs sm:text-sm text-white/60'
          >
            Hi, I'm Mateusz
          </m.div>
          <div className='relative flex items-center justify-center'>
            <Handwriting />
          </div>
          <div
            className='absolute -inset-x-4 -bottom-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent'
            aria-hidden
          />
        </m.div>
      </section>

      {/* projects */}
      <section className='relative container mx-auto w-11/12 py-10 sm:py-14 md:py-16'>
        <div className='mb-4 sm:mb-6 md:mb-8'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight'>
            Featured projects
          </h2>
          <p className='mt-1 text-sm sm:text-base text-white/60'>
            Drag to explore
          </p>
        </div>
        <ProjectsCards />
      </section>

      {/* contact */}
      <section className='relative container mx-auto w-11/12 py-12 sm:py-16 md:py-20'>
        <Contact />
      </section>
    </main>
  );
}
