import { slideInUpAnimation } from 'animations/animations';
import { motion as m } from 'framer-motion';
import validator from 'validator';
import { FieldsProps } from './interface';

export default function Fields(props: FieldsProps) {
  const { register } = props;

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
        <m.div variants={slideInUpAnimation} className='relative group'>
          <label
            htmlFor='senderName'
            className='block mb-2 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
          >
            Name
          </label>
          <input
            title='Name'
            id='senderName'
            type='text'
            autoComplete='name'
            placeholder='John Doe'
            className='w-full bg-white/5 text-white placeholder-white/20 text-xs sm:text-sm rounded-xl border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-white/10 transition-all duration-300 p-2.5 sm:p-3.5 outline-none'
            {...register('senderName', { required: true })}
          />
        </m.div>
        <m.div variants={slideInUpAnimation} className='relative group'>
          <label
            htmlFor='email'
            className='block mb-2 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
          >
            Email
          </label>
          <input
            title='Email'
            id='email'
            type='email'
            inputMode='email'
            autoComplete='email'
            placeholder='john@example.com'
            className='w-full bg-white/5 text-white placeholder-white/20 text-xs sm:text-sm rounded-xl border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-white/10 transition-all duration-300 p-2.5 sm:p-3.5 outline-none'
            {...register('email', {
              required: true,
              validate: (value) => validator.isEmail(value),
            })}
          />
        </m.div>
      </div>
      <m.div variants={slideInUpAnimation} className='relative group'>
        <label
          htmlFor='message'
          className='block mb-2 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
        >
          Message
        </label>
        <textarea
          rows={6}
          id='message'
          placeholder='Tell me about your project...'
          className='w-full resize-none bg-white/5 text-white placeholder-white/20 text-xs sm:text-sm rounded-xl border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-white/10 transition-all duration-300 p-2.5 sm:p-3.5 outline-none'
          {...register('message', { required: true })}
        />
      </m.div>
    </>
  );
}
