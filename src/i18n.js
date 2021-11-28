import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enText from './assets/i18n/en-US.json';
import twText from './assets/i18n/zh-TW.json';

const resources = {
  en: {
    translation: enText,
  },

  'zh-TW': {
    translation: twText,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'zh-TW',
    fallbackLng: 'zh-TW',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
