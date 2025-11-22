import { useEffect, useRef } from 'react';

export const useImagePreloader = (
  images: string[],
  onImagesLoaded?: () => void
) => {
  const onImagesLoadedRef = useRef(onImagesLoaded);

  useEffect(() => {
    onImagesLoadedRef.current = onImagesLoaded;
  }, [onImagesLoaded]);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          const handleLoad = () => resolve();
          img.onload = handleLoad;
          img.onerror = handleLoad;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        if (isMounted && onImagesLoadedRef.current) {
          setTimeout(() => {
            if (isMounted) onImagesLoadedRef.current?.();
          }, 100);
        }
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    if (images.length > 0) {
      preloadImages();
    }

    return () => {
      isMounted = false;
    };
  }, [images]);
};
