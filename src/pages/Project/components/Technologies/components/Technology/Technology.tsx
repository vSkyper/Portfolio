import { TechnologyProps } from './interface';

export default function Technology(props: TechnologyProps) {
  const { technology } = props;

  return (
    <div className='group relative text-xs sm:text-sm font-medium py-2 px-4 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:ring-primary/50 hover:shadow-[0_0_15px_rgba(122,181,220,0.2)] cursor-default select-none'>
      <div className='absolute inset-0 rounded-full bg-linear-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      <span className='relative z-10 text-white/90 group-hover:text-white transition-colors'>
        {technology}
      </span>
    </div>
  );
}
