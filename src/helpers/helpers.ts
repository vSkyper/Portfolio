import {
  FormValidationReturn,
  IContactFormValidationProps,
} from 'interfaces/interfaces';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import validator from 'validator';

function validateForm({ name, message, mail }: IContactFormValidationProps) {
  name = name.trim();
  message = message.trim();
  mail = mail.trim();

  if (!name) {
    return {
      state: 'error',
      message: 'Missing form data!',
    } as FormValidationReturn;
  }
  if (!message) {
    return {
      state: 'error',
      message: 'Missing form data!',
    } as FormValidationReturn;
  }
  if (!mail) {
    return {
      state: 'error',
      message: 'Missing form data!',
    } as FormValidationReturn;
  }

  if (!validator.isEmail(mail)) {
    return {
      state: 'error',
      message: 'The email address is incorrect!',
    } as FormValidationReturn;
  }

  return {
    state: 'success',
    message: 'Form validated!',
  } as FormValidationReturn;
}

function sender(e: React.FormEvent<HTMLFormElement>, form: HTMLFormElement) {
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
}

export function sendMail(
  e: React.FormEvent<HTMLFormElement>,
  form: HTMLFormElement | null
) {
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
}
