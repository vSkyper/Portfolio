import { useRef } from 'react';
import { motion as m, useScroll, useTransform } from 'framer-motion';
import { experience } from 'constants/constants';
import { isMobile } from 'helpers/helpers';

export default function Experience() {
  const mobile = isMobile();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <m.div
      ref={containerRef}
      style={{ opacity }}
      className='relative w-full py-10 sm:py-20'
    >
      <div className='flex flex-col items-center mb-10 sm:mb-16'>
        <h2 className='text-xl sm:text-2xl font-bold text-white mb-2'>
          Experience <span className='text-white/40'>& Education</span>
        </h2>
        <p className='text-xs sm:text-sm text-white/60 max-w-xl text-center px-4'>
          My journey in the world of technology and development.
        </p>
      </div>

      <div className='relative container mx-auto w-11/12 max-w-4xl'>
        {/* Vertical Line */}
        <div className='absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent -translate-x-1/2' />

        <div className='flex flex-col gap-8 sm:gap-24'>
          {experience.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col sm:flex-row gap-8 sm:gap-0 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className='sm:w-1/2 pl-16 sm:pl-0'>
                  <m.div
                    initial={{ opacity: 0, x: mobile ? 0 : isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`relative p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors duration-300 ${
                      isEven ? 'sm:mr-12' : 'sm:ml-12'
                    }`}
                  >
                    <span className='absolute -top-3 left-4 px-3 py-1 text-[10px] font-mono font-medium text-white/60 bg-black border border-white/10 rounded-full'>
                      {item.period}
                    </span>
                    <h3 className='text-base sm:text-lg font-bold text-white mb-1'>
                      {item.role}
                    </h3>
                    <h4 className='text-xs sm:text-sm text-primary mb-3'>
                      {item.company}
                    </h4>
                    <p className='text-xs sm:text-sm text-white/60 leading-relaxed'>
                      {item.description}
                    </p>
                  </m.div>
                </div>

                {/* Center Point */}
                <div className='absolute left-8 sm:left-1/2 top-0 sm:top-6 -translate-x-1/2 flex items-center justify-center'>
                  <div className='w-4 h-4 rounded-full bg-black border-2 border-primary z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)]' />
                </div>

                {/* Empty Side for layout balance */}
                <div className='hidden sm:block sm:w-1/2' />
              </div>
            );
          })}
        </div>
      </div>
    </m.div>
  );
}
