import React from 'react';
import { ProcessedFile, FileFormat } from '../types';
import { Icons } from './Icon';

interface FileListProps {
  files: ProcessedFile[];
  onRemove: (id: string) => void;
  onPreview: (file: ProcessedFile) => void;
}

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFormatLabel = (mimeType: string) => {
  switch (mimeType) {
    case FileFormat.JPEG:
      return 'JPG';
    case FileFormat.PNG:
      return 'PNG';
    case FileFormat.WEBP:
      return 'WEBP';
    case FileFormat.SVG:
      return 'SVG';
    default:
      return 'FILE';
  }
};

const FileList: React.FC<FileListProps> = ({ files, onRemove, onPreview }) => {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 mt-8">
      {files.map((file, index) => {
        const isDone = file.status === 'done';
        const isProcessing = file.status === 'processing';
        const primaryResult = file.results.length > 0 ? file.results[0] : null;

        return (
          <div
            key={file.id}
            className="
              group relative
              flex flex-col md:flex-row items-center gap-4
              p-3 rounded-lg border border-(--border) bg-(--bg-card)
              transition-all duration-200
              hover:border-(--primary)/30
            "
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Left Section: Thumbnail & Original Info */}
            <div className="flex items-center gap-4 w-full md:w-[30%] min-w-0">
              {/* Thumbnail */}
              <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-(--bg-subtle) border border-(--border)">
                <img src={file.previewUrl} alt="preview" className="w-full h-full object-cover" />
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                    <Icons.Loader className="w-5 h-5 animate-spin text-white" />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="min-w-0 flex-1">
                <div
                  className="font-medium truncate text-(--text-main) text-sm"
                  title={file.originalFile.name}
                >
                  {file.originalFile.name}
                </div>
                <div className="flex items-center gap-2 text-xs mt-0.5 text-(--text-muted)">
                  <span className="font-mono">{formatSize(file.originalSize)}</span>

                  {file.originalWidth && file.originalHeight && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-(--border)"></span>
                      <span>
                        {file.originalWidth}×{file.originalHeight}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Middle: Divider (Desktop only) */}
            <div className="hidden md:block w-px h-8 bg-(--border)"></div>

            {/* Right Section: Output Results or Status */}
            <div className="flex-1 w-full min-w-0 flex flex-col md:flex-row items-center justify-between gap-4">
              {isProcessing ? (
                <div className="w-full flex items-center gap-3 px-2">
                  <div className="h-1.5 flex-1 bg-(--border) rounded-full overflow-hidden">
                    <div className="h-full bg-(--primary) animate-pulse w-2/3 rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium text-(--primary)">Compressing...</span>
                </div>
              ) : isDone && primaryResult ? (
                <>
                  {/* Stats & Results Group */}
                  <div className="flex flex-wrap items-center justify-start gap-4 w-full md:w-auto flex-1">
                    {/* Compressed Dimensions */}
                    <div className="flex flex-col items-start shrink-0 min-w-20">
                      <span className="text-[10px] uppercase tracking-wide text-(--text-muted)">
                        Output Size
                      </span>
                      <span className="text-sm font-mono font-medium text-(--text-main)">
                        {primaryResult.width} × {primaryResult.height}
                      </span>
                    </div>

                    {/* Format Results Cards */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      {file.results.map((res, idx) => {
                        const savings = res.size - file.originalSize;
                        const percent = Math.round((savings / file.originalSize) * 100);
                        const isSaving = savings < 0;

                        return (
                          <div
                            key={idx}
                            className="
                                flex items-center gap-2 px-2.5 py-1.5
                                rounded border border-(--border) bg-(--bg-subtle)
                              "
                          >
                            <div className="flex flex-col items-start justify-center min-w-10">
                              <span
                                className={`text-xs font-bold leading-tight ${isSaving ? 'text-(--success)' : 'text-(--error)'}`}
                              >
                                {isSaving ? '' : '+'}
                                {percent}%
                              </span>
                              <span className="text-[10px] font-mono leading-tight text-(--text-muted)">
                                {formatSize(res.size)}
                              </span>
                            </div>
                            <div className="text-xs font-bold uppercase tracking-wide pl-1 text-(--text-main)">
                              {getFormatLabel(res.format)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions Group */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {/* Preview Button */}
                    <button
                      onClick={() => onPreview(file)}
                      className="
                        flex items-center gap-2 px-3 py-1.5 rounded
                        text-sm font-medium text-(--text-main)
                        bg-(--bg-subtle) hover:bg-(--border)
                        transition-colors
                      "
                    >
                      <Icons.Eye className="w-4 h-4" />
                      <span className="hidden md:inline">Preview</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => onRemove(file.id)}
                      className="
                        p-2 rounded-md 
                        text-(--text-muted) hover:text-(--error) hover:bg-(--error)/10
                        transition-colors
                      "
                      title="Remove file"
                    >
                      <Icons.Trash className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-xs px-2 italic text-(--text-muted) flex-1">
                    <span>Waiting to process...</span>
                  </div>
                  {/* Delete Button for pending files */}
                  <button
                    onClick={() => onRemove(file.id)}
                    className="
                      p-2 rounded-md 
                      text-(--text-muted) hover:text-(--error) hover:bg-(--error)/10
                      transition-colors
                    "
                    title="Remove file"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileList;
