'use client';

import { ToastContainer } from 'react-toastify';
import { Form } from './components';
import 'react-toastify/dist/ReactToastify.css';
import useElementOnScreen from 'hooks/useElementOnScreen';

export default function Contact() {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  });

  return (
    <div className='w-full h-full pt-3 sm:pt-9'>
      <div ref={containerRef}>
        <div
          className={`text-3xl opacity-0 ${
            isVisible && 'animate-show-up-left'
          }`}
        >
          Contact me!
        </div>
        <Form isVisible={isVisible} />
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
