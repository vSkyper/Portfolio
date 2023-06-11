'use client';

import { useEffect, useState } from 'react';
import { Logic } from './components';

export default function Project() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? (
    <Logic>
      <div className='fixed inset-0 z-50 bg-black bg-opacity-50' />
    </Logic>
  ) : null;
}
