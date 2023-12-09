import { TechnologyProps } from './interface';

export default function Technology(props: TechnologyProps) {
  const { technology } = props;

  return (
    <div className='text-sm sm:text-lg py-2 px-4 min-w-fit bg-secondary rounded-full'>
      {technology}
    </div>
  );
}
