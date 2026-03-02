import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icons } from './Icon';

export type LegalType = 'privacy' | 'terms';

interface LegalModalProps {
  type: LegalType | null;
  onClose: () => void;
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
    <div className="space-y-6">
      <p className="text-sm text-(--text-muted) leading-relaxed">{t('legal.privacy.intro')}</p>

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
    <div className="space-y-6">
      <p className="text-sm text-(--text-muted) leading-relaxed">{t('legal.terms.intro')}</p>

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

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { t } = useTranslation();

  if (!type) return null;

  const title = type === 'privacy' ? t('legal.privacyPolicyTitle') : t('legal.termsOfServiceTitle');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '52rem' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-(--border)">
          <h2 id="legal-modal-title" className="text-lg font-semibold text-(--text-main)">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="btn btn-ghost p-2 rounded-lg"
            aria-label={t('close')}
          >
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-6 pb-10 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          {type === 'privacy' ? <PrivacyContent /> : <TermsContent />}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-(--border) flex justify-end">
          <button onClick={onClose} className="btn btn-secondary">
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
