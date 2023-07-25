import { IProjectDetails } from 'interfaces/interfaces';
import { ImagesCards, Links, Technologies } from './components';
import { projectsDetails } from 'constants/constants';
import { useParams } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { slideInTopAnimation } from 'animations/animations';

export default function Project() {
  const { id } = useParams();

  const project: IProjectDetails | undefined = projectsDetails.find(
    (project) => project.id === id
  );

  if (!project) {
    return null;
  }

  return (
    <m.main
      variants={slideInTopAnimation}
      initial='hidden'
      animate='show'
      className='h-full w-full'
    >
      <div className='container mx-auto w-11/12'>
        <div className='text-3xl sm:text-4xl font-bold pt-8'>
          {project.title}
        </div>
        <div className='text-sm sm:text-lg mt-4'>{project.description}</div>
        <Technologies technologies={project.technologies} />
        <Links links={project.links} />
      </div>
      <ImagesCards images={project.images} />
    </m.main>
  );
}
