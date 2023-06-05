import { HelloHandwriting } from 'components/Home';

export default function Home() {
  return (
    <main className='container mx-auto w-11/12 h-full'>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <HelloHandwriting />
      </div>
    </main>
  );
}
