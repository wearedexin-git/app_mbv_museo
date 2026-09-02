# Guida all'Aggiunta di un Overlay con Image Target (8th Wall Open Source)

Questo documento riassume le informazioni utili e la strategia operativa per aggiungere una nuova scena al progetto `studio-image-targets-example` di 8th Wall, in cui un *Image Target* riconosciuto attiva la sovrapposizione di un'altra immagine.

## Contesto Tecnologico (8th Wall)
Il progetto utilizza il motore **8th Wall Studio / Engine** (ora in formato open ed esportabile) che si basa su SLAM e Computer Vision per il WebAR.
Dalla documentazione ufficiale e dall'architettura del progetto deduciamo che:
- Non utilizza pesanti framework aggiuntivi (come A-Frame o React) per il setup base del core, ma sfrutta Webpack e TypeScript in maniera diretta tramite la pipeline di 8th Wall.
- I dati dell'Image Target devono essere processati preventivamente tramite la **Image Target CLI** di 8th Wall o 8th Wall Desktop/Console per ottenere i file ottimali (`.json`, crop, luminanza, ecc.) e salvati nella directory `image-targets/`.

---

## Piano Operativo Aggiornato (Architettura Data-Driven)

Per rispondere in modo scalabile alle tue richieste (gestione di testo/audio localizzati, comparsa dell'interfaccia solo al trigger, chiusura e ricerca di altri target), struttureremo il progetto attorno a un file di configurazione centrale. In questo modo potrai gestire **facilmente in futuro l'aggiunta o modifica di nuovi Target** senza dover rimettere mano alla logica profonda.

### Fase 1: Setup Struttura Dati (Configurazione Data-Driven)
Creatura di un file `config.json` (o un array in un file `.ts`) in cui per ogni Image Target defiiniamo:
- `targetName`: il nome del file `.json` generato da 8th Wall.
- `images`: Array di 3 path alle immagini del carosello.
- `localization`: Oggetto con le informazioni suddivise per lingua (`it` ed `en`) riguardanti: Testo per il pannello info, URL del file audio da riprodurre.

### Fase 2: Gestione dell'Interfaccia Piatta (DOM 2D)
Creazione di un layout in HTML/CSS integrato nel caricatore iniziale, i cui elementi resteranno nascosti (display: none) finché non viene attivato il Trigger:
- Variabili CSS per le animazioni di entrata/uscita.
- **Bottoni Principali**: Lingua (IT/EN), Info Testo, Play/Pausa Audio, **Chiudi (❌)**.
- **Bottoni Carosello**: Frecce sinistra/destra.
Quando il target viene trovato o confermato, il sistema popola questa UI in base al target trovato tramite il file di configurazione e ne anima l'entrata a schermo. Alla pressione di **Chiudi**, l'interfaccia 2D viene nascosta, i contenuti 3D vengono distrutti o resettati, l'audio viene fermato, e la camera ritorna in "modalità ricerca" per inquadrare nuovi target.

### Fase 3: Logica AR (Il Trigger e il Riconoscimento)
- **`xrimagefound`**: Non avviamo i contenuti finali, ma disabilitiamo la ricerca attiva o mostriamo un "Bottone Trigger" spaziale o 2D (la conferma da parte dell'utente).
- Alla pressione di questo trigger, la logica recupera l'ID del target riconosciuto, va a leggere nel `config.json` le relative texture, testi e audio, e avvia la "Scena Attiva".

### Fase 4: Sviluppo del Carousel Spaziale 3D in Three.js
All'attivazione del trigger, istanziamo la visualizzazione:
- Vengono create 3 _PlaneGeometry_ in Three.js, a cui vengono applicate le texture definite nel config.
- Posizionamento: si ancorano alla matrice spaziale del Target (le coordinate restituite dal motore AR affinché sembrino poggiare fisicamente sull'immagine inquadrata).
- Logica di scorrimento: la pressione delle frecce 2D attiverà una transizione liscia nello spazio 3D lungo l'asse orizzontale o sfumerà (fade in/out) la ruota di immagini.

### Fase 5: Modulo Audio e Localizzazione
- Alla pressione dello switch IT/EN, un gestore aggiornerà in Real-Time sia il testo nel pannello "Info" 2D, sia cambierà il file `src` dell'elemento Audio per caricare la voce relativa alla lingua corretta.

---

## Prossimi Passi per Iniziare
1. Confermiamo insieme la scelta del **motore 3D per il Carousel**: preferisci usare l'integrazione nativa **Three.js** già preimpostata implicitamente nel template 8th Wall standard rispetto alla libreria DOM pura? (Three.js è essenziale se le tre immagini devono sembrare fisicamente attaccate al marker).
2. Prepariamoci a preparare l'alberatura delle cartelle (`src/config/`, `src/assets/audio/`, ecc.) per replicare questo design pattern aperto.
