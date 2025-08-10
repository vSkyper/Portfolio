import { IContactLink } from 'interfaces/interfaces';
import { motion as m } from 'framer-motion';
import { slideInRightAnimation } from 'animations/animations';

export default function Link({ link, icon: Icon, type }: IContactLink) {
  return (
    <m.div
      variants={slideInRightAnimation}
      className='group flex items-center gap-4 sm:gap-5'
    >
      <div className='w-4 h-4 text-white/80 group-hover:text-primary transition-colors'>
        <Icon className='w-full h-full' />
      </div>
      <a
        className='relative text-sm sm:text-base font-light hover:text-primaryLight transition-colors'
        href={type === 'link' ? link : `mailto:${link}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {link}
        <span
          aria-hidden
          className='absolute left-0 -bottom-1 h-px w-0 bg-gradient-to-r from-primary to-primaryLight transition-all duration-300 group-hover:w-full'
        />
      </a>
    </m.div>
  );
}
