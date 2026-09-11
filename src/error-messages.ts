export type AppLang = 'it' | 'en';

export type ErrorKind =
  | 'offline'
  | 'slow_or_timeout'
  | 'asset_load'
  | 'xr_boot'
  | 'camera'
  | 'tracking_lost_long'
  | 'watchdog'
  | 'js_fatal';

type MessageSet = {
  title: string;
  body: string;
  reload: string;
  close: string;
  loading: string;
};

const MESSAGES: Record<ErrorKind, Record<AppLang, MessageSet>> = {
  offline: {
    it: {
      title: 'Connessione interrotta',
      body: 'La connessione si è interrotta. Per continuare la visita digitale, ricarica la pagina quando la rete è di nuovo disponibile.',
      reload: 'Ricarica',
      close: 'Chiudi',
      loading: 'Stiamo ripristinando la visita…',
    },
    en: {
      title: 'Connection lost',
      body: 'The connection was interrupted. To continue your digital visit, reload the page when the network is available again.',
      reload: 'Reload',
      close: 'Close',
      loading: 'Restoring your visit…',
    },
  },
  slow_or_timeout: {
    it: {
      title: 'Connessione troppo lenta',
      body: 'La rete non è riuscita a caricare questo contenuto in tempo. Ricarica la pagina e, se possibile, usa una connessione più stabile.',
      reload: 'Ricarica',
      close: 'Chiudi',
      loading: 'Stiamo ripristinando la visita…',
    },
    en: {
      title: 'Connection too slow',
      body: 'The network could not load this content in time. Reload the page and, if possible, use a more stable connection.',
      reload: 'Reload',
      close: 'Close',
      loading: 'Restoring your visit…',
    },
  },
  asset_load: {
    it: {
      title: 'Contenuto non disponibile',
      body: 'Non siamo riusciti a caricare questo dettaglio della collezione. Ricarica la pagina per riprovare.',
      reload: 'Ricarica',
      close: 'Chiudi',
      loading: 'Stiamo ripristinando la visita…',
    },
    en: {
      title: 'Content unavailable',
      body: 'We could not load this detail from the collection. Reload the page to try again.',
      reload: 'Reload',
      close: 'Close',
      loading: 'Restoring your visit…',
    },
  },
  xr_boot: {
    it: {
      title: 'Esperienza AR in avvio',
      body: 'Il motore di realtà aumentata non è ancora pronto. Attendi qualche secondo oppure ricarica la pagina. Su rete mobile il primo caricamento può richiedere più tempo.',
      reload: 'Ricarica',
      close: 'Chiudi',
      loading: 'Stiamo ripristinando la visita…',
    },
    en: {
      title: 'AR experience starting',
      body: 'The augmented reality engine is not ready yet. Wait a few seconds or reload the page. On mobile networks the first load may take longer.',
      reload: 'Reload',
      close: 'Close',
      loading: 'Restoring your visit…',
    },
  },
  camera: {
    it: {
      title: 'Fotocamera necessaria',
      body: 'Per scoprire le opere serve l’accesso alla fotocamera. Consenti i permessi nelle impostazioni del browser, poi ricarica la pagina.',
      reload: 'Ricarica',
      close: 'Chiudi',
      loading: 'Stiamo ripristinando la visita…',
    },
    en: {
      title: 'Camera required',
      body: 'Camera access is needed to explore the artworks. Allow permission in your browser settings, then reload the page.',
      reload: 'Reload',
      close: 'Close',
      loading: 'Restoring your visit…',
    },
  },
  tracking_lost_long: {
    it: {
      title: 'Opera fuori inquadratura',
      body: 'Abbiamo chiuso il dettaglio e siamo tornati alla scansione. Inquadra di nuovo l’opera per riaprirlo.',
      reload: 'Ricarica',
      close: 'Chiudi',
      loading: 'Stiamo ripristinando la visita…',
    },
    en: {
      title: 'Artwork out of view',
      body: "We've closed the detail view and returned to scanning. Frame the artwork again to reopen it.",
      reload: 'Reload',
      close: 'Close',
      loading: 'Restoring your visit…',
    },
  },
  watchdog: {
    it: {
      title: 'Esperienza in pausa',
      body: 'L’esperienza si è fermata in modo inatteso. Ricarica la pagina per riprendere la visita al museo.',
      reload: 'Ricarica',
      close: 'Chiudi',
      loading: 'Stiamo ripristinando la visita…',
    },
    en: {
      title: 'Experience paused',
      body: 'The experience stopped unexpectedly. Reload the page to continue your museum visit.',
      reload: 'Reload',
      close: 'Close',
      loading: 'Restoring your visit…',
    },
  },
  js_fatal: {
    it: {
      title: 'Imprevisto tecnico',
      body: 'Si è verificato un imprevisto durante la visita. Ricarica la pagina per continuare in sicurezza.',
      reload: 'Ricarica',
      close: 'Chiudi',
      loading: 'Stiamo ripristinando la visita…',
    },
    en: {
      title: 'Unexpected issue',
      body: 'Something unexpected happened during your visit. Reload the page to continue safely.',
      reload: 'Reload',
      close: 'Close',
      loading: 'Restoring your visit…',
    },
  },
};

export function getErrorMessage(kind: ErrorKind, lang: AppLang): MessageSet {
  return MESSAGES[kind][lang] || MESSAGES[kind].it;
}
