import { motion as m } from 'framer-motion';
import { IProjectCard } from 'interfaces/interfaces';

export default function Card({
  //id,
  title,
  technology,
  image,
  image_blurred,
}: IProjectCard) {
  return (
    <m.div
      className='relative h-0 pb-[55%] min-w-[85%] md:pb-[40%] md:min-w-[70%] lg:pb-[30%] lg:min-w-[55%] xl:pb-[25%] xl:min-w-[45%] rounded-3xl bg-cover bg-no-repeat hover:scale-[1.02] transition-transform duration-500 outline-none'
      style={{ backgroundImage: `url(${image_blurred})` }}
    >
      <div
        className='absolute inset-0 flex flex-col justify-between p-2 sm:p-7 bg-cover hover:bg-contain hover:bg-center bg-no-repeat rounded-3xl'
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className='text-sm sm:text-lg [text-shadow:1px_1px_1px_rgb(0_0_0_/_40%)]'>
          {technology}
        </div>
        <div className='text-sm sm:text-lg [text-shadow:1px_1px_1px_rgb(0_0_0_/_40%)] text-end'>
          {title}
        </div>
      </div>
    </m.div>
  );
}
