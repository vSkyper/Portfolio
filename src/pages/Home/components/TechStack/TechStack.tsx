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
    <div className='py-8 sm:py-10'>
      <h3 className='text-center text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-white/80'>
        Technologies I work with
      </h3>
      <div className='flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 px-2'>
        {technologies.map((tech, index) => (
          <m.div
            key={tech.name}
            initial={mobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
            animate={mobile ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col items-center gap-2 group ${
              mobile ? 'opacity-100! transform-none!' : ''
            }`}
          >
            <div className='p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110'>
              <tech.icon
                className='w-6 h-6 sm:w-8 sm:h-8'
                style={{ color: tech.color }}
              />
            </div>
            <span className='text-[10px] sm:text-xs md:text-sm text-white/60 group-hover:text-white transition-colors'>
              {tech.name}
            </span>
          </m.div>
        ))}
      </div>
    </div>
  );
}
