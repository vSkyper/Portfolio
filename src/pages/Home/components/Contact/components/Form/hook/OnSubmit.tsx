import { ISendMailForm } from 'interfaces/interfaces';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const OnSubmit = (): SubmitHandler<ISendMailForm> => {
  return useCallback(async (formData: ISendMailForm) => {
    try {
      if (
        !import.meta.env.VITE_SERVICE_ID ||
        !import.meta.env.VITE_TEMPLATE_ID ||
        !import.meta.env.VITE_PUBLIC_KEY
      ) {
        toast.error('Something went wrong!');
        return;
      }

      const { senderName, email, message } = formData;

      if (!senderName || !email || !message) return;

      const sendMail = emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          senderName,
          email,
          message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );

      toast.promise(sendMail, {
        pending: 'Sending message!',
        success: 'Message sent successfully!',
        error: 'Message was not sent!',
      });
    } catch (e) {
      throw e;
    }
  }, []);
};

export default OnSubmit;
