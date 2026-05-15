import type { SvgDefsProps } from './interface';

export default function SvgDefs({ mobile }: SvgDefsProps) {
  return (
    <defs>
      {/* Subtle neon glow filter */}
      <filter id='neon-glow' x='-50%' y='-50%' width='200%' height='200%'>
        <feGaussianBlur in='SourceGraphic' stdDeviation='3' result='blur1' />
        <feGaussianBlur in='SourceGraphic' stdDeviation='1.5' result='blur2' />
        <feMerge>
          <feMergeNode in='blur1' />
          <feMergeNode in='blur2' />
          <feMergeNode in='SourceGraphic' />
        </feMerge>
      </filter>

      {/* Original colors - more muted and elegant */}
      <linearGradient
        id='neon-gradient'
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
        <stop offset='1' stopColor='#7AB5DC'>
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
  );
}
