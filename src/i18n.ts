import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import he from "./locales/he/translation.json";

const resources = {
  en: { translation: en },
  he: { translation: he },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "he",
    fallbackLng: "he",
    supportedLngs: ["en", "he"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring"],
      caches: [],
    },
  });

// Direction helper (RTL for he, LTR for others)
const setDir = (lng?: string) => {
  if (typeof document === "undefined") return; // SSR-safe
  const dir = lng === "he" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lng ?? "en");
};

// Initial dir and on-change updates
setDir(i18n.resolvedLanguage ?? i18n.language);
i18n.on("languageChanged", (lng) => setDir(lng));

export default i18n;
