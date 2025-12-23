import { ISendMailForm } from 'interfaces/interfaces';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { IOnSubmit } from './interface';

const OnSubmit = ({ resetField }: IOnSubmit): SubmitHandler<ISendMailForm> => {
  return async (formData: ISendMailForm) => {
    try {
      if (
        !import.meta.env.VITE_SERVICE_ID ||
        !import.meta.env.VITE_TEMPLATE_ID ||
        !import.meta.env.VITE_PUBLIC_KEY
      ) {
        toast.error('Something went wrong!');
        return;
      }

      const { from_name, from_email, message } = formData;

      if (!from_name || !from_email || !message) return;

      const sendMail = emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          from_name,
          from_email,
          message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );

      toast.promise(sendMail, {
        pending: 'Sending message!',
        success: {
          render: () => {
            resetField('from_name');
            resetField('from_email');
            resetField('message');
            return 'Message sent!';
          },
        },
        error: 'Message was not sent!',
      });
    } catch (e) {
      throw e;
    }
  };
};

export default OnSubmit;
