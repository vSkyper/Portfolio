import { IContactLink } from 'interfaces/interfaces';
import { motion as m } from 'framer-motion';
import { slideInRightAnimation } from 'animations/animations';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Link({ link, icon: Icon, title }: IContactLink) {
  return (
    <m.div variants={slideInRightAnimation}>
      <a
        href={title === 'Email' ? `mailto:${link}` : link}
        target='_blank'
        rel='noopener noreferrer'
        className='group flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300'
      >
        <div className='flex items-center gap-3 sm:gap-4'>
          <div className='flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/5 text-white/80 group-hover:text-white group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300'>
            <Icon className='w-5 h-5 sm:w-6 sm:h-6' />
          </div>
          <div className='flex flex-col'>
            <span className='text-xs sm:text-sm font-semibold text-white group-hover:text-primary transition-colors'>
              {title}
            </span>
            <span className='text-[10px] sm:text-xs text-white/40 truncate max-w-40 sm:max-w-60'>
              {title === 'Email' ? link : link.replace(/^https?:\/\//, '')}
            </span>
          </div>
        </div>
        <FiArrowUpRight className='w-4 h-4 sm:w-5 sm:h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300' />
      </a>
    </m.div>
  );
}
