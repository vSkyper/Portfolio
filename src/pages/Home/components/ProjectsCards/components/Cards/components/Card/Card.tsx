import { motion as m, useAnimation } from 'framer-motion';
import { IProjectCard } from 'interfaces/interfaces';
import { NavigateFunction, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Card({ id, title, technology, image }: IProjectCard) {
  const navigate: NavigateFunction = useNavigate();
  const controls = useAnimation();
  const [imagesReady, setImagesReady] = useState(false);

  // Preload thumbnail/media and toggle `imagesReady` on load/error
  useEffect(() => {
    setImagesReady(false);

    if (!image) {
      setImagesReady(true);
      return;
    }

    const img = new Image();
    const onReady = () => setImagesReady(true);
    img.onload = onReady;
    img.onerror = onReady;
    img.src = image;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image]);

  const handleTap = () => navigate(`/project/${id}`);

  return (
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
      className='group relative h-0 min-w-[85%] pb-[55%] md:pb-[40%] md:min-w-[70%] lg:pb-[30%] lg:min-w-[55%] xl:pb-[25%] xl:min-w-[45%] rounded-3xl outline-none ring-1 ring-white/10 hover:ring-2 hover:ring-primary/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition duration-300 ease-out hover:shadow-[0_20px_40px_-12px_rgba(122,181,220,0.3)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] will-change-transform cursor-pointer select-none overflow-hidden bg-white/5 backdrop-blur-none md:backdrop-blur-sm'
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleTap();
      }}
      role='button'
      tabIndex={0}
      aria-label={`View ${title} project`}
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
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl transition-transform duration-700 group-hover:scale-110 z-1 ${
          imagesReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${image})`,
        }}
        aria-hidden='true'
      />

      {/* Gradient overlay */}
      <div
        className='absolute inset-0 rounded-3xl bg-linear-to-t from-black/90 via-black/40 to-transparent z-2 opacity-80 group-hover:opacity-90 transition-opacity duration-300'
        aria-hidden='true'
      />

      {/* Content */}
      <div className='absolute inset-0 rounded-3xl flex flex-col justify-between p-5 sm:p-8 z-3'>
        <div className='flex justify-between items-start'>
          <div className='inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white backdrop-blur-none md:backdrop-blur-md px-3 py-1.5 rounded-full bg-black/50 border border-white/10 shadow-lg transform transition-transform duration-300 group-hover:translate-y-1'>
            <span
              className='h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(122,181,220,0.6)] inline-block'
              aria-hidden='true'
            />
            {technology}
          </div>
          <div className='w-10 h-10 rounded-full bg-black/50 backdrop-blur-none md:backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
            <FiArrowUpRight className='w-5 h-5 text-white' />
          </div>
        </div>

        <div className='transform transition-transform duration-300 group-hover:-translate-y-1'>
          <h3 className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-lg mb-1'>
            {title}
          </h3>
          <div className='h-0.5 w-0 bg-primary group-hover:w-12 transition-all duration-500 ease-out' />
        </div>
      </div>
    </m.div>
  );
}
