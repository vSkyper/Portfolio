import { Card } from './components';

interface Props {
  images: string[];
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
