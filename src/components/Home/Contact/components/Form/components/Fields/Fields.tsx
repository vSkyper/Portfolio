import { contact } from 'constants/constants';
import { Field } from './components';

export default function Fields() {
  return (
    <>
      {contact.map((field) => (
        <Field key={field.id} {...field} />
      ))}
    </>
  );
}
