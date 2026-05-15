import { Fields, SubmitButton } from './components';
import { motion as m } from 'framer-motion';
import { containerAnimation } from 'animations/animations';
import { useForm, FormProvider } from 'react-hook-form';
import type { ISendMailForm } from 'interfaces/interfaces';
import useOnSubmit from './hook';

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

  return (
    <FormProvider {...methods}>
      <m.form
        variants={containerAnimation}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        onSubmit={handleSubmit(onSubmit)}
        className="basis-full flex flex-col gap-3 sm:gap-4"
        noValidate
      >
        <Fields />
        <SubmitButton status={status} hasErrors={hasErrors} />
      </m.form>
    </FormProvider>
  );
}
