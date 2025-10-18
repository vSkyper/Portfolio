import { projectsCards } from 'constants/constants';
import { Card } from './components';
import { useEffect, useRef } from 'react';

interface CardsProps {
  onImagesLoaded?: () => void;
}

export default function Cards({ onImagesLoaded }: CardsProps = {}) {
  const onImagesLoadedRef = useRef(onImagesLoaded);

  // Keep ref updated without triggering useEffect
  useEffect(() => {
    onImagesLoadedRef.current = onImagesLoaded;
  }, [onImagesLoaded]);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      const imagePromises = projectsCards.map((project) => {
        return new Promise<void>((resolve) => {
          const img = new Image();

          const handleLoad = () => {
            resolve();
          };

          img.onload = handleLoad;
          img.onerror = handleLoad;

          img.src = project.image;
        });
      });

      try {
        await Promise.all(imagePromises);

        if (isMounted) {
          if (onImagesLoadedRef.current) {
            setTimeout(() => {
              if (isMounted) {
                onImagesLoadedRef.current?.();
              }
            }, 100);
          }
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {projectsCards.map((project) => (
        <Card key={project.id || project.title} {...project} />
      ))}
    </>
  );
}
