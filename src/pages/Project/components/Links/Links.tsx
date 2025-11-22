import { IProjectDetailsLinks } from 'interfaces/interfaces';
import { Link } from './components';

export default function Links({ links }: IProjectDetailsLinks) {
  return (
    <div className='flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-4'>
      {links.map((link) => (
        <Link key={link.link} {...link} />
      ))}
    </div>
  );
}
