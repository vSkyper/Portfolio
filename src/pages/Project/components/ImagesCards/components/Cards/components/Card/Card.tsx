import { useState, useEffect } from 'react';
import { ImageModal } from './components';
import { motion as m, useAnimation } from 'framer-motion';
import { IProjectMedia } from 'interfaces/interfaces';
import { IoPlay, IoScan } from 'react-icons/io5';

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

    const src = thumbnailSrc;
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
  }, [thumbnailSrc]);

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
        className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-0 pb-[55%] md:pb-[40%] lg:pb-[30%] xl:pb-[25%] cursor-pointer group select-none relative rounded-3xl outline-none ring-1 ring-white/10 hover:ring-2 hover:ring-primary/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition duration-300 ease-out hover:shadow-[0_20px_40px_-12px_rgba(122,181,220,0.3)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] will-change-transform overflow-hidden bg-white/5 backdrop-blur-sm'
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
        {isVideo ? (
          <>
            {/* Video Label Pill */}
            <div className='absolute top-3 right-3 sm:top-4 sm:right-4 inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg z-10'>
              <span className='relative flex h-1.5 w-1.5 sm:h-2 sm:w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-full w-full bg-red-500'></span>
              </span>
              <span className='text-[10px] sm:text-xs font-medium text-white/90 tracking-wide uppercase'>
                Video
              </span>
            </div>

            {/* Center Play Button */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-5'>
              <div className='relative flex items-center justify-center'>
                {/* Outer glow ring */}
                <div className='absolute w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                {/* Button */}
                <div className='relative w-14 h-14 sm:w-16 sm:h-16 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center ring-1 ring-white/20 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-black/50'>
                  <IoPlay className='w-6 h-6 sm:w-7 sm:h-7 text-white ml-1 drop-shadow-lg' />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Image indicators */
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-5'>
            <div className='w-12 h-12 sm:w-14 sm:h-14 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center ring-1 ring-white/20 shadow-lg scale-75 opacity-0 translate-y-4 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out'>
              <IoScan className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
            </div>
          </div>
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
