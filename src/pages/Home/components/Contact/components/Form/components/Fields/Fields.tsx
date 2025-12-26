import { slideInUpAnimation } from 'animations/animations';
import { motion as m } from 'framer-motion';
import validator from 'validator';
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import { useFormContext } from 'react-hook-form';
import { ISendMailForm } from 'interfaces/interfaces';
import { useEffect } from 'react';

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
        'from_name'
      ) as HTMLInputElement;
      const emailInput = document.getElementById(
        'from_email'
      ) as HTMLInputElement;
      const messageInput = document.getElementById(
        'message'
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
      <m.div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4'>
        <m.div variants={slideInUpAnimation} className='relative group'>
          <label
            htmlFor='from_name'
            className='block mb-1.5 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
          >
            Name
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiUser className='h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 text-white/40 group-focus-within:text-primary transition-colors' />
            </div>
            <input
              title='Name'
              id='from_name'
              type='text'
              autoComplete='name'
              placeholder='John Doe'
              className={`w-full bg-white/5 text-white placeholder-white/20 text-xs sm:text-xs rounded-lg sm:rounded-xl border ${
                errors.from_name
                  ? 'border-red-500/50 focus:border-red-500'
                  : 'border-white/10 focus:border-primary/50'
              } focus:ring-4 ${
                errors.from_name
                  ? 'focus:ring-red-500/10'
                  : 'focus:ring-primary/10'
              } focus:bg-white/10 transition-all duration-300 pl-9 sm:pl-9 p-2.5 sm:p-2.5 outline-none`}
              {...register('from_name', { required: 'Name is required' })}
            />
          </div>
          {errors.from_name && (
            <span className='text-[10px] text-red-400 mt-1 block'>
              {errors.from_name.message}
            </span>
          )}
        </m.div>
        <m.div variants={slideInUpAnimation} className='relative group'>
          <label
            htmlFor='from_email'
            className='block mb-1.5 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
          >
            Email
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiMail className='h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 text-white/40 group-focus-within:text-primary transition-colors' />
            </div>
            <input
              title='Email'
              id='from_email'
              type='email'
              inputMode='email'
              autoComplete='email'
              placeholder='john@example.com'
              className={`w-full bg-white/5 text-white placeholder-white/20 text-xs sm:text-xs rounded-lg sm:rounded-xl border ${
                errors.from_email
                  ? 'border-red-500/50 focus:border-red-500'
                  : 'border-white/10 focus:border-primary/50'
              } focus:ring-4 ${
                errors.from_email
                  ? 'focus:ring-red-500/10'
                  : 'focus:ring-primary/10'
              } focus:bg-white/10 transition-all duration-300 pl-9 sm:pl-9 p-2.5 sm:p-2.5 outline-none`}
              {...register('from_email', {
                required: 'Email is required',
                validate: (value: string) =>
                  validator.isEmail(value) || 'Invalid email address',
              })}
            />
          </div>
          {errors.from_email && (
            <span className='text-[10px] text-red-400 mt-1 block'>
              {errors.from_email.message}
            </span>
          )}
        </m.div>
      </m.div>
      <m.div variants={slideInUpAnimation} className='relative group'>
        <label
          htmlFor='message'
          className='block mb-1.5 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
        >
          Message
        </label>
        <div className='relative'>
          <div className='absolute top-3.5 left-3 pointer-events-none'>
            <FiMessageSquare className='h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 text-white/40 group-focus-within:text-primary transition-colors' />
          </div>
          <textarea
            rows={5}
            id='message'
            placeholder='Tell me about your project...'
            className={`w-full resize-none bg-white/5 text-white placeholder-white/20 text-xs sm:text-xs rounded-lg sm:rounded-xl border ${
              errors.message
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-white/10 focus:border-primary/50'
            } focus:ring-4 ${
              errors.message ? 'focus:ring-red-500/10' : 'focus:ring-primary/10'
            } focus:bg-white/10 transition-all duration-300 pl-9 sm:pl-9 p-2.5 sm:p-2.5 outline-none`}
            {...register('message', { required: 'Message is required' })}
          />
        </div>
        {errors.message && (
          <span className='text-[10px] text-red-400 mt-1 block'>
            {errors.message.message}
          </span>
        )}
      </m.div>
    </>
  );
}
