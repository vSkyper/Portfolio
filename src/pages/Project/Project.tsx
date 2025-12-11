import { IProjectDetails } from 'interfaces/interfaces';
import { ImagesCards, Links, Technologies } from './components';
import { projectsDetails } from 'constants/constants';
import { useParams, useNavigate } from 'react-router';
import { motion as m } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';
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
    (project) => project.id === id
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
      className='relative w-full min-h-dvh pb-20'
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
        className='fixed top-4 left-4 sm:top-8 sm:left-8 z-40 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 hover:scale-110 group'
        aria-label='Go back to home'
      >
        <IoArrowBack className='w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform' />
      </m.button>

      <section className='container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:py-24 max-w-7xl'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
          {/* Main Content - Left Column */}
          <div className='lg:col-span-8 space-y-6 sm:space-y-8'>
            <div className='space-y-4 sm:space-y-6'>
              <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white'>
                {project.title}
              </h1>
              <div className='prose prose-invert max-w-none'>
                <div className='text-sm sm:text-lg text-white/70 leading-relaxed'>
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
            </div>

            {/* Technologies Section */}
            <div className='space-y-4 pt-4 border-t border-white/10'>
              <h3 className='text-sm font-medium text-white/40 uppercase tracking-wider'>
                Technologies
              </h3>
              <div>
                <Technologies technologies={project.technologies} />
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className='lg:col-span-4 space-y-8'>
            {project.links.length > 0 && (
              <div className='rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-xl p-6 sm:p-8 sticky top-24'>
                <h3 className='text-lg font-semibold text-white mb-2'>
                  Project Links
                </h3>
                <div>
                  <Links links={project.links} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl'>
        <div className='mb-6 sm:mb-8'>
          <h3 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
            Project <span className='text-white/40'>Gallery</span>
          </h3>
          <p className='text-white/60 text-sm sm:text-base'>
            Drag to explore screenshots and media
          </p>
        </div>
        <ImagesCards images={project.images} />
      </section>
    </m.main>
  );
}
