import { Contact, Handwriting, ProjectsCards } from 'components/Home';

export default function Home() {
  return (
    <main className='h-full w-full'>
      <Handwriting />
      <ProjectsCards />
      <Contact />
    </main>
  );
}
