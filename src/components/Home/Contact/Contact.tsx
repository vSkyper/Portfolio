'use client';

import { ToastContainer } from 'react-toastify';
import { Form } from './components';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  return (
    <div className='w-full h-full pt-9'>
      <div className='text-3xl'>Contact me!</div>
      <Form />
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
