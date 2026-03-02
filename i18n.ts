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

      // Legal
      legalLastUpdated: 'Last updated: {{date}}',
      'legal.privacyPolicyTitle': 'Privacy Policy',
      'legal.termsOfServiceTitle': 'Terms of Service',
      'legal.privacy.intro':
        'Your privacy matters to us. OptiPix is designed to work entirely in your browser — no images, files, or personal data ever leave your device.',
      'legal.privacy.noCollectTitle': 'No Data Collection',
      'legal.privacy.noCollectBody':
        'OptiPix does not collect, store, or transmit any personal information or image data. We have no accounts, no sign-ups, and no tracking of your files.',
      'legal.privacy.localProcessTitle': 'Local Processing Only',
      'legal.privacy.localProcessBody':
        'All image compression, conversion, and resizing happens exclusively inside your browser using Web APIs. Your files are never uploaded to any server.',
      'legal.privacy.thirdPartyTitle': 'Third-Party Services',
      'legal.privacy.thirdPartyBody':
        'The feedback form uses Web3Forms to deliver messages. If you submit feedback, only the data you explicitly enter (name, email, message) is sent to Web3Forms for delivery. No image data is involved.',
      'legal.privacy.changesTitle': 'Changes to This Policy',
      'legal.privacy.changesBody':
        'We may update this Privacy Policy occasionally. The current version is always available in the app. Continued use of OptiPix after changes constitutes acceptance of the updated policy.',
      'legal.privacy.contactTitle': 'Contact',
      'legal.privacy.contactBody':
        'If you have questions about this policy, please reach out via the Feedback form in the app.',

      'legal.terms.intro':
        'By using OptiPix, you agree to these Terms of Service. Please read them carefully.',
      'legal.terms.useTitle': 'Permitted Use',
      'legal.terms.useBody':
        'OptiPix is a free, browser-based tool for personal and commercial image compression. You may use it freely provided you comply with these terms and applicable laws.',
      'legal.terms.ipTitle': 'Intellectual Property',
      'legal.terms.ipBody':
        'The OptiPix application code, design, and branding are the property of the OptiPix team. Your images remain entirely your own — we claim no rights over any files you process.',
      'legal.terms.disclaimerTitle': 'Disclaimer of Warranties',
      'legal.terms.disclaimerBody':
        'OptiPix is provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability or specific compression results.',
      'legal.terms.liabilityTitle': 'Limitation of Liability',
      'legal.terms.liabilityBody':
        'To the maximum extent permitted by law, the OptiPix team is not liable for any loss of data, loss of profits, or other damages arising from your use of the service.',
      'legal.terms.changesTitle': 'Changes to These Terms',
      'legal.terms.changesBody':
        'We may revise these Terms at any time. The latest version is always available in the app. Your continued use of OptiPix constitutes acceptance of any revised Terms.',
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

      // Legal
      legalLastUpdated: '最后更新：{{date}}',
      'legal.privacyPolicyTitle': '隐私政策',
      'legal.termsOfServiceTitle': '服务条款',
      'legal.privacy.intro':
        '您的隐私对我们至关重要。OptiPix 完全在您的浏览器中运行——您的图片、文件或个人数据永远不会离开您的设备。',
      'legal.privacy.noCollectTitle': '不收集数据',
      'legal.privacy.noCollectBody':
        'OptiPix 不收集、存储或传输任何个人信息或图片数据。我们没有账户系统，无需注册，也不追踪您的文件。',
      'legal.privacy.localProcessTitle': '仅本地处理',
      'legal.privacy.localProcessBody':
        '所有图片压缩、转换和调整大小操作均完全在您的浏览器中使用 Web API 完成，您的文件永远不会上传到任何服务器。',
      'legal.privacy.thirdPartyTitle': '第三方服务',
      'legal.privacy.thirdPartyBody':
        '反馈表单使用 Web3Forms 进行消息传递。如果您提交反馈，仅您明确输入的信息（姓名、邮箱、留言）会发送给 Web3Forms 用于投递，不涉及任何图片数据。',
      'legal.privacy.changesTitle': '政策变更',
      'legal.privacy.changesBody':
        '我们可能会不时更新本隐私政策。最新版本始终可在应用内查看。继续使用 OptiPix 即表示您接受更新后的政策。',
      'legal.privacy.contactTitle': '联系我们',
      'legal.privacy.contactBody': '如果您对本政策有任何疑问，请通过应用内的反馈表单联系我们。',

      'legal.terms.intro': '使用 OptiPix 即表示您同意以下服务条款，请仔细阅读。',
      'legal.terms.useTitle': '允许的使用',
      'legal.terms.useBody':
        'OptiPix 是一款免费的浏览器图片压缩工具，可用于个人和商业用途。在遵守本条款及适用法律的前提下，您可以自由使用。',
      'legal.terms.ipTitle': '知识产权',
      'legal.terms.ipBody':
        'OptiPix 的应用代码、设计和品牌归 OptiPix 团队所有。您的图片完全属于您自己——我们对您处理的任何文件不主张任何权利。',
      'legal.terms.disclaimerTitle': '免责声明',
      'legal.terms.disclaimerBody':
        'OptiPix 按"现状"提供，不附带任何形式的保证。我们不保证服务的不间断可用性或特定的压缩效果。',
      'legal.terms.liabilityTitle': '责任限制',
      'legal.terms.liabilityBody':
        '在法律允许的最大范围内，OptiPix 团队对因使用本服务而导致的任何数据丢失、利润损失或其他损害不承担责任。',
      'legal.terms.changesTitle': '条款变更',
      'legal.terms.changesBody':
        '我们可能随时修订本条款。最新版本始终可在应用内查看。继续使用 OptiPix 即表示您接受修订后的条款。',
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

      // Legal
      legalLastUpdated: 'Zuletzt aktualisiert: {{date}}',
      'legal.privacyPolicyTitle': 'Datenschutzerklärung',
      'legal.termsOfServiceTitle': 'Nutzungsbedingungen',
      'legal.privacy.intro':
        'Ihre Privatsphäre ist uns wichtig. OptiPix funktioniert vollständig in Ihrem Browser – keine Bilder, Dateien oder persönlichen Daten verlassen jemals Ihr Gerät.',
      'legal.privacy.noCollectTitle': 'Keine Datenerhebung',
      'legal.privacy.noCollectBody':
        'OptiPix erhebt, speichert oder übermittelt keine persönlichen Informationen oder Bilddaten. Wir haben keine Konten, keine Anmeldungen und keine Nachverfolgung Ihrer Dateien.',
      'legal.privacy.localProcessTitle': 'Nur lokale Verarbeitung',
      'legal.privacy.localProcessBody':
        'Die gesamte Bildkomprimierung, -konvertierung und -skalierung erfolgt ausschließlich in Ihrem Browser mithilfe von Web-APIs. Ihre Dateien werden niemals auf einen Server hochgeladen.',
      'legal.privacy.thirdPartyTitle': 'Dienste Dritter',
      'legal.privacy.thirdPartyBody':
        'Das Feedback-Formular verwendet Web3Forms zur Nachrichtenübermittlung. Wenn Sie Feedback senden, werden nur die von Ihnen ausdrücklich eingegebenen Daten (Name, E-Mail, Nachricht) an Web3Forms weitergeleitet. Bilddaten sind nicht betroffen.',
      'legal.privacy.changesTitle': 'Änderungen dieser Richtlinie',
      'legal.privacy.changesBody':
        'Wir können diese Datenschutzerklärung gelegentlich aktualisieren. Die aktuelle Version ist immer in der App verfügbar. Die weitere Nutzung von OptiPix nach Änderungen gilt als Zustimmung zur aktualisierten Richtlinie.',
      'legal.privacy.contactTitle': 'Kontakt',
      'legal.privacy.contactBody':
        'Bei Fragen zu dieser Richtlinie wenden Sie sich bitte über das Feedback-Formular in der App an uns.',

      'legal.terms.intro':
        'Durch die Nutzung von OptiPix stimmen Sie diesen Nutzungsbedingungen zu. Bitte lesen Sie diese sorgfältig durch.',
      'legal.terms.useTitle': 'Zulässige Nutzung',
      'legal.terms.useBody':
        'OptiPix ist ein kostenloses, browserbasiertes Tool zur Bildkomprimierung für den persönlichen und gewerblichen Einsatz. Sie dürfen es frei nutzen, sofern Sie diese Bedingungen und geltende Gesetze einhalten.',
      'legal.terms.ipTitle': 'Geistiges Eigentum',
      'legal.terms.ipBody':
        'Der Anwendungscode, das Design und die Marke von OptiPix sind Eigentum des OptiPix-Teams. Ihre Bilder bleiben vollständig Ihr Eigentum – wir erheben keinerlei Ansprüche auf von Ihnen verarbeitete Dateien.',
      'legal.terms.disclaimerTitle': 'Haftungsausschluss',
      'legal.terms.disclaimerBody':
        'OptiPix wird „wie besehen" ohne jegliche Gewährleistung bereitgestellt. Wir garantieren weder eine ununterbrochene Verfügbarkeit noch bestimmte Kompressionsergebnisse.',
      'legal.terms.liabilityTitle': 'Haftungsbeschränkung',
      'legal.terms.liabilityBody':
        'Im gesetzlich maximal zulässigen Umfang haftet das OptiPix-Team nicht für Datenverluste, Gewinnausfälle oder sonstige Schäden, die aus der Nutzung des Dienstes entstehen.',
      'legal.terms.changesTitle': 'Änderungen dieser Bedingungen',
      'legal.terms.changesBody':
        'Wir können diese Bedingungen jederzeit überarbeiten. Die aktuelle Version ist immer in der App verfügbar. Die weitere Nutzung von OptiPix gilt als Zustimmung zu den überarbeiteten Bedingungen.',
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
