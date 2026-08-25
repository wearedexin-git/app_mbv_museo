# Sentry — errori, log e mail

L’app invia a Sentry gli errori JavaScript e gli eventi del sistema di recovery (camera, XR, asset, timeout, watchdog). **Offline** resta solo breadcrumb, per non intasare la dashboard.

Replay di sessione **non** è attivo: eviterebbe di registrare la camera dei visitatori.

## 1. Crea il progetto

1. Apri [sentry.io](https://sentry.io/) e crea un account (piano Developer gratuito va bene).
2. **Create project** → piattaforma **Browser JavaScript**.
3. Nome suggerito: `mbv-webar`.
4. Copia il **DSN** (`https://...@....ingest.sentry.io/...`).

## 2. Incolla il DSN nel codice

In `src/config/sentry-dsn.ts`:

```ts
export const SENTRY_DSN = 'https://xxxx@oXXXX.ingest.sentry.io/XXXX';
```

In alternativa, al build:

```bash
SENTRY_DSN='https://xxxx@oXXXX.ingest.sentry.io/XXXX' npm run serve
```

Riavvia `npm run serve` dopo aver salvato il DSN. Senza DSN l’app funziona uguale, in console compare solo `[MBV:sentry] DSN mancante`.

## 3. Dashboard log

Dopo il primo evento:

- **Issues** — elenco problemi raggruppati (`xr_boot`, `camera`, `asset_load`, crash JS, …)
- **Explore → Logs** — `console.error` e log SDK
- Apri un issue per stack, browser, URL (localhost / ngrok / produzione) e contesto `mbv`

## 4. Mail in caso di problemi

Le mail **non** si inviano dal codice: si impostano su Sentry.

1. In alto a sinistra: il progetto `mbv-webar`.
2. **Alerts** → **Create Alert Rule**.
3. Tipo **Issues**.
4. Condizione: *A new issue is created* (oppure *An issue has a high rate*).
5. Filtro utile: *The event's level is equal to error* (così non arrivano warning di tracking perso).
6. Azione: **Send a notification via email** → il tuo indirizzo (e quelli del team).
7. Salva la regola.

Per testare: in console del browser, sulla pagina dell’app:

```js
throw new Error('test sentry mbv');
```

Entro circa un minuto l’evento compare in Issues; se l’alert è attivo, arriva la mail.

## Cosa viene inviato

| Evento | Livello | Mail (con filtro error) |
|--------|---------|-------------------------|
| Crash JS (`js_fatal`) | error | sì |
| XR non parte (`xr_boot`) | error | sì |
| Camera negata (`camera`) | error | sì |
| Asset / timeout / hang | warning | no |
| Tracking perso a lungo | info | no |
| Offline | solo breadcrumb | no |
