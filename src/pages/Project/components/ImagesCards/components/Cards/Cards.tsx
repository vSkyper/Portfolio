import { Card } from './components';
import { CardsProps } from './interface';

export default function Cards(props: CardsProps) {
  const { images, imagesLoaded } = props;

  return (
    <>
      {images.map((image, index) => (
        <Card key={index} image={image} imagesLoaded={imagesLoaded} />
      ))}
    </>
  );
}
