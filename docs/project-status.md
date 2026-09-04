# Analisi del Progetto: Museo Bagatti Valsecchi - WebAR Experience

Questo documento riassume lo scopo del progetto, l'architettura tecnica, le tecnologie utilizzate e lo stato attuale dell'avanzamento dei lavori. È inteso come punto di partenza per future evoluzioni o attività di bugfixing.

---

## 🎯 Obiettivo del Progetto

Il progetto consiste in un'applicazione **WebAR** (Web Augmented Reality) progettata per i visitatori del **Museo Bagatti Valsecchi**. L'applicazione consente di inquadrare oggetti del museo (*Image Targets* come armature, dipinti, camini, ecc.) per attivare:
1. Un **Trigger 3D floating** spaziale sopra l'oggetto.
2. Un **Carosello 3D di immagini** (Three.js) che mostra dettagli o angolazioni diverse dell'opera.
3. Un'**Interfaccia 2D (Overlay)** che presenta:
   - Testo informativo localizzato (Italiano/Inglese), estratto direttamente da file `.rtf`.
   - Audio-guida localizzata (Italiano/Inglese) con comandi Play/Pausa.
   - Un **Quiz interattivo** on-demand associato all'oggetto.
   - Opzione per cambiare lingua in tempo reale.
   - Bottone per chiudere l'esperienza e tornare a inquadrare un nuovo target.

---

## 🛠️ Stack Tecnologico

Il progetto è moderno, leggero e ottimizzato per dispositivi mobili:

*   **Engine AR**: **8th Wall** (utilizza la fotocamera del browser per SLAM e tracking di Image Targets).
*   **Grafica 3D**: **Three.js** (gestione della scena AR, posizionamento del trigger e del carosello fluttuante tracciato in tempo reale).
*   **Interfaccia Utente (UI)**: HTML5/CSS3 (Vanilla CSS) ad alta precisione, ottimizzato per notch e safe-area iOS.
*   **Bundler/Pipeline**: **Webpack** + **TypeScript** per un caricamento veloce e compatibilità.
*   **PWA (Progressive Web App)**: Service Worker (`sw.js`) per caching offline degli asset multimediali pesanti (audio, immagini, quiz) e banner intelligente di installazione per Android/iOS.
*   **Automazione/Sincronizzazione**: Script Node.js (`scripts/sync-targets.js`) per generare dinamicamente il database di tutti i target.

---

## 📁 Struttura e Organizzazione Dati

La struttura del progetto è organizzata per permettere l'aggiunta di contenuti in modo modulare ed automatizzato:

*   `src/asset/[stanza]/[trigger]/`: Contiene le sorgenti per ogni opera.
    -   `images/`: Fino a 3 immagini per il carosello.
    -   `audio/ita/` e `audio/en/`: File audio mp3 per le audioguide.
    -   `testi/ita/` e `testi/en/`: File `.rtf` contenenti i testi informativi.
*   `src/quizbase/bv-quiz-[nome]/`: Cartella contenente il file `questions.json` con le domande del quiz associato.
*   `image-targets/`: Contiene i file di configurazione `.json` generati da 8th Wall per il tracciamento visivo.
*   `src/config/targetsData.json`: Generato automaticamente dallo script di sincronizzazione; contiene il mapping completo di immagini, audio, testi estratti dagli RTF e quiz associati per oltre 40 target.
*   `src/config/targetsManager.ts`: Gestore TypeScript per caricare e interrogare i dati dei target con logiche di fallback e corrispondenze parziali di prefissi.

---

## 🔄 Il Flusso di Sincronizzazione (`sync-targets.js`)

Uno degli elementi chiave del progetto è il sistema di build data-driven:
1. Eseguendo `node scripts/sync-targets.js`, lo script scansiona ricorsivamente la cartella `src/asset/`.
2. Trova le cartelle che rappresentano i trigger.
3. Legge e decodifica i file `.rtf` pulendo la formattazione RTF e convertendoli in testo piano.
4. Associa gli audio e le immagini del carosello.
5. Associa i quiz in base a parole chiave nel path del trigger **solo se** esiste `src/quizbase/<id>/questions.json` (es. `credenza` → `bv-quiz-vetrina`; `armatura` senza JSON → nessun quiz).
6. Scrive i dati aggregati in `targetsData.json` e genera l'elenco degli import per gli Image Target in `generated-config.json`.

---

## 📈 Stato di Avanzamento e Funzionalità Implementate

Dall'analisi dei file sorgente, il progetto si trova in uno stato **avanzato/completo** dal punto di vista strutturale e delle feature principali:

| Area / Funzionalità | Stato | Dettagli |
| :--- | :---: | :--- |
| **Setup Pipeline AR (8th Wall + Three.js)** | ✅ Completato | Modulo `ar-pipeline.ts` agganciato correttamente ai moduli di 8th Wall. |
| **Tracciamento Target Visivi** | ✅ Completato | Gestione degli eventi `reality.imagefound`, `reality.imageupdated` e `reality.imagelost`. |
| **Carosello 3D Spaziale** | ✅ Completato | Creato in Three.js con PlaneGeometry e logica di scorrimento lerpata orizzontale. |
| **Interfaccia Utente 2D** | ✅ Completato | Implementato in `ui-controller.ts` con controlli audio, cambio lingua (IT/EN), supporto modali e quiz. |
| **Sistema Quiz** | ✅ Completato | Caricamento dinamico on-demand dei JSON del quiz dalla cartella `quizbase`. |
| **Automazione dei Target** | ✅ Completato | Lo script `sync-targets.js` aggrega e mappa oltre 43 target presenti nella cartella. |
| **Funzionalità PWA** | ✅ Completato | Service worker attivo con caching dinamico degli asset pesanti per ottimizzare le performance offline nel museo. |
