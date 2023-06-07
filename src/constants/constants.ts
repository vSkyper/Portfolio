import { IContactField, IContactLink, IProject } from 'interfaces/interfaces';
import { SiGithub, SiGmail, SiLinkedin } from 'react-icons/si';

export const contactFields: IContactField[] = [
  {
    label: 'Name',
    id: 'senderName',
    type: 'text',
  },
  {
    label: 'Email',
    id: 'email',
    type: 'text',
  },
  {
    label: 'Message',
    id: 'message',
    type: 'textarea',
  },
];

export const contactLinks: IContactLink[] = [
  {
    link: 'https://www.linkedin.com/in/mateusz-piwowarski',
    icon: SiLinkedin,
    type: 'link',
  },
  {
    link: 'https://github.com/vSkyper',
    icon: SiGithub,
    type: 'link',
  },
  {
    link: 'mateuszpiwowarski887@gmail.com',
    icon: SiGmail,
    type: 'mail',
  },
];

export const projects: IProject[] = [
  {
    title: 'LearnHub',
    technology: 'ReactJS',
    image: '/learnhub.webp',
    image_blurred: '/learnhub_blurred.webp',
  },
  {
    title: 'Cryptocurrency Tailwind',
    technology: 'ReactJS',
    image: '/cryptocurrency-tailwind.webp',
    image_blurred: '/cryptocurrency-tailwind_blurred.webp',
  },
  {
    title: 'Cryptocurrency',
    technology: 'ReactJS',
    image: '/cryptocurrency.webp',
    image_blurred: '/cryptocurrency_blurred.webp',
  },
];
