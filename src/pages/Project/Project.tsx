import { IProjectDetails } from 'interfaces/interfaces';
import { ImagesCards, Links, Technologies } from './components';
import { projectsDetails } from 'constants/constants';
import { useParams, useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import {
  slideInTopAnimation,
  slideInTopAnimationMobile,
} from 'animations/animations';
import { isMobile } from 'helpers/helpers';
import { useMemo, useEffect, useState } from 'react';

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project: IProjectDetails | undefined = projectsDetails.find(
    (project) => project.id === id
  );

  const animation = useMemo(() => {
    if (typeof window === 'undefined') return slideInTopAnimation;

    const mobile = isMobile();
    return mobile ? slideInTopAnimationMobile : slideInTopAnimation;
  }, []);

  useEffect(() => {
    const handleModalStateChange = (
      event: CustomEvent<{ isOpen: boolean }>
    ) => {
      setIsModalOpen(event.detail.isOpen);
    };

    window.addEventListener(
      'modalStateChange',
      handleModalStateChange as EventListener
    );

    return () => {
      window.removeEventListener(
        'modalStateChange',
        handleModalStateChange as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isModalOpen) {
        navigate('/');
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [navigate, isModalOpen]);

  if (!project) {
    return null;
  }

  return (
    <m.main
      variants={animation}
      initial='hidden'
      animate='show'
      className='relative w-full min-h-full'
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <section className='container mx-auto w-11/12 py-8 sm:py-10 md:py-12'>
        <div className='rounded-3xl bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-md p-5 sm:p-7 md:p-8'>
          <div className='text-3xl sm:text-4xl font-bold tracking-tight'>
            {project.title}
          </div>
          <div
            className='text-sm sm:text-lg mt-3 text-white/80'
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
          <Technologies technologies={project.technologies} />
          <Links links={project.links} />
        </div>
      </section>
      <section className='container mx-auto w-11/12'>
        <ImagesCards images={project.images} />
      </section>
    </m.main>
  );
}
