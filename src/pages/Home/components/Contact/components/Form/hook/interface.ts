import type { ISendMailForm } from 'interfaces/interfaces';
import type { UseFormResetField } from 'react-hook-form';

export interface IOnSubmit {
  resetField: UseFormResetField<ISendMailForm>;
}
