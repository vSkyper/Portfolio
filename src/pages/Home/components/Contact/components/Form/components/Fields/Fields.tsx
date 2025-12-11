import { slideInUpAnimation } from 'animations/animations';
import { motion as m } from 'framer-motion';
import validator from 'validator';
import { FieldsProps } from './interface';
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

export default function Fields(props: FieldsProps) {
  const { register } = props;

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
        <m.div variants={slideInUpAnimation} className='relative group'>
          <label
            htmlFor='senderName'
            className='block mb-2 text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
          >
            Name
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiUser className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/40 group-focus-within:text-primary transition-colors' />
            </div>
            <input
              title='Name'
              id='senderName'
              type='text'
              autoComplete='name'
              placeholder='John Doe'
              className='w-full bg-white/5 text-white placeholder-white/20 text-xs sm:text-sm rounded-xl border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-white/10 transition-all duration-300 pl-9 sm:pl-10 p-3 sm:p-3.5 outline-none'
              {...register('senderName', { required: true })}
            />
          </div>
        </m.div>
        <m.div variants={slideInUpAnimation} className='relative group'>
          <label
            htmlFor='email'
            className='block mb-2 text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
          >
            Email
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiMail className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/40 group-focus-within:text-primary transition-colors' />
            </div>
            <input
              title='Email'
              id='email'
              type='email'
              inputMode='email'
              autoComplete='email'
              placeholder='john@example.com'
              className='w-full bg-white/5 text-white placeholder-white/20 text-xs sm:text-sm rounded-xl border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-white/10 transition-all duration-300 pl-9 sm:pl-10 p-3 sm:p-3.5 outline-none'
              {...register('email', {
                required: true,
                validate: (value) => validator.isEmail(value),
              })}
            />
          </div>
        </m.div>
      </div>
      <m.div variants={slideInUpAnimation} className='relative group'>
        <label
          htmlFor='message'
          className='block mb-2 text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
        >
          Message
        </label>
        <div className='relative'>
          <div className='absolute top-4.5 left-3 pointer-events-none'>
            <FiMessageSquare className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/40 group-focus-within:text-primary transition-colors' />
          </div>
          <textarea
            rows={6}
            id='message'
            placeholder='Tell me about your project...'
            className='w-full resize-none bg-white/5 text-white placeholder-white/20 text-xs sm:text-sm rounded-xl border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-white/10 transition-all duration-300 pl-9 sm:pl-10 p-3 sm:p-3.5 outline-none'
            {...register('message', { required: true })}
          />
        </div>
      </m.div>
    </>
  );
}
