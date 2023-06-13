'use client';

import { ImagesCards } from 'components/Project';
import { projectsDetails } from 'constants/constants';
import { IProjectDetails } from 'interfaces/interfaces';
import Error from 'next/error';
import { useEffect, useRef, useState } from 'react';

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
        <div className='text-3xl sm:text-4xl font-bold mt-8'>
          {project.title}
        </div>
        <div className='text-sm sm:text-base mt-4'>{project.description}</div>
      </div>
      <ImagesCards images={project.images} />
    </main>
  );
}
