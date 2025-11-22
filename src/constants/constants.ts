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
    id: 'Aukciszek',
    title: 'Aukciszek',
    technology: 'Next.js/FastAPI',
    image: '/images/projects/aukciszek/aukciszek-1.webp',
  },
  {
    id: 'learnhub',
    title: 'LearnHub',
    technology: 'React',
    image: '/images/projects/learnhub/learnhub-1.webp',
  },
  {
    id: 'cryptocurrency',
    title: 'Cryptocurrency',
    technology: 'React',
    image: '/images/projects/cryptocurrency/cryptocurrency-1.webp',
  },
  {
    id: 'terminal',
    title: 'Terminal',
    technology: 'Vanilla JS',
    image: '/images/projects/terminal/terminal-1.webp',
  },
];

export const projectsDetails: IProjectDetails[] = [
  {
    id: 'Aukciszek',
    title: 'Aukciszek',
    description:
      "This privacy-first platform for conducting anonymous reverse auctions was successfully built as a collaborative Master's Thesis. The system eliminates the need to trust a central authority by utilizing Multi-Party Computation (MPC) and Secret Sharing schemes.<br /><br />Sensitive bid data is split into cryptographic 'shares' directly in the user's browser before ever reaching the network. These shares are distributed across independent Python servers, which collaborate to mathematically determine the winning offer without ever seeing or reconstructing the actual bid amounts.<br /><br />While we built the system as a team, my primary role involved implementing these cryptographic protocols and designing the secure, synchronous communication architecture between the computation servers. On the client side, I helped the team integrate the frontend logic to ensure a smooth user experience. The project is split into two repositories: the server logic (backend) and the user interface (client).",
    images: [
      '/images/projects/aukciszek/aukciszek-1.webp',
      '/images/projects/aukciszek/aukciszek-2.webp',
      '/images/projects/aukciszek/aukciszek-3.webp',
      {
        src: 'https://drive.google.com/file/d/1Q3KVh5DHe4mB1yr-2sxOI-Q6Aqm5yEMg',
        thumbnail: '/images/projects/aukciszek/aukciszek-video-thumb-1.webp',
      },
      {
        src: 'https://drive.google.com/file/d/1fSgS9pEKuz8dZYoWGUAC2gY0wQGywJms',
        thumbnail: '/images/projects/aukciszek/aukciszek-video-thumb-2.webp',
      },
    ],
    technologies: [
      'FastAPI',
      'Python',
      'Supabase',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
    ],
    links: [
      {
        link: 'https://github.com/Aukciszek/backend',
        icon: SiGithub,
      },
      {
        link: 'https://github.com/Aukciszek/client',
        icon: SiGithub,
      },
    ],
  },
  {
    id: 'learnhub',
    title: 'LearnHub',
    description:
      'Developed as a collaborative Engineering Thesis, LearnHub is a dedicated remote learning platform tailored for small study groups. Working closely with my team, we aimed to create a virtual classroom environment that feels personal and effective. The system provides teachers with a suite of powerful tools to present educational materials, manage the class flow, and observe student progress in real-time. A key focus was enabling seamless interaction; using WebRTC, we implemented full voice and video communication to ensure smooth connectivity. Teachers can also step in to offer one-on-one assistance to specific students, mimicking the direct support found in physical classrooms.',
    images: [
      '/images/projects/learnhub/learnhub-1.webp',
      '/images/projects/learnhub/learnhub-2.webp',
      '/images/projects/learnhub/learnhub-3.webp',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'WebRTC'],
    links: [],
  },
  {
    id: 'cryptocurrency',
    title: 'Cryptocurrency',
    description:
      "This dashboard serves as a central hub for tracking the crypto market. I designed it to be intuitive and fast, allowing users to instantly search for assets without digging through endless lists. Key features include a detailed data table for sorting by price or volume, interactive charts for visualizing historical price movements, and a built-in currency converter. It's a complete tool for anyone looking to monitor digital assets and analyze market trends.",
    images: [
      '/images/projects/cryptocurrency/cryptocurrency-1.webp',
      '/images/projects/cryptocurrency/cryptocurrency-2.webp',
      '/images/projects/cryptocurrency/cryptocurrency-3.webp',
    ],
    technologies: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'MUI',
      'CoinGecko API',
    ],
    links: [
      {
        link: 'https://vcryptocurrency.netlify.app',
        icon: AiOutlineGlobal,
      },
      {
        link: 'https://github.com/vSkyper/Cryptocurrency',
        icon: SiGithub,
      },
    ],
  },
  {
    id: 'terminal',
    title: 'Terminal',
    description:
      "A fun, browser-based simulation of a terminal interface. I built this primarily to sharpen my Vanilla JS skills without relying on frameworks. While it's not a real system shell, I programmed it to mimic the look and feel of one, creating my own logic for standard commands like `help`, `clear`, `history`, and `echo`, as well as simulated utilities like `ping` and file navigation commands like `pwd` and `ls`.",
    images: [
      '/images/projects/terminal/terminal-1.webp',
      '/images/projects/terminal/terminal-2.webp',
      '/images/projects/terminal/terminal-3.webp',
    ],
    technologies: ['JavaScript', 'TypeScript', 'HTML', 'Sass'],
    links: [
      {
        link: 'https://vterminal.netlify.app',
        icon: AiOutlineGlobal,
      },
      {
        link: 'https://github.com/vSkyper/Terminal',
        icon: SiGithub,
      },
    ],
  },
];
