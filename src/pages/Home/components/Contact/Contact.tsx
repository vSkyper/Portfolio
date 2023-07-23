import { ToastContainer } from 'react-toastify';
import { Form, Links } from './components';
import 'react-toastify/dist/ReactToastify.css';
import { motion as m } from 'framer-motion';
import { slideInLeftAnimation } from 'animations/animations';

export default function Contact() {
  return (
    <div className='container mx-auto w-11/12 h-full pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40'>
      <m.div
        variants={slideInLeftAnimation}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='text-2xl sm:text-3xl'
      >
        Contact me!
      </m.div>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-32 mt-7'>
        <Form />
        <Links />
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
