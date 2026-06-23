import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icons } from './Icon';

type Language = 'en' | 'zh' | 'de';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (['en', 'zh', 'de'].includes(i18n.language) ? i18n.language : 'en') as Language;

  const setLang = (code: Language) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  };

  return (
    <div className="relative flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
      <Icons.Globe className="w-5 h-5 pointer-events-none" />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Language)}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        aria-label="Change language"
      >
        <option value="en">EN</option>
        <option value="zh">ZH</option>
        <option value="de">DE</option>
      </select>
      <span className="text-xs font-bold uppercase pointer-events-none">{lang}</span>
    </div>
  );
};

export default LanguageSwitcher;
