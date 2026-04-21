import { Technology } from './components';
import type { TechnologiesProps } from './interface';

export default function Technologies(props: TechnologiesProps) {
  const { technologies } = props;

  return (
    <div className="flex flex-wrap gap-3">
      {technologies.map((technology) => (
        <Technology key={technology} technology={technology} />
      ))}
    </div>
  );
}
