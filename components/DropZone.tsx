import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icons } from './Icon';

interface DropZoneProps {
  onFilesSelected: (files: FileList) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected }) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative group cursor-pointer
        flex flex-col items-center justify-center
        w-full h-64
        rounded-xl border-2 border-dashed
        transition-all duration-200 ease-out
        ${
          isDragging
            ? 'border-(--primary) bg-(--primary)/5'
            : 'border-(--border) hover:border-(--primary)/50 hover:bg-(--bg-subtle)'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp, image/gif, image/bmp, image/avif, image/svg+xml"
        className="hidden"
        onChange={handleChange}
      />

      <div
        className={`
        mb-4 p-4 rounded-full 
        transition-transform duration-200
        ${isDragging ? 'scale-110 text-(--primary)' : 'text-(--text-muted) group-hover:text-(--primary)'}
        bg-(--bg-subtle)
      `}
      >
        <Icons.Upload className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-medium mb-2 text-(--text-main)">{t('dropzone')}</h3>
      <p className="text-sm text-(--text-muted) max-w-xs text-center leading-relaxed">
        Supports JPG, PNG, WEBP, SVG, GIF, BMP.
      </p>
      <p className="text-xs text-(--error) font-semibold max-w-xs text-center mt-1">
        {t('privacyNotice')}
      </p>
    </div>
  );
};

export default DropZone;
