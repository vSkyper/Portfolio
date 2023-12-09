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
          className='bg-secondary text-sm rounded-lg focus:ring focus:outline-none focus:ring-primary w-full p-2.5'
          {...register('senderName', { required: true })}
        />
      </m.div>
      <m.div variants={slideInLeftAnimation}>
        <label htmlFor='email' className='block mb-2 text-sm font-medium'>
          Email
        </label>
        <input
          title='Email'
          className='bg-secondary text-sm rounded-lg focus:ring focus:outline-none focus:ring-primary w-full p-2.5'
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
          className='resize-none bg-secondary text-sm rounded-lg focus:ring focus:outline-none focus:ring-primary w-full p-2.5'
          {...register('message', { required: true })}
        />
      </m.div>
    </>
  );
}
