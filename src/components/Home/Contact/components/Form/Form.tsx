import { useCallback, useRef } from 'react';
import { Fields } from './components';
import { sendMail } from 'helpers/helpers';
import { motion as m } from 'framer-motion';
import {
  containerAnimation,
  slideInLeftAnimation,
} from 'animations/animations';

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMail(e, formRef.current);
  }, []);

  return (
    <m.form
      variants={containerAnimation}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      ref={formRef}
      onSubmit={handleSubmit}
      className='basis-full flex flex-col gap-6'
    >
      <Fields />
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
