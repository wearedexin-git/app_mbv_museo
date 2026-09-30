# Schema contenuti per trigger

Inventario delle cartelle `src/asset/` (aggiornato 30 set 2026). Tutte le foto trigger dello stesso hotspot (foto scattate al museo e foto ufficiale `*_qr`) aprono **lo stesso** overlay / carosello / quiz.

`targetsData.json` è allineato: **42** hotspot, tutti in app. Ogni file `trigger_*` ha il suo marker in `image-targets/`: **90** marker 8th Wall, 90 `require()` in `src/app.js`.

Quiz JSON sul disco: **9** (`src/quizbase/bv-quiz-*`), testi dal PDF «QUIZ APP AR», solo italiano. L'app legge **solo** `questions.json` (overlay nativo, le immagini del quiz non vengono mostrate); `index.html`/`script.js`/`assets` nelle cartelle sono la versione standalone e non servono al runtime. Lo sync assegna `quizId` solo se il JSON esiste. Le cartelle `quiz/` negli hotspot sono vuote e non vengono lette.

Legenda:

- **Marker** — file `trigger_*` in cartella; ognuno ha un pacchetto 8th Wall in `image-targets/` (id `<hotspot>_<nome file senza trigger_>`)
- **Foto ufficiale `*_qr`** — nonostante il nome, sono foto professionali dell'opera, non codici QR. Marker generati così come sono (senza `preprocess-triggers.py`)
- **1 foto** / **Carosello N** — numero file in `images/`
- Audio: lo sync usa il **primo** `.mp3` in cartella (`files[0]`). Se ce ne sono due, sono elencati tutti
- Flusso runtime (uguale per tutti): inquadra marker → sfera 3D → tap → overlay IT/EN + audio + slide → eventuale quiz → Chiudi

Indice: [README.md](README.md).

---

## Biblioteca (`biblioteca`)

Tre hotspot.

### `capitello_busto`

- **Marker:** foto `trigger_capitelloBusto.jpg` + foto ufficiale `trigger_capitelloBusto_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `capitello_busto.jpg`
- **Audio IT:** `audio/ita/capitelloBusto_slide11[ITA].mp3` (slide 11)
- **Audio EN:** `audio/en/capitelloBusto_slide11[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `capitello_teschio`

- **Marker:** foto `trigger_capitelloTeschio.jpg` + foto ufficiale `trigger_capitelloTeschio_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `capitello_teschio.jpg`
- **Audio IT:** `audio/ita/capitelloTeschio_slide10_[ITA].mp3` (slide 10)
- **Audio EN:** `audio/en/capitelloTeschio_slide10_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `stanza`

- **Marker:** foto `trigger_stanza.jpg` + foto ufficiale `trigger_stanza_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_stanza.jpg`, `carousel_2_capitello.jpg`
- **Audio IT:** `audio/ita/stanza_slide9[ITA].mp3` (slide 9)
- **Audio EN:** `audio/en/stanza_slide9[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Camera di Fausto (`camera_fausto`)

Tre hotspot.

### `capitello`

- **Marker:** foto `trigger_capitello.jpg` + foto ufficiale `trigger_capitello_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `capitello.jpg`
- **Audio IT:** `audio/ita/capitello_slide16[ITA].mp3` (slide 16)
- **Audio EN:** `audio/en/capitello_slide16[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `dettaglio_porta`

- **Marker:** foto `trigger_dettaglio.jpg` + foto ufficiale `trigger_dettaglio_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `girali.jpg`
- **Audio IT:** `audio/ita/dettaglio_slide15[ITA].mp3` (slide 15)
- **Audio EN:** `audio/en/dettaglio_slide15[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `stanza`

- **Marker:** foto `trigger_stanza_1.jpg` + foto ufficiale `trigger_stanza_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `camera.jpg`
- **Audio IT:** `audio/ita/stanza_slide12[ITA].mp3` (slide 12)
- **Audio EN:** `audio/en/stanza_slide12[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-teschio` — teschio (memento mori)

---

## Camera Rossa (`camera_rossa`)

Tre hotspot. La cartella `decorazione_credenza` (duplicato di `credenza`: stessi mp3, stessa jpg, stesso `trigger_credenza_qr.jpg`) è stata rimossa — se ne teneva uno solo, come da anomalia già segnalata più sotto.

### `camera`

- **Marker:** foto `trigger_camera.jpg` + foto ufficiale `trigger_camera_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `camera_rossa.jpg`
- **Audio IT:** `audio/ita/camera_slide27[ITA].mp3` (slide 27)
- **Audio EN:** `audio/en/camera_slide27[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `credenza`

- **Marker:** foto `trigger_credenza.jpg` + foto ufficiale `trigger_credenza_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `grottesca_credenza.jpg`
- **Audio IT:** `audio/ita/decorazione_slide29[ITA].mp3` (slide 29)
- **Audio EN:** `audio/en/decorazione_slide29[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-vetrina` — vetrina (sigle LI BO / BA VA)

### `dettaglio_credenza`

- **Marker:** 2 foto `trigger_credenza.jpg`, `trigger_credenza_1.jpg` + foto ufficiale `trigger_credenza_qr.jpg` — 3 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_credenza.jpg`, `carousel_2_credenza.jpg`
- **Audio IT:** `audio/ita/credenza_slide28[ITA].mp3` (slide 28)
- **Audio EN:** `audio/en/credenza_slide28[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-vetrina` — vetrina (sigle LI BO / BA VA)

---

## Camera Verde (`camera_verde`)

Tre hotspot.

### `camera`

- **Marker:** foto `trigger_camera.jpg` + foto ufficiale `trigger_camera_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `camera_verde.jpg`
- **Audio IT:** `audio/ita/camera_slide30[ITA].mp3` (slide 30)
- **Audio EN:** `audio/en/camera_slide30[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `dettaglio_camino`

- **Marker:** foto `trigger_camino.jpg` + foto ufficiale `trigger_camino_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_camino.jpg`, `carousel_2_camino.jpg`
- **Audio IT:** `audio/ita/camino_slide32[ITA].mp3` (slide 32)
- **Audio EN:** `audio/en/camino_slide32[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `dettaglio_letto`

- **Marker:** foto `trigger_letto.jpg` + foto ufficiale `trigger_letto_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_letto.jpg`, `carousel_2_letto.jpg`
- **Audio IT:** `audio/ita/letto_slide31[ITA].mp3` (slide 31)
- **Audio EN:** `audio/en/letto_slide31[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Galleria delle armi (`galleria_armi`)

Quattro hotspot.

### `armatura_1`

- **Marker:** foto `trigger_armatura1.jpg` + foto ufficiale `trigger_armatura1_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `armatura1.jpg`
- **Audio IT:** `audio/ita/armatura1_slide42[ITA].mp3` (slide 42)
- **Audio EN:** `audio/en/armatura1_slide42[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-armatura` — armatura “finta antica”

### `armatura_2`

- **Marker:** foto `trigger_armatura2.jpg` + foto ufficiale `trigger_armatura2_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `armature.jpg`
- **Audio IT:** `audio/ita/armatura2_slide43[ITA].mp3` (slide 43)
- **Audio EN:** `audio/en/armatura2_slide43[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `armatura_3`

- **Marker:** foto `trigger_armatura3.jpg` + foto ufficiale `trigger_armatura3_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `armature.jpg` (stesso nome file di armatura_2, cartella diversa)
- **Audio IT:** `audio/ita/armatura3_slide43[ITA].mp3` (slide 43)
- **Audio EN:** `audio/en/armatura3_slide43[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `stanza`

- **Marker:** foto `trigger_galleria.jpg` + foto ufficiale `trigger_galleria_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `galleria_armi.jpg`
- **Audio IT:** `audio/ita/galleria_slide41[ITA].mp3` (slide 41)
- **Audio EN:** `audio/en/galleria_slide41[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Galleria della cupola (`galleria_cupola`)

Tre hotspot.

### `candelabro`

- **Marker:** foto `trigger_candelabri.jpg` + foto ufficiale `trigger_candelabri_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `candelabro.jpg`
- **Audio IT:** `audio/ita/candelabro_slide20[ITA].mp3` (slide 20)
- **Audio EN:** `audio/en/candelabro_slide20[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `portiera`

- **Marker:** foto `trigger_portiera.jpg` + foto ufficiale `trigger_portiera_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `stemma.jpg`
- **Audio IT:** `audio/ita/portiera_slide21[ITA].mp3` (slide 21)
- **Audio EN:** `audio/en/portiera_slide21[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-portiera` — portiera (stemma araldico)

### `stanza`

- **Marker:** foto `trigger_stanza.jpg` + foto ufficiale `trigger_stanza_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `cupola.jpg`
- **Audio IT:** `audio/ita/stanza_slide19[ITA].mp3` (slide 19)
- **Audio EN:** `audio/en/stanza_slide19[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Labirinto (`labirinto`)

Un hotspot (la stanza *è* il trigger).

- **Marker:** 2 foto `trigger_labirinto.jpg`, `trigger_labirinto_1.jpg` + foto ufficiale `trigger_labirinto_qr.jpg` — 3 marker 8th Wall
- **Immagini:** 1 — `labirinto.jpg`
- **Audio IT:** `audio/ita/labirinto_slide18[ITA].mp3` (slide 18)
- **Audio EN:** `audio/en/labirinto_slide18[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Sala dell’affresco (`sala_affresco`)

Tre hotspot.

### `capitello`

- **Marker:** foto `trigger_capitello.jpg` + foto ufficiale `trigger_capitello_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_capitello.jpg`, `carousel_2_capitello.jpg`
- **Audio IT:** `audio/ita/capitello_slide5[ITA].mp3` (slide 5)
- **Audio EN:** `audio/en/capitello_slide5[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `sala`

- **Marker:** foto `trigger_sala.jpg` + foto ufficiale `trigger_sala_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `sala_affresco.jpg`
- **Audio IT:** `audio/ita/sala_affresco_slide3[ITA].mp3` (slide 3)
- **Audio EN:** `audio/en/sala_affresco_slide3[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `serliana`

- **Marker:** 2 foto `trigger_serliana.jpg`, `trigger_serliana_1.jpg` + foto ufficiale `trigger_serliana_qr.jpg` — 3 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_serliana.jpg`, `carousel_2_serliana.jpg`
- **Audio IT:** `audio/ita/serliana_slide4_[ITA].mp3` (slide 4)
- **Audio EN:** `audio/en/serliana_slide4_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-serliana` — serliana

---

## Sala da bagno (`sala_bagno`)

Un hotspot (cartella = stanza).

- **Marker:** foto `trigger_bagno.jpg` + foto ufficiale `trigger_bagno_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_bagno.jpg`, `carousel_2_bagno.jpg`
- **Audio IT:** `audio/ita/bagno_slide17[ITA].mp3` (slide 17)
- **Audio EN:** `audio/en/bagno_slide17[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-vasca` — vasca

---

## Sala Bevilacqua (`sala_bevilacqua`)

Tre hotspot. Il quiz Bevilacqua (scarpetta araldica) è agganciato **solo** a `scarpa` (`sala_bevilacqua_scarpa`). `camino` e `sala` non hanno quiz.

### `camino`

- **Marker:** foto `trigger_camino.jpg` + foto ufficiale `trigger_camino_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `camino.jpg`
- **Audio IT:** `audio/ita/camino_slide7[ITA].mp3` (slide 7)
- **Audio EN:** `audio/en/camino_slide7[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `sala`

- **Marker:** foto `trigger_sala.jpg` + foto ufficiale `trigger_sala_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_stanza.jpg`, `carousel_2_lampadario.jpg`
- **Audio IT:** `audio/ita/sala_slide6[ITA].mp3` (slide 6)
- **Audio EN:** `audio/en/sala_slide6[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `scarpa`

- **Marker:** foto `trigger_scarpa.jpg` + foto ufficiale `trigger_scarpa_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_scarpa.jpg`, `carousel_2_scarpa.jpg`
- **Audio IT:** `audio/ita/scarpa_slide8[ITA].mp3` (slide 8)
- **Audio EN:** `audio/en/scarpa_slide8[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-bevilacqua` — bevilacqua (scarpetta araldica)

---

## Sala da pranzo (`sala_pranzo`)

Quattro hotspot. Nessun nidificato sotto `camera` (le tre cartelle extra sono sorelle).

### `camera`

- **Marker:** foto `trigger_sala.jpg` + foto ufficiale `trigger_sala_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `sala_da_pranzo.jpg`
- **Audio IT:** `audio/ita/camera_slide37[ITA].mp3` (slide 37)
- **Audio EN:** `audio/en/camera_slide37[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `camino_due`

- **Marker:** foto `trigger_caminodue.jpg` + foto ufficiale `trigger_caminodue_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_camino.jpg`, `carousel_2_camino.jpg`
- **Audio IT:** `audio/ita/camino_slide38[ITA].mp3` (slide 38) — **stesso audio** di `camino_uno`
- **Audio EN:** `audio/en/camino_slide38[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-camino` — camino della sala da pranzo

### `camino_uno`

- **Marker:** foto `trigger_caminouno.jpg` + foto ufficiale `trigger_caminouno_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_camino.jpg`, `carousel_2_camino.jpg`
- **Audio IT:** `audio/ita/camino_slide38[ITA].mp3` (slide 38)
- **Audio EN:** `audio/en/camino_slide38[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-camino` — camino della sala da pranzo

### `porta`

- **Marker:** foto `trigger_porta.jpg` + foto ufficiale `trigger_porta_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello **3** — `carousel_1_porta.jpg`, `carousel_2_porta.jpg`, `carousel_3_porta.jpg` (unico hotspot a 3 slide; lo sync fa `slice(0, 3)`)
- **Audio IT:** `audio/ita/porta_slide39[ITA].mp3` (slide 39)
- **Audio EN:** `audio/en/porta_slide39[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Sala della stufa valtellinese (`sala_stufa_valtellinese`)

Quattro hotspot.

### `dettaglio_pianoforte_due`

- **Marker:** foto `trigger_pianoforte_1.jpg` — 1 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_pianoforte.jpg`, `carousel_2_pianoforte.jpg`
- **Audio IT:** `audio/ita/dettaglio_slide24[ITA].mp3` (slide 24)
- **Audio EN:** `audio/en/dettaglio_slide24[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `dettaglio_pianoforte_uno`

- **Marker:** 3 foto `trigger_pianoforte.jpg`, `trigger_pianoforte_uno_1.jpg`, `trigger_pianoforte_uno_2.jpg` + foto ufficiale `trigger_pianoforte_qr.jpg` — 4 marker 8th Wall
- **Immagini:** 1 — `cuore_pianoforte.jpg`
- **Audio IT:** `audio/ita/dettaglio_slide23[ITA].mp3` (slide 23)
- **Audio EN:** `audio/en/dettaglio_slide23[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/texten.rtf` (nome file EN senza underscore)
- **Quiz:** no

### `orologio`

- **Marker:** foto `trigger_orologio.jpg` + foto ufficiale `trigger_orologio_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `orologio.jpg`
- **Audio IT:** `audio/ita/orologio_slide26[ITA].mp3` (slide 26)
- **Audio EN:** `audio/en/orologio_slide26[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `stanza`

- **Marker:** foto `trigger_stanza.jpg` — 1 marker 8th Wall
- **Immagini:** 1 — `stanza.jpg`
- **Audio IT:** `audio/ita/stanza_slide22[ITA].mp3` (slide 22)
- **Audio EN:** `audio/en/stanza_slide22[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Salone d’onore (`salone_onore`)

Cinque hotspot. Tutti in app.

### `camino`

- **Marker:** foto `trigger_camino.jpg` + foto ufficiale `trigger_camino_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `camino.jpg`
- **Audio IT:** `audio/ita/camino_slide33a_[ITA].mp3` (slide 33a)
- **Audio EN:** `audio/en/camino_slide33a_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `lampada`

- **Marker:** foto `trigger_lampada.jpg` + foto ufficiale `trigger_lampada_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_torciera.jpg`, `carousel_2_disegno.jpg`
- **Audio IT:** `audio/ita/lampada_slide35_[ITA].mp3` (slide 35)
- **Audio EN:** `audio/en/lampada_slide35_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `lasena`

- **Marker:** 2 foto `trigger_lasena.jpg`, `trigger_lasena_1.jpg` + foto ufficiale `trigger_lasena_qr.jpg` — 3 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_lasena.jpg`, `carousel_2_disegno.jpg`
- **Audio IT:** `audio/ita/lasena_slide34[ITA].mp3` (slide 34; nome file senza `_` prima di `[ITA]`)
- **Audio EN:** `audio/en/lasena_slide34_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-lesena` — lesena (firma di Giuseppe)

### `salone`

- **Marker:** foto `trigger_salone_1.jpg` + foto ufficiale `trigger_salone_qr.jpg` — 2 marker 8th Wall
- **Immagini:** 1 — `salone_boiserie.jpg`
- **Audio IT:** `audio/ita/salone_slide33b_[ITA].mp3` (slide 33b)
- **Audio EN:** `audio/en/salone_slide33b_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `tappezzeria`

- **Marker:** foto `trigger_tappezzeria.jpg` + foto ufficiale `trigger_tappezzeria_qr.jpg` — 2 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_tappezzeria.jpg`, `carousel_2_disegno.jpg`
- **Audio IT (due file):** `tappezzeria_slide36[ITA]-esv2-50p-bg-10p-music-10p.mp3`, `tappezzeria_slide36[ITA].mp3` — lo sync prende `files[0]` (oggi in JSON è la variante esv2)
- **Audio EN (due file):** `tappezzeria_slide36_[ENG]-esv2-50p-bg-10p-music-10p.mp3`, `tappezzeria_slide36_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Scalone d’ingresso (`scalone_ingresso`)

Un hotspot.

- **Marker:** 2 foto `trigger_scalone_1.jpg`, `trigger_scalone_2.jpg` + foto ufficiale `trigger_scalone_qr.jpg` — 3 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_scalone.jpg`, `carousel_2_scalone.jpg`
- **Audio IT:** `audio/ita/scalone_Slide1[ITA].mp3` (slide 1; `Slide` con S maiuscola)
- **Audio EN:** `audio/en/scalone_slide1_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Studio (`studio`)

Un hotspot.

- **Marker:** 2 foto `trigger_studio_1.jpg`, `trigger_studio_2.jpg` + foto ufficiale `trigger_studio_qr.jpg` — 3 marker 8th Wall
- **Immagini:** carosello 2 — `carousel_1_porta.jpg`, `carousel_2_porta.jpg`
- **Audio IT:** `audio/ita/studio_slide40[ITA].mp3` (slide 40)
- **Audio EN:** `audio/en/studio_slide40[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Tabella riassuntiva

| Stanza | Hotspot | Stato | Marker (n. target) | Slide | Quiz |
|--------|---------|-------|--------|------:|------|
| Biblioteca | capitello_busto | in app | 1 foto + ufficiale (2) | 1 | no |
| Biblioteca | capitello_teschio | in app | 1 foto + ufficiale (2) | 1 | no |
| Biblioteca | stanza | in app | 1 foto + ufficiale (2) | 2 | no |
| Camera Fausto | capitello | in app | 1 foto + ufficiale (2) | 1 | no |
| Camera Fausto | dettaglio_porta | in app | 1 foto + ufficiale (2) | 1 | no |
| Camera Fausto | stanza | in app | 1 foto + ufficiale (2) | 1 | teschio |
| Camera Rossa | camera | in app | 1 foto + ufficiale (2) | 1 | no |
| Camera Rossa | credenza | in app | 1 foto + ufficiale (2) | 1 | vetrina |
| Camera Rossa | dettaglio_credenza | in app | 2 foto + ufficiale (3) | 2 | vetrina |
| Camera Verde | camera | in app | 1 foto + ufficiale (2) | 1 | no |
| Camera Verde | dettaglio_camino | in app | 1 foto + ufficiale (2) | 2 | no |
| Camera Verde | dettaglio_letto | in app | 1 foto + ufficiale (2) | 2 | no |
| Galleria armi | armatura_1 | in app | 1 foto + ufficiale (2) | 1 | armatura |
| Galleria armi | armatura_2 | in app | 1 foto + ufficiale (2) | 1 | no |
| Galleria armi | armatura_3 | in app | 1 foto + ufficiale (2) | 1 | no |
| Galleria armi | stanza | in app | 1 foto + ufficiale (2) | 1 | no |
| Galleria cupola | candelabro | in app | 1 foto + ufficiale (2) | 1 | no |
| Galleria cupola | portiera | in app | 1 foto + ufficiale (2) | 1 | portiera |
| Galleria cupola | stanza | in app | 1 foto + ufficiale (2) | 1 | no |
| Labirinto | (root) | in app | 2 foto + ufficiale (3) | 1 | no |
| Sala affresco | capitello | in app | 1 foto + ufficiale (2) | 2 | no |
| Sala affresco | sala | in app | 1 foto + ufficiale (2) | 1 | no |
| Sala affresco | serliana | in app | 2 foto + ufficiale (3) | 2 | serliana |
| Sala bagno | (root) | in app | 1 foto + ufficiale (2) | 2 | vasca |
| Sala Bevilacqua | camino | in app | 1 foto + ufficiale (2) | 1 | no |
| Sala Bevilacqua | sala | in app | 1 foto + ufficiale (2) | 2 | no |
| Sala Bevilacqua | scarpa | in app | 1 foto + ufficiale (2) | 2 | bevilacqua |
| Sala pranzo | camera | in app | 1 foto + ufficiale (2) | 1 | no |
| Sala pranzo | camino_due | in app | 1 foto + ufficiale (2) | 2 | camino |
| Sala pranzo | camino_uno | in app | 1 foto + ufficiale (2) | 2 | camino |
| Sala pranzo | porta | in app | 1 foto + ufficiale (2) | 3 | no |
| Stufa valtellinese | pianoforte_due | in app | 1 foto (1) | 2 | no |
| Stufa valtellinese | pianoforte_uno | in app | 3 foto + ufficiale (4) | 1 | no |
| Stufa valtellinese | orologio | in app | 1 foto + ufficiale (2) | 1 | no |
| Stufa valtellinese | stanza | in app | 1 foto (1) | 1 | no |
| Salone d’onore | camino | in app | 1 foto + ufficiale (2) | 1 | no |
| Salone d’onore | lampada | in app | 1 foto + ufficiale (2) | 2 | no |
| Salone d’onore | lasena | in app | 2 foto + ufficiale (3) | 2 | lesena |
| Salone d’onore | salone | in app | 1 foto + ufficiale (2) | 1 | no |
| Salone d’onore | tappezzeria | in app | 1 foto + ufficiale (2) | 2 | no |
| Scalone | (root) | in app | 2 foto + ufficiale (3) | 2 | no |
| Studio | (root) | in app | 2 foto + ufficiale (3) | 2 | no |

**42** cartelle contenuto in `src/asset/`, tutte in `targetsData.json` e tutte con marker. **90** marker totali. Cartelle `src/asset/brand` e `src/asset/icons` non sono trigger.

Quiz: **11** hotspot con `quizId` (vetrina ×2, camino ×2, vasca, bevilacqua, teschio, armatura, portiera, lesena, serliana).

---

## Mapping quiz (`sync-targets.js`)

Match per sottostringa sull'id hotspot, la prima chiave che matcha vince. Se `src/quizbase/<id>/questions.json` **non esiste**, `quizId` resta `null` (con avviso in console). Dove la parola chiave da sola aggancerebbe hotspot sbagliati si usa l'id completo.

| Chiave | `quizId` | Hotspot | Domanda (risposta corretta) |
|--------|----------|---------|-----------------------------|
| `sala_bevilacqua_scarpa` | `bv-quiz-bevilacqua` | Sala Bevilacqua – scarpa | Perché una scarpetta come simbolo araldico? (A) |
| `sala_pranzo_camino_uno` / `_due` | `bv-quiz-camino` | i due camini della sala da pranzo | Da dove proviene il camino? (A) |
| `camera_fausto_stanza` | `bv-quiz-teschio` | Camera di Fausto – stanza | Cosa rappresenta il teschio? (A) |
| `galleria_armi_armatura_1` | `bv-quiz-armatura` | solo armatura_1 | Cosa tradisce l'armatura “finta antica”? (C) |
| `lesena` / `lasena` | `bv-quiz-lesena` | Salone d'onore – lasena | Firma di Giuseppe sulle lesene (A) |
| `portiera` | `bv-quiz-portiera` | Galleria cupola – portiera | I quattro simboli dello stemma (A) |
| `serliana` | `bv-quiz-serliana` | Sala affresco – serliana | Cos'è una serliana? (B) |
| `vasca` / `bagno` | `bv-quiz-vasca` | sala_bagno | A cosa serviva la vasca? (B) |
| `vetrina` / `credenza` | `bv-quiz-vetrina` | Camera Rossa – credenza, dettaglio_credenza | Sigle LI BO / BA VA (C) |

Scelte deliberate: il camino di Camera Verde, del Salone d'onore e di Sala Bevilacqua **non** hanno quiz (la domanda parla della sala da pranzo); il teschio sta in Camera di Fausto e non sul capitello della Biblioteca (la domanda è ambientata lì); armatura_2 e armatura_3 senza quiz.

Per aggiungere un quiz: creare `src/quizbase/bv-quiz-<nome>/questions.json` (formato: `question`, 3 `options`, `correctAnswer` indice 0-based, `images`), aggiungere la chiave al mapping se serve, rilanciare lo sync e la build.

---

## Anomalie ancora aperte

1. ~~Duplicato Camera Rossa: `credenza` ≈ `decorazione_credenza`~~ — risolto, cartella `decorazione_credenza` rimossa.
2. ~~Estensione doppia audio EN~~ — sistemato (`[ENG].mp3`).
3. ~~Typo `texte_ita.rtf`~~ — sistemato (`text_ita.rtf`).
4. ~~Serliana 5 foto + QR~~ — sistemato (resta `trigger_serliana_qr.jpg`).
5. ~~Mapping quiz per substring~~ — sistemato (4 set 2026): `quizId` solo se il JSON esiste; Bevilacqua solo sul camino; fetch quiz in silent (niente banner `asset_load`).
6. ~~Quiz mancanti (armatura, portiera, lesena, serliana, teschio)~~ — creati (30 set 2026) dal PDF «QUIZ APP AR».
7. **Quiz solo in italiano**: nessuna versione EN, con lingua inglese attiva il quiz resta in italiano.
8. **Cartelle `quiz/` vuote** in tutti gli hotspot: non servono allo sync (legge `src/quizbase/`).

---

## Fuori da questo schema

- `src/asset/brand`, `src/asset/icons` — PWA / grafica, non AR
- Varianti Image Target 8th Wall (`image-targets/*.json`): un hotspot può avere più id (`…_qr` e foto). Contenuto sempre quello della cartella
- Test ufficio: stesse cartelle, `trigger_*.jpg` sostituiti/aggiunti; testi e audio restano museo — [test-ufficio.md](test-ufficio.md)
