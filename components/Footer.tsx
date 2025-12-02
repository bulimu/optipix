import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icons } from './Icon';
import FeedbackModal from './FeedbackModal';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <footer className="mt-16 border-t border-(--border) bg-(--bg-card) py-12">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Privacy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-(--primary) flex items-center justify-center text-(--bg-main)">
                <Icons.Zap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold">OptiPix</span>
            </div>

            <p className="text-sm text-(--text-muted) leading-relaxed">
              {t('privacyText')}
              <br />
              <span className="font-semibold text-(--success) flex items-center gap-1 mt-2">
                <Icons.Check className="w-3 h-3" />
                {t('privacyTitle')}
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-(--text-main)">
              {t('featuresTitle')}
            </h4>
            <ul className="space-y-2 text-sm text-(--text-muted)">
              <li>{t('feature1')}</li>
              <li>{t('feature2')}</li>
              <li>{t('feature3')}</li>
            </ul>
          </div>

          {/* Contact / Feedback */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-(--text-main)">
              {t('contactTitle')}
            </h4>
            <p className="text-sm text-(--text-muted)">
              Have suggestions or found a bug? We'd love to hear from you.
            </p>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-(--primary) hover:underline"
            >
              <Icons.TrendingUp className="w-4 h-4" />
              {t('feedback')}
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-(--border) flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-(--text-muted)">
          <p>&copy; {new Date().getFullYear()} OptiPix. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-(--text-main)">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-(--text-main)">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </footer>
  );
};

export default Footer;
