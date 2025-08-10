import { IProjectDetailsLink } from 'interfaces/interfaces';

export default function Link({ link, icon: Icon }: IProjectDetailsLink) {
  return (
    <div className='group inline-flex items-center gap-3 sm:gap-4'>
      <span className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 text-white transition-colors group-hover:text-primaryLight'>
        <Icon />
      </span>
      <a
        className='relative text-sm sm:text-base font-light hover:text-primaryLight transition-colors'
        href={link}
        target='_blank'
        rel='noopener noreferrer'
      >
        <span className='truncate'>{link}</span>
        <span
          aria-hidden
          className='absolute left-0 -bottom-1 h-px w-0 bg-gradient-to-r from-primary to-primaryLight transition-all duration-300 group-hover:w-full'
        />
      </a>
    </div>
  );
}
