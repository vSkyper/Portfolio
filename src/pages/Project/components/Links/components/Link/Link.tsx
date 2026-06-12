import type { IProjectDetailsLink } from 'interfaces/interfaces';
import { FiExternalLink } from 'react-icons/fi';

export default function Link({ link, icon: Icon }: IProjectDetailsLink) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
    >
      <div className="shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black/40 border border-white/10 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80 group-hover:text-primary transition-colors" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[9px] sm:text-[10px] text-white/40 font-medium mb-0.5 uppercase tracking-wider">
          {link.includes('github') ? 'Repository' : 'Live Demo'}
        </div>
        <div className="text-xs sm:text-sm text-white/90 font-medium truncate group-hover:text-primary transition-colors">
          {link.replace(/^https?:\/\//, '')}
        </div>
      </div>

      <div className="shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <FiExternalLink className="w-4 h-4 text-primary" />
      </div>
    </a>
  );
}
