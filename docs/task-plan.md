# Piano dei Task: Implementazione AR Carousel

Questo documento contiene i Task tecnici dettagliati per ripulire il progetto di base e implementare il Carousel Fluttuante in Three.js con configurazione guidata da dati.

## Fase 1: Pulizia del Progetto (Clean-up)
- **Task 1.1:** Eliminare tutte le dipendenze visive di esempio dalla cartella `image-targets/` (bmo-bites, carte degli elementi, toggle-slam, waves, ecc.).
- **Task 1.2:** Svuotare la cartella `src/assets/` dai contenuti di esempio non necessari.
- **Task 1.3:** Rimuovere gli script inutilizzati da `src/` (es. directory `magic-photos`, `toggle-slam` e script legacy presenti in `common`).
- **Task 1.4:** Azzerare e reimpostare l'entry-point `src/app.js` rimuovendo il precaricamento dei file JSON rimossi, preparando uno scheletro pulito per la nuova implementazione.

## Fase 2: Architettura e Configurazione (Data-Driven)
- **Task 2.1:** Creare il modulo di centralizzazione dei dati (es. `src/config/targetsManager.ts` o un file `config.json`). Questo definirà la mappatura tra nome target, percorso delle 3 texture del carosello, testi tradotti (IT/EN) e file audio tradotti.
- **Task 2.2:** Preparare lo scaffolding di base per gli asset del nuovo Image Target (temporaneamente metteremo placeholder in attesa delle tue grafiche).

## Fase 3: Struttura Visiva e UI (DOM 2D)
- **Task 3.1:** Creare un file CSS globale (`src/style.css` o similare) per la piattaforma 2D.
- **Task 3.2:** Inserire in `src/index.html` (o renderizzare via TypeScript) l'alberatura del DOM contenente i bottoni e i div necessari (inizialmente con classe `hidden` o `display: none`):
  - Bottone Lingua (IT/EN)
  - Bottone Informazioni (Info)
  - Bottone Audio (Play/Pausa)
  - Bottone **Chiudi (❌)**
  - Frecce di navigazione Sinistra/Destra
  - Un Pannello Modale (`div`) per il testo tradotto.
- **Task 3.3:** Scrivere un Controller TypeScript per l'UI (es. `src/ui-controller.ts`) per gestire apparizioni, dissolvenze e aggiornamenti testuali di questi elementi basandosi sullo stato attivo e sulla lingua selezionata.

## Fase 4: Core Engine e Trigger (XR8)
- **Task 4.1:** Creare il modulo principale AR (Pipeline) che si aggancia al motore 8thWall e inizializza la scena, la camera e il renderizzatore in **Three.js** (basandosi possibilmente sui moduli di utilità pre-forniti da 8th Wall, es. `XR8.Threejs.pipelineModule()`).
- **Task 4.2:** Scrivere la logica evento `xrimagefound`. Quando viene inquadrato un target valido:
  - Appare una Mesh 3D semplice (es. un pulsante piatto flottante) posizionata sopra l'immagine (Il **Trigger**).
- **Task 4.3:** Implementare il Raycaster su Three.js: quando l'utente fa un tocco sullo schermo in corrispondenza del bottone 3D fluttuante, scatta l'evento di attivazione della scena.

## Fase 5: Implementazione Spaziale del Carousel (Three.js)
- **Task 5.1:** Costruire la logica del modulo `Carousel3D`. Riceve le 3 texture specificate dal config per il target attualmente inquadrato.
- **Task 5.2:** Generare 3 `THREE.PlaneGeometry` adiacenti orizzontalmente. Distruggere (o nascondere) il bottone 3D usato per il trigger.
- **Task 5.3:** Aggiungere la logica di transizione lineare/scorrimento. Alla ricezione dell'input delle frecce SX/DX (provenienti dalla DOM 2D), alterare in modo fluido le coordinate `x` della matrice che contiene gli "strati" delle immagini, restituendo l'animazione di scorrimento.
- **Task 5.4:** Ancoraggio stabile del gruppo Three.js alle matrici (`xrimageupdated`) dell'Image Target fisico tracciato per mantenere l'illusione flottante.

## Fase 6: Audio e Ciclo di Vita (UX Finale)
- **Task 6.1:** Costruire il modulo Audio in TS in grado di recepire lo switch di lingua, precaricare le tracce indicate per la lingua, avviare e fermare l'audio mantenendo lo stato sincronizzato col bottone Play/Pause visivo.
- **Task 6.2:** Logica Pressione tasto **Chiudi**:
  - Nascondere tutta la DOM UI (frecce, bottoni, pannelli).
  - Distruggere le tre visualizzazioni di Three.js.
  - Stoppare ogni istanza Audio.
  - Riattivare la ricerca base del target mettendosi in ascolto di successivi eventi `xrimagefound`.
