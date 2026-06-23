import React from 'react';
import { useTranslation } from 'react-i18next';
import { CompressionSettings, FileFormat } from '../types';
import { Icons } from './Icon';

interface SettingsPanelProps {
  settings: CompressionSettings;
  setSettings: React.Dispatch<React.SetStateAction<CompressionSettings>>;
}

const DIMENSION_STEP = 10;

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings }) => {
  const { t } = useTranslation();

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, quality: parseFloat(e.target.value) }));
  };

  const updateDimension = (key: 'maxWidth' | 'maxHeight', value: number) => {
    const fallback = key === 'maxWidth' ? 1920 : 1080;
    setSettings((prev) => ({ ...prev, [key]: Math.max(1, value || fallback) }));
  };

  const stepDimension = (key: 'maxWidth' | 'maxHeight', delta: number) => {
    setSettings((prev) => ({ ...prev, [key]: Math.max(1, prev[key] + delta) }));
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

  const renderDimensionInput = (label: string, key: 'maxWidth' | 'maxHeight') => (
    <label className="min-w-0 flex-1">
      <div className="relative">
        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 font-semibold uppercase text-(--text-muted)">
          {label}
        </span>
        <input
          type="number"
          min="1"
          step={DIMENSION_STEP}
          value={settings[key]}
          onChange={(e) => updateDimension(key, parseInt(e.target.value))}
          className="w-full rounded-xs border border-(--border) bg-(--bg-card) py-2 pr-8 pl-8 text-sm text-(--text-main) focus:border-transparent focus:outline-2 focus:outline-(--primary)"
        />

        <div className="absolute top-1 right-1 bottom-1 flex w-5 flex-col overflow-hidden border border-(--border) bg-(--bg-subtle)">
          <button
            type="button"
            onClick={() => stepDimension(key, DIMENSION_STEP)}
            className="flex flex-1 items-center justify-center text-(--text-muted) hover:bg-(--border) hover:text-(--text-main)"
            aria-label={`Increase ${label}`}
          >
            <Icons.ChevronDown className="h-3 w-3 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => stepDimension(key, -DIMENSION_STEP)}
            className="flex flex-1 items-center justify-center border-t border-(--border) text-(--text-muted) hover:bg-(--border) hover:text-(--text-main)"
            aria-label={`Decrease ${label}`}
          >
            <Icons.ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    </label>
  );

  return (
    <div className="card p-6 mb-8">
      <div className="flex items-center gap-3 mb-6 border-b border-(--border) pb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-(--primary) text-(--bg-main)">
          <Icons.Settings className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-semibold">{t('compressionSettings')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Quality Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <label className="font-medium">{t('quality')}</label>
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
            <span>{t('smallerFile')}</span>
            <span>{t('betterQuality')}</span>
          </div>
        </div>

        {/* Max Dimensions */}
        <div className="space-y-3">
          <label className="text-sm font-medium">{t('maxDimensions')}</label>
          <div className="flex gap-2">
            {renderDimensionInput('W', 'maxWidth')}
            {renderDimensionInput('H', 'maxHeight')}
          </div>
        </div>

        {/* Format Selection (Multi-select) */}
        <div className="space-y-3">
          <label className="text-sm font-medium">{t('outputFormats')}</label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: t('formatJPG'), value: FileFormat.JPEG },
              { label: t('formatPNG'), value: FileFormat.PNG },
              { label: t('formatWEBP'), value: FileFormat.WEBP },
              { label: t('formatSVG'), value: FileFormat.SVG },
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
