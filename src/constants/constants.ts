import {
  IContactLink,
  IProjectCard,
  IProjectDetails,
} from 'interfaces/interfaces';
import { SiGithub, SiGmail, SiLinkedin } from 'react-icons/si';
import { AiOutlineGlobal } from 'react-icons/ai';

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

export const projectsCards: IProjectCard[] = [
  {
    id: 'learnhub',
    title: 'LearnHub',
    technology: 'React',
    image: '/images/home/learnhub.webp',
    image_blurred: '/images/home/learnhub_blurred.webp',
  },
  {
    id: 'cryptocurrency',
    title: 'Cryptocurrency',
    technology: 'React',
    image: '/images/home/cryptocurrency.webp',
    image_blurred: '/images/home/cryptocurrency_blurred.webp',
  },
];

export const projectsDetails: IProjectDetails[] = [
  {
    id: 'learnhub',
    title: 'LearnHub',
    description:
      'The goal of the project is to provide a remote learning platform dedicated to small class groups. The platform is designed to teach children and teenagers. Features of the project include: the teacher can present any material and tool to the students, the possibility of voice and video communication between the participants of the meeting, the teacher can observe the students work in real time, the teacher can provide assistance to a selected student, the students can collaborate with each other live through collaboration mechanisms.',
    images: [
      '/images/project/learnhub-1.webp',
      '/images/project/learnhub-2.webp',
      '/images/project/learnhub-3.webp',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'WebRTC'],
    links: [],
  },
  {
    id: 'cryptocurrency',
    title: 'Cryptocurrency',
    description:
      'The goal of the project is to provide a cryptocurrency dashboard. Features of the project include: the ability to search for a specific cryptocurrency, the ability to sort cryptocurrencies in table, the ability to display the price of a cryptocurrency in a specific time interval, the ability to exchange cryptocurrencies.',
    images: [
      '/images/project/cryptocurrency-1.webp',
      '/images/project/cryptocurrency-2.webp',
      '/images/project/cryptocurrency-3.webp',
    ],
    technologies: ['React', 'Vite', 'TypeScript', 'MUI', 'CoinGecko API'],
    links: [
      {
        link: 'https://vcryptocurrencyjs.netlify.app',
        icon: AiOutlineGlobal,
      },
      {
        link: 'https://github.com/vSkyper/Cryptocurrency',
        icon: SiGithub,
      },
    ],
  },
];
