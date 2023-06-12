import { IContactLink } from 'interfaces/interfaces';
import { motion as m } from 'framer-motion';
import { slideInRightAnimation } from 'animations/animations';

export default function Link({ link, icon: Icon, type }: IContactLink) {
  return (
    <m.div
      variants={slideInRightAnimation}
      className='flex items-center gap-4 sm:gap-5'
    >
      <div className='w-4 h-4'>
        <Icon />
      </div>
      <a
        className='text-sm sm:text-base font-light hover:text-primaryLight transition-colors'
        href={type === 'link' ? link : `mailto:${link}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {link}
      </a>
    </m.div>
  );
}
