import { Fields } from './components';
import { motion as m } from 'framer-motion';
import { containerAnimation, fadeInAnimation } from 'animations/animations';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISendMailForm } from 'interfaces/interfaces';
import OnSubmit from './hook';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

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
        className='relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary hover:bg-primaryLight px-6 py-2.5 sm:px-8 sm:py-3 text-sm font-bold text-secondary shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/70 w-full sm:w-auto mt-0 sm:mt-2'
      >
        <span className='relative z-10'>Send Message</span>
        <div className='absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300' />
      </m.button>
    </m.form>
  );
}
