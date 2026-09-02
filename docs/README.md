# Documentazione — Museo Bagatti Valsecchi WebAR

Indice di tutto ciò che sta in `docs/`. Il `README.md` in root resta la guida rapida di struttura, sync e PWA.

## Operativa (uso quotidiano)

| Documento | Contenuto |
|-----------|-----------|
| [trigger-schema.md](trigger-schema.md) | Contenuti **per hotspot**: stanza → cartelle, marker foto/QR, file audio/immagini/testi, quiz (anche i buchi) |
| [image-targets-create.md](image-targets-create.md) | Procedura storica di creazione target (Studio / CLI). Integrare con la pipeline sopra. |
| [sfera-trigger.md](sfera-trigger.md) | Sfera 3D di tap: dimensione, perché si gonfiava, cache Safari, cosa non fare. |
| [test-ufficio.md](test-ufficio.md) | Test con 7 oggetti da scrivania (ramo `test/ufficio-7-target`). |
| [error-recovery.md](error-recovery.md) | Banner museale: offline, camera, XR, timeout, watchdog. |
| [sentry.md](sentry.md) | Sentry: DSN, eventi, privacy (niente replay camera), alert mail, test. |

## Contesto e storia

| Documento | Contenuto |
|-----------|-----------|
| [project-status.md](project-status.md) | Scopo, stack, stato del progetto. |
| [task-plan.md](task-plan.md) | Piano task originale (carousel, UI, XR). |
| [8thwall-overlay-guide.md](8thwall-overlay-guide.md) | Note architetturali overlay + image target. |

## Avvio rapido

```bash
npm run serve          # http://localhost:8080/
npm run tunnel         # ngrok HTTPS (serve la camera sul telefono)
node scripts/sync-targets.js
```

Sul telefono usare sempre HTTPS (ngrok). Dopo una modifica a `index.html` o al bundle: **chiudere la tab** e riaprire, Safari tiene la pagina vecchia.
