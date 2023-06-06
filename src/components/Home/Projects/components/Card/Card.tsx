import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Card() {
  return (
    <div className='relative min-w-full sm:min-w-[1000px] ml-2 sm:ml-10 transition-all hover:scale-[.98]'>
      <Image
        className='rounded-3xl w-full h-auto pointer-events-none'
        src='/image.webp'
        alt=''
        width={1024}
        height={768}
      />
      <div className='absolute top-0 left-0 ml-2 mt-2 sm:ml-7 sm:mt-7 text-sm sm:text-lg'>
        REACTJS
      </div>
      <div className='absolute bottom-0 right-0 mr-2 mb-2 sm:mr-7 sm:mb-7 text-sm sm:text-lg'>
        CRYPTOCURRENCY TAILWIND
      </div>
    </div>
  );
}
