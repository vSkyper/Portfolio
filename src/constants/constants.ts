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
    image: '/images/home/aukciszek.webp',
    image_blurred: '/images/home/aukciszek_blurred.webp',
  },
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
  {
    id: 'terminal',
    title: 'Terminal',
    technology: 'Vanilla JS',
    image: '/images/home/terminal.webp',
    image_blurred: '/images/home/terminal_blurred.webp',
  },
];

export const projectsDetails: IProjectDetails[] = [
  {
    id: 'Aukciszek',
    title: 'Aukciszek',
    description:
      "This project, which was successfully developed and completed as a Master's Thesis, focuses on creating a secure and reliable platform for conducting online auctions. <br>My main contribution was centered on the backend system development and the implementation of a sophisticated algorithm designed to facilitate safe auctions. The backend infrastructure was built using Python with the FastAPI framework, utilizing Supabase for database management and real-time capabilities. I was responsible for designing and implementing the core logic for secure bidding and transaction finalization.<br>Additionally, I made contributions to the client-side application, ensuring seamless integration with the backend services. The entire system is split into two main components: the server-side logic (GitHub: Aukciszek/backend) and the user interface (GitHub: Aukciszek/client).",
    images: [
      '/images/project/aukciszek-1.webp',
      '/images/project/aukciszek-2.webp',
      '/images/project/aukciszek-3.webp',
      {
        src: 'https://drive.google.com/file/d/1Q3KVh5DHe4mB1yr-2sxOI-Q6Aqm5yEMg',
        thumbnail: '/images/project/aukciszek-video-thumb-1.webp',
      },
      {
        src: 'https://drive.google.com/file/d/1fSgS9pEKuz8dZYoWGUAC2gY0wQGywJms',
        thumbnail: '/images/project/aukciszek-video-thumb-2.webp',
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
      "The primary goal of this initiative was to deliver a remote learning platform specifically tailored for small class groups. This platform was designed to effectively teach both children and teenagers. The project was successfully completed as an Engineering Thesis (praca inżynierska). Key features of the system include the teacher's ability to present any educational material and tool to the students. Furthermore, it supports voice and video communication among all meeting participants. The teacher can also observe students' work in real-time and has the capability to provide one-on-one assistance to a selected student. Finally, students are able to collaborate with each other live through built-in cooperation mechanisms.",
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
      'The goal of this project is to create a comprehensive and intuitive cryptocurrency dashboard that serves as a central hub for market analysis. The platform offers a powerful set of features designed to enhance user interaction and provide deep market insights. Users are empowered with the ability to search for a specific cryptocurrency instantly, allowing for quick retrieval of detailed asset information without navigating extensive lists. Furthermore, the dashboard includes a highly functional data table where users can sort cryptocurrencies based on multiple performance indicators, such as price, market capitalization, and volume, to easily identify market trends and leaders. A key analytical feature is the capability to display the price of a cryptocurrency across a specific time interval, utilizing interactive charts to visualize historical data and track price movements over various periods. Finally, to support transactional planning and understanding, the project incorporates an exchange utility that allows users to seamlessly calculate the conversion or exchange value of one cryptocurrency for another, or into fiat currencies. This collection of features makes the dashboard a complete tool for monitoring and engaging with the dynamic digital asset market.',
    images: [
      '/images/project/cryptocurrency-1.webp',
      '/images/project/cryptocurrency-2.webp',
      '/images/project/cryptocurrency-3.webp',
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
      "The project's goal is to provide a simple terminal interface in the browser. The application is built using pure Vanilla JavaScript with TypeScript and styled with Sass, without relying on any external frameworks, ensuring it is lightweight and fast. Key features include basic system commands such as: help, clear, history, echo [text], and information utilities like: time, date, ping, whoami, version, config, pwd, and dir/ls.",
    images: [
      '/images/project/terminal-1.webp',
      '/images/project/terminal-2.webp',
      '/images/project/terminal-3.webp',
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
