# Pipeline Image Target (foto → tracking)

Come si passa da una foto in `src/asset/` a un marker che 8th Wall riconosce. Due script distinti: **non** sono intercambiabili.

## Flusso corretto

```
Foto originale (iPhone / Android / reflex), a colori, nitida
        │
        ▼
  scripts/preprocess-triggers.py
        │  scala di grigi, luci/ombre appiattite, max 1600 px
        ▼
  src/asset/[stanza]/[hotspot]/trigger_*.jpg     ← sorgente in cartella (B/N)
        │
        ▼
  scripts/generate-targets-force.js
        │  CLI @8thwall/image-target-cli
        ▼
  image-targets/[id].json
  image-targets/[id]_luminance.jpg   ← quello che usa il tracker
  image-targets/[id]_cropped.jpg
  image-targets/[id]_original.jpg
  image-targets/[id]_thumbnail.jpg
        │
        ▼
  node scripts/sync-targets.js       ← targetsData.json + generated-config.json
        │
        ▼
  src/app.js                         ← require JSON + XR8.run({ imageTargets })
```

Senza il passo 8th Wall (json + luminance) la camera **non** riconosce la foto nuova, anche se `trigger_*.jpg` è giusto.

I file `*_qr*` sono marker QR museo: `generate-targets-force.js` **li ignora** di proposito.

## Script

### Polarizzazione della foto sorgente

```bash
.venv/bin/python scripts/preprocess-triggers.py \
  --input foto_originale.jpg \
  --output src/asset/galleria_armi/armatura_1/trigger_armatura1.jpg
```

Cosa fa (`polarize()`):

1. HEIC/PNG/JPEG → JPG (su HEIC usa `sips` + EXIF transpose)
2. Lato lungo max 1600 px
3. Scala di grigi, median filter, equalize parziale, contrasto ridotto, unsharp

Il risultato **deve** stare in `src/asset/.../trigger_*.jpg`. Non è il file luminance di 8th Wall.

Se Pillow non carica: ricreare `.venv` e `pip install Pillow`.

### Generazione Image Target 8th Wall

```bash
# Solo alcuni id
node scripts/generate-targets-force.js \
  galleria_armi_armatura_1_armatura1 \
  galleria_cupola_portiera_portiera

# Tutti i trigger_* non-QR sotto src/asset
node scripts/generate-targets-force.js
```

L’id è: `stanza_sottocartella_nomeFileSenzaTrigger`.  
Esempio: cartella `galleria_armi/armatura_1` + file `trigger_armatura1.jpg` → `galleria_armi_armatura_1_armatura1`.

Lo script passa alla CLI larghezza fisica **`1` metro**. Per un’opera a parete è plausibile; per un oggetto da 10 cm la posa mondo risulta “stirata”. La sfera 3D ignora la scala del marker e usa un tetto proprio (vedi [sfera-trigger.md](sfera-trigger.md)).

Pacchetto npm: `@8thwall/image-target-cli` (non `@8thwall/cli`, che su npm non esiste).

### Sync

```bash
node scripts/sync-targets.js
```

Aggiorna `src/config/targetsData.json` e `generated-config.json`. Poi allinea a mano `src/app.js` se hai **aggiunto** un id nuovo (import JSON + array `imageTargets` in `XR8.run`).

## Due cartelle, due ruoli

| Percorso | Ruolo | Colori |
|----------|--------|--------|
| `src/asset/.../trigger_*.jpg` | Foto di partenza (dopo preprocess) | B/N se preprocessato |
| `image-targets/..._luminance.jpg` | Immagine di tracking 8th Wall | Scala di grigi |
| `image-targets/..._original.jpg` | Copia della sorgente usata in generazione | Come in input |

Non confrontare `trigger_*.jpg` con `*_qr_luminance.jpg`: sono target diversi (foto nuova vs QR museo).

## Qualità marker (8th Wall)

Il motore cerca **punti unici, nitidi, alto contrasto**, su una superficie **planare**. Non “vede” l’oggetto 3D.

**Serve**

- tanto dettaglio vario (testo, intagli, angoli)
- alto contrasto in scala di grigi
- foto a fuoco, di fronte, luce laterale
- poco spazio vuoto

**Non serve / rovina il tracking**

- sfocatura, motion blur
- superfici lisce (palline, tazza, plastica)
- pattern ripetuti (pile di ciotole, griglie)
- basso contrasto (bianco su bianco, rilievo Pantone)
- oggetti 3D visti di taglio
- preprocess eccessivo su foto già povere di dettaglio

Inquadrature: 8th Wall confronta **la foto**, non l’oggetto. Se nel trigger c’è anche lo sfondo (poster, libri), in sala bisogna rivedere una scena simile.

Dopo `imagefound`, un marker debole perde subito il lock (`imagelost`). Prima del tap l’app **nasconde subito** la sfera (niente grazia; la grazia ~1 s vale solo col carosello aperto). Sintomo: sfera un attimo, poi sparisce.

## Limite target attivi

`XR8.run({ imageTargets })` carica tutti i marker museo + QR + eventuali test. 8th Wall ne cerca al massimo ~10 insieme (fino a ~32 su engine recenti). Troppi id degradano il matching. In test ufficio i 7 nuovi convivono con i museo perché servono entrambi; in caso di “non prendo alcuni trigger”, è una causa possibile insieme alla qualità foto.

## Procedura nuova opera (museo)

1. Foto nitida dell’opera (o del QR, se è quello il marker)
2. Preprocess → `trigger_*.jpg` nella cartella hotspot
3. `generate-targets-force.js` con l’id
4. `sync-targets.js`
5. Se id nuovo: import in `app.js` + lista `imageTargets`
6. `npm run serve`, test sul telefono in HTTPS

Dettaglio Studio/CLI storico: [image-targets-create.md](image-targets-create.md).
