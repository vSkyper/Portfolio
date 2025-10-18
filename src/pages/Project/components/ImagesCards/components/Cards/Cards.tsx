import { IProjectMedia } from 'interfaces/interfaces';
import { Card } from './components';
import { useEffect, useRef } from 'react';

interface CardsProps {
  images: (string | IProjectMedia)[];
  onImagesLoaded?: () => void;
}

export default function Cards({ images, onImagesLoaded }: CardsProps) {
  const onImagesLoadedRef = useRef(onImagesLoaded);

  // Keep ref updated without triggering useEffect
  useEffect(() => {
    onImagesLoadedRef.current = onImagesLoaded;
  }, [onImagesLoaded]);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      const urlsToPreload = new Set<string>();

      images.forEach((image) => {
        if (typeof image === 'string') {
          urlsToPreload.add(image);
        } else {
          if (image.thumbnail) {
            urlsToPreload.add(image.thumbnail);
          }
          if (image.src) {
            urlsToPreload.add(image.src);
          }
        }
      });

      // Convert Set to array and create promises
      const imagePromises = Array.from(urlsToPreload).map((url) => {
        return new Promise<void>((resolve) => {
          const img = new Image();

          const handleLoad = () => {
            resolve();
          };

          img.onload = handleLoad;
          img.onerror = handleLoad;
          img.src = url;
        });
      });

      try {
        await Promise.all(imagePromises);

        if (isMounted) {
          // Small delay to ensure rendering is complete
          if (onImagesLoadedRef.current) {
            setTimeout(() => {
              if (isMounted) {
                onImagesLoadedRef.current?.();
              }
            }, 100);
          }
        }
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [images]);

  return (
    <>
      {images.map((image, index) => {
        const key =
          typeof image === 'string'
            ? `${image}-${index}`
            : `${image.src}-${index}`;

        return <Card key={key} image={image} />;
      })}
    </>
  );
}
