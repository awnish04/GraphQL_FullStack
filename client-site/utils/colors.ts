// utils/colors.ts

import { FastAverageColor } from 'fast-average-color';

/**
 * Extract average color from an image URL (uploaded, base64, or object URL).
 * @param imageUrl URL or object URL of the image
 * @returns Hex color string (e.g., #aabbcc)
 */
export async function extractAverageColor(imageUrl: string): Promise<string> {
  const fac = new FastAverageColor();
  const img = new Image();
  img.crossOrigin = "anonymous"; // Required for external images
  img.src = imageUrl;

  return new Promise((resolve, reject) => {
    img.onload = () => {
      try {
        const { hex } = fac.getColor(img);
        resolve(hex);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
  });
}
