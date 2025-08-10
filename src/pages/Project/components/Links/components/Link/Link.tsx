import { IProjectDetailsLink } from 'interfaces/interfaces';

export default function Link({ link, icon: Icon }: IProjectDetailsLink) {
  return (
    <a
      className='group inline-flex items-center gap-3 sm:gap-4 text-sm sm:text-base font-light hover:text-primaryLight transition-colors'
      href={link}
      target='_blank'
      rel='noopener noreferrer'
    >
      <span className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 text-white group-hover:text-primaryLight'>
        <Icon />
      </span>
      <span className='truncate'>{link}</span>
    </a>
  );
}
