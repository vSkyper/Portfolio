import { IProjectDetailsLink } from 'interfaces/interfaces';
import { FiExternalLink } from 'react-icons/fi';

export default function Link({ link, icon: Icon }: IProjectDetailsLink) {
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5'
    >
      <div className='shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/40 ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-300 group-hover:scale-110'>
        <Icon className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80 group-hover:text-primary transition-colors' />
      </div>

      <div className='flex-1 min-w-0'>
        <div className='text-[9px] sm:text-[10px] text-white/40 font-medium mb-0.5 uppercase tracking-wider'>
          {link.includes('github') ? 'Repository' : 'Live Demo'}
        </div>
        <div className='text-xs sm:text-sm text-white/90 font-medium truncate group-hover:text-primary transition-colors'>
          {link.replace(/^https?:\/\//, '')}
        </div>
      </div>

      <div className='shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
        <FiExternalLink className='w-4 h-4 text-primary' />
      </div>
    </a>
  );
}
