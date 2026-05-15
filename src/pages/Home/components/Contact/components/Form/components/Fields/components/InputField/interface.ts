import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
  registerProps: UseFormRegisterReturn;
  error?: FieldError;
  autoComplete?: string;
}
