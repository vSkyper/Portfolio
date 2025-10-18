// Cache for blur data URLs to avoid regenerating
const blurCache = new Map<string, string>();

/**
 * Generates a low-quality blurred placeholder (LQIP) as a data URL
 * Caches results to avoid regenerating the same placeholder multiple times
 */
export async function generateBlurDataURL(
  src: string,
  width = 32
): Promise<string> {
  if (blurCache.has(src)) {
    return blurCache.get(src)!;
  }

  return new Promise<string>((resolve) => {
    const img = new Image();

    // Timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      cleanup();
      resolve('');
    }, 5000);

    const cleanup = () => {
      clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };

    img.onload = () => {
      cleanup();

      try {
        const scale = width / img.width;
        const canvas = document.createElement('canvas');
        const targetWidth = Math.max(1, Math.round(img.width * scale));
        const targetHeight = Math.max(1, Math.round(img.height * scale));

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d', {
          alpha: false, // Performance optimization
          willReadFrequently: false,
        });

        if (!ctx) {
          resolve('');
          return;
        }

        // Draw the image scaled down
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Convert to data URL with lower quality for smaller size
        const dataUrl = canvas.toDataURL('image/jpeg', 0.5);

        // Cache the result
        blurCache.set(src, dataUrl);

        resolve(dataUrl);
      } catch (error) {
        console.error('Error generating blur placeholder:', error);
        resolve('');
      }
    };

    img.onerror = () => {
      cleanup();
      console.warn(`Failed to load image for blur generation: ${src}`);
      resolve('');
    };

    // Only set crossOrigin if the image is from a different origin
    try {
      const imgUrl = new URL(src, window.location.href);
      const currentOrigin = window.location.origin;

      if (imgUrl.origin !== currentOrigin) {
        img.crossOrigin = 'anonymous';
      }
    } catch {
      // If URL parsing fails, don't set crossOrigin
    }

    img.src = src;
  });
}
