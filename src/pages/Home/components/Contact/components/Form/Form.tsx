import { Fields } from './components';
import { motion as m } from 'framer-motion';
import { containerAnimation, fadeInAnimation } from 'animations/animations';
import { useForm, FormProvider } from 'react-hook-form';
import { ISendMailForm } from 'interfaces/interfaces';
import useOnSubmit from './hook';
import { FiSend, FiCheck, FiX, FiLoader, FiAlertCircle } from 'react-icons/fi';

export default function Form() {
  const methods = useForm<ISendMailForm>({
    mode: 'onChange',
    defaultValues: {
      from_name: '',
      from_email: '',
      message: '',
    },
  });

  const {
    resetField,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { onSubmit, status } = useOnSubmit({ resetField });
  const hasErrors = !!(errors.from_name || errors.from_email || errors.message);

  const getButtonConfig = () => {
    switch (status) {
      case 'loading':
        return {
          text: 'Sending...',
          icon: <FiLoader className='w-3.5 h-3.5 animate-spin' />,
          bg: 'bg-white/10 text-white',
          hover: 'cursor-wait',
        };
      case 'success':
        return {
          text: 'Sent!',
          icon: <FiCheck className='w-3.5 h-3.5' />,
          bg: 'bg-green-500 text-white shadow-green-500/20',
          hover: 'hover:bg-green-600',
        };
      case 'error':
        return {
          text: 'Error',
          icon: <FiX className='w-3.5 h-3.5' />,
          bg: 'bg-red-500 text-white shadow-red-500/20',
          hover: 'hover:bg-red-600',
        };
      default:
        if (hasErrors) {
          return {
            text: 'Send Message',
            icon: <FiSend className='w-3.5 h-3.5' />, // No hover animation
            bg: 'bg-white/5 text-white/40 shadow-none',
            hover: 'cursor-not-allowed',
          };
        }
        return {
          text: 'Send Message',
          icon: (
            <FiSend className='w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300' />
          ),
          bg: 'bg-white text-black shadow-white/10',
          hover: 'hover:bg-white/90 hover:shadow-white/20',
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <FormProvider {...methods}>
      <m.form
        variants={containerAnimation}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        onSubmit={handleSubmit(onSubmit)}
        className='basis-full flex flex-col gap-3 sm:gap-4'
        noValidate
      >
        <Fields />

        <div className='flex flex-col gap-2'>
          <m.button
            variants={fadeInAnimation}
            whileHover={status === 'idle' && !hasErrors ? { scale: 1.02 } : {}}
            whileTap={status === 'idle' && !hasErrors ? { scale: 0.98 } : {}}
            disabled={status === 'loading' || status === 'success' || hasErrors}
            type='submit'
            className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-2.5 text-xs font-bold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-auto mt-1 ${buttonConfig.bg} ${buttonConfig.hover}`}
          >
            <span className='relative z-10'>{buttonConfig.text}</span>
            <span className='relative z-10'>{buttonConfig.icon}</span>
            {status === 'idle' && (
              <div className='absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out' />
            )}
          </m.button>

          {
            /* Inline Error Message for Validation */
            (errors.from_name || errors.from_email || errors.message) && (
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-center gap-2 text-[10px] text-red-500 font-medium'
              >
                <FiAlertCircle />
                <span>Please check the fields above</span>
              </m.div>
            )
          }
        </div>
      </m.form>
    </FormProvider>
  );
}
