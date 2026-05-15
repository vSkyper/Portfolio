import type { VideoPlayerProps } from './interface';

const getGoogleDriveEmbedUrl = (url: string): string => {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return url;
};

export default function VideoPlayer({ src, mobile }: VideoPlayerProps) {
  return (
    <div
      className={`relative aspect-video bg-black ${
        mobile ? 'landscape:w-dvw! landscape:h-dvh! landscape:aspect-auto' : ''
      }`}
      style={{
        width: 'min(95vw, 80vh * 1.7778)',
      }}
    >
      <iframe
        key={src}
        src={getGoogleDriveEmbedUrl(src)}
        className='absolute inset-0 w-full h-full'
        allow='autoplay; fullscreen'
        allowFullScreen
        loading='eager'
      />
    </div>
  );
}
