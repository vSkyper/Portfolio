import { contactLinks } from 'constants/constants';
import { Link } from './components';
import { motion as m } from 'framer-motion';
import { containerAnimation } from 'animations/animations';

export default function Links() {
  return (
    <m.div
      variants={containerAnimation}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='basis-full flex flex-col gap-4 sm:gap-6 mt-6'
    >
      {contactLinks.map((link) => (
        <Link key={link.link} {...link} />
      ))}
    </m.div>
  );
}
