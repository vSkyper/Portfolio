import { RefObject } from 'react';

/**
 * Update offset of the content
 * @param wrapperRef Wrapper reference
 * @param contentRef Content reference
 * @param setOffset Set offset
 */
export const updateOffset = (
  wrapperRef: RefObject<HTMLDivElement | null>,
  contentRef: RefObject<HTMLDivElement | null>,
  setOffset: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!wrapperRef.current || !contentRef.current) return;

  requestAnimationFrame(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const { width } = wrapperRef.current.getBoundingClientRect();
    const offSetWidth = contentRef.current.scrollWidth;

    if (width > 0 && offSetWidth > 0) {
      const newOffset = Math.max(0, offSetWidth - width);

      setTimeout(() => {
        setOffset(newOffset);
      }, 100);
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

/**
 * Check if the device is mobile based on screen width and user agent
 * @returns true if mobile device
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;

  const isMobileWidth = window.innerWidth < 768;

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUA =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );

  return isMobileWidth || isMobileUA;
};
