import { isMobile } from 'helpers/helpers';
import { useEffect, useState } from 'react';

export default function Svg() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  return (
    <svg
      viewBox='0 0 1600 800'
      className='[stroke-dasharray:4674] animate-handwriting scale-90 sm:scale-[.8] md:scale-[.7] lg:scale-50'
    >
      <path
        stroke='url(#a)'
        fill='none'
        strokeLinecap='round'
        strokeWidth='36'
        d='M210 558c105-62 226-155 241-286 7-63-57-73-77-18-16 44-28 183-38 250l-11 76c5-39 22-117 49-149 29-35 87-43 94 15 5 41-23 103 5 124 27 21 96 3 125-16l19-12c26-16 56-43 67-81 10-38-13-62-40-63-16 0-33 6-46 22-26 29-33 88-4 121 13 19 46 36 85 36 34 0 74-14 110-53l14-15c22-28 68-85 87-150 14-53 24-122-3-135l-13-3c-27 0-57 40-71 111-12 58-14 89-14 133-1 37 10 115 74 117 75 2 128-68 152-105 20-31 54-99 68-156 17-66 8-89-15-97-28-9-60 29-76 97-14 61-29 143-11 195 7 22 34 66 74 66 51 0 93-45 114-120 6-21 29-63 71-63 64 0 74 56 71 86-1 30-18 93-81 96-66 3-73-67-61-119 6-21 29-63 71-63 53 0 49 25 87 24 31-1 55-22 63-32'
      />
      <defs>
        <linearGradient
          id='a'
          x1='19'
          x2='1219'
          y1='33.5'
          y2='383'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#0B7E95'>
            {!mobile && (
              <animate
                attributeName='stop-color'
                values='#0B7E95;#7AB5DC;#F55644;#FFAB45;#0B7E95'
                dur='6s'
                begin='4s'
                repeatCount='indefinite'
              />
            )}
          </stop>
          <stop offset='.3' stopColor='#FFAB45'>
            {!mobile && (
              <animate
                attributeName='stop-color'
                values='#FFAB45;#0B7E95;#7AB5DC;#F55644;#FFAB45'
                dur='6s'
                begin='4s'
                repeatCount='indefinite'
              />
            )}
          </stop>
          <stop offset='.6' stopColor='#F55644'>
            {!mobile && (
              <animate
                attributeName='stop-color'
                values='#F55644;#FFAB45;#0B7E95;#7AB5DC;#F55644'
                dur='6s'
                begin='4s'
                repeatCount='indefinite'
              />
            )}
          </stop>
          <stop offset='.9' stopColor='#7AB5DC'>
            {!mobile && (
              <animate
                attributeName='stop-color'
                values='#7AB5DC;#F55644;#FFAB45;#0B7E95;#7AB5DC'
                dur='6s'
                begin='4s'
                repeatCount='indefinite'
              />
            )}
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
