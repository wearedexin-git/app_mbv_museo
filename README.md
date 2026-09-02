# Museo Bagatti Valsecchi - WebAR Experience

Questa applicazione WebAR utilizza l'engine **8th Wall** e **Three.js** per offrire un'esperienza immersiva di scoperta degli oggetti del museo attraverso il riconoscimento di Image Targets.

## 📁 Struttura del Progetto

L'architettura è basata su un sistema di sincronizzazione automatica che mappa asset multimediali, testi e quiz.

```text
/
├── dist/                     # Cartella per il Deploy (output della build)
│   ├── asset/                # Immagini carosello e Audio (ottimizzati)
│   ├── quizbase/             # Dati dei quiz (JSON)
│   ├── bundle.js             # Logica dell'app
│   └── index.html            # Entry point
├── src/
│   ├── asset/                # SORGENTI: nome_stanza/nome_trigger/...
│   │   └── [stanza]/[trigger]/
│   │       ├── audio/        # ita/en (.mp3)
│   │       ├── images/       # Immagini per il carosello 3D
│   │       └── testi/        # ita/en (.rtf)
│   ├── quizbase/             # SORGENTI: Quiz divisi per cartella
│   │   └── bv-quiz-[nome]/
│   │       └── questions.json # Domande e risposte (ITA)
│   ├── config/
│   │   ├── targetsData.json   # DATABASE GENERATO AUTOMATICAMENTE
│   │   └── targetsManager.ts  # Gestore tipi e caricamento
│   ├── scripts/
│   │   └── sync-targets.js    # SCRIPT DI SINCRONIZZAZIONE (Core)
│   └── index.html            # Template interfaccia
├── image-targets/            # File .json degli Image Target di 8th Wall
└── webpack.config.js         # Configurazione build (supporto sottocartelle)
```

## ⚙️ Procedura di Aggiornamento (Scripting)

Per aggiungere o modificare contenuti (testi, audio, immagini o quiz), segui questa procedura:

1.  **Organizza i file**: Inserisci i nuovi file in `src/asset/` seguendo la struttura `stanza/trigger`.
2.  **Associa i Quiz**: Assicurati che il nome del trigger contenga la parola chiave corretta (es. "armatura", "teschio", "serliana") definita nel mapping dello script `sync-targets.js`.
3.  **Sincronizza i dati**:
    ```bash
    node scripts/sync-targets.js
    ```
    *Questo comando pulisce i testi RTF, mappa gli audio e genera il file `targetsData.json` per tutti i 43+ target.*
4.  **Esegui la Build**:
    ```bash
    npm run build
    ```

## 📱 Funzionalità PWA (Progressive Web App)

L'applicazione è ora una PWA completa, il che le permette di comportarsi come un'app nativa:

-   **Installazione**: Gli utenti possono aggiungere l'app alla schermata Home. È stato implementato un **Banner di Installazione intelligente** che:
    -   Su **Android** attiva il prompt nativo di Chrome.
    -   Su **iOS** fornisce una guida visuale (*Condividi > Aggiungi alla Home*).
    -   Include un sistema di **Dismiss** (permette di chiudere il banner e non disturba l'utente per tutta la sessione).
-   **Offline & Caching (Service Worker)**:
    -   **App Shell**: Interfaccia e logica caricate istantaneamente dalla cache.
    -   **Dynamic Cache**: Immagini, Audio e Quiz vengono salvati sul telefono man mano che l'utente li scopre, ottimizzando lo spazio e garantendo il funzionamento anche se il Wi-Fi del museo è debole.
-   **Ottimizzazione iOS (Notch)**: L'interfaccia utilizza le `safe-area-insets` per evitare che le icone (Chiudi, Lingua) finiscano sotto la barra di stato o la tacca degli iPhone.
-   **Recupero errori**: banner museali IT/EN per offline, timeout, asset, XR/camera, tracking e hang — vedi [`docs/error-recovery.md`](docs/error-recovery.md).
-   **Sentry**: errori JS e recovery in dashboard / mail — [`docs/sentry.md`](docs/sentry.md).

## 📚 Documentazione

Tutta la doc di progetto è in [`docs/`](docs/README.md):

- [Schema trigger](docs/trigger-schema.md) — audio, immagini, testi e quiz per ogni hotspot
- [Pipeline Image Target](docs/image-targets-pipeline.md) — foto, polarizzazione, 8th Wall, qualità marker
- [Sfera trigger](docs/sfera-trigger.md) — tap 3D, dimensione, cache Safari
- [Test in ufficio](docs/test-ufficio.md) — 7 oggetti, ramo `test/ufficio-7-target`
- [Error recovery](docs/error-recovery.md) · [Sentry](docs/sentry.md)
- [Stato progetto](docs/project-status.md) · [Piano task](docs/task-plan.md)

## 🌐 Note per il Deploy (Sottocartelle)

L'applicazione è configurata per funzionare in **qualsiasi sottocartella** del server (es. `dominio.it/test/ar/`).
- Il `publicPath` è impostato su `./` nel `webpack.config.js`.
- Tutti i riferimenti agli asset nel JSON sono relativi (`./asset/...` e `./quizbase/...`).

### 📦 Checklist per l'Upload
Per ogni aggiornamento online, assicurati di caricare i seguenti file dalla cartella `dist/`:
1.  **`bundle.js`** e **`index.html`** (Logica e Interfaccia)
2.  **`manifest.json`** e **`sw.js`** (Componenti PWA)
3.  **L'intera cartella `quizbase/`** (Domande e dati quiz)
4.  **La cartella `asset/icons/`** (Icone per l'installazione PWA)
5.  La cartella `asset/` e `image-targets/` (Contenuti multimediali e trackable)
