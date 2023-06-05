import { Contact, Handwriting } from 'components/Home';

export default function Home() {
  return (
    <main className='container mx-auto w-11/12 h-full'>
      <Handwriting />
      <Contact />
    </main>
  );
}
