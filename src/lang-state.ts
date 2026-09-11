import type { AppLang } from './error-messages';

// Unica fonte di verità per la lingua corrente, condivisa tra l'onboarding
// (che parte prima che l'overlay AR esista) e UIController (che la legge
// alla creazione, quando l'onboarding è già stato completato).
let currentLang: AppLang = 'it';

export const getAppLang = (): AppLang => currentLang;

export const setAppLang = (lang: AppLang): void => {
  currentLang = lang;
};
