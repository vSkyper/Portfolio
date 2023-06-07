'use client';

import { ToastContainer } from 'react-toastify';
import { Form, Links } from './components';
import 'react-toastify/dist/ReactToastify.css';
import useElementOnScreen from 'hooks/useElementOnScreen';

export default function Contact() {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  return (
    <div className='container mx-auto w-11/12 h-full pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40'>
      <div
        ref={containerRef}
        className={`text-2xl sm:text-3xl opacity-0 ${
          isVisible && 'animate-slide-in-left'
        }`}
      >
        Contact me!
      </div>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-32 mt-7'>
        <Form isVisible={isVisible} />
        <Links isVisible={isVisible} />
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeButton={false}
        theme='dark'
      />
    </div>
  );
}
