import { Contact, Handwriting, Projects } from 'components/Home';

export default function Home() {
  return (
    <main className='container mx-auto w-11/12 h-full'>
      <Handwriting />
      <Projects />
      <Contact />
    </main>
  );
}
