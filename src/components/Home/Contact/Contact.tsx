'use client';

import { ToastContainer } from 'react-toastify';
import { Form, Links } from './components';
import 'react-toastify/dist/ReactToastify.css';
import useElementOnScreen from 'hooks/useElementOnScreen';

export default function Contact() {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.4,
  });

  return (
    <div className='container mx-auto w-11/12 h-full pt-32 sm:pt-56'>
      <div ref={containerRef}>
        <div
          className={`text-2xl sm:text-3xl opacity-0 ${
            isVisible && 'animate-show-up-left'
          }`}
        >
          Contact me!
        </div>
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-32 mt-7'>
          <Form isVisible={isVisible} />
          <Links isVisible={isVisible} />
        </div>
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
