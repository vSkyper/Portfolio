import { contactFields } from 'constants/constants';
import { Field } from './components';

interface Props {
  isVisible: boolean;
}

export default function Fields({ isVisible }: Props) {
  const delays = [
    '[animation-delay:0.2s]',
    '[animation-delay:0.4s]',
    '[animation-delay:0.6s]',
  ];

  return (
    <>
      {contactFields.map((field, index) => (
        <Field
          key={field.id}
          {...field}
          isVisible={isVisible}
          animationDelay={delays[index]}
        />
      ))}
    </>
  );
}
