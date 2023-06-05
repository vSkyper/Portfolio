import { IContactField } from 'interfaces/interfaces';

interface Props extends IContactField {
  isVisible: boolean;
  animationDelay: string;
}

export default function Field({
  label,
  id,
  type,
  isVisible,
  animationDelay,
}: Props) {
  return (
    <div
      className={`mb-6 ${animationDelay} opacity-0 ${
        isVisible && 'animate-show-up-left'
      }`}
    >
      <label htmlFor={id} className='block mb-2 text-sm font-medium'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
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
    </div>
  );
}
