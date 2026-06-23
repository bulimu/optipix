export interface ProcessedResult {
  format: string;
  blob: Blob;
  size: number;
  width: number;
  height: number;
}

export interface ProcessedFile {
  id: string;
  originalFile: File;
  previewUrl: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  results: ProcessedResult[];
  originalSize: number;
  originalWidth?: number;
  originalHeight?: number;
}

export interface CompressionSettings {
  quality: number; // 0.1 to 1.0
  formats: string[];
  maxWidth: number;
  maxHeight: number;
}

export enum FileFormat {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
  SVG = 'image/svg+xml',
}
