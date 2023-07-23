import { Contact, Handwriting, ProjectsCards } from './components';

export default function Home() {
  return (
    <main className='h-full w-full'>
      <Handwriting />
      <ProjectsCards />
      <Contact />
    </main>
  );
}
