import { Card } from './components';

interface Props {
  images: string[];
  imagesLoaded: () => void;
}

export default function Cards({ images, imagesLoaded }: Props) {
  return (
    <>
      {images.map((image, index) => (
        <Card key={index} image={image} imagesLoaded={imagesLoaded} />
      ))}
    </>
  );
}
