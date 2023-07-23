import { Technology } from './components';

interface Props {
  technologies: string[];
}

export default function Technologies({ technologies }: Props) {
  return (
    <div className='flex flex-wrap gap-3 mt-6'>
      {technologies.map((technology) => (
        <Technology key={technology} technology={technology} />
      ))}
    </div>
  );
}
