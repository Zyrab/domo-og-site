import { content as enContent } from "./en/content.js";
import { content as geContent } from "./ge/content.js";

const locales = {
  ge: geContent,
  en: enContent,
};

export default function getLocales(locale, section) {
  return locales[locale][section];
}
