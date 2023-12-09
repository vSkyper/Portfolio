import { ISendMailForm } from 'interfaces/interfaces';
import { UseFormRegister } from 'react-hook-form';

export interface FieldsProps {
  register: UseFormRegister<ISendMailForm>;
}
