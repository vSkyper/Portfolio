import { ToastContainer } from 'react-toastify';
import { Form, Links } from './components';
import 'react-toastify/dist/ReactToastify.css';
import { motion as m } from 'framer-motion';
import { slideInLeftAnimation } from 'animations/animations';

export default function Contact() {
  return (
    <div className='relative'>
      <div
        className='absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br from-primary/30 via-white/5 to-[#F55644]/30 blur-xl opacity-50'
        aria-hidden
      />
      <div className='relative rounded-3xl bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-md p-5 sm:p-8 md:p-10'>
        <m.div
          variants={slideInLeftAnimation}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='text-2xl sm:text-3xl font-semibold tracking-tight'
        >
          Contact me
        </m.div>
        <m.p
          variants={slideInLeftAnimation}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='mt-1 text-sm sm:text-base text-white/60'
        >
          I'm open to new opportunities and collaborations.
        </m.p>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-16 mt-7'>
          <Form />
          <Links />
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
