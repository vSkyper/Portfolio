import { ToastContainer } from 'react-toastify';
import { Form, Links } from './components';
import 'react-toastify/dist/ReactToastify.css';
import { motion as m } from 'framer-motion';
import { slideInLeftAnimation } from 'animations/animations';

export default function Contact() {
  return (
    <div className='relative py-6 sm:py-10'>
      {/* Decorative background elements */}
      <div
        className='absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 pointer-events-none'
        aria-hidden
      />
      <div
        className='absolute -bottom-20 -left-20 w-80 h-80 bg-[#F55644]/10 rounded-full blur-3xl opacity-30 pointer-events-none'
        aria-hidden
      />

      <div className='relative rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-xl p-4 sm:p-10 md:p-12 shadow-2xl shadow-black/20 overflow-hidden'>
        {/* Subtle gradient overlay */}
        <div
          className='absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none'
          aria-hidden
        />

        <div className='relative z-10'>
          <m.div
            variants={slideInLeftAnimation}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='text-2xl sm:text-4xl font-bold tracking-tight text-white'
          >
            Let's work together
          </m.div>
          <m.p
            variants={slideInLeftAnimation}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='mt-2 sm:mt-3 text-sm sm:text-lg text-white/60 max-w-2xl'
          >
            Have a project in mind or just want to say hi? I'm always open to
            discussing new projects, creative ideas or opportunities to be part
            of your visions.
          </m.p>

          <div className='flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-20 mt-6 sm:mt-10'>
            <div className='flex-1 order-2 lg:order-1'>
              <Form />
            </div>
            <div className='lg:w-1/3 order-1 lg:order-2'>
              <Links />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        theme='dark'
        toastClassName='!bg-[#1a1a1a] !text-white !rounded-xl !ring-1 !ring-white/10'
      />
    </div>
  );
}
