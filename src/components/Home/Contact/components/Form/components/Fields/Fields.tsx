import { contactFields } from 'constants/constants';
import { Field } from './components';

export default function Fields() {
  return (
    <>
      {contactFields.map((field) => (
        <Field key={field.id} {...field} />
      ))}
    </>
  );
}
