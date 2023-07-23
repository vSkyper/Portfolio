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

export interface IFormValidationReturn {
  state: string;
  message: string;
}

export interface IProjectCard {
  id: string;
  title: string;
  technology: string;
  image: string;
  image_blurred: string;
}

export interface IProjectDetailsLink {
  link: string;
  icon: IconType;
}

export interface IProjectDetailsLinks {
  links: IProjectDetailsLink[];
}

export interface IProjectDetails {
  id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  links: IProjectDetailsLink[];
}
