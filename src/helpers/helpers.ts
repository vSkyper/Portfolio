import { RefObject } from 'react';

export const updateOffset = (
  wrapperRef: RefObject<HTMLDivElement>,
  contentRef: RefObject<HTMLDivElement>,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  setDragField: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!wrapperRef.current || !contentRef.current) return;

  const { width } = wrapperRef.current.getBoundingClientRect();

  const offSetWidth = contentRef.current.scrollWidth;
  const newOffset = offSetWidth - width;

  setTimeout(() => {
    setOffset(newOffset);
    setDragField(offSetWidth);
  }, 500);
};

export const after = (count: number, f: () => void) => {
  let noOfCalls = 0;
  return function () {
    noOfCalls++;
    if (noOfCalls === count) {
      f();
    }
  };
};
