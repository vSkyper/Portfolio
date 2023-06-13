interface Props {
  params: { id: string };
}

export default function Home({ params }: Props) {
  return <main className='h-full w-full'>{params.id}</main>;
}
