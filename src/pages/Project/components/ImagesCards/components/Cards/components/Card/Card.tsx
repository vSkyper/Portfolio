import { useState } from 'react';
import { CardProps } from './interface';

export default function Card(props: CardProps) {
  const { image, imagesLoaded } = props;
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    imagesLoaded();
  };

  const handleImageError = () => {
    setImageError(true);
    // Still call imagesLoaded to prevent infinite waiting
    imagesLoaded();
  };

  if (imageError) {
    return (
      <div className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-[300px] bg-white/[0.03] ring-1 ring-white/10 rounded-3xl flex items-center justify-center text-white/60'>
        Failed to load image
      </div>
    );
  }

  return (
    <div className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-auto'>
      <img
        src={image}
        alt='project'
        className='w-full h-auto rounded-3xl outline-none pointer-events-none will-change-transform'
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading='lazy' // Native lazy loading for better performance
        decoding='async' // Async image decoding
        style={{
          transform: 'translateZ(0)', // Force hardware acceleration
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
}
