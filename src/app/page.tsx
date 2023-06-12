import { Contact, Handwriting, Projects } from 'components/Home';

export default function Home() {
  return (
    <main className='h-full'>
      <Handwriting />
      <Projects />
      <Contact />
    </main>
  );
}
