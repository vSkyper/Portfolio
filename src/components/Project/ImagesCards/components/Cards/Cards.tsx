import { StaticImageData } from 'next/image';
import { Card } from './components';

interface Props {
  images: StaticImageData[];
}

export default function Cards({ images }: Props) {
  return (
    <>
      {images.map((image, index) => (
        <Card key={index} image={image} />
      ))}
    </>
  );
}
