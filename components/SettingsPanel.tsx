import React from 'react';
import { CompressionSettings, FileFormat } from '../types';
import { Icons } from './Icon';

interface SettingsPanelProps {
  settings: CompressionSettings;
  setSettings: React.Dispatch<React.SetStateAction<CompressionSettings>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings }) => {
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, quality: parseFloat(e.target.value) }));
  };

  const toggleFormat = (format: string) => {
    setSettings((prev) => {
      const exists = prev.formats.includes(format);
      let newFormats;
      if (exists) {
        // Prevent removing the last format
        if (prev.formats.length === 1) return prev;
        newFormats = prev.formats.filter((f) => f !== format);
      } else {
        newFormats = [...prev.formats, format];
      }
      return { ...prev, formats: newFormats };
    });
  };

  return (
    <div className="card p-6 mb-8">
      <div className="flex items-center gap-3 mb-6 border-b border-(--border) pb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-(--primary) text-(--bg-main)">
          <Icons.Settings className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-semibold">Compression Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Quality Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <label className="font-medium">Quality</label>
            <span className="font-mono font-medium text-(--primary)">
              {Math.round(settings.quality * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={settings.quality}
            onChange={handleQualityChange}
            className="w-full accent-(--primary)"
          />
          <div className="flex justify-between text-xs text-(--text-muted)">
            <span>Smaller File</span>
            <span>Better Quality</span>
          </div>
        </div>

        {/* Max Dimensions */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Max Dimensions</label>
          <div className="flex gap-2">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium "></span>
              <input
                type="number"
                value={settings.maxWidth}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, maxWidth: parseInt(e.target.value) || 1920 }))
                }
                className="input-field pl-8"
              />
            </div>
            <div className="relative w-full">
              {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-(--text-muted)">H</span> */}
              <input
                type="number"
                value={settings.maxHeight}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, maxHeight: parseInt(e.target.value) || 1080 }))
                }
                className="input-field pl-8"
              />
            </div>
          </div>
        </div>

        {/* Format Selection (Multi-select) */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Output Formats</label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'JPG', value: FileFormat.JPEG },
              { label: 'PNG', value: FileFormat.PNG },
              { label: 'WEBP', value: FileFormat.WEBP },
              { label: 'SVG', value: FileFormat.SVG },
            ].map((fmt) => {
              const isSelected = settings.formats.includes(fmt.value);
              return (
                <button
                  key={fmt.value}
                  onClick={() => toggleFormat(fmt.value)}
                  className={`flex-1 min-w-[60px] text-xs py-2 rounded-md font-medium transition-all border ${
                    isSelected
                      ? 'bg-(--primary) text-(--bg-main) border-(--primary)'
                      : 'bg-(--bg-card) text-(--text-main) border-(--border) hover:bg-(--bg-subtle)'
                  }`}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
