interface Props {
  image: string;
}

export default function Card({ image }: Props) {
  return (
    <div
      className='h-0 pb-[55%] min-w-[85%] md:pb-[40%] md:min-w-[70%] lg:pb-[30%] lg:min-w-[55%] xl:pb-[25%] xl:min-w-[45%] rounded-3xl bg-cover bg-no-repeat outline-none'
      style={{ backgroundImage: `url(${image})` }}
    />
  );
}
