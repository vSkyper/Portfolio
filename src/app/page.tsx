import { Contact, Handwriting, Projects } from 'components/Home';

export default function Home() {
  return (
    <main className='h-full w-full'>
      <Handwriting />
      <Projects />
      <Contact />
    </main>
  );
}
