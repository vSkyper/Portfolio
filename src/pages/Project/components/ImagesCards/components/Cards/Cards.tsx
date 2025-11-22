import { IProjectMedia } from 'interfaces/interfaces';
import { Card } from './components';
import { useImagePreloader } from 'hooks';
import { useMemo } from 'react';

interface CardsProps {
  images: (string | IProjectMedia)[];
  onImagesLoaded?: () => void;
}

export default function Cards({ images, onImagesLoaded }: CardsProps) {
  const urlsToPreload = useMemo(() => {
    const urls = new Set<string>();
    images.forEach((image) => {
      if (typeof image === 'string') {
        urls.add(image);
      } else {
        if (image.thumbnail) urls.add(image.thumbnail);
        if (image.src) urls.add(image.src);
      }
    });
    return Array.from(urls);
  }, [images]);

  useImagePreloader(urlsToPreload, onImagesLoaded);

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
