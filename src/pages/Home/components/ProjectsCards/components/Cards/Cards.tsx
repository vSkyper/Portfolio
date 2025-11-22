import { projectsCards } from 'constants/constants';
import { Card } from './components';
import { useImagePreloader } from 'hooks';
import { useMemo } from 'react';

interface CardsProps {
  onImagesLoaded?: () => void;
}

export default function Cards({ onImagesLoaded }: CardsProps = {}) {
  const images = useMemo(() => projectsCards.map((p) => p.image), []);
  useImagePreloader(images, onImagesLoaded);

  return (
    <>
      {projectsCards.map((project) => (
        <Card key={project.id || project.title} {...project} />
      ))}
    </>
  );
}
