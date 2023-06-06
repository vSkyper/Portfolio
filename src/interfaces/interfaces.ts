import { IconType } from 'react-icons/lib';

export interface IContactField {
  label: string;
  id: string;
  type: string;
}

export interface IContactLink {
  link: string;
  icon: IconType;
  type: string;
}

export interface IContactFormValidationProps {
  name: string;
  message: string;
  mail: string;
}

export interface FormValidationReturn {
  state: string;
  message: string;
}
