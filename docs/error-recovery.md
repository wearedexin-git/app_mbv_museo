# Sistema di recupero errori (Error Recovery)

Documentazione del sistema di avvisi per l’esperienza WebAR del Museo Bagatti Valsecchi.

## Obiettivo

Informare il visitatore, con tono museale, quando qualcosa impedisce la visita digitale, e offrirgli sempre:

- **Chiudi** — nasconde il banner (l’utente può restare in pagina)
- **Ricarica** — `location.reload()` sullo stesso URL (anche ngrok / test)

Durante i ripristini automatici viene mostrato un **loader** (“Stiamo ripristinando la visita…”).

Il sistema è **attivo anche in ambiente di test** (localhost, ngrok, Cloudflare Tunnel).

---

## UI

### Banner

Stile allineato al banner PWA (`#pwa-install-banner`):

- posizione bottom, glass + bordo
- testo museale IT/EN in base alla lingua selezionata nell’overlay AR
- azioni: **Ricarica** (primario oro `#c4a45d`) · **Chiudi** (secondario)

Markup: `#error-recovery-banner` in `src/index.html`.

### Loader

Overlay leggero `#recovery-loader` durante auto-retry (es. ritorno online).

---

## Tipi di errore

| Codice | Trigger | Comportamento |
|--------|---------|---------------|
| `offline` | `navigator` offline o fetch fallito per rete | Banner + blocco interazioni sensibili se carosello aperto |
| `slow_or_timeout` | Load critico > 10s o timeout | Banner solo se l’azione fallisce davvero (niente warning proattivi sulla qualità rete) |
| `asset_load` | Texture carosello / asset correlati | Banner per quel fallimento |
| `xr_boot` | Motore XR non disponibile / schermata nera al boot | Messaggio dedicato |
| `camera` | Permesso fotocamera negato / non disponibile | Messaggio dedicato |
| `tracking_lost_long` | Marker perso con carosello aperto per ≥ 10s | Banner + chiusura automatica dell'hotspot (eccetto quiz aperto) |
| `ui_hang` / `watchdog` | Nessun heartbeat pipeline per ≥ 10s | Banner |
| `js_fatal` | `window.onerror` / `unhandledrejection` rilevanti | Banner |

Copy centralizzato in `src/error-messages.ts`.

---

## Flussi principali

### Offline

1. Evento `offline` o fallimento fetch di rete → banner `offline`
2. Se il carosello è aperto: si considera la sessione non affidabile fino a ripristino
3. Evento `online` → **auto-retry silenzioso** + loader
4. Esito OK → chiude loader/banner; KO → ripresenta banner

### Timeout / rete scadente

Rilevato solo su azioni reali (texture, quiz JSON, audio, ecc.) con soglia **10 secondi**.

### Tracking perso a lungo

Timer avviato su `reality.imagelost` con carosello aperto; cancellato su `imagefound` / `imageupdated`. Dopo 10s, se il quiz non è aperto: si chiude l'hotspot attivo (stessa azione della X manuale, si torna alla scansione) e compare il banner `tracking_lost_long`. Se il quiz è aperto in quel momento, niente banner né chiusura (l'utente potrebbe aver appoggiato il telefono per rispondere con calma).

Prima di questa modifica il piano 3D restava congelato nello spazio e, muovendosi, poteva "scivolare" fino a bloccarsi visivamente in un angolo dello schermo — da qui la scelta di chiudere invece di lasciarlo aperto.

Nella finestra tra i 900ms (fine grace period) e i 10s (chiusura), il piano non resta più fermo nel mondo: segue la fotocamera restando centrato nell'inquadratura (`carousel-module.ts`, `cameraLocked`/`freezeTracking`), così non esce mai dallo schermo mentre l'utente si gira — la percezione precedente era di un'app rotta. Vale solo a carosello aperto: il pin del trigger (prima del tap) resta congelato nel mondo come da comportamento originale.

### Watchdog frame

La pipeline AR chiama `ErrorRecovery.heartbeat()` in `onUpdate`. Se passano ≥ 10s senza heartbeat → banner `watchdog`.

### Boot XR / camera

Il vecchio overlay `#xr-boot-error` viene sostituito/affiancato dal banner unificato con copy dedicato e pulsante Ricarica.

---

## Architettura codice

```
src/error-messages.ts   → testi IT/EN
src/error-recovery.ts   → hub (show/hide, sensori, retry, reload)
src/ui-controller.ts    → getLang() + sync lingua sul banner
src/ar-pipeline.ts      → tracking lungo, quiz fetch, heartbeat
src/carousel-module.ts  → errori TextureLoader
src/app.js              → init hub + hook globali
src/index.html          → markup/CSS banner + loader
```

### API hub (sintesi)

```ts
ErrorRecovery.init({ getLang: () => 'it' | 'en' })
ErrorRecovery.show('offline')
ErrorRecovery.hide()
ErrorRecovery.heartbeat()
ErrorRecovery.noteTrackingLost()
ErrorRecovery.noteTrackingRestored()
ErrorRecovery.fetchWithTimeout(url, init?, { silent? })  // wrapper con timeout 10s; `silent` non mostra banner
ErrorRecovery.reportAssetLoadError(detail?)
```

### Logging

- `console.warn('[MBV:error]', payload)`
- hook `window.__mbvReportError` → **Sentry** (`src/monitoring/sentry.ts`). Setup mail e dashboard: [`sentry.md`](sentry.md). Indice: [`README.md`](README.md).

---

## Decisioni di prodotto (confermate)

| Domanda | Scelta |
|---------|--------|
| Formato UI | Banner (stile PWA) |
| Tono | Museale / chiaro |
| Lingua | IT/EN da toggle app |
| Azioni | Chiudi + Ricarica pagina |
| Loader | Sì, su auto-retry |
| Offline in carosello | Blocca e avvisa |
| Ritorno online | Auto-retry + loader |
| Rete scadente | Solo se azione fallisce |
| Scope asset | Sfera + contenuti interni |
| XR/camera | Messaggio dedicato |
| Soglia hang / tracking | 10 secondi |
| Retry blocco | Reload URL |
| Ambiente test | Avvisi visibili |
| Tracking perso lungo | Banner + auto-close carosello (eccetto quiz aperto) |

---

## Come testare

1. `npm run serve` (+ tunnel se su device)
2. Airplane mode a carosello aperto → banner offline
3. Riattiva rete → loader + ripresa o banner
4. Chrome DevTools → Network → Slow 3G + asset pesante → timeout
5. URL texture invalido (temporaneo) → `asset_load`
6. Nega permesso camera → `camera`
7. Copri / esci dal marker ≥ 10s con carosello aperto → hotspot chiuso in automatico + banner `tracking_lost_long`. Ripeti con il quiz aperto: né chiusura né banner.
8. Cambia IT/EN con banner aperto → testo aggiornato

---

## Estensioni future

- Soft-reset pipeline senza full reload (oltre a Ricarica)
- Retry mirato (solo asset fallito) oltre al reload pagina
- Retry mirato (solo asset fallito) oltre al reload pagina
