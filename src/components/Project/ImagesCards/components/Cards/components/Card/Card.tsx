import Image, { StaticImageData } from 'next/image';

interface Props {
  image: StaticImageData;
}

export default function Card({ image }: Props) {
  return (
    <div className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-auto'>
      <Image
        src={image}
        alt='project'
        placeholder='blur'
        className='w-full h-auto rounded-3xl outline-none pointer-events-none'
      />
    </div>
  );
}
