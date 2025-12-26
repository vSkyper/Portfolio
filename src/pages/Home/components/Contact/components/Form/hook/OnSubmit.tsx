import { ISendMailForm } from 'interfaces/interfaces';
import { SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { IOnSubmit } from './interface';
import { useState } from 'react';

const useOnSubmit = ({ resetField }: IOnSubmit) => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const onSubmit: SubmitHandler<ISendMailForm> = async (formData) => {
    setStatus('loading');

    try {
      if (
        !import.meta.env.VITE_SERVICE_ID ||
        !import.meta.env.VITE_TEMPLATE_ID ||
        !import.meta.env.VITE_PUBLIC_KEY
      ) {
        throw new Error('Missing configuration');
      }

      const { from_name, from_email, message } = formData;

      if (!from_name || !from_email || !message) return;

      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          from_name,
          from_email,
          message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );

      setStatus('success');
      resetField('from_name');
      resetField('from_email');
      resetField('message');

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (e) {
      console.error(e);
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return { onSubmit, status };
};

export default useOnSubmit;
