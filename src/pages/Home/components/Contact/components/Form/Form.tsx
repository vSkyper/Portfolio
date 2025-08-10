import { Fields } from './components';
import { motion as m } from 'framer-motion';
import {
  containerAnimation,
  slideInLeftAnimation,
} from 'animations/animations';
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
      className='basis-full flex flex-col gap-6'
    >
      <Fields register={register} />
      <m.button
        variants={slideInLeftAnimation}
        type='submit'
        className='relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-primary/70 w-full lg:max-w-fit'
      >
        Submit
      </m.button>
    </m.form>
  );
}
