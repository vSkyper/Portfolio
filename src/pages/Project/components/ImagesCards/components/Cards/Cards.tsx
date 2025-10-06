import { Card } from './components';
import { CardsProps } from './interface';
import { useEffect } from 'react';

export default function Cards(props: CardsProps) {
  const { images, onImagesLoaded } = props;

  useEffect(() => {
    const imagePromises = images.map((image) => {
      const imageSrc = typeof image === 'string' ? image : image.thumbnail;

      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = imageSrc;
      });
    });

    Promise.all(imagePromises).then(() => {
      if (onImagesLoaded) {
        setTimeout(onImagesLoaded, 100);
      }
    });
  }, [images, onImagesLoaded]);

  return (
    <>
      {images.map((image, index) => (
        <Card key={index} image={image} />
      ))}
    </>
  );
}
