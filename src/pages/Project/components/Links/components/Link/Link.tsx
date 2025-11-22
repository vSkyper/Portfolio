import { IProjectDetailsLink } from 'interfaces/interfaces';

export default function Link({ link, icon: Icon }: IProjectDetailsLink) {
  return (
    <div className='group flex items-center gap-3 sm:gap-4 w-full'>
      <span className='shrink-0 inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/6 ring-1 ring-white/10 text-white transition-colors group-hover:text-primaryLight'>
        <Icon className='w-3 h-3 sm:w-auto' />
      </span>
      <a
        className='relative text-xs sm:text-base font-light hover:text-primaryLight transition-colors min-w-0 flex-1'
        href={link}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='truncate'>{link}</div>
        <span
          aria-hidden
          className='absolute left-0 -bottom-1 h-px w-0 bg-linear-to-r from-primary to-primaryLight transition-all duration-300 group-hover:w-full'
        />
      </a>
    </div>
  );
}
