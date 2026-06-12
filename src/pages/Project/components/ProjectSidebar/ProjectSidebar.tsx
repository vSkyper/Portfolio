import { motion as m } from 'framer-motion';
import { IoLink } from 'react-icons/io5';
import type { IProjectDetailsLinks } from 'interfaces/interfaces';
import Links from '../Links';

export default function ProjectSidebar({ links }: IProjectDetailsLinks) {
  if (links.length === 0) return null;

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      style={{ willChange: 'transform, opacity' }}
      className='sticky top-24 p-5 sm:p-6 rounded-3xl bg-white/5 border border-white/5 shadow-2xl space-y-4 sm:space-y-6'
    >
      <div className='space-y-1 sm:space-y-2'>
        <h3 className='text-sm sm:text-base font-semibold text-white flex items-center gap-2'>
          <IoLink className='text-blue-400' />
          Project Links
        </h3>
        <p className='text-xs sm:text-sm text-white/50'>
          Explore the source code or view the live application.
        </p>
      </div>

      <div className='space-y-2 sm:space-y-3'>
        <Links links={links} />
      </div>
    </m.div>
  );
}
