# Test in ufficio — 7 oggetti

Ramo git: **`test/ufficio-7-target`** (da `main`). Il museo completo resta su `main`. I 28+ target museo restano **attivi** in runtime: servono per il museo; i 7 nuovi si aggiungono, non sostituiscono.

Obiettivo: provare tracking, sfera, overlay e carosello **senza essere in sede**, inquadrando oggetti da scrivania.

## Mappa cartella → oggetto

| Cartella asset | File trigger | Image Target 8th Wall | Oggetto |
|----------------|--------------|------------------------|---------|
| `galleria_armi/armatura_1` | `trigger_armatura1.jpg` | `galleria_armi_armatura_1_armatura1` | Palline / ciotole |
| `galleria_armi/armatura_2` | `trigger_armatura2.jpg` | `galleria_armi_armatura_2_armatura2` | Tazza Pantone |
| `galleria_armi/armatura_3` | `trigger_armatura3.jpg` | `galleria_armi_armatura_3_armatura3` | Libri Hoepli / Apogeo |
| `galleria_cupola/candelabro` | `trigger_candelabri.jpg` | `galleria_cupola_candelabro_candelabri` | Divanetto Friends |
| `galleria_cupola/portiera` | `trigger_portiera.jpg` | `galleria_cupola_portiera_portiera` | Statuina low-poly |
| `labirinto` | `trigger_labirinto.jpg` | `labirinto_labirinto` | Carrellino Groot (+ scena) |
| `sala_stufa_valtellinese/dettaglio_pianoforte_due` | `trigger_pianoforte_1.jpg` | `…_pianoforte_1` | Libri in fila sullo scaffale |

Testi RTF, audio, quiz e slide `images/` restano **del museo** (placeholder). I `*_qr` vecchi restano in `image-targets/` e in `app.js`.

## Qualità osservata in test

| Oggetto | Riconoscimento |
|---------|----------------|
| Divanetto Friends | Il più stabile (scritta alto contrasto) |
| Statuina (portiera) | Parte solo inquadratura identica alla foto; si perde subito |
| Palline, Pantone, libri Hoepli | Spesso non partono: sfocatura, poco contrasto, 3D / pattern ripetuti |

Dettagli qualità: [image-targets-pipeline.md](image-targets-pipeline.md).

Per rifare un trigger: nuova foto nitida e frontale → preprocess → `generate-targets-force.js` solo quell’id → sync.

## Come lanciare il test

```bash
git checkout test/ufficio-7-target
npm run serve
# altro terminale
npm run tunnel   # oppure: ngrok http 8080
```

Apri sul telefono l’URL **HTTPS** ngrok. Consenti la camera. Inquadra l’oggetto **come in foto**. Tap sulla sfera cyan (non c’è bottone HTML).

Chiudi la tab e riapri dopo ogni cambio a HTML/bundle (`?v=`). Vedi [sfera-trigger.md](sfera-trigger.md).

## Cosa non è in questo ramo (di proposito)

- Disattivare i 21+ target museo (richiesta: servono per il museo)
- Contenuti test al posto di testi/audio museo
- Commit: il lavoro può essere ancora uncommitted; verificare `git status` prima di mergiare su `main`
