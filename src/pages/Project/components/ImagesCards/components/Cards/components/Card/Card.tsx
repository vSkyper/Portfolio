import { useState, useEffect } from 'react';
import { ImageModal, CardLoader, VideoIndicators } from './components';
import { motion as m, useAnimation } from 'framer-motion';
import type { IProjectMedia } from 'interfaces/interfaces';
import { IoScan } from 'react-icons/io5';

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
        className="min-w-[70%] sm:min-w-[30%] h-0 pb-[45%] sm:pb-[18%] cursor-pointer group select-none relative rounded-2xl outline-none ring-1 ring-white/10 hover:ring-2 hover:ring-primary/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition duration-300 ease-out hover:shadow-[0_20px_40px_-12px_rgba(122,181,220,0.3)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] will-change-transform overflow-hidden bg-white/5 backdrop-blur-sm"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleTap();
        }}
        aria-label={isVideo ? 'Open video' : 'Open image'}
      >
        {!imagesReady && <CardLoader />}

        {/* Background image */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl transition-all duration-500 z-1 ${
            imagesReady ? 'opacity-100' : 'opacity-0'
          } group-hover:brightness-75`}
          style={{
            backgroundImage: `url(${thumbnailSrc})`,
          }}
          aria-hidden="true"
        />

        {isVideo ? (
          <VideoIndicators />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center ring-1 ring-white/20 shadow-lg scale-75 opacity-0 translate-y-4 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
              <IoScan className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        )}
      </m.div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        src={mediaUrl}
        alt="project media"
        isVideo={isVideo}
      />
    </>
  );
}
