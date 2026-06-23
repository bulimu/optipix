import React, { useEffect, useRef, useState } from 'react';
import { Icons } from './Icon';
import { ProcessedFile } from '../types';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: ProcessedFile | null;
}

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, file }) => {
  const [activeTab, setActiveTab] = useState<string | number>('original');
  const [blobUrls, setBlobUrls] = useState<Map<number, string>>(new Map());
  const blobUrlsRef = useRef<Map<number, string>>(new Map());

  const revokeBlobUrls = () => {
    blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    blobUrlsRef.current = new Map();
  };

  useEffect(() => {
    return revokeBlobUrls;
  }, []);

  useEffect(() => {
    if (!isOpen || !file) return;

    revokeBlobUrls();

    const newMap = new Map<number, string>();
    file.results.forEach((res, idx) => {
      newMap.set(idx, URL.createObjectURL(res.blob));
    });

    blobUrlsRef.current = newMap;
    setBlobUrls(newMap);
    setActiveTab(file.results.length > 0 ? 0 : 'original');
  }, [isOpen, file]);

  if (!isOpen || !file) return null;

  const isOriginal = activeTab === 'original';
  const currentResult = typeof activeTab === 'number' ? file.results[activeTab] : null;
  const currentUrl = isOriginal
    ? file.previewUrl
    : typeof activeTab === 'number'
      ? blobUrls.get(activeTab) || ''
      : '';
  const currentFormat = isOriginal
    ? 'Original'
    : currentResult?.format.split('/')[1].toUpperCase().replace('SVG+XML', 'SVG') || 'IMG';
  const fileName = file.originalFile.name;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content h-[76vh] max-h-[76vh] max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col border-b border-(--border) bg-(--bg-card)">
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col min-w-0">
              <h3
                className="text-lg font-semibold truncate max-w-md text-(--text-main)"
                title={fileName}
              >
                {fileName}
              </h3>
            </div>
            <button onClick={onClose} className="btn btn-ghost p-2 rounded-lg" aria-label="Close">
              <Icons.Close className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 px-4 pb-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('original')}
              className={`relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                isOriginal
                  ? 'border-(--primary) text-(--primary)'
                  : 'border-transparent text-(--text-muted) hover:text-(--text-main)'
              }`}
            >
              Original ({formatSize(file.originalSize)})
            </button>

            {file.results.map((res, idx) => {
              const isActive = activeTab === idx;
              const fmtName = res.format.split('/')[1].toUpperCase().replace('SVG+XML', 'SVG');
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                    isActive
                      ? 'border-(--primary) text-(--primary)'
                      : 'border-transparent text-(--text-muted) hover:text-(--text-main)'
                  }`}
                >
                  {fmtName} ({formatSize(res.size)})
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-11 px-4 py-2 flex items-center justify-between gap-4 text-xs bg-(--bg-subtle) border-b border-(--border)">
          <div className="flex items-center gap-3">
            <span className="font-mono text-(--text-muted)">
              {isOriginal
                ? `${file.originalWidth}x${file.originalHeight}`
                : `${currentResult?.width}x${currentResult?.height}`}
            </span>
            {!isOriginal && currentResult && (
              <span
                className={`px-1.5 py-0.5 rounded font-bold ${
                  currentResult.size < file.originalSize
                    ? 'bg-(--success) text-white'
                    : 'bg-(--error) text-white'
                }`}
              >
                {currentResult.size < file.originalSize ? 'Saved ' : 'Increased '}
                {Math.abs(
                  Math.round(((file.originalSize - currentResult.size) / file.originalSize) * 100)
                )}
                %
              </span>
            )}
          </div>
          <div className="flex h-7 items-center justify-end gap-3 text-(--text-muted)">
            <span>{isOriginal ? 'Source Image' : 'Compressed Output'}</span>
            {!isOriginal && currentResult && currentUrl && (
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = currentUrl;

                  let ext = currentResult.format.split('/')[1];
                  if (currentResult.format.includes('svg')) ext = 'svg';
                  else if (ext === 'jpeg') ext = 'jpg';

                  const safeName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
                  link.download = `${safeName}.${ext}`;

                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="btn btn-primary h-7 px-2 py-1 text-xs"
              >
                <Icons.Download className="w-3.5 h-3.5" />
                Download {currentFormat}
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden p-3 flex items-center justify-center bg-(--bg-subtle)">
          {currentUrl ? (
            <img
              src={currentUrl}
              alt="Preview"
              className="block h-auto w-auto max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium text-(--text-muted)">
              <Icons.Loader className="w-4 h-4 animate-spin" />
              Loading preview...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
