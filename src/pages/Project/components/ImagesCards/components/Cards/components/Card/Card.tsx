import { useState, useCallback, useMemo } from 'react';
import { CardProps } from './interface';
import { ImageModal } from './components';
import { motion as m } from 'framer-motion';

export default function Card(props: CardProps) {
  const { image } = props;
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isVideo = useMemo(() => typeof image !== 'string', [image]);

  const thumbnailSrc = typeof image === 'string' ? image : image.thumbnail;
  const mediaUrl = typeof image === 'string' ? image : image.src;

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
        className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-auto cursor-pointer group select-none relative'
        onTap={handleTap}
        draggable='false'
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <img
          src={thumbnailSrc}
          alt='project'
          className='w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover rounded-3xl outline-none will-change-transform group-hover:opacity-80 transition-opacity duration-200 pointer-events-none'
          onError={handleImageError}
          loading='lazy'
          decoding='async'
          draggable='false'
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        />
        {isVideo && (
          <>
            {/* Small corner badge - always visible */}
            <div className='absolute top-3 right-3 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center ring-1 ring-white/30 pointer-events-none z-10'>
              <svg
                className='w-5 h-5 text-white'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>

            {/* Large center play button - visible on hover */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center ring-2 ring-white/40'>
                <svg
                  className='w-8 h-8 sm:w-10 sm:h-10 text-white'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M8 5v14l11-7z' />
                </svg>
              </div>
            </div>
          </>
        )}
      </m.div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        src={mediaUrl}
        alt='project'
        isVideo={isVideo}
      />
    </>
  );
}
