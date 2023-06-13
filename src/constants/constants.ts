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
    id: 'learnhub',
    title: 'LearnHub',
    technology: 'React',
    image: '/images/learnhub.webp',
    image_blurred: '/images/learnhub_blurred.webp',
  },
  {
    id: 'cryptocurrency-tailwind',
    title: 'Cryptocurrency Tailwind',
    technology: 'React',
    image: '/images/cryptocurrency-tailwind.webp',
    image_blurred: '/images/cryptocurrency-tailwind_blurred.webp',
  },
  {
    id: 'cryptocurrency',
    title: 'Cryptocurrency',
    technology: 'React',
    image: '/images/cryptocurrency.webp',
    image_blurred: '/images/cryptocurrency_blurred.webp',
  },
];
