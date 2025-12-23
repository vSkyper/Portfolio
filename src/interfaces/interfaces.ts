import { IconType } from 'react-icons/lib';

export interface IContactLink {
  link: string;
  icon: IconType;
  type: string;
  title: string;
}

export interface IProjectCard {
  id: string;
  title: string;
  technology: string;
  image: string;
}

export interface IProjectDetailsLink {
  link: string;
  icon: IconType;
}

export interface IProjectMedia {
  src: string;
  thumbnail: string;
}

export interface IProjectDetailsLinks {
  links: IProjectDetailsLink[];
}

export interface IProjectDetails {
  id: string;
  title: string;
  description: string;
  images: (string | IProjectMedia)[];
  technologies: string[];
  links: IProjectDetailsLink[];
}

export interface ISendMailForm {
  from_name: string;
  from_email: string;
  message: string;
}
