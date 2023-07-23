import { IProjectDetailsLinks } from 'interfaces/interfaces';
import { Link } from './components';

export default function Links({ links }: IProjectDetailsLinks) {
  return (
    <div className='flex flex-col gap-4 sm:gap-6 mt-6'>
      {links.map((link) => (
        <Link key={link.link} {...link} />
      ))}
    </div>
  );
}
