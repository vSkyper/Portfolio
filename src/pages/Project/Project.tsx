import { IProjectDetails } from 'interfaces/interfaces';
import { ImagesCards, Links, Technologies } from './components';
import { projectsDetails } from 'constants/constants';
import { useParams, useNavigate } from 'react-router';
import { motion as m } from 'framer-motion';
import { IoArrowBack, IoCodeSlash, IoLink } from 'react-icons/io5';
import {
  slideInTopAnimation,
  slideInTopAnimationMobile,
} from 'animations/animations';
import { isMobile } from 'helpers/helpers';
import { useEffect, useState, Fragment } from 'react';

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project: IProjectDetails | undefined = projectsDetails.find(
    (project) => project.id.toLowerCase() === id?.toLowerCase()
  );

  const animation = () => {
    if (typeof window === 'undefined') return slideInTopAnimation;

    const mobile = isMobile();
    return mobile ? slideInTopAnimationMobile : slideInTopAnimation;
  };

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
      variants={animation()}
      initial='hidden'
      animate='show'
      className='relative w-full min-h-screen pb-20'
    >
      {/* Background Elements */}
      <div className='fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none'>
        <div className='absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary/10 rounded-full blur-[100px] opacity-20' />
        <div className='absolute bottom-[-10%] left-[-5%] w-125 h-125 bg-secondary/10 rounded-full blur-[100px] opacity-20' />
      </div>

      {/* Back Button */}
      <m.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/')}
        className='fixed top-6 left-6 sm:top-8 sm:left-8 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 hover:scale-105 hover:ring-white/20 group'
        aria-label='Go back to home'
      >
        <IoArrowBack className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
        <span className='hidden sm:inline text-sm font-medium'>Back</span>
      </m.button>

      {/* Main Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-20 pb-12 sm:pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-6 lg:gap-10'>
          {/* Left Column - Project Info */}
          <div className='lg:col-span-8 space-y-4 sm:space-y-6'>
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='space-y-3 sm:space-y-3'
            >
              <div className='inline-flex items-center gap-2 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-sm'>
                <span className='w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400 animate-pulse' />
                <span className='text-[10px] sm:text-[11px] font-medium text-blue-200 tracking-wide uppercase'>
                  Project Details
                </span>
              </div>
              <h1 className='text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight'>
                {project.title}
              </h1>
              <div className='prose prose-invert max-w-none'>
                <div className='text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl'>
                  {project.description
                    .split(/<br\s*\/?>/i)
                    .map((line, i, arr) => (
                      <Fragment key={i}>
                        {line.split('`').map((part, j) =>
                          j % 2 === 1 ? (
                            <code
                              key={j}
                              className='bg-white/10 text-white px-1.5 py-0.5 rounded text-sm font-mono'
                            >
                              {part}
                            </code>
                          ) : (
                            part
                          )
                        )}
                        {i < arr.length - 1 && <br />}
                      </Fragment>
                    ))}
                </div>
              </div>
            </m.div>

            {/* Technologies */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className='space-y-3 sm:space-y-3'
            >
              <h2 className='text-base sm:text-lg font-semibold text-white flex items-center gap-2'>
                <IoCodeSlash className='text-blue-400' />
                Technologies Used
              </h2>
              <Technologies technologies={project.technologies} />
            </m.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className='lg:col-span-4 space-y-4 sm:space-y-5'>
            {project.links.length > 0 && (
              <m.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className='sticky top-24 p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 space-y-3 sm:space-y-4'
              >
                <div className='space-y-1 sm:space-y-2'>
                  <h3 className='text-sm sm:text-base font-semibold text-white flex items-center gap-2'>
                    <IoLink className='text-blue-400' />
                    Project Links
                  </h3>
                  <p className='text-xs sm:text-sm text-white/50'>
                    Explore the source code or view the live application.
                  </p>
                </div>

                <div className='space-y-2 sm:space-y-3'>
                  <Links links={project.links} />
                </div>
              </m.div>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className='container mx-auto pb-20 max-w-7xl mt-8 sm:mt-10'>
          <div className='mb-4 sm:mb-6'>
            <h3 className='text-xl sm:text-2xl font-bold text-white mb-1'>
              Project <span className='text-white/40'>Gallery</span>
            </h3>
            <p className='text-white/60 text-xs sm:text-sm'>
              Drag to explore screenshots and media
            </p>
          </div>
          <ImagesCards images={project.images} />
        </div>
      </div>
    </m.main>
  );
}
