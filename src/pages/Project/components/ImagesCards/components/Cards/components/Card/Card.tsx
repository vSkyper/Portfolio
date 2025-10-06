import { useState, useCallback } from 'react';
import { CardProps } from './interface';
import { ImageModal } from './components';
import { motion as m } from 'framer-motion';

export default function Card(props: CardProps) {
  const { image } = props;
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleTap = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (imageError) {
    return (
      <div className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-[300px] bg-white/[0.03] ring-1 ring-white/10 rounded-3xl flex items-center justify-center text-white/60'>
        Failed to load image
      </div>
    );
  }

  return (
    <>
      <m.div
        className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-auto cursor-pointer group'
        onTap={handleTap}
      >
        <img
          src={image}
          alt='project'
          className='w-full h-auto rounded-3xl outline-none pointer-events-none will-change-transform group-hover:opacity-80 transition-opacity duration-200'
          onError={handleImageError}
          loading='lazy'
          decoding='async'
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
          }}
        />
      </m.div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={image}
        imageAlt='project'
      />
    </>
  );
}
