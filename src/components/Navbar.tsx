import { motion as m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiGithub } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of the navbar + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <m.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'top-4 w-[90%] sm:w-112.5 rounded-full bg-black/20 backdrop-blur-3xl backdrop-saturate-150 border border-white/10 shadow-xl shadow-black/10 py-2.5'
          : 'top-0 w-full rounded-none bg-transparent border border-transparent py-6'
      }`}
    >
      <div
        className={`flex items-center justify-between transition-all duration-500 container mx-auto gap-8 sm:gap-12 ${
          scrolled ? 'px-4 sm:px-6 w-full' : 'w-11/12'
        }`}
      >
        <div
          className='text-xl font-bold cursor-pointer relative group select-none'
          onClick={() => scrollToSection('home')}
        >
          <span className='bg-clip-text text-transparent bg-linear-to-r from-white to-white/60 group-hover:from-primary group-hover:to-primaryLight transition-all duration-300'>
            MP
          </span>
          <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full' />
        </div>

        <ul className='flex items-center gap-2'>
          {['About', 'Projects', 'Contact'].map((item) => (
            <li
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className='relative px-2 py-1.5 sm:px-3 text-xs sm:text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 cursor-pointer'
            >
              {item}
            </li>
          ))}
          <li className='w-px h-4 bg-white/10 mx-1 sm:mx-2' />
          <li>
            <a
              href='https://github.com/vSkyper'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center -ml-1 sm:ml-0 w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold bg-white text-black rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95'
              aria-label='GitHub Profile'
            >
              <span className='hidden sm:inline'>GitHub</span>
              <FiGithub className='sm:hidden w-4 h-4' />
            </a>
          </li>
        </ul>
      </div>
    </m.nav>
  );
}
