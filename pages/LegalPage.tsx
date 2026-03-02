import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icons } from '../components/Icon';
import LanguageSwitcher from '../components/LanguageSwitcher';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-2">
    <h3 className="text-base font-semibold text-(--text-main)">{title}</h3>
    <div className="text-sm text-(--text-muted) leading-relaxed space-y-2">{children}</div>
  </div>
);

const PrivacyContent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <p className="text-(--text-muted) leading-relaxed">{t('legal.privacy.intro')}</p>

      <Section title={t('legal.privacy.noCollectTitle')}>
        <p>{t('legal.privacy.noCollectBody')}</p>
      </Section>

      <Section title={t('legal.privacy.localProcessTitle')}>
        <p>{t('legal.privacy.localProcessBody')}</p>
      </Section>

      <Section title={t('legal.privacy.thirdPartyTitle')}>
        <p>{t('legal.privacy.thirdPartyBody')}</p>
      </Section>

      <Section title={t('legal.privacy.changesTitle')}>
        <p>{t('legal.privacy.changesBody')}</p>
      </Section>

      <Section title={t('legal.privacy.contactTitle')}>
        <p>{t('legal.privacy.contactBody')}</p>
      </Section>
    </div>
  );
};

const TermsContent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <p className="text-(--text-muted) leading-relaxed">{t('legal.terms.intro')}</p>

      <Section title={t('legal.terms.useTitle')}>
        <p>{t('legal.terms.useBody')}</p>
      </Section>

      <Section title={t('legal.terms.ipTitle')}>
        <p>{t('legal.terms.ipBody')}</p>
      </Section>

      <Section title={t('legal.terms.disclaimerTitle')}>
        <p>{t('legal.terms.disclaimerBody')}</p>
      </Section>

      <Section title={t('legal.terms.liabilityTitle')}>
        <p>{t('legal.terms.liabilityBody')}</p>
      </Section>

      <Section title={t('legal.terms.changesTitle')}>
        <p>{t('legal.terms.changesBody')}</p>
      </Section>
    </div>
  );
};

const LegalPage: React.FC<LegalPageProps> = ({ type, theme, toggleTheme }) => {
  const { t } = useTranslation();
  const title = type === 'privacy' ? t('legal.privacyPolicyTitle') : t('legal.termsOfServiceTitle');

  return (
    <div className="min-h-screen bg-(--bg-main) text-(--text-main) p-4 md:p-12 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between mb-8 md:mb-12 gap-2 border-b border-(--border) pb-6 md:pb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <img src={Icons.logo} alt="OptiPix Logo" />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight">{t('appName')}</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Back link + Title */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--primary) transition-colors mb-6"
          >
            <Icons.ChevronLeft className="w-4 h-4" />
            {t('appName')}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-(--text-muted) mt-2">
            {t('legalLastUpdated', { date: 'March 2, 2026' })}
          </p>
        </div>

        {/* Content */}
        <main className="card p-6 md:p-10">
          {type === 'privacy' ? <PrivacyContent /> : <TermsContent />}
        </main>

        {/* Footer nav */}
        <div className="mt-8 flex justify-between text-sm text-(--text-muted) border-t border-(--border) pt-6">
          {type === 'terms' ? (
            <Link to="/privacy" className="hover:text-(--primary) transition-colors">
              ← {t('legal.privacyPolicyTitle')}
            </Link>
          ) : (
            <span />
          )}
          {type === 'privacy' ? (
            <Link to="/terms" className="hover:text-(--primary) transition-colors ml-auto">
              {t('legal.termsOfServiceTitle')} →
            </Link>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-12 text-center text-xs text-(--text-muted)">
          <p>&copy; {new Date().getFullYear()} OptiPix. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
