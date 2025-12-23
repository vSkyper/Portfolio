import { ISendMailForm } from 'interfaces/interfaces';
import { UseFormResetField } from 'react-hook-form';

export interface IOnSubmit {
  resetField: UseFormResetField<ISendMailForm>;
}
