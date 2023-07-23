import { IProjectDetails } from 'interfaces/interfaces';
import { ImagesCards, Links, Technologies } from './components';
import { projectsDetails } from 'constants/constants';
import { useParams } from 'react-router-dom';

export default function Project() {
  const { id } = useParams();

  const project: IProjectDetails | undefined = projectsDetails.find(
    (project) => project.id === id
  );

  if (!project) {
    return null;
  }

  return (
    <main className='h-full w-full'>
      <div className='container mx-auto w-11/12'>
        <div className='text-3xl sm:text-4xl font-bold pt-8'>
          {project.title}
        </div>
        <div className='text-sm sm:text-lg mt-4'>{project.description}</div>
        <Technologies technologies={project.technologies} />
        <Links links={project.links} />
      </div>
      <ImagesCards images={project.images} />
    </main>
  );
}
