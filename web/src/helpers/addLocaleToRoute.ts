import i18next from "../internationalization";
import { Language } from "../types";

export const addLocaleToRoute = (route: string): string => {
  return i18next.language === Language.en ? route === '/'  ? `/en` : `/en${route}`: route;
}