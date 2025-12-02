import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      appName: 'OptiPix',
      appSubtitle: 'Professional Image Compression',
      light: 'Light',
      dark: 'Dark',
      clearAll: 'Clear All',

      // Settings
      compressionSettings: 'Compression Settings',
      quality: 'Quality',
      smallerFile: 'Smaller File',
      betterQuality: 'Better Quality',
      maxDimensions: 'Max Dimensions',
      maxWidth: 'Max Width',
      maxHeight: 'Max Height',
      outputFormats: 'Output Formats',
      formatJPG: 'JPG',
      formatPNG: 'PNG',
      formatWEBP: 'WEBP',
      formatSVG: 'SVG',

      // Drop Zone
      dropzone: 'Drag & drop images here, or click to browse',
      privacyNotice: 'Your images are processed locally in your browser. No data is uploaded.',

      // File List
      images: 'images',
      saved: 'Saved',
      processing: 'Compressing...',
      outputSize: 'Output Size',
      preview: 'Preview',
      remove: 'Remove file',
      waiting: 'Waiting to process...',

      // Action Buttons
      startProcessing: 'Start Processing',
      downloadAllZip: 'Download All ZIP',
      downloadDone: 'Download Done',
      addMore: 'Add More',

      // Preview Modal
      original: 'Original',
      sourceImage: 'Source Image',
      compressedOutput: 'Compressed Output',
      close: 'Close',
      download: 'Download',

      // Footer
      privacyTitle: 'Privacy',
      privacyText: 'No images uploaded. All processing runs in your browser.',
      featuresTitle: 'Features',
      feature1: 'Fast batch compression',
      feature2: 'Multi-format support',
      feature3: 'Preview before download',
      contactTitle: 'Contact',
      feedback: 'Feedback',

      // Feedback Modal
      sendMessage: 'Send a Message',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      yourName: 'Your name',
      yourEmail: 'your@email.com',
      feedbackPlaceholder: 'Share your feedback, suggestions, or report a bug...',
      cancel: 'Cancel',
      send: 'Send Message',
      thankYou: 'Thank you for your feedback!',
      reviewMessage: "We'll review your message and get back to you soon.",
    },
  },
  zh: {
    translation: {
      // Header
      appName: 'OptiPix',
      appSubtitle: '专业图片压缩工具',
      light: '浅色',
      dark: '深色',
      clearAll: '清空全部',

      // Settings
      compressionSettings: '压缩设置',
      quality: '质量',
      smallerFile: '更小的文件',
      betterQuality: '更好的质量',
      maxDimensions: '最大尺寸',
      maxWidth: '最大宽度',
      maxHeight: '最大高度',
      outputFormats: '输出格式',
      formatJPG: 'JPG',
      formatPNG: 'PNG',
      formatWEBP: 'WEBP',
      formatSVG: 'SVG',

      // Drop Zone
      dropzone: '拖放图片到这里，或点击浏览',
      privacyNotice: '您的图片在浏览器本地处理，不会上传任何数据。',

      // File List
      images: '张图片',
      saved: '已节省',
      processing: '压缩中...',
      outputSize: '输出尺寸',
      preview: '预览',
      remove: '删除文件',
      waiting: '等待处理...',

      // Action Buttons
      startProcessing: '开始处理',
      downloadAllZip: '下载全部 ZIP',
      downloadDone: '下载已完成',
      addMore: '添加更多',

      // Preview Modal
      original: '原图',
      sourceImage: '源图片',
      compressedOutput: '压缩输出',
      close: '关闭',
      download: '下载',

      // Footer
      privacyTitle: '隐私',
      privacyText: '不上传图片。所有处理均在浏览器中完成。',
      featuresTitle: '功能',
      feature1: '快速批量压缩',
      feature2: '多格式支持',
      feature3: '下载前预览',
      contactTitle: '联系',
      feedback: '反馈',

      // Feedback Modal
      sendMessage: '发送消息',
      name: '姓名',
      email: '邮箱',
      message: '留言',
      yourName: '您的姓名',
      yourEmail: 'your@email.com',
      feedbackPlaceholder: '分享您的反馈、建议或报告问题...',
      cancel: '取消',
      send: '发送消息',
      thankYou: '感谢您的反馈！',
      reviewMessage: '我们会查看您的消息并尽快回复。',
    },
  },
  de: {
    translation: {
      // Header
      appName: 'OptiPix',
      appSubtitle: 'Professionelle Bildkomprimierung',
      light: 'Hell',
      dark: 'Dunkel',
      clearAll: 'Alles löschen',

      // Settings
      compressionSettings: 'Kompressionseinstellungen',
      quality: 'Qualität',
      smallerFile: 'Kleinere Datei',
      betterQuality: 'Bessere Qualität',
      maxDimensions: 'Maximale Abmessungen',
      maxWidth: 'Max. Breite',
      maxHeight: 'Max. Höhe',
      outputFormats: 'Ausgabeformate',
      formatJPG: 'JPG',
      formatPNG: 'PNG',
      formatWEBP: 'WEBP',
      formatSVG: 'SVG',

      // Drop Zone
      dropzone: 'Bilder hierher ziehen oder klicken zum Durchsuchen',
      privacyNotice:
        'Ihre Bilder werden lokal im Browser verarbeitet. Es werden keine Daten hochgeladen.',

      // File List
      images: 'Bilder',
      saved: 'Gespart',
      processing: 'Komprimierung läuft...',
      outputSize: 'Ausgabegröße',
      preview: 'Vorschau',
      remove: 'Datei entfernen',
      waiting: 'Warten auf Verarbeitung...',

      // Action Buttons
      startProcessing: 'Verarbeitung starten',
      downloadAllZip: 'Alle als ZIP herunterladen',
      downloadDone: 'Fertige herunterladen',
      addMore: 'Mehr hinzufügen',

      // Preview Modal
      original: 'Original',
      sourceImage: 'Quellbild',
      compressedOutput: 'Komprimierte Ausgabe',
      close: 'Schließen',
      download: 'Herunterladen',

      // Footer
      privacyTitle: 'Datenschutz',
      privacyText: 'Keine Bilder hochgeladen. Alle Verarbeitung erfolgt in Ihrem Browser.',
      featuresTitle: 'Funktionen',
      feature1: 'Schnelle Stapelkomprimierung',
      feature2: 'Mehrformat-Unterstützung',
      feature3: 'Vorschau vor dem Download',
      contactTitle: 'Kontakt',
      feedback: 'Feedback',

      // Feedback Modal
      sendMessage: 'Nachricht senden',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      yourName: 'Ihr Name',
      yourEmail: 'ihre@email.com',
      feedbackPlaceholder: 'Teilen Sie Ihr Feedback, Vorschläge oder melden Sie einen Fehler...',
      cancel: 'Abbrechen',
      send: 'Nachricht senden',
      thankYou: 'Vielen Dank für Ihr Feedback!',
      reviewMessage: 'Wir werden Ihre Nachricht prüfen und uns bald bei Ihnen melden.',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
