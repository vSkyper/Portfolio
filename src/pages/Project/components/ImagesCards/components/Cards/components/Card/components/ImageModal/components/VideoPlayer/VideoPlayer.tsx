import { useState } from 'react';
import type { VideoPlayerProps } from './interface';

const getGoogleDriveEmbedUrl = (url: string): string => {
  let embedUrl = url;
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    embedUrl = `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }

  // Try to force autoplay
  if (embedUrl.includes('?')) {
    return `${embedUrl}&autoplay=1`;
  }
  return `${embedUrl}?autoplay=1`;
};

export default function VideoPlayer({ src, mobile }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative bg-black overflow-hidden flex items-center justify-center ${
        mobile
          ? 'w-[calc(100vw-1rem)] h-[50vh] landscape:w-dvw! landscape:h-dvh! landscape:aspect-auto'
          : 'aspect-video'
      }`}
      style={
        !mobile
          ? {
              width: 'min(95vw, 80vh * 1.7778)',
            }
          : undefined
      }
    >
      {/* Loading Spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      <iframe
        key={src}
        src={getGoogleDriveEmbedUrl(src)}
        onLoad={() => {
          // Google Drive's internal scripts take a moment to settle the layout
          // after the iframe's HTML onLoad fires. Add a small delay to hide the pop.
          setTimeout(() => setIsLoaded(true), 800);
        }}
        className={`absolute top-0 left-0 transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${
          mobile
            ? 'w-[200%] h-[200%] origin-top-left scale-50'
            : 'w-full h-full'
        }`}
        allow="autoplay"
        loading="eager"
      />
    </div>
  );
}
