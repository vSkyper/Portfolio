import { IProjectDetailsLink } from 'interfaces/interfaces';

export default function Link({ link, icon: Icon }: IProjectDetailsLink) {
  return (
    <div className='flex items-center gap-4 sm:gap-5'>
      <div className='w-4 h-4'>
        <Icon />
      </div>
      <a
        className='text-sm sm:text-base font-light hover:text-primaryLight transition-colors'
        href={link}
        target='_blank'
        rel='noopener noreferrer'
      >
        {link}
      </a>
    </div>
  );
}
