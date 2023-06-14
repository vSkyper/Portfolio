'use client';

import { ImagesCards, Links, Technologies } from 'components/Project';
import { projectsDetails } from 'constants/constants';
import { IProjectDetails } from 'interfaces/interfaces';
import Error from 'next/error';

interface Props {
  params: { id: string };
}

export default function Home({ params }: Props) {
  const project: IProjectDetails | undefined = projectsDetails.find(
    (project) => project.id === params.id
  );

  if (!project) {
    return <Error statusCode={404} />;
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
