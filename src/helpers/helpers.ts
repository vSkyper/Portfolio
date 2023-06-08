import {
  IFormValidationReturn,
  IContactFormValidationProps,
} from 'interfaces/interfaces';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import validator from 'validator';

const validateForm = ({ name, message, mail }: IContactFormValidationProps) => {
  name = name.trim();
  message = message.trim();
  mail = mail.trim();

  if (!name) {
    return {
      state: 'error',
      message: 'Missing form data!',
    } as IFormValidationReturn;
  }
  if (!message) {
    return {
      state: 'error',
      message: 'Missing form data!',
    } as IFormValidationReturn;
  }
  if (!mail) {
    return {
      state: 'error',
      message: 'Missing form data!',
    } as IFormValidationReturn;
  }

  if (!validator.isEmail(mail)) {
    return {
      state: 'error',
      message: 'The email address is incorrect!',
    } as IFormValidationReturn;
  }

  return {
    state: 'success',
    message: 'Form validated!',
  } as IFormValidationReturn;
};

const sender = (e: React.FormEvent<HTMLFormElement>, form: HTMLFormElement) => {
  if (!process.env.SERVICE_ID) {
    toast.error('Something went wrong!');
    return;
  }
  if (!process.env.TEMPLATE_ID) {
    toast.error('Something went wrong!');
    return;
  }
  if (!process.env.PUBLIC_KEY) {
    toast.error('Something went wrong!');
    return;
  }

  const sendMail = emailjs
    .sendForm(
      process.env.SERVICE_ID,
      process.env.TEMPLATE_ID,
      form,
      process.env.PUBLIC_KEY
    )
    .then(() => {
      (e.target as HTMLFormElement).reset();
    });
  toast.promise(sendMail, {
    pending: 'Sending message!',
    success: 'Message sent successfully!',
    error: 'Message was not sent!',
  });
};

export const sendMail = (
  e: React.FormEvent<HTMLFormElement>,
  form: HTMLFormElement | null
) => {
  if (!form) return;

  console.log(form.senderName.value);

  const validatedForm = validateForm({
    name: form.senderName.value,
    mail: form.email.value,
    message: form.message.value,
  });

  if (!validatedForm) return;

  switch (validatedForm.state) {
    case 'success':
      sender(e, form);
      break;
    case 'error':
      toast.error(validatedForm.message);
      break;
    default:
      break;
  }
};
