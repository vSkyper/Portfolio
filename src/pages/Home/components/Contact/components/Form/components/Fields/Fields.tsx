import { slideInLeftAnimation } from 'animations/animations';
import { motion as m } from 'framer-motion';
import validator from 'validator';
import { FieldsProps } from './interface';

export default function Fields(props: FieldsProps) {
  const { register } = props;

  return (
    <>
      <m.div variants={slideInLeftAnimation}>
        <label htmlFor='senderName' className='block mb-2 text-sm font-medium'>
          Name
        </label>
        <input
          title='Name'
          id='senderName'
          type='text'
          autoComplete='name'
          className='bg-white/5 placeholder-white/40 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-0 ring-1 ring-white/10 w-full p-2.5'
          {...register('senderName', { required: true })}
        />
      </m.div>
      <m.div variants={slideInLeftAnimation}>
        <label htmlFor='email' className='block mb-2 text-sm font-medium'>
          Email
        </label>
        <input
          title='Email'
          id='email'
          type='email'
          inputMode='email'
          autoComplete='email'
          className='bg-white/5 placeholder-white/40 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 ring-1 ring-white/10 w-full p-2.5'
          {...register('email', {
            required: true,
            validate: (value) => validator.isEmail(value),
          })}
        />
      </m.div>
      <m.div variants={slideInLeftAnimation}>
        <label htmlFor='message' className='block mb-2 text-sm font-medium'>
          Message
        </label>
        <textarea
          rows={5}
          id='message'
          className='resize-none bg-white/5 placeholder-white/40 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 ring-1 ring-white/10 w-full p-2.5'
          {...register('message', { required: true })}
        />
      </m.div>
    </>
  );
}
