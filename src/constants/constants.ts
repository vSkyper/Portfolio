import {
  IContactField,
  IContactLink,
  IProjectCard,
  IProjectDetails,
} from 'interfaces/interfaces';
import { SiGithub, SiGmail, SiLinkedin } from 'react-icons/si';
import { AiOutlineGlobal } from 'react-icons/ai';

import LearnHub1 from '../../public/images/project/learnhub-1.webp';
import LearnHub2 from '../../public/images/project/learnhub-2.webp';
import LearnHub3 from '../../public/images/project/learnhub-3.webp';
import CryptocurrencyTailwind1 from '../../public/images/project/cryptocurrency-tailwind-1.webp';
import CryptocurrencyTailwind2 from '../../public/images/project/cryptocurrency-tailwind-2.webp';
import CryptocurrencyTailwind3 from '../../public/images/project/cryptocurrency-tailwind-3.webp';
import Cryptocurrency1 from '../../public/images/project/cryptocurrency-1.webp';
import Cryptocurrency2 from '../../public/images/project/cryptocurrency-2.webp';
import Cryptocurrency3 from '../../public/images/project/cryptocurrency-3.webp';

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

export const projectsCards: IProjectCard[] = [
  {
    id: 'learnhub',
    title: 'LearnHub',
    technology: 'React',
    image: '/images/home/learnhub.webp',
    image_blurred: '/images/home/learnhub_blurred.webp',
  },
  {
    id: 'cryptocurrency-tailwind',
    title: 'Cryptocurrency Tailwind',
    technology: 'React',
    image: '/images/home/cryptocurrency-tailwind.webp',
    image_blurred: '/images/home/cryptocurrency-tailwind_blurred.webp',
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
    images: [LearnHub1, LearnHub2, LearnHub3],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'WebRTC'],
    links: [],
  },
  {
    id: 'cryptocurrency-tailwind',
    title: 'Cryptocurrency Tailwind',
    description:
      'The goal of the project is to provide a cryptocurrency dashboard. Features of the project include: the ability to search for a specific cryptocurrency, the ability to sort cryptocurrencies in table, the ability to display the price of a cryptocurrency in a specific time interval.',
    images: [
      CryptocurrencyTailwind1,
      CryptocurrencyTailwind2,
      CryptocurrencyTailwind3,
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'CoinGecko API'],
    links: [
      {
        link: 'https://vcryptocurrency.netlify.app',
        icon: AiOutlineGlobal,
      },
      {
        link: 'https://github.com/vSkyper/CryptocurrencyTailwind',
        icon: SiGithub,
      },
    ],
  },
  {
    id: 'cryptocurrency',
    title: 'Cryptocurrency',
    description:
      'The goal of the project is to provide a cryptocurrency dashboard. Features of the project include: the ability to search for a specific cryptocurrency, the ability to sort cryptocurrencies in table, the ability to display the price of a cryptocurrency in a specific time interval, the ability to exchange cryptocurrencies.',
    images: [Cryptocurrency1, Cryptocurrency2, Cryptocurrency3],
    technologies: ['React', 'TypeScript', 'MUI', 'CoinGecko API'],
    links: [
      {
        link: 'https://vcryptocurrencyjs.netlify.app',
        icon: AiOutlineGlobal,
      },
      {
        link: 'https://github.com/vSkyper/cryptocurrency',
        icon: SiGithub,
      },
    ],
  },
];
