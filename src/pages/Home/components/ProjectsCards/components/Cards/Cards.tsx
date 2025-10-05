import { projectsCards } from 'constants/constants';
import { Card } from './components';
import { useEffect } from 'react';

interface CardsProps {
  onImagesLoaded?: () => void;
}

export default function Cards({ onImagesLoaded }: CardsProps = {}) {
  useEffect(() => {
    if (!onImagesLoaded) return;

    const imagePromises = projectsCards.flatMap((project) => [
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = project.image;
      }),
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = project.image_blurred;
      }),
    ]);

    Promise.all(imagePromises).then(() => {
      setTimeout(onImagesLoaded, 100);
    });
  }, [onImagesLoaded]);

  return (
    <>
      {projectsCards.map((project) => (
        <Card key={project.title} {...project} />
      ))}
    </>
  );
}
