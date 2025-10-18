import { motion as m } from 'framer-motion';
import { IProjectCard } from 'interfaces/interfaces';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { generateBlurDataURL } from 'helpers/lqip';

export default function Card({ id, title, technology, image }: IProjectCard) {
  const navigate: NavigateFunction = useNavigate();
  const [blurDataUrl, setBlurDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!image || isGenerating) return;

    setIsGenerating(true);

    generateBlurDataURL(image)
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

    return () => {
      mounted = false;
    };
  }, [image]);

  // Preload the actual image so we can toggle `imagesReady` locally
  useEffect(() => {
    let mounted = true;

    setImagesReady(false);

    if (!image) {
      setImagesReady(true);
      return;
    }

    const img = new Image();
    img.src = image;
    img.onload = () => {
      if (mounted) setImagesReady(true);
    };
    img.onerror = () => {
      if (mounted) setImagesReady(true);
    };

    return () => {
      mounted = false;
    };
  }, [image]);

  const handleTap = () => navigate(`/project/${id}`);

  return (
    <m.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20, mass: 0.3 }}
      className='group relative h-0 pb-[55%] min-w-[85%] md:pb-[40%] md:min-w-[70%] lg:pb-[30%] lg:min-w-[55%] xl:pb-[25%] xl:min-w-[45%] rounded-3xl outline-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] will-change-transform cursor-pointer select-none overflow-hidden'
      style={{
        backfaceVisibility: 'hidden',
        perspective: 1000,
        backgroundColor: '#1a1a1a',
      }}
      onTap={handleTap}
      role='button'
      tabIndex={0}
      aria-label={`View ${title} project`}
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
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl transition-opacity duration-500 ${
          imagesReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${image})`,
          zIndex: 1,
        }}
        aria-hidden='true'
      />

      {/* Gradient overlay */}
      <div
        className='absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/30 to-transparent'
        aria-hidden='true'
        style={{ zIndex: 2 }}
      />

      {/* Hover border glow */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-primary/40 transition-all duration-300'
        style={{ zIndex: 3 }}
      />

      {/* Content */}
      <div
        className='absolute inset-0 rounded-3xl flex flex-col justify-between p-3 sm:p-6'
        style={{ zIndex: 4 }}
      >
        <div className='inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-[2px] px-2 py-1 rounded-md bg-black/30 ring-1 ring-white/10 w-max'>
          <span
            className='h-1.5 w-1.5 rounded-full bg-primary inline-block'
            aria-hidden='true'
          />
          {technology}
        </div>
        <h3 className='text-base sm:text-lg md:text-xl font-semibold tracking-tight text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] text-end'>
          {title}
        </h3>
      </div>
    </m.div>
  );
}
