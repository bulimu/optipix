import imageCompression from 'browser-image-compression';
import { CompressionSettings, FileFormat, ProcessedResult } from '../types';

const getMaxWidthOrHeight = (settings: CompressionSettings) => {
  const maxWidth = Math.max(1, settings.maxWidth || Number.POSITIVE_INFINITY);
  const maxHeight = Math.max(1, settings.maxHeight || Number.POSITIVE_INFINITY);
  return Math.min(maxWidth, maxHeight);
};

const getTargetSizeMB = (file: File, quality: number) => {
  const originalSizeMB = file.size / 1024 / 1024;
  return Math.max(0.01, originalSizeMB * quality);
};

const getImageDimensions = async (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.decoding = 'async';
  img.src = url;

  try {
    await img.decode();
    return {
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
};

const toCompressedFile = async (file: File, settings: CompressionSettings, format: string) => {
  return imageCompression(file, {
    maxSizeMB: getTargetSizeMB(file, settings.quality),
    maxWidthOrHeight: getMaxWidthOrHeight(settings),
    useWebWorker: false,
    fileType: format,
    initialQuality: settings.quality,
    preserveExif: true,
  });
};

const makeResult = async (format: string, blob: Blob): Promise<ProcessedResult> => {
  const dimensions = await getImageDimensions(blob);
  return {
    format,
    blob,
    size: blob.size,
    width: dimensions.width,
    height: dimensions.height,
  };
};

const makeSvgResult = async (
  file: File,
  settings: CompressionSettings
): Promise<ProcessedResult> => {
  const pngFile = await toCompressedFile(file, settings, FileFormat.PNG);
  const dataUrl = await imageCompression.getDataUrlFromFile(pngFile);
  const dimensions = await getImageDimensions(pngFile);
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 ${dimensions.width} ${dimensions.height}">
  <image href="${dataUrl}" width="${dimensions.width}" height="${dimensions.height}" />
</svg>`;
  const blob = new Blob([svgString], { type: FileFormat.SVG });

  return {
    format: FileFormat.SVG,
    blob,
    size: blob.size,
    width: dimensions.width,
    height: dimensions.height,
  };
};

export const compressImage = async (
  file: File,
  settings: CompressionSettings
): Promise<ProcessedResult[]> => {
  const formats = settings.formats.length > 0 ? settings.formats : [FileFormat.JPEG];
  const results: ProcessedResult[] = [];

  for (const format of formats) {
    if (format === FileFormat.SVG) {
      results.push(await makeSvgResult(file, settings));
      continue;
    }

    const compressedFile = await toCompressedFile(file, settings, format);
    results.push(await makeResult(format, compressedFile));
  }

  return results;
};

export const fileToDataURL = (file: File): Promise<string> =>
  imageCompression.getDataUrlFromFile(file);
