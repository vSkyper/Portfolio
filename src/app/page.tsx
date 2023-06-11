import { Contact, Handwriting, Project, Projects } from 'components/Home';

export default function Home() {
  return (
    <main className='h-full'>
      <Handwriting />
      <Projects />
      <Project />
      <Contact />
    </main>
  );
}
