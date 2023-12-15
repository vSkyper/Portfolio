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
        className='bg-primary text-secondary hover:bg-primaryLight transition-colors focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full lg:max-w-fit px-5 py-2.5 text-center'
      >
        Submit
      </m.button>
    </m.form>
  );
}
