# Sentry — monitoraggio errori dell’app WebAR

Documentazione operativa e tecnica di Sentry per l’esperienza WebAR del **Museo Bagatti Valsecchi**.

Sentry riceve crash JavaScript e gli eventi del sistema di recovery (camera, XR, asset, timeout, watchdog). Serve a vedere in dashboard **cosa si rompe in sala** (Wi‑Fi, Safari, permesso camera, motore 8th Wall) e, se configurato, a ricevere **una mail** quando nasce un issue grave.

Il visitatore **non** vede Sentry: vede solo il banner museale di recovery. Sentry è lo strumento interno (Dexin / museo) per diagnosticare.

Documentazione collegata: [`error-recovery.md`](error-recovery.md) (banner, copy, flussi UX).

---

## Indice

1. [Perché Sentry in questa app](#1-perché-sentry-in-questa-app)
2. [Cosa viene inviato e cosa no](#2-cosa-viene-inviato-e-cosa-no)
3. [Architettura](#3-architettura)
4. [File coinvolti](#4-file-coinvolti)
5. [DSN, environment e release](#5-dsn-environment-e-release)
6. [Inizializzazione SDK (ogni opzione)](#6-inizializzazione-sdk-ogni-opzione)
7. [Ponte Error Recovery → Sentry](#7-ponte-error-recovery--sentry)
8. [Catalogo eventi (`mbv.kind`)](#8-catalogo-eventi-mbvkind)
9. [Raggruppamento, tag e contesto](#9-raggruppamento-tag-e-contesto)
10. [Privacy (camera, PII, replay)](#10-privacy-camera-pii-replay)
11. [Dashboard Sentry](#11-dashboard-sentry)
12. [Alert via email](#12-alert-via-email)
13. [Come testare](#13-come-testare)
14. [Troubleshooting](#14-troubleshooting)
15. [Manutenzione](#15-manutenzione)

---

## 1. Perché Sentry in questa app

L’app gira sul telefono del visitatore, spesso su Wi‑Fi di sede, Safari iOS, tunnel di test (ngrok) o PWA. Molti guasti **non** arrivano in console sul Mac di sviluppo:

- permesso fotocamera negato
- `xr.js` che non carica (rete, ad blocker, timeout)
- texture del carosello che falliscono
- pagina che si “ congela” (watchdog: la pipeline AR non manda più heartbeat)
- marker perso a lungo con overlay già aperto
- eccezioni JS (`onerror` / `unhandledrejection`)

Senza Sentry questi eventi restano solo sul device. Con Sentry diventano **Issues** raggruppati, con browser, URL, timestamp e contesto `mbv`.

Scelte di prodotto già confermate (commit `9cca990`):

- Sì: errori JS + recovery
- No: **Session Replay** (non registrare la camera dei visitatori)
- No: performance tracing (`tracesSampleRate: 0`)
- Offline: **solo breadcrumb**, nessun issue (non intasare la dashboard quando il museo perde il Wi‑Fi)

---

## 2. Cosa viene inviato e cosa no

### Inviato (diventa Issue o Log)

| Sorgente | Esempio | Livello Sentry |
|----------|---------|----------------|
| SDK nativo | `throw`, `onerror`, promise rejection | error |
| `console.error` | log applicativi / librerie | error (Issues + Logs) |
| `console.warn` | solo come **log SDK**, non come issue | log |
| Recovery `xr_boot` | XR8 assente dopo 15s / 45s | error |
| Recovery `camera` | permesso camera negato | error |
| Recovery `asset_load` | texture / fetch 4xx–5xx | warning |
| Recovery `slow_or_timeout` | fetch o load > 10s | warning |
| Recovery `watchdog` | nessun frame pipeline per ≥ 10s | warning |
| Recovery `tracking_lost_long` | marker perso ≥ 10s con carosello aperto | info |

### Non inviato come Issue

| Caso | Comportamento |
|------|----------------|
| `offline` | solo **breadcrumb** `mbv.recovery` |
| `js_fatal` dal banner | **non** viene ricatturato: l’SDK lo ha già preso da `onerror` (evita doppioni). Si aggiornano tag/context |
| `Script error.` | scartato (`ignoreErrors` + `beforeSend`) — è rumore cross-origin da `xr.js` |
| `ResizeObserver loop` | ignorato (falso positivo browser) |
| URL `xr.js` / `8thwall` | `denyUrls`: stack di terze parti 8th Wall non diventano issue |
| Session Replay | disattivato (sample rate 0) |
| Performance traces | disattivato |
| PII di default | `sendDefaultPii: false` (niente IP come identificatore utente, niente form automatici) |

---

## 3. Architettura

```
  Visitatori (Safari / Chrome)
           │
           ▼
  src/app.js
    initMonitoring()          ← PRIMA di Three.js / XR / ErrorRecovery
           │
           ▼
  src/monitoring/sentry.ts
    Sentry.init(...)
    window.__mbvReportError = reportRecovery
           │
           ├─ SDK cattura da solo: onerror, unhandledrejection, console.error
           │
           ▼
  src/error-recovery.ts
    show(kind) → report() → window.__mbvReportError(payload)
           │
           ▼
  ingest.de.sentry.io  →  Issues / Logs / Alerts (mail)
```

Ordine di boot (importante):

1. `import { initMonitoring }` e **chiamata immediata** in cima a `src/app.js`
2. Così un crash durante il load di Three.js o 8th Wall può ancora arrivare a Sentry
3. Poi `ErrorRecovery.init(...)`
4. Eventi recovery **prima** che Sentry sia ready finiscono in `window.__mbvErrorQueue` e vengono inviati in `flushQueue()` appena `init` termina

Se il DSN manca, `initMonitoring` esce subito: l’app funziona, in console compare `[MBV:sentry] DSN mancante`. Il recovery banner resta visibile al visitatore.

---

## 4. File coinvolti

| File | Ruolo |
|------|--------|
| `src/monitoring/sentry.ts` | Init SDK, mapping recovery → Sentry, coda, filtri |
| `src/config/sentry-dsn.ts` | DSN di default (già compilato nell’app) |
| `config/webpack.config.js` | `DefinePlugin`: `__SENTRY_DSN__`, `__SENTRY_ENVIRONMENT__` da env al build |
| `src/app.js` | Prima riga utile: `initMonitoring()` |
| `src/error-recovery.ts` | Genera i payload (`type`, `message`, `detail`, `at`) |
| `src/error-messages.ts` | Tipo `ErrorKind` e copy IT/EN del banner (non di Sentry) |
| `package.json` | Dipendenza `@sentry/browser` `^10.70.0` |
| `docs/error-recovery.md` | UX del banner; rimanda a questo file per Sentry |

Non c’è un backend proprio: il browser parla **direttamente** con l’ingest Sentry (DSN pubblico da progetto browser). È il modello standard Sentry client-side.

---

## 5. DSN, environment e release

### DSN

Il DSN è la chiave **pubblica** del progetto Sentry (va nel bundle: è fatto per il browser). Non è una password di account.

Priorità di risoluzione in `resolveDsn()`:

1. Costante webpack `__SENTRY_DSN__` se valorizzata al build (`SENTRY_DSN=... npm run serve` / `npm run build`)
2. Altrimenti `SENTRY_DSN` in `src/config/sentry-dsn.ts`

Il repo ha già un DSN puntato a un progetto EU (`ingest.de.sentry.io`). Per cambiarlo: aggiorna `sentry-dsn.ts` **oppure** passa l’env al build (l’env vince se non è stringa vuota).

```bash
# Override solo per un run locale
SENTRY_DSN='https://xxxx@oXXXX.ingest.de.sentry.io/XXXX' npm run serve
```

Dopo ogni modifica al DSN: riavvia `npm run serve` (webpack inietta la DefinePlugin all’avvio).

Senza DSN: nessun evento in dashboard; recovery locale invariato.

### Environment

`resolveEnvironment()`:

1. `__SENTRY_ENVIRONMENT__` se passato al build (`SENTRY_ENVIRONMENT=staging npm run serve`)
2. Altrimenti dal **hostname**:
   - `development` se matcha `localhost`, `127.`, `192.168.`, `ngrok`, `loca.lt`, `trycloudflare`
   - `production` in tutti gli altri casi (dominio museo / 8th Wall hosting)

In dashboard filtra per `environment` per distinguere test in ufficio da visita in sala.

### Release

Fissata in codice: `mbv-webar@0.1.0` (`Sentry.init({ release })`).

Quando si pubblica una versione nuova ha senso alzarla (es. `mbv-webar@0.2.0`) così in Issues si vede **in quale release** è comparso il bug. Oggi non è automatizzata dal git tag.

Tag globale: `app = mbv-webar`.

---

## 6. Inizializzazione SDK (ogni opzione)

Pacchetto: `@sentry/browser` (non Node). Integrazioni usate:

- `captureConsoleIntegration({ levels: ['error'] })` — `console.error` → evento
- `consoleLoggingIntegration({ levels: ['warn', 'error'] })` — warn/error → **Logs** (`enableLogs: true`)

Opzioni `Sentry.init`:

| Opzione | Valore | Perché |
|---------|--------|--------|
| `dsn` | da `resolveDsn()` | destinazione ingest |
| `environment` | development / production | filtri dashboard |
| `release` | `mbv-webar@0.1.0` | raggruppa per versione |
| `sendDefaultPii` | `false` | niente PII di default (privacy visitatori) |
| `enableLogs` | `true` | Explore → Logs |
| `tracesSampleRate` | `0` | niente APM / transazioni |
| `replaysSessionSampleRate` | `0` | niente replay “a campione” |
| `replaysOnErrorSampleRate` | `0` | niente replay nemmeno sugli errori |
| `ignoreErrors` | Script error, ResizeObserver, Non-Error rejection | rumore browser / XR |
| `denyUrls` | `/xr.js/i`, `/8thwall/i` | non incolpare 8th Wall come crash app |
| `beforeSend` | drop se il messaggio è `Script error` | seconda rete di sicurezza |

`window.__mbvSentryReady = true` solo **dopo** `init` riuscito (DSN presente). Solo allora la coda viene svuotata.

---

## 7. Ponte Error Recovery → Sentry

Ogni volta che il visitatore vede (o il sistema registra) un errore recovery, `ErrorRecovery.show(kind, detail?)` chiama `report()`:

```ts
{
  type: ErrorKind;      // es. 'camera'
  message: string;      // titolo IT/EN del banner
  detail?: string;      // tecnico (URL, status, gap ms) — in test visibile anche sul banner
  at: string;           // ISO timestamp
}
```

`console.warn('[MBV:error]', payload)` avviene **sempre**, anche senza Sentry.

Poi `window.__mbvReportError?.(payload)` (impostato da `initMonitoring`).

### Coda

Se Sentry non è ancora ready:

```ts
window.__mbvErrorQueue.push(payload)
```

All’init: `flushQueue()` ripete `reportRecovery` su ogni elemento. Serve per `xr_boot` early in `index.html` (timer 15s/45s) che può scattare prima del bundle, o per errori nei primi millisecondi.

### Logica `reportRecovery`

1. Non ready → coda
2. `type === 'offline'` → breadcrumb, **return**
3. `type === 'js_fatal'` → `setTag` + `setContext`, **return** (niente secondo capture)
4. Altrimenti `withScope`:
   - `setLevel` da tabella
   - `setTag('mbv.kind', type)`
   - `setFingerprint(['mbv-recovery', type])` — tutti i `camera` nello stesso issue, tutti gli `xr_boot` in un altro, ecc.
   - `setContext('mbv', { kind, detail, at, href })`
   - livello `error` → `captureException(new Error(...))`
   - altrimenti → `captureMessage(..., level)`

Fingerprint per **tipo**, non per messaggio: in museo 50 visitatori che negano la camera fanno **un** issue con 50 eventi, non 50 issue.

---

## 8. Catalogo eventi (`mbv.kind`)

Allineato a `ErrorKind` in `src/error-messages.ts`.

| `mbv.kind` | Quando scatta in app | Livello | Issue | Mail (alert filtrato su error) |
|------------|----------------------|---------|-------|--------------------------------|
| `js_fatal` | `window.onerror` / `unhandledrejection` rilevanti | error (SDK) | sì (SDK) | sì |
| `xr_boot` | XR8 assente: soft 15s (`soft-wait`), hard 45s (`hard-fail`); anche errori XR in recovery | error | sì | sì |
| `camera` | permesso / device camera | error | sì | sì |
| `asset_load` | TextureLoader carosello, fetch non OK, abort non-timeout | warning | sì | no |
| `slow_or_timeout` | fetch abortito a 10s, load lento | warning | sì | no |
| `watchdog` | gap heartbeat pipeline ≥ 10s (`gap=…ms`) | warning | sì | no |
| `tracking_lost_long` | `imagelost` con carosello aperto per ≥ 10s | info | sì | no |
| `offline` | `navigator` offline / TypeError di rete | info (breadcrumb) | no | no |

Chi chiama cosa (riferimento rapido):

- `src/index.html` — banner early XR se lo script `xr.js` non ha ancora esposto `XR8` (15s / 45s); se `ErrorRecovery.reportXrBoot` esiste, delega all’hub
- `error-recovery.ts` — `startBootWatch`, `startWatchdog`, listener `offline`/`online`, `onerror`, `unhandledrejection`, `fetchWithTimeout`, `withTimeout`
- `ar-pipeline.ts` — `heartbeat()` ogni `onUpdate`; `noteTrackingLost` / `noteTrackingRestored`; quiz `fetchWithTimeout`
- `carousel-module.ts` — `ErrorRecovery.withTimeout` sul load texture

---

## 9. Raggruppamento, tag e contesto

Su ogni evento recovery (tranne offline e il solo-tag di `js_fatal`):

- **Tag** `mbv.kind` — filtro Issues: `mbv.kind:camera`
- **Tag** `app` — `mbv-webar` (tutti gli eventi)
- **Fingerprint** `mbv-recovery` + kind
- **Context** `mbv`:
  - `kind`
  - `detail` (es. `hard-fail`, `gap=12043ms`, URL asset)
  - `at` (ISO)
  - `href` (localhost, ngrok, produzione)

In un issue apri **Tags** e **Contexts → mbv** per capire se è test ufficio o sala.

`js_fatal`: il grouping è quello di Sentry (stack trace), non il fingerprint recovery.

---

## 10. Privacy (camera, PII, replay)

Vincolo di prodotto: **non registrare ciò che inquadra il visitatore**.

| Meccanismo | Effetto |
|------------|---------|
| Replay sample rate 0 / 0 | Nessun video di sessione, nessuna cattura canvas camera |
| `sendDefaultPii: false` | Non allegare IP come user id, niente dati form automatici |
| Niente user email nel codice | Il visitatore è anonimo |
| Breadcrumb offline | Non crea issue di massa quando cade il Wi‑Fi del museo |

Cosa **può** arrivare comunque (accettato):

- URL della pagina (`href`)
- user agent / browser / OS (standard Sentry)
- `detail` tecnici (path asset, status HTTP, gap ms)
- messaggi di `console.error`

Non inviare mai in `detail` dati personali del visitatore. Oggi i detail sono path, status, messaggi di errore runtime.

Il DSN nel bundle è normale per Sentry browser: chiunque può teoricamente spammare eventi verso quel progetto. Mitigazioni lato Sentry: quota piano, inbound filters, rate limit. Non mettere in git token **auth** Sentry (quelli da API/CI).

---

## 11. Dashboard Sentry

Progetto atteso: piattaforma **Browser JavaScript**, nome suggerito `mbv-webar`, ingest **DE** (`ingest.de.sentry.io`).

### Issues

Elenco problemi raggruppati. Filtri utili:

- `environment:production` vs `environment:development`
- `mbv.kind:xr_boot`
- `level:error`
- `release:mbv-webar@0.1.0`

Apri un issue per: stack, count, primo/ultimo visto, browser (Mobile Safari), URL.

### Explore → Logs

`console.error` e `console.warn` (integration logs). Utile per warning che non sono issue `error`.

### Breadcrumbs

Sull’evento, timeline precedente: click, navigation, e `mbv.recovery` per gli offline.

### Quota

Piano Developer gratuito: se gli issue `warning` (asset/timeout) saturano la quota, alza il filtro inbound o riduci i kind inviati. Oggi `offline` è già escluso proprio per questo.

---

## 12. Alert via email

Le mail **non** partono dal codice. Si configurano su Sentry.

Procedura:

1. [sentry.io](https://sentry.io/) → progetto `mbv-webar`
2. **Alerts** → **Create Alert Rule**
3. Tipo **Issues**
4. Condizione consigliata: *A new issue is created*
5. Filtro: *The event's level is equal to error*  
   Così **non** arrivano mail per tracking perso, timeout rete, asset (warning/info). Arrivano crash JS, XR che non parte, camera negata.
6. Azione: **Send a notification via email** → indirizzi Dexin / referente museo
7. Salva

Variante rumore vs copertura:

- Solo `error` → poche mail, i problemi “sala chiusa / AR morta”
- Senza filtro livello → anche warning: più rumore (Wi‑Fi lento in visita)

La mail arriva in genere entro un minuto dal **primo** evento che apre l’issue. Eventi successivi sullo stesso issue **non** rinviano la mail, salvo regole tipo “high rate”.

---

## 13. Come testare

Prerequisiti: DSN valido, `npm run serve`, pagina aperta (anche ngrok). DevTools aperto.

### A. Crash JS (issue error + eventuale mail)

Nella console sulla pagina dell’app:

```js
throw new Error('test sentry mbv');
```

Entro ~1 minuto: Issues con il messaggio. Se l’alert error è attivo: mail.

### B. Recovery XR

Blocca `xr.js` (DevTools → Network → Block request URL `xr.js`) e ricarica. Dopo 15s: banner + issue `xr_boot` (`soft-wait`), dopo 45s `hard-fail`.

### C. Camera

Nega il permesso fotocamera. Deve comparire banner `camera` e issue error.

### D. Asset

Forza un URL texture inesistente (temporaneo) o Network → Offline sul fetch del quiz. `asset_load` o `offline` (breadcrumb).

### E. Watchdog

Difficile da simulare pulito: se la pipeline smette di chiamare `heartbeat` per 10s (tab in background aggressivo, freeze JS). Issue warning `watchdog` con `gap=…ms`.

### F. Tracking lungo

Apri un hotspot, tap sfera, copri il marker ≥ 10s. Issue info `tracking_lost_long`.

### G. Verificare environment

Su ngrok l’evento deve avere `environment: development`. Su dominio produzione: `production`.

Se **non** compare nulla: vedi [Troubleshooting](#14-troubleshooting).

---

## 14. Troubleshooting

| Sintomo | Cosa controllare |
|---------|------------------|
| Console `[MBV:sentry] DSN mancante` | `sentry-dsn.ts` vuoto **e** env `SENTRY_DSN` non passata al processo webpack |
| Eventi solo in development | Stai su localhost/ngrok: è corretto. Per produzione serve l’URL di deploy |
| Issue “Script error.” | Dovrebbero essere filtrati; se passano, `beforeSend` / `ignoreErrors` |
| Doppioni `js_fatal` | Non dovrebbero: recovery non fa `captureException` su quel kind |
| Troppi issue `offline` | Non dovrebbero essere issue; se lo sono, `SKIP_KINDS` è stato modificato |
| Mail che non arrivano | Alert assente, filtro livello, spam, issue già esistente (solo il *new* issue manda mail) |
| Mail troppo frequenti | Togli i warning dagli alert; tieni solo `level:error` |
| Safari iOS non invia | Content blocker, ITP, rete museo che filtra `ingest.de.sentry.io` |
| Test locale senza eventi | Ad blocker, estensione privacy, `denyUrls` troppo ampi |

Verifica di rete: in DevTools → Network cerca richieste verso `*.ingest.de.sentry.io` o `*.sentry.io` al momento dell’errore.

---

## 15. Manutenzione

- **Aggiornare `@sentry/browser`**: `package.json`; dopo major, ricontrollare che Replay resti a sample 0.
- **Nuova release**: cambia `release: 'mbv-webar@X.Y.Z'` in `sentry.ts` in coppia col deploy.
- **Nuovo `ErrorKind`**: aggiungi copy in `error-messages.ts`, riga in `LEVEL_BY_KIND`, e decidi se va in `SKIP_KINDS`.
- **Hosting UE**: l’ingest attuale è `.de.`; un DSN US sarebbe `.ingest.sentry.io` senza `de`.
- **Non committare** auth token Sentry (CI/API). Il DSN browser nel repo è atteso.

---

## Riferimenti rapidi

```bash
# Sviluppo
npm run serve

# DSN / env solo per quel processo
SENTRY_DSN='https://...' SENTRY_ENVIRONMENT='staging' npm run serve
```

Test crash:

```js
throw new Error('test sentry mbv');
```

Codice: `src/monitoring/sentry.ts`  
Recovery UX: [`error-recovery.md`](error-recovery.md)  
SDK: [Sentry Browser](https://docs.sentry.io/platforms/javascript/)
