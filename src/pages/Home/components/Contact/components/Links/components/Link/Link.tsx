import { IContactLink } from 'interfaces/interfaces';
import { motion as m } from 'framer-motion';
import { slideInRightAnimation } from 'animations/animations';

export default function Link({ link, icon: Icon, type }: IContactLink) {
  return (
    <m.div variants={slideInRightAnimation}>
      <a
        href={type === 'link' ? link : `mailto:${link}`}
        target='_blank'
        rel='noopener noreferrer'
        className='group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300'
      >
        <div className='flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 text-white/80 group-hover:text-primary group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300'>
          <Icon className='w-4 h-4 sm:w-5 sm:h-5' />
        </div>
        <div className='flex flex-col'>
          <span className='text-[10px] sm:text-xs text-white/40 uppercase tracking-wider font-medium mb-0.5'>
            {type === 'link' ? 'Social' : 'Email'}
          </span>
          <span className='text-xs sm:text-base font-medium text-white/90 group-hover:text-white transition-colors'>
            {link.replace(/^https?:\/\//, '').replace(/^mailto:/, '')}
          </span>
        </div>
      </a>
    </m.div>
  );
}
