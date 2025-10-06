import { projectsCards } from 'constants/constants';
import { Card } from './components';
import { useEffect, useState } from 'react';

interface CardsProps {
  onImagesLoaded?: () => void;
}

export default function Cards({ onImagesLoaded }: CardsProps = {}) {
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
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
      setImagesReady(true);
      if (onImagesLoaded) {
        setTimeout(onImagesLoaded, 100);
      }
    });
  }, [onImagesLoaded]);

  return (
    <>
      {projectsCards.map((project) => (
        <Card key={project.title} {...project} imagesReady={imagesReady} />
      ))}
    </>
  );
}
