import { useState, useEffect } from 'react';
import { ImageModal } from './components';
import { motion as m, useAnimation } from 'framer-motion';
import { IProjectMedia } from 'interfaces/interfaces';

interface CardProps {
  image: string | IProjectMedia;
}

export default function Card({ image }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const controls = useAnimation();

  const isVideo = typeof image !== 'string';
  const thumbnailSrc = typeof image === 'string' ? image : image.thumbnail;
  const mediaUrl = typeof image === 'string' ? image : image.src;

  // Preload thumbnail/media and toggle `imagesReady` on load/error
  useEffect(() => {
    setImagesReady(false);

    const src = thumbnailSrc ?? mediaUrl;
    if (!src) {
      setImagesReady(true);
      return;
    }

    const img = new Image();
    const onReady = () => setImagesReady(true);
    img.onload = onReady;
    img.onerror = onReady;
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [thumbnailSrc, mediaUrl]);

  const handleTap = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <m.div
        whileHover={{ scale: 1.02 }}
        animate={controls}
        onTapStart={() =>
          controls.start({ scale: 0.98, transition: { duration: 0.06 } })
        }
        onTap={() => {
          controls.start({ scale: 1, transition: { duration: 0.12 } });
          handleTap();
        }}
        onTapCancel={() =>
          controls.start({ scale: 1, transition: { duration: 0.06 } })
        }
        transition={{ type: 'spring', stiffness: 240, damping: 20, mass: 0.3 }}
        className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-[200px] sm:h-[300px] md:h-[400px] cursor-pointer group select-none relative rounded-3xl outline-none ring-0 hover:ring-1 hover:ring-blue-400 focus-visible:ring-1 focus-visible:ring-blue-400 transition-shadow duration-200 ease-out hover:shadow-[0_10px_30px_-6px_rgba(59,130,246,0.25)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] will-change-transform overflow-hidden bg-[#1a1a1a]'
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleTap();
        }}
        aria-label={isVideo ? 'Open video' : 'Open image'}
      >
        {/* Loading indicator */}
        {!imagesReady && (
          <div
            className='absolute inset-0 flex items-center justify-center z-10'
            aria-hidden='true'
          >
            <div className='relative'>
              {/* Spinning ring */}
              <m.div
                className='w-12 h-12 rounded-full border-2 border-white/10 border-t-primary'
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              {/* Pulsing center dot */}
              <m.div
                className='absolute inset-0 flex items-center justify-center'
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className='w-2 h-2 rounded-full bg-primary' />
              </m.div>
            </div>
          </div>
        )}

        {/* Background image */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl transition-all duration-500 z-1 ${
            imagesReady ? 'opacity-100' : 'opacity-0'
          } group-hover:brightness-75`}
          style={{
            backgroundImage: `url(${thumbnailSrc})`,
          }}
          aria-hidden='true'
        />

        {/* Video indicators */}
        {isVideo && (
          <>
            {/* Small corner badge - always visible */}
            <div className='absolute top-3 right-3 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center ring-1 ring-white/30 pointer-events-none z-5'>
              <svg
                className='w-5 h-5 text-white'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>

            {/* Large center play button - visible on hover */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-5'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center ring-2 ring-white/40 scale-0 group-hover:scale-100 transition-all duration-200 ease-out opacity-0 group-hover:opacity-100'>
                <svg
                  className='w-8 h-8 sm:w-10 sm:h-10 text-white'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
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
        alt='project media'
        isVideo={isVideo}
      />
    </>
  );
}
