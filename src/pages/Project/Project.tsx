import { NotFound } from '../NotFound';
import type { IProjectDetails } from 'interfaces/interfaces';
import { ImagesCards, Technologies, BackButton, ProjectHeader, ProjectSidebar } from './components';
import { projectsDetails } from 'constants/constants';
import { useParams, useNavigate } from 'react-router';
import { motion as m } from 'framer-motion';
import { IoCodeSlash } from 'react-icons/io5';
import {
  slideInTopAnimation,
  slideInTopAnimationMobile,
} from 'animations/animations';
import { isMobile } from 'helpers/helpers';
import { useEffect, useState } from 'react';

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project: IProjectDetails | undefined = projectsDetails.find(
    (project) => project.id.toLowerCase() === id?.toLowerCase(),
  );

  const animation = () => {
    if (typeof window === 'undefined') return slideInTopAnimation;

    const mobile = isMobile();
    return mobile ? slideInTopAnimationMobile : slideInTopAnimation;
  };

  useEffect(() => {
    const handleModalStateChange = (
      event: CustomEvent<{ isOpen: boolean }>,
    ) => {
      setIsModalOpen(event.detail.isOpen);
    };

    window.addEventListener(
      'modalStateChange',
      handleModalStateChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        'modalStateChange',
        handleModalStateChange as EventListener,
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
    return <NotFound />;
  }

  return (
    <m.main
      variants={animation()}
      initial="hidden"
      animate="show"
      style={{ willChange: 'transform, opacity' }}
      className="relative w-full min-h-screen pb-20"
    >
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary/10 rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[-5%] w-125 h-125 bg-secondary/10 rounded-full blur-[100px] opacity-20" />
      </div>

      <BackButton />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-20 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10">
          {/* Left Column - Project Info */}
          <div className="sm:col-span-8 space-y-4 sm:space-y-6">
            <ProjectHeader title={project.title} description={project.description} />

            {/* Technologies */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ willChange: 'transform, opacity' }}
              className="space-y-3 sm:space-y-3"
            >
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <IoCodeSlash className="text-blue-400" />
                Technologies Used
              </h2>
              <Technologies technologies={project.technologies} />
            </m.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="sm:col-span-4 space-y-4 sm:space-y-5">
            <ProjectSidebar links={project.links} />
          </div>
        </div>

        {/* Gallery */}
        <div className="container mx-auto pb-20 max-w-7xl mt-8 sm:mt-10">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Project <span className="text-white/40">Gallery</span>
            </h3>
            <p className="text-white/60 text-xs sm:text-sm">
              Drag to explore screenshots and media
            </p>
          </div>
          <ImagesCards images={project.images} />
        </div>
      </div>
    </m.main>
  );
}
