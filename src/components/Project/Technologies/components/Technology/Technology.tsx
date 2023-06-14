interface Props {
  technology: string;
}

export default function Technology({ technology }: Props) {
  return (
    <div className='text-sm sm:text-lg py-2 px-4 min-w-fit bg-secondary rounded-full'>
      {technology}
    </div>
  );
}
