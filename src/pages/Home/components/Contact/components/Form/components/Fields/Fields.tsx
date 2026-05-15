import { motion as m } from 'framer-motion';
import validator from 'validator';
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import { useFormContext } from 'react-hook-form';
import type { ISendMailForm } from 'interfaces/interfaces';
import { useEffect } from 'react';
import { InputField, TextareaField } from './components';

export default function Fields() {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
  } = useFormContext<ISendMailForm>();

  useEffect(() => {
    // Check for browser auto-filled/restored values after mount
    const timer = setTimeout(() => {
      const nameInput = document.getElementById(
        'from_name',
      ) as HTMLInputElement;
      const emailInput = document.getElementById(
        'from_email',
      ) as HTMLInputElement;
      const messageInput = document.getElementById(
        'message',
      ) as HTMLTextAreaElement;

      if (nameInput?.value) {
        setValue('from_name', nameInput.value);
        trigger('from_name');
      }
      if (emailInput?.value) {
        setValue('from_email', emailInput.value);
        trigger('from_email');
      }
      if (messageInput?.value) {
        setValue('message', messageInput.value);
        trigger('message');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [setValue, trigger]);

  return (
    <>
      <m.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4">
        <InputField
          id="from_name"
          label="Name"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          icon={FiUser}
          registerProps={register('from_name', { required: 'Name is required' })}
          error={errors.from_name}
        />
        <InputField
          id="from_email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          icon={FiMail}
          registerProps={register('from_email', {
            required: 'Email is required',
            validate: (value: string) =>
              validator.isEmail(value) || 'Invalid email address',
          })}
          error={errors.from_email}
        />
      </m.div>
      <TextareaField
        id="message"
        label="Message"
        placeholder="Tell me about your project..."
        icon={FiMessageSquare}
        registerProps={register('message', { required: 'Message is required' })}
        error={errors.message}
      />
    </>
  );
}
