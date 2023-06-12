import { slideInLeftAnimation } from 'animations/animations';
import { motion as m } from 'framer-motion';
import { IContactField } from 'interfaces/interfaces';

export default function Field({ label, id, type }: IContactField) {
  return (
    <m.div variants={slideInLeftAnimation}>
      <label htmlFor={id} className='block mb-2 text-sm font-medium'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          className='resize-none bg-secondary text-sm rounded-lg focus:ring focus:outline-none focus:ring-primary w-full p-2.5'
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          className='bg-secondary text-sm rounded-lg focus:ring focus:outline-none focus:ring-primary w-full p-2.5'
        />
      )}
    </m.div>
  );
}
