import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icons } from './Icon';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="btn btn-secondary flex items-center "
        title="Change language"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base">{currentLang.code}</span>
        {/* <span className="hidden md:inline">{currentLang.label}</span> */}
        <Icons.ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 bg-(--bg-card) border border-(--border) rounded-lg shadow-lg 
      transition-all duration-200 z-50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLang(lang.code)}
            className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-(--bg-subtle) transition-colors ${
              lang.code === i18n.language ? 'bg-(--bg-subtle) font-semibold' : ''
            }`}
          >
            <span className="text-base">{lang.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
