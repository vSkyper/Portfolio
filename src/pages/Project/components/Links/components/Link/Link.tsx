import { IProjectDetailsLink } from 'interfaces/interfaces';
import { FiExternalLink } from 'react-icons/fi';

export default function Link({ link, icon: Icon }: IProjectDetailsLink) {
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5'
    >
      <div className='shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-black/40 ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-300 group-hover:scale-110'>
        <Icon className='w-5 h-5 text-white/80 group-hover:text-primary transition-colors' />
      </div>

      <div className='flex-1 min-w-0'>
        <div className='text-xs text-white/40 font-medium mb-0.5 uppercase tracking-wider'>
          {link.includes('github') ? 'Repository' : 'Live Demo'}
        </div>
        <div className='text-sm sm:text-base text-white/90 font-medium truncate group-hover:text-primary transition-colors'>
          {link.replace(/^https?:\/\//, '')}
        </div>
      </div>

      <div className='shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
        <FiExternalLink className='w-5 h-5 text-primary' />
      </div>
    </a>
  );
}
