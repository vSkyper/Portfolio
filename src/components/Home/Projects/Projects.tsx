'use client';

import { motion } from 'framer-motion';
import { Card } from './components';
import { useEffect, useRef, useState } from 'react';

export default function Projects() {
  const [width, setWidth] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carousel.current) return;

    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div ref={carousel} className='pt-3 sm:pt-9 mr-2 sm:mr-10'>
      <motion.div
        drag='x'
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: 'grabbing' }}
        className='flex cursor-grab'
      >
        <Card />
        <Card />
        <Card />
        <Card />
      </motion.div>
    </div>
  );
}
