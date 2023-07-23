interface Props {
  image: string;
}

export default function Card({ image }: Props) {
  return (
    <div className='min-w-[85%] md:min-w-[70%] lg:min-w-[55%] xl:min-w-[45%] h-auto'>
      <img
        src={image}
        alt='project'
        className='w-full h-auto rounded-3xl outline-none pointer-events-none'
      />
    </div>
  );
}
