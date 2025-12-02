import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { v4 as uuidv4 } from 'uuid';

import { ProcessedFile, CompressionSettings, FileFormat } from './types';
import DropZone from './components/DropZone';
import FileList from './components/FileList';
import SettingsPanel from './components/SettingsPanel';
import PreviewModal from './components/PreviewModal';
import { Icons } from './components/Icon';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import { compressImage } from './services/compressionService';

const DEFAULT_SETTINGS: CompressionSettings = {
  quality: 0.8,
  formats: [FileFormat.JPEG],
  maxWidth: 1920,
  maxHeight: 1080,
};

const App: React.FC = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState<CompressionSettings>(DEFAULT_SETTINGS);

  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Preview Modal State
  const [previewState, setPreviewState] = useState<{
    isOpen: boolean;
    file: ProcessedFile | null;
  }>({ isOpen: false, file: null });

  const handleFilesSelected = async (fileList: FileList) => {
    const fileArray = Array.from(fileList);

    // Validate file types
    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/bmp',
      'image/avif',
      'image/svg+xml',
    ];

    const validFiles = fileArray.filter((file) => validTypes.includes(file.type));
    const rejectedFiles = fileArray.filter((file) => !validTypes.includes(file.type));

    if (rejectedFiles.length > 0) {
      alert(
        `Skipped ${rejectedFiles.length} unsupported file(s). Only image files (JPG, PNG, WEBP, SVG, GIF, BMP, AVIF) are supported.`
      );
    }

    if (validFiles.length === 0) return;

    // Process files concurrently to get dimensions
    const newFilesPromises = validFiles.map(async (file) => {
      const id = uuidv4();
      const previewUrl = URL.createObjectURL(file);

      // Get dimensions asynchronously
      const dimensions = await new Promise<{ w: number; h: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ w: img.width, h: img.height });
        img.onerror = () => resolve({ w: 0, h: 0 }); // Fallback if not an image or error
        img.src = previewUrl;
      });

      return {
        id,
        originalFile: file,
        previewUrl,
        status: 'pending' as const,
        originalSize: file.size,
        originalWidth: dimensions.w,
        originalHeight: dimensions.h,
        results: [],
      };
    });

    const newFiles = await Promise.all(newFilesPromises);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.previewUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handlePreview = (file: ProcessedFile) => {
    setPreviewState({ isOpen: true, file });
  };

  const handleProcess = async () => {
    if (settings.formats.length === 0) {
      alert('Please select at least one output format.');
      return;
    }

    setIsProcessing(true);

    const fileIds = files
      .filter((f) => f.status === 'pending' || f.status === 'error')
      .map((f) => f.id);

    for (const id of fileIds) {
      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: 'processing' } : f)));

      try {
        const currentFile = files.find((f) => f.id === id);
        if (!currentFile) continue;

        // Compression (returns array of results)
        const results = await compressImage(currentFile.originalFile, settings);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? {
                  ...f,
                  status: 'done',
                  results,
                }
              : f
          )
        );
      } catch (error) {
        console.error('Error processing file', id, error);
        setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: 'error' } : f)));
      }
    }

    setIsProcessing(false);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder('optipix-compressed');

    files.forEach((file) => {
      if (file.status === 'done' && file.results.length > 0) {
        const baseName = file.originalFile.name.substring(
          0,
          file.originalFile.name.lastIndexOf('.')
        );

        file.results.forEach((result) => {
          let extension = '';
          switch (result.format) {
            case FileFormat.JPEG:
              extension = '.jpg';
              break;
            case FileFormat.PNG:
              extension = '.png';
              break;
            case FileFormat.WEBP:
              extension = '.webp';
              break;
            case FileFormat.SVG:
              extension = '.svg';
              break;
          }

          // Append extension if not present (safeguard)
          const fileName = baseName.endsWith(extension) ? baseName : `${baseName}${extension}`;
          folder?.file(fileName, result.blob);
        });
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    // Robust saveAs usage
    const saveAs: typeof FileSaver.saveAs =
      FileSaver.saveAs ||
      (FileSaver as typeof FileSaver & { default?: typeof FileSaver.saveAs }).default ||
      FileSaver.saveAs;
    saveAs(content, 'optipix-images.zip');
  };

  const clearAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
  };

  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalSize, 0);
  // Sum of all generated blobs
  const totalCompressedSize = files.reduce((acc, f) => {
    const fileTotal = f.results.reduce((sum, r) => sum + r.size, 0);
    return acc + fileTotal;
  }, 0);

  const totalProcessed = files.filter((f) => f.status === 'done').length;
  // Note: Total saved might be negative if we generate multiple files or larger files (SVG)
  const totalSaved = totalOriginalSize - totalCompressedSize;
  const isAllDone = files.length > 0 && files.every((f) => f.status === 'done');

  return (
    <div className="min-h-screen bg-(--bg-main) text-(--text-main) p-4 md:p-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-6 border-b border-(--border) pb-6 md:pb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-(--primary) flex items-center justify-center text-(--bg-main)">
              <Icons.Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{t('appName')}</h1>
              <p className="text-sm text-(--text-muted)">{t('appSubtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="btn btn-secondary"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Icons.Sun className="w-4 h-4" />
              ) : (
                <Icons.Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </header>

        {/* Main Control Area */}
        <div className="mb-8">
          <SettingsPanel settings={settings} setSettings={setSettings} />
        </div>

        {/* Upload Area */}
        {files.length === 0 ? (
          <DropZone onFilesSelected={handleFilesSelected} />
        ) : (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between card p-4 gap-4 sticky top-4 z-20 shadow-sm">
              <div className="flex items-center gap-4 text-sm w-full md:w-auto px-2">
                <span className="font-medium">
                  {files.length} {t('images')}
                </span>
                {totalProcessed > 0 && (
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${totalSaved > 0 ? 'bg-(--success) text-white' : 'bg-(--bg-subtle) text-(--text-muted)'}`}
                  >
                    {totalSaved > 0
                      ? `${t('saved')} ${(totalSaved / (1024 * 1024)).toFixed(1)} MB`
                      : `+${Math.abs(totalSaved / (1024 * 1024)).toFixed(1)} MB`}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:flex gap-3 w-full md:w-auto">
                {files.some((f) => f.status === 'pending') && (
                  <button
                    onClick={handleProcess}
                    disabled={isProcessing}
                    className="col-span-2 md:col-span-auto btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Icons.Loader className="w-4 h-4 animate-spin" /> {t('processing')}
                      </>
                    ) : (
                      <>
                        <Icons.Zap className="w-4 h-4" /> {t('startProcessing')}
                      </>
                    )}
                  </button>
                )}
                {isAllDone && (
                  <button
                    onClick={handleDownloadAll}
                    className="col-span-2 md:col-span-auto btn btn-primary"
                  >
                    <Icons.Download className="w-4 h-4" /> {t('downloadAllZip')}
                  </button>
                )}{' '}
                {!isAllDone && files.some((f) => f.status === 'done') && !isProcessing && (
                  <button
                    onClick={handleDownloadAll}
                    className="col-span-2 md:col-span-auto btn btn-secondary"
                  >
                    <Icons.Download className="w-4 h-4" /> {t('downloadDone')}
                  </button>
                )}
                <button
                  onClick={() => document.getElementById('add-more-input')?.click()}
                  className="col-span-2 md:col-span-auto btn btn-secondary"
                >
                  <input
                    id="add-more-input"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && handleFilesSelected(e.target.files)}
                  />
                  <Icons.Plus className="w-4 h-4" /> {t('addMore')}
                </button>
                <button onClick={clearAll} className="btn btn-danger">
                  <Icons.Trash className="w-4 h-4" />
                  {t('clearAll')}
                </button>
              </div>
            </div>
            <FileList files={files} onRemove={removeFile} onPreview={handlePreview} />
          </div>
        )}
      </div>

      <PreviewModal
        isOpen={previewState.isOpen}
        file={previewState.file}
        onClose={() => setPreviewState({ ...previewState, isOpen: false })}
      />

      <div className="mt-32" />
      <Footer />
    </div>
  );
};

export default App;
