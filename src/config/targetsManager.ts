export interface LocalizationData {
  infoText: string;
  audioSrc: string;
}

export interface TargetConfig {
  id: string; // L'ID riconosciuto dal motore (di solito il nome dell'Image Target caricato su 8th Wall)
  quizId?: string | null;
  images: string[];
  localization: {
    it: LocalizationData;
    en: LocalizationData;
  };
}

import targetsData from './targetsData.json';

// Struttura dati per aggiungere e aggiornare facilmente i target nel tempo
export const targetConfigs: TargetConfig[] = targetsData as TargetConfig[];
;

// Metodo di utility per recuperare i setting quando il target viene triggerato
export const getTargetConfig = (id: string): TargetConfig | undefined => {
  // 1. Prova match esatto (più veloce)
  let found = targetConfigs.find(config => config.id === id);
  if (found) return found;

  // 2. Prova match per prefisso (visto che i nuovi trigger hanno l'id base come prefisso)
  // Esempio: "biblioteca_capitello_busto_capitelloBusto_qr" deve matchare "biblioteca_capitello_busto"
  // Ordiniamo per lunghezza decrescente per assicurarci di beccare il match più specifico 
  // (es. se ho 'sala' e 'sala_bagno', un target 'sala_bagno_1' deve matchare 'sala_bagno')
  const matchingConfigs = targetConfigs
    .filter(config => id.startsWith(config.id))
    .sort((a, b) => b.id.length - a.id.length);

  return matchingConfigs.length > 0 ? matchingConfigs[0] : undefined;
};
