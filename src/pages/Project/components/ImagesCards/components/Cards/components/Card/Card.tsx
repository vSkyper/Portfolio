import { useState, useEffect } from 'react';
import { ImageModal } from './components';
import { motion as m } from 'framer-motion';
import { generateBlurDataURL } from 'helpers/lqip';
import { IProjectMedia } from 'interfaces/interfaces';

interface CardProps {
  image: string | IProjectMedia;
}

export default function Card({ image }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  const isVideo = typeof image !== 'string';
  const thumbnailSrc = typeof image === 'string' ? image : image.thumbnail;
  const mediaUrl = typeof image === 'string' ? image : image.src;

  // Generate blur placeholder
  useEffect(() => {
    let mounted = true;

    const srcForPlaceholder = thumbnailSrc || mediaUrl;
    if (!srcForPlaceholder || isGenerating) return;

    // For videos, delay blur generation slightly to prioritize thumbnail loading
    const delay = isVideo ? 50 : 0;

    const timeoutId = setTimeout(() => {
      setIsGenerating(true);

      generateBlurDataURL(srcForPlaceholder)
        .then((dataUrl) => {
          if (mounted && dataUrl) {
            setBlurDataUrl(dataUrl);
          }
        })
        .catch((error) => {
          console.error('Failed to generate blur placeholder:', error);
        })
        .finally(() => {
          if (mounted) {
            setIsGenerating(false);
          }
        });
    }, delay);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [thumbnailSrc, mediaUrl, isVideo]);

  // Preload the actual thumbnail/media so we can toggle `imagesReady` locally
  useEffect(() => {
    let mounted = true;

    // reset ready state when source changes
    setImagesReady(false);

    const srcForPlaceholder = thumbnailSrc || mediaUrl;
    if (!srcForPlaceholder) {
      // nothing to load, mark ready to avoid leaving UI invisible
      setImagesReady(true);
      return;
    }

    const img = new Image();
    img.src = srcForPlaceholder;
    img.onload = () => {
      if (mounted) setImagesReady(true);
    };
    img.onerror = () => {
      // on error, consider it ready so UI isn't stuck
      if (mounted) setImagesReady(true);
    };

    return () => {
      mounted = false;
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
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20, mass: 0.3 }}
        className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-[200px] sm:h-[300px] md:h-[400px] cursor-pointer group select-none relative rounded-3xl outline-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] will-change-transform overflow-hidden'
        style={{
          backfaceVisibility: 'hidden',
          perspective: 1000,
          backgroundColor: '#1a1a1a',
        }}
        onTap={handleTap}
        role='button'
        tabIndex={0}
        aria-label={isVideo ? 'Open video' : 'Open image'}
      >
        {/* Blur placeholder (lowest layer) */}
        {blurDataUrl && (
          <div
            aria-hidden='true'
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
              imagesReady ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundImage: `url(${blurDataUrl})`,
              filter: 'blur(8px)',
              transform: 'scale(1.1)',
              zIndex: 0,
            }}
          />
        )}

        {/* Real background image (fades in when ready) */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl transition-all duration-500 ${
            imagesReady ? 'opacity-100' : 'opacity-0'
          } group-hover:brightness-75`}
          style={{
            backgroundImage: `url(${thumbnailSrc})`,
            zIndex: 1,
          }}
          aria-hidden='true'
        />

        {/* Hover border glow */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-primary/40 transition-all duration-300'
          style={{ zIndex: 3 }}
        />

        {/* Video indicators */}
        {isVideo && (
          <>
            {/* Small corner badge - always visible */}
            <div
              className='absolute top-3 right-3 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center ring-1 ring-white/30 pointer-events-none'
              style={{ zIndex: 5 }}
            >
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
            <div
              className='absolute inset-0 flex items-center justify-center pointer-events-none'
              style={{ zIndex: 5 }}
            >
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
