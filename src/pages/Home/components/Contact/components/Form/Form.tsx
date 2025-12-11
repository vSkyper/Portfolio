import { Fields } from './components';
import { motion as m } from 'framer-motion';
import { containerAnimation, fadeInAnimation } from 'animations/animations';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISendMailForm } from 'interfaces/interfaces';
import OnSubmit from './hook';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiSend } from 'react-icons/fi';

export default function Form() {
  const { register, handleSubmit, formState, reset } = useForm<ISendMailForm>();

  const onSubmit: SubmitHandler<ISendMailForm> = OnSubmit({ reset });

  useEffect(() => {
    if (formState.errors.email) toast.error('Invalid email!');
  }, [formState]);

  return (
    <m.form
      variants={containerAnimation}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className='basis-full flex flex-col gap-4 sm:gap-6'
    >
      <Fields register={register} />
      <m.button
        variants={fadeInAnimation}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type='submit'
        className='group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-white text-black px-8 py-3.5 text-sm font-bold shadow-lg shadow-white/10 transition-all hover:bg-white/90 hover:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-auto mt-2'
      >
        <span className='relative z-10'>Send Message</span>
        <FiSend className='relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />
        <div className='absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out' />
      </m.button>
    </m.form>
  );
}
