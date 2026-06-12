import type { TechnologyProps } from './interface';

export default function Technology(props: TechnologyProps) {
  const { technology } = props;

  return (
    <div className="group relative text-xs sm:text-sm font-semibold py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl bg-white/3 border border-white/5 transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5 cursor-default select-none">
      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <span className="relative z-10 text-white/90 group-hover:text-white transition-colors">
        {technology}
      </span>
    </div>
  );
}
