import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface TextareaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ElementType;
  registerProps: UseFormRegisterReturn;
  error?: FieldError;
}
