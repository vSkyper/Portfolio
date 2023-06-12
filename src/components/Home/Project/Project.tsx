'use client';

import { useEffect, useState } from 'react';
import { Logic } from './components';
interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Project({ setIsOpen }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keyup', handleEscape);
    return () => {
      document.addEventListener('keyup', handleEscape);
    };
  });

  return mounted ? (
    <Logic>
      <div className='fixed inset-0 z-50 bg-black bg-opacity-50' />
    </Logic>
  ) : null;
}
