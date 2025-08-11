import { motion as m } from 'framer-motion';
import { IProjectCard } from 'interfaces/interfaces';
import { useCallback, useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function Card({
  id,
  title,
  technology,
  image,
  image_blurred,
}: IProjectCard) {
  const navigate: NavigateFunction = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleTap = useCallback(
    () => navigate(`/project/${id}`),
    [navigate, id]
  );

  useEffect(() => {
    // Preload the main image
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = image;
  }, [image]);

  return (
    <m.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20, mass: 0.3 }}
      className='group relative h-0 pb-[55%] min-w-[85%] md:pb-[40%] md:min-w-[70%] lg:pb-[30%] lg:min-w-[55%] xl:pb-[25%] xl:min-w-[45%] rounded-3xl bg-cover bg-no-repeat outline-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] will-change-transform [transform:translateZ(0)]'
      style={{ backgroundImage: `url(${image_blurred})` }}
      onTap={handleTap}
    >
      {/* hover border glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-primary/40 transition-all duration-300'
      />
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl transition-opacity duration-500 will-change-transform ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className='absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300' />
      <div className='absolute inset-0 rounded-3xl flex flex-col justify-between p-3 sm:p-6'>
        <div className='inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-[2px] px-2 py-1 rounded-md bg-black/30 ring-1 ring-white/10 w-max'>
          <span className='h-1.5 w-1.5 rounded-full bg-primary inline-block' />
          {technology}
        </div>
        <div className='text-base sm:text-lg md:text-xl font-semibold tracking-tight text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] text-end'>
          {title}
        </div>
      </div>
    </m.div>
  );
}
