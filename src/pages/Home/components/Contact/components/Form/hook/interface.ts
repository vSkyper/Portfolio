import { ISendMailForm } from 'interfaces/interfaces';
import { UseFormReset } from 'react-hook-form';

export interface IOnSubmit {
  reset: UseFormReset<ISendMailForm>;
}
