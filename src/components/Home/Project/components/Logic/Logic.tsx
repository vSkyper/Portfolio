import { ReactElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactElement;
}

export default function Logic({ children }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal-project');
    if (!modalRoot || !elRef.current) return;

    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(<>{children}</>, elRef.current);
}
