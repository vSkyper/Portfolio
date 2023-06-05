'use client';

import { useCallback, useRef } from 'react';
import { Fields } from './components';
import { sendMail } from 'helpers/helpers';

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMail(e, formRef.current);
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className='mt-7'>
      <Fields />
      <button
        type='submit'
        className='bg-primary text-secondary hover:bg-primaryLight transition-all focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
      >
        Submit
      </button>
    </form>
  );
}
