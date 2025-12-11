import { motion as m } from 'framer-motion';
import { useEffect, useState } from 'react';

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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <m.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl py-4 shadow-lg shadow-black/5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className='container mx-auto w-11/12 flex items-center justify-between'>
        <div
          className='text-xl font-bold cursor-pointer relative group'
          onClick={() => scrollToSection('home')}
        >
          <span className='bg-clip-text text-transparent bg-linear-to-r from-white to-white/60 group-hover:from-primary group-hover:to-primaryLight transition-all duration-300'>
            MP
          </span>
          <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full' />
        </div>
        <ul className='flex gap-1 sm:gap-2 text-sm sm:text-base font-medium text-white/80'>
          {['Projects', 'Contact'].map((item) => (
            <li
              key={item}
              className='relative px-4 py-2 cursor-pointer group overflow-hidden rounded-full'
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              <span className='relative z-10 group-hover:text-white transition-colors duration-300'>
                {item}
              </span>
              <div className='absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out' />
            </li>
          ))}
        </ul>
      </div>
    </m.nav>
  );
}
