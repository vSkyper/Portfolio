import { useState, useRef } from 'react';
import { CardProps } from './interface';
import { ImageModal } from './components';

export default function Card(props: CardProps) {
  const { image, imagesLoaded } = props;
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  const handleImageLoad = () => {
    imagesLoaded();
  };

  const handleImageError = () => {
    setImageError(true);
    imagesLoaded();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (dragStartPos.current) {
      const deltaX = Math.abs(e.clientX - dragStartPos.current.x);
      const deltaY = Math.abs(e.clientY - dragStartPos.current.y);
      const dragThreshold = 5;

      if (deltaX < dragThreshold && deltaY < dragThreshold) {
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (imageError) {
    return (
      <div className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-[300px] bg-white/[0.03] ring-1 ring-white/10 rounded-3xl flex items-center justify-center text-white/60'>
        Failed to load image
      </div>
    );
  }

  return (
    <>
      <div
        className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-auto cursor-pointer group'
        onMouseDown={handleMouseDown}
        onClick={handleImageClick}
      >
        <img
          src={image}
          alt='project'
          className='w-full h-auto rounded-3xl outline-none pointer-events-none will-change-transform group-hover:opacity-80 transition-opacity duration-200'
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading='lazy'
          decoding='async'
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={image}
        imageAlt='project'
      />
    </>
  );
}
