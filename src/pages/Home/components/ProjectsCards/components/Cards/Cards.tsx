import { projectsCards } from 'constants/constants';
import { Card } from './components';

export default function Cards() {
  return (
    <>
      {projectsCards.map((project) => (
        <Card key={project.title} {...project} />
      ))}
    </>
  );
}
