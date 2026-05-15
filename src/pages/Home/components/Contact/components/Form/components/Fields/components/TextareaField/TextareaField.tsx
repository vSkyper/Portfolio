import { motion as m } from 'framer-motion';
import { slideInUpAnimation } from 'animations/animations';
import type { TextareaFieldProps } from './interface';

export default function TextareaField({
  id,
  label,
  placeholder,
  icon: Icon,
  registerProps,
  error,
}: TextareaFieldProps) {
  return (
    <m.div variants={slideInUpAnimation} className='relative group'>
      <label
        htmlFor={id}
        className='block mb-1.5 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider group-focus-within:text-primary transition-colors'
      >
        {label}
      </label>
      <div className='relative'>
        <div className='absolute top-3.5 left-3 pointer-events-none'>
          <Icon className='h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 text-white/40 group-focus-within:text-primary transition-colors' />
        </div>
        <textarea
          rows={5}
          id={id}
          placeholder={placeholder}
          className={`w-full resize-none bg-white/5 text-white placeholder-white/20 text-xs sm:text-xs rounded-lg sm:rounded-xl border ${
            error
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-white/10 focus:border-primary/50'
          } focus:ring-4 ${
            error ? 'focus:ring-red-500/10' : 'focus:ring-primary/10'
          } focus:bg-white/10 transition-all duration-300 pl-9 sm:pl-9 p-2.5 sm:p-2.5 outline-none`}
          {...registerProps}
        />
      </div>
      {error && (
        <span className='text-[10px] text-red-400 mt-1 block'>
          {error.message}
        </span>
      )}
    </m.div>
  );
}
