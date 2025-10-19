import { motion as m, useAnimation } from 'framer-motion';
import { IProjectCard } from 'interfaces/interfaces';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// blur placeholder generation removed — images handled via preload and CSS transitions

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
      className='group relative h-0 min-w-[85%] pb-[55%] md:pb-[40%] md:min-w-[70%] lg:pb-[30%] lg:min-w-[55%] xl:pb-[25%] xl:min-w-[45%] rounded-3xl outline-none ring-0 hover:ring-1 hover:ring-blue-400 focus-visible:ring-1 focus-visible:ring-blue-400 transition-shadow duration-200 ease-out hover:shadow-[0_10px_30px_-6px_rgba(59,130,246,0.25)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] will-change-transform cursor-pointer select-none overflow-hidden'
      // handleTap is invoked inside the onTap callback above (via framer controls)
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleTap();
      }}
      role='button'
      tabIndex={0}
      aria-label={`View ${title} project`}
    >
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl transition-opacity duration-500 z-1 ${
          imagesReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${image})`,
        }}
        aria-hidden='true'
      />

      {/* Gradient overlay */}
      <div
        className='absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/30 to-transparent z-2'
        aria-hidden='true'
      />

      {/* Content */}
      <div className='absolute inset-0 rounded-3xl flex flex-col justify-between p-3 sm:p-6 z-3'>
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
