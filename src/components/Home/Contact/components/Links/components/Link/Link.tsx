import { IContactLink } from 'interfaces/interfaces';

interface Props extends IContactLink {
  isVisible: boolean;
  animationDelay: string;
}

export default function Link({
  link,
  icon: Icon,
  type,
  isVisible,
  animationDelay,
}: Props) {
  return (
    <div
      className={`flex items-center mt-4 sm:mt-6 ${animationDelay} opacity-0 ${
        isVisible && 'animate-slide-in-right'
      }`}
    >
      <div className='w-4 h-4 mr-4 sm:mr-5'>
        <Icon />
      </div>
      <a
        className='font-light hover:text-primaryLight transition-all'
        href={type === 'link' ? link : `mailto:${link}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {link}
      </a>
    </div>
  );
}
