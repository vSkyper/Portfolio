import { RefObject } from 'react';

/**
 * Update offset of the content
 * @param wrapperRef Wrapper reference
 * @param contentRef Content reference
 * @param setOffset Set offset
 * @param setDragField Set drag field
 */
export const updateOffset = (
  wrapperRef: RefObject<HTMLDivElement | null>,
  contentRef: RefObject<HTMLDivElement | null>,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  setDragField: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!wrapperRef.current || !contentRef.current) return;

  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const { width } = wrapperRef.current.getBoundingClientRect();
    const offSetWidth = contentRef.current.scrollWidth;

    // Only update if we have valid dimensions
    if (width > 0 && offSetWidth > 0) {
      const newOffset = Math.max(0, offSetWidth - width);

      setTimeout(() => {
        setOffset(newOffset);
        setDragField(offSetWidth);
      }, 100); // Reduced timeout for better responsiveness
    }
  });
};

/**
 * Call function after desired number of calls
 * @param count Desired number of calls
 * @param f Function to call after desired number of calls
 */
export const after = (count: number, f: () => void) => {
  let noOfCalls = 0;
  return function () {
    noOfCalls++;
    if (noOfCalls === count) {
      f();
    }
  };
};
