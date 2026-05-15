import { motion as m } from 'framer-motion';
import { Fragment } from 'react';
import type { ProjectHeaderProps } from './interface';

export default function ProjectHeader({
  title,
  description,
}: ProjectHeaderProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{ willChange: 'transform, opacity' }}
      className='space-y-3 sm:space-y-3'
    >
      <div className='inline-flex items-center gap-2 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-sm'>
        <span className='w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400 animate-pulse' />
        <span className='text-[10px] sm:text-[11px] font-medium text-blue-200 tracking-wide uppercase'>
          Project Details
        </span>
      </div>
      <h1 className='text-2xl sm:text-5xl font-bold text-white tracking-tight'>
        {title}
      </h1>
      <div className='prose prose-invert max-w-none'>
        <div className='text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl'>
          {description.split(/<br\s*\/?>/i).map((line, i, arr) => (
            <Fragment key={i}>
              {line.split('`').map((part, j) =>
                j % 2 === 1 ? (
                  <code
                    key={j}
                    className='bg-white/10 text-white px-1.5 py-0.5 rounded text-sm font-mono'
                  >
                    {part}
                  </code>
                ) : (
                  part
                ),
              )}
              {i < arr.length - 1 && <br />}
            </Fragment>
          ))}
        </div>
      </div>
    </m.div>
  );
}
