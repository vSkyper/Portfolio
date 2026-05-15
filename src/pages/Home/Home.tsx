import {
  Contact,
  Experience,
  ProjectsCards,
  Hero,
} from './components';
import { Navbar } from 'components';
import { motion as m } from 'framer-motion';
import { isMobile } from 'helpers/helpers';

export default function Home() {
  const mobile = isMobile();

  return (
    <main className='relative w-full overflow-hidden'>
      <Navbar />

      <Hero />

      {/* Experience Section */}
      <section id='about' className='relative w-full'>
        <Experience />
      </section>

      {/* Projects Section */}
      <section
        id='projects'
        className='relative container mx-auto w-11/12 py-6 sm:py-10'
      >
        <div className='mb-4 sm:mb-8 flex flex-col items-start'>
          <m.div
            initial={mobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={mobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ willChange: 'transform, opacity' }}
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
            style={{ willChange: 'transform, opacity' }}
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
        className='relative container mx-auto w-11/12 py-8 sm:py-12'
      >
        <Contact />
      </section>
    </main>
  );
}
