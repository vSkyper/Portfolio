import { contactLinks } from 'constants/constants';
import { Link } from './components';

interface Props {
  isVisible: boolean;
}

export default function Links({ isVisible }: Props) {
  const delays = [
    '[animation-delay:0.1s]',
    '[animation-delay:0.2s]',
    '[animation-delay:0.3s]',
  ];

  return (
    <div className='basis-full'>
      {contactLinks.map((link, index) => (
        <Link
          key={link.link}
          {...link}
          isVisible={isVisible}
          animationDelay={delays[index]}
        />
      ))}
    </div>
  );
}
