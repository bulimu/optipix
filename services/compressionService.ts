/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompressionSettings, FileFormat, ProcessedResult } from '../types';
import UPNG from 'upng-js';
import pako from 'pako';

// Make UPNG available globally for the compression logic
if (typeof window !== 'undefined') {
  (window as any).UPNG = UPNG;
  (window as any).pako = pako;
}

export const compressImage = async (
  file: File,
  settings: CompressionSettings
): Promise<ProcessedResult[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = (e) => reject(e);

    img.onload = async () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > settings.maxWidth || height > settings.maxHeight) {
        const ratio = Math.min(settings.maxWidth / width, settings.maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      // CRITICAL FIX: UPNG and Canvas pixel manipulation require Integer dimensions.
      width = Math.floor(width);
      height = Math.floor(height);

      // Safety check to ensure dimensions are at least 1px
      width = Math.max(1, width);
      height = Math.max(1, height);

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw image
      ctx.drawImage(img, 0, 0, width, height);

      const results: ProcessedResult[] = [];
      const formats = settings.formats.length > 0 ? settings.formats : [FileFormat.JPEG];

      const processFormat = (format: string): Promise<void> => {
        return new Promise((resFormat) => {
          if (format === FileFormat.SVG) {
            // Generate SVG by embedding the image as base64 inside an SVG wrapper
            const dataUrl = canvas.toDataURL('image/png');
            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <image href="${dataUrl}" width="${width}" height="${height}" />
</svg>`;
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            results.push({ format, blob, size: blob.size, width, height });
            resFormat();
          } else if (format === FileFormat.PNG && settings.quality < 1.0 && window.UPNG) {
            // Use UPNG.js for lossy compression (TinyPNG style) if quality < 1
            const imageData = ctx.getImageData(0, 0, width, height);
            const buffer = imageData.data.buffer;

            const cnum = 256;

            try {
              const pngBuffer = window.UPNG.encode([buffer], width, height, cnum);
              const blob = new Blob([pngBuffer], { type: FileFormat.PNG });
              results.push({ format, blob, size: blob.size, width, height });
            } catch (e) {
              console.error('UPNG Compression failed:', e);
              canvas.toBlob((blob) => {
                if (blob) results.push({ format, blob, size: blob.size, width, height });
                resFormat();
              }, FileFormat.PNG);
              return;
            }
            resFormat();
          } else {
            // Default browser compression (Canvas)
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  results.push({ format, blob, size: blob.size, width, height });
                }
                resFormat();
              },
              format,
              settings.quality
            );
          }
        });
      };

      try {
        await Promise.all(formats.map((f) => processFormat(f)));
        resolve(results);
      } catch (err) {
        reject(err);
      }
    };

    reader.readAsDataURL(file);
  });
};

export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
