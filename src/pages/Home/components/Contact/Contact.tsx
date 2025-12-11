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

      <div className='relative rounded-3xl bg-[#0a0a0a]/80 ring-1 ring-white/10 backdrop-blur-2xl p-4 sm:p-10 md:p-14 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden'>
        {/* Subtle gradient overlay */}
        <div
          className='absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent pointer-events-none'
          aria-hidden
        />
        <div
          className='absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2'
          aria-hidden
        />

        <div className='relative z-10'>
          <m.div
            variants={slideInLeftAnimation}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='text-xl sm:text-4xl font-bold tracking-tight text-white'
          >
            Let's work together
          </m.div>
          <m.p
            variants={slideInLeftAnimation}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='mt-2 sm:mt-3 text-xs sm:text-lg text-white/60 max-w-2xl'
          >
            Have a project in mind or just want to say hi? I'm always open to
            discussing new projects, creative ideas or opportunities to be part
            of your visions.
          </m.p>

          <div className='flex flex-col lg:flex-row gap-6 sm:gap-12 lg:gap-20 mt-6 sm:mt-12'>
            <div className='flex-1 order-2 lg:order-1'>
              <Form />
            </div>
            <div className='lg:w-1/3 order-1 lg:order-2 flex flex-col gap-4 sm:gap-6'>
              <div>
                <h3 className='text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4'>
                  Connect with me
                </h3>
                <Links />
              </div>
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
