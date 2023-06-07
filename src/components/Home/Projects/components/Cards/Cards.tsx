import { projects } from 'constants/constants';
import { Card } from './components';

export default function Cards() {
  return (
    <>
      {projects.map((project) => (
        <Card key={project.title} {...project} />
      ))}
    </>
  );
}
