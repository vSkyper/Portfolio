import { IconType } from 'react-icons/lib';

export interface IContactLink {
  link: string;
  icon: IconType;
  type: string;
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

export interface ISendMailForm {
  senderName: string;
  email: string;
  message: string;
}
