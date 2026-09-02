# Sfera trigger 3D

La sfera cyan wireframe è il **tap target** dell’esperienza cliente: appare sul marker riconosciuto; al tocco si apre overlay + carosello. Non c’è un bottone HTML («Tocca per aprire»): era una prova, **rimossa**.

Codice: `src/carousel-module.ts` (`Carousel3D`).

## Comportamento attuale

| Parametro | Valore | Note |
|-----------|--------|------|
| `triggerScreenFill` | `0.70` | Mira ~70% del lato corto dello schermo |
| Scala mondo | clamp `0.12` … `0.55` | Tetto per non entrare nel wireframe |
| Tap | raycast sulla mesh | `touchstart` su `window` |
| Overlay HTML | assente | Esperienza solo sfera |

La scala è **uniforme** (`setScalar`): la sfera deve restare tonda, non a uovo.

Alzare/abbassare: modifica `triggerScreenFill` e il tetto in `computeTriggerScale()`, poi **chiudi la tab** sul telefono (vedi cache).

## Perché si deformava o esplodeva

Problemi visti in test (settembre 2026) e corretti:

1. **`camera.updateProjectionMatrix()`** sulla camera XR. Su iPhone ritratto sovrascrive l’aspect 8th Wall: il feed resta normale, la sfera diventa un ellissoide verticale. Non richiamarla sulla camera XR; si può *leggere* `projectionMatrix.elements[5]` per il FOV.

2. **Scala che cresce ogni frame** verso un max `2.5` con posa instabile (oggetti piccoli, larghezza fisica target = 1 m). Sintomo: parte piccola, poi “a salti” inghiotte la camera (wireframe su tutto lo schermo). Tetto mondo + distanza (`dist * 0.7`).

3. **Freeze che impediva di ingrandire**: i primi frame misuravano piccolo e poi la scala non poteva più salire. Rimosso: ora la scala segue il target con smoothing, dentro il tetto.

4. **Bottone HTML** + webpack `liveReload: false`: Safari continuava a servire l’HTML vecchio. Serve riavvio `npm run serve` dopo cambi a `index.html` e chiusura tab.

5. **`bundle.js` in cache**: in `index.html` lo script è `bundle.js?v=6` per forzare il reload. Se cambi di nuovo il JS e il telefono non aggiorna, alza `?v=`.

## Cache e test sul telefono

Webpack dev server: `hot: false`, `liveReload: false`. Le modifiche TS si ricompilano, **il telefono no**.

- HTTPS obbligatorio (ngrok): `npm run serve` + `npm run tunnel`
- Dopo HTML/JS: chiudi la tab, riapri l’URL con `?v=N` nuovo
- Header `Cache-Control: no-store` sul dev server: Safari iOS a volte ignora comunque

## Relazione coi marker

La sfera usa **solo la posizione** del target (`activeContainer.scale = 1`), non la scala 8th Wall. Oggetti da ufficio (tazza, palline) con larghezza fisica 1 m non devono più far esplodere la sfera grazie al tetto.

Marker deboli: la sfera appare e sparisce perché `imagelost` **prima del tap** nasconde subito il trigger (`src/ar-pipeline.ts`). Col carosello aperto c’è ~900 ms di grazia. Non è un bug di dimensione sfera.

## Cosa non fare

- Overlay 2D “Tocca per aprire” (rompe l’esperienza concordata col cliente)
- `triggerScreenFill` tipo 0.88 senza tetto geometrico (camera dentro la sfera)
- `updateProjectionMatrix()` sulla camera 8th Wall
- Dare per scontato che un refresh Safari carichi il bundle nuovo
