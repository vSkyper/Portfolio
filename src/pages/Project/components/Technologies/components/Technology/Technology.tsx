import { TechnologyProps } from './interface';

export default function Technology(props: TechnologyProps) {
  const { technology } = props;

  return (
    <div className='text-xs sm:text-sm md:text-base py-1.5 px-3 min-w-fit rounded-full bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-sm'>
      {technology}
    </div>
  );
}
