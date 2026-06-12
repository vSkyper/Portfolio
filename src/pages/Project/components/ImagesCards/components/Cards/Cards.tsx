import type { IProjectMedia } from 'interfaces/interfaces';
import { Card } from './components';
import { useImagePreloader } from 'hooks';
import { useMemo, useState, useCallback } from 'react';
import { ImageModal } from './components/Card/components';

interface CardsProps {
  images: (string | IProjectMedia)[];
  onImagesLoaded?: () => void;
}

export default function Cards({ images, onImagesLoaded }: CardsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => prev !== null ? (prev + 1) % images.length : null);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => prev !== null ? (prev - 1 + images.length) % images.length : null);
  }, [images.length]);

  const handleClose = () => setSelectedIndex(null);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;
  const isVideo = selectedImage ? typeof selectedImage !== 'string' : false;
  const mediaUrl = selectedImage
    ? typeof selectedImage === 'string'
      ? selectedImage
      : selectedImage.src
    : '';

  return (
    <>
      {images.map((image, index) => {
        const key =
          typeof image === 'string'
            ? `${image}-${index}`
            : `${image.src}-${index}`;

        return (
          <Card
            key={key}
            image={image}
            onOpen={() => setSelectedIndex(index)}
          />
        );
      })}

      <ImageModal
        isOpen={selectedIndex !== null}
        onClose={handleClose}
        src={mediaUrl}
        alt="project media"
        isVideo={isVideo}
        onNext={images.length > 1 ? handleNext : undefined}
        onPrev={images.length > 1 ? handlePrev : undefined}
      />
    </>
  );
}
