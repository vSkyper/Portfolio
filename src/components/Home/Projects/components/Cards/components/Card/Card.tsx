import { IProject } from 'interfaces/interfaces';

interface Props extends IProject {}

export default function Card({
  title,
  technology,
  image,
  image_blurred,
}: Props) {
  return (
    <div
      className='relative h-0 pb-[55%] min-w-[85%] lg:pb-[35%] lg:min-w-[55%] xl:pb-[25%] xl:min-w-[45%] ml-2 sm:ml-6 rounded-3xl bg-cover bg-no-repeat hover:scale-[.98] transition-all duration-500'
      style={{ backgroundImage: `url(${image_blurred})` }}
    >
      <div
        className='absolute top-0 left-0 h-full w-full bg-cover hover:bg-contain hover:bg-center bg-no-repeat transition-all duration-500 rounded-3xl'
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className='absolute top-0 left-0 ml-2 mt-2 sm:ml-7 sm:mt-7 text-sm sm:text-lg'>
          {technology}
        </div>
        <div className='absolute bottom-0 right-0 mr-2 mb-2 sm:mr-7 sm:mb-7 text-sm sm:text-lg'>
          {title}
        </div>
      </div>
    </div>
  );
}
