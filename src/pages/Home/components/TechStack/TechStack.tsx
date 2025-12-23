import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiGit,
} from 'react-icons/si';
import { motion as m } from 'framer-motion';
import { isMobile } from 'helpers/helpers';

const technologies = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
];

export default function TechStack() {
  const mobile = isMobile();

  return (
    <div className='py-6 sm:py-8 w-full'>
      <h3 className='text-center text-sm sm:text-base font-semibold mb-6 sm:mb-8 text-white/50 uppercase tracking-widest'>
        Technologies
      </h3>
      <div className='flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 px-4'>
        {technologies.map((tech, index) => (
          <m.div
            key={tech.name}
            initial={mobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={mobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className='flex flex-col items-center gap-3 group cursor-default'
          >
            <div className='relative flex items-center justify-center'>
              <div
                className='absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500'
                style={{ backgroundColor: tech.color }}
              />
              <div className='relative p-3 sm:p-4 rounded-2xl bg-white/5 ring-1 ring-white/5 group-hover:ring-white/20 group-hover:bg-white/10 transition-all duration-300 group-hover:-translate-y-1 ease-out'>
                <tech.icon className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all duration-300 grayscale group-hover:grayscale-0' />
              </div>
            </div>
            <span className='text-[10px] sm:text-xs font-medium text-white/40 group-hover:text-white transition-colors duration-300'>
              {tech.name}
            </span>
          </m.div>
        ))}
      </div>
    </div>
  );
}
