# Schema contenuti per trigger

Inventario delle cartelle `src/asset/` (aggiornato 4 set 2026). Foto e QR dello stesso hotspot aprono **lo stesso** overlay / carosello / quiz.

`targetsData.json` è allineato: **43** hotspot (sync del 4 set 2026). **15** di questi hanno overlay e quiz pronti ma **manca** il JSON 8th Wall in `image-targets/`: la camera non li riconosce finché non si genera il marker (e si allinea `src/app.js`).

Quiz JSON sul disco: `bv-quiz-bevilacqua`, `bv-quiz-camino`, `bv-quiz-vasca`, `bv-quiz-vetrina`.  
Lo sync assegna `quizId` **solo** se esiste `src/quizbase/<id>/questions.json`. Mapping senza JSON (armatura, portiera, lesena, serliana, teschio) → nessun bottone, nessun fetch. `bevilacqua` è agganciato solo a `sala_bevilacqua/camino`, non a tutta la stanza. Le cartelle `quiz/` negli hotspot sono vuote e non vengono lette.

Legenda:

- **In app** — in `targetsData.json` e ha JSON 8th Wall in `image-targets/`
- **No marker 8th Wall** — overlay in `targetsData.json`, manca il pacchetto in `image-targets/` (la camera non lo vede)
- **1 foto** / **Carosello N** — numero file in `images/`
- Audio: lo sync usa il **primo** `.mp3` in cartella (`files[0]`). Se ce ne sono due, sono elencati tutti
- Flusso runtime (uguale per tutti): inquadra marker → sfera 3D → tap → overlay IT/EN + audio + slide → eventuale quiz → Chiudi

Indice: [README.md](README.md).

---

## Biblioteca (`biblioteca`)

Tre hotspot.

### `capitello_busto` — in app

- **Marker:** foto `trigger_capitelloBusto.jpg` + QR `trigger_capitelloBusto_qr.jpg`
- **Immagini:** 1 — `capitello_busto.jpg`
- **Audio IT:** `audio/ita/capitelloBusto_slide11[ITA].mp3` (slide 11)
- **Audio EN:** `audio/en/capitelloBusto_slide11[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (`capitello` non è una chiave di mapping)

### `capitello_teschio` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_capitelloTeschio_qr.jpg`
- **Immagini:** 1 — `capitello_teschio.jpg`
- **Audio IT:** `audio/ita/capitelloTeschio_slide10_[ITA].mp3` (slide 10)
- **Audio EN:** `audio/en/capitelloTeschio_slide10_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (`bv-quiz-teschio` non ha JSON; lo sync non assegna l’id)

### `stanza` — in app

- **Marker:** foto `trigger_stanza.jpg` + QR `trigger_stanza_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_stanza.jpg`, `carousel_2_capitello.jpg`
- **Audio IT:** `audio/ita/stanza_slide9[ITA].mp3` (slide 9)
- **Audio EN:** `audio/en/stanza_slide9[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Camera di Fausto (`camera_fausto`)

Tre hotspot.

### `capitello` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_capitello_qr.jpg`
- **Immagini:** 1 — `capitello.jpg`
- **Audio IT:** `audio/ita/capitello_slide16[ITA].mp3` (slide 16)
- **Audio EN:** `audio/en/capitello_slide16[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `dettaglio_porta` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_dettaglio_qr.jpg`
- **Immagini:** 1 — `girali.jpg`
- **Audio IT:** `audio/ita/dettaglio_slide15[ITA].mp3` (slide 15)
- **Audio EN:** `audio/en/dettaglio_slide15[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `stanza` — in app

- **Marker:** foto `trigger_stanza_1.jpg` + QR `trigger_stanza_qr.jpg`
- **Immagini:** 1 — `camera.jpg`
- **Audio IT:** `audio/ita/stanza_slide12[ITA].mp3` (slide 12)
- **Audio EN:** `audio/en/stanza_slide12[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Camera Rossa (`camera_rossa`)

Quattro hotspot. `credenza` e `decorazione_credenza` hanno **stessi** audio, immagine e nome file QR: duplicato da sistemare prima dello sync.

### `camera` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_camera_qr.jpg`
- **Immagini:** 1 — `camera_rossa.jpg`
- **Audio IT:** `audio/ita/camera_slide27[ITA].mp3` (slide 27)
- **Audio EN:** `audio/en/camera_slide27[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `credenza` — overlay pronto, no marker 8th Wall (duplicato di `decorazione_credenza`)

- **Marker:** solo QR `trigger_credenza_qr.jpg`
- **Immagini:** 1 — `grottesca_credenza.jpg`
- **Audio IT:** `audio/ita/decorazione_slide29[ITA].mp3` (slide 29)
- **Audio EN:** `audio/en/decorazione_slide29[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-vetrina` — file presente (mapping `credenza`). Stesso quiz di `dettaglio_credenza`

### `decorazione_credenza` — overlay pronto, no marker 8th Wall (duplicato di `credenza`)

- **Marker:** solo QR `trigger_credenza_qr.jpg` (stesso filename della cartella gemella; l’id 8th Wall include il path quindi non collide)
- **Immagini:** 1 — `grottesca_credenza.jpg`
- **Audio IT:** `audio/ita/decorazione_slide29[ITA].mp3` (slide 29)
- **Audio EN:** `audio/en/decorazione_slide29[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-vetrina` — file presente

### `dettaglio_credenza` — in app

- **Marker:** foto `trigger_credenza.jpg` + QR `trigger_credenza_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_credenza.jpg`, `carousel_2_credenza.jpg`
- **Audio IT:** `audio/ita/credenza_slide28[ITA].mp3` (slide 28)
- **Audio EN:** `audio/en/credenza_slide28[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-vetrina` — file presente (`src/quizbase/bv-quiz-vetrina/questions.json`)

---

## Camera Verde (`camera_verde`)

Tre hotspot.

### `camera` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_camera_qr.jpg`
- **Immagini:** 1 — `camera_verde.jpg`
- **Audio IT:** `audio/ita/camera_slide30[ITA].mp3` (slide 30)
- **Audio EN:** `audio/en/camera_slide30[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `dettaglio_camino` — in app

- **Marker:** foto `trigger_camino.jpg` + QR `trigger_camino_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_camino.jpg`, `carousel_2_camino.jpg`
- **Audio IT:** `audio/ita/camino_slide32[ITA].mp3` (slide 32)
- **Audio EN:** `audio/en/camino_slide32[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-camino` — file presente. **Stesso JSON** del camino in Salone d’onore e dei due camini in Sala da pranzo

### `dettaglio_letto` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_letto_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_letto.jpg`, `carousel_2_letto.jpg`
- **Audio IT:** `audio/ita/letto_slide31[ITA].mp3` (slide 31)
- **Audio EN:** `audio/en/letto_slide31[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Galleria delle armi (`galleria_armi`)

Quattro hotspot. Tutti in app.

### `armatura_1`

- **Marker:** foto `trigger_armatura1.jpg` (in test ufficio: palline) + QR `trigger_armatura1_qr.jpg`
- **Immagini:** 1 — `armatura1.jpg`
- **Audio IT:** `audio/ita/armatura1_slide42[ITA].mp3` (slide 42)
- **Audio EN:** `audio/en/armatura1_slide42[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (`bv-quiz-armatura` non ha JSON)

### `armatura_2`

- **Marker:** foto `trigger_armatura2.jpg` (test: tazza Pantone) + QR `trigger_armatura2_qr.jpg`
- **Immagini:** 1 — `armature.jpg`
- **Audio IT:** `audio/ita/armatura2_slide43[ITA].mp3` (slide 43)
- **Audio EN:** `audio/en/armatura2_slide43[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (stesso mapping `armatura`, nessun JSON)

### `armatura_3`

- **Marker:** foto `trigger_armatura3.jpg` (test: libri Hoepli) + QR `trigger_armatura3_qr.jpg`
- **Immagini:** 1 — `armature.jpg` (stesso nome file di armatura_2, cartella diversa)
- **Audio IT:** `audio/ita/armatura3_slide43[ITA].mp3` (slide 43)
- **Audio EN:** `audio/en/armatura3_slide43[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (stesso mapping `armatura`, nessun JSON)

### `stanza`

- **Marker:** solo QR `trigger_galleria_qr.jpg`
- **Immagini:** 1 — `galleria_armi.jpg`
- **Audio IT:** `audio/ita/galleria_slide41[ITA].mp3` (slide 41)
- **Audio EN:** `audio/en/galleria_slide41[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Galleria della cupola (`galleria_cupola`)

Tre hotspot. Tutti in app.

### `candelabro`

- **Marker:** foto `trigger_candelabri.jpg` (test: divanetto Friends) + QR `trigger_candelabri_qr.jpg`
- **Immagini:** 1 — `candelabro.jpg`
- **Audio IT:** `audio/ita/candelabro_slide20[ITA].mp3` (slide 20)
- **Audio EN:** `audio/en/candelabro_slide20[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `portiera`

- **Marker:** foto `trigger_portiera.jpg` (test: statuina) + QR `trigger_portiera_qr.jpg`
- **Immagini:** 1 — `stemma.jpg`
- **Audio IT:** `audio/ita/portiera_slide21[ITA].mp3` (slide 21)
- **Audio EN:** `audio/en/portiera_slide21[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (`bv-quiz-portiera` non ha JSON)

### `stanza`

- **Marker:** solo QR `trigger_stanza_qr.jpg`
- **Immagini:** 1 — `cupola.jpg`
- **Audio IT:** `audio/ita/stanza_slide19[ITA].mp3` (slide 19)
- **Audio EN:** `audio/en/stanza_slide19[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Labirinto (`labirinto`)

Un hotspot (la stanza *è* il trigger). In app.

- **Marker:** foto `trigger_labirinto.jpg` (test: carrellino Groot) + QR `trigger_labirinto_qr.jpg`
- **Immagini:** 1 — `labirinto.jpg`
- **Audio IT:** `audio/ita/labirinto_slide18[ITA].mp3` (slide 18)
- **Audio EN:** `audio/en/labirinto_slide18[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Sala dell’affresco (`sala_affresco`)

Tre hotspot.

### `capitello` — in app

- **Marker:** foto `trigger_capitello.jpg` + QR `trigger_capitello_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_capitello.jpg`, `carousel_2_capitello.jpg`
- **Audio IT:** `audio/ita/capitello_slide5[ITA].mp3` (slide 5)
- **Audio EN:** `audio/en/capitello_slide5[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `sala` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_sala_qr.jpg`
- **Immagini:** 1 — `sala_affresco.jpg`
- **Audio IT:** `audio/ita/sala_affresco_slide3[ITA].mp3` (slide 3)
- **Audio EN:** `audio/en/sala_affresco_slide3[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `serliana` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_serliana_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_serliana.jpg`, `carousel_2_serliana.jpg`
- **Audio IT:** `audio/ita/serliana_slide4_[ITA].mp3` (slide 4)
- **Audio EN:** `audio/en/serliana_slide4_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (`bv-quiz-serliana` non ha JSON)

---

## Sala da bagno (`sala_bagno`)

Un hotspot (cartella = stanza). In app.

- **Marker:** foto `trigger_bagno.jpg` + QR `trigger_bagno_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_bagno.jpg`, `carousel_2_bagno.jpg`
- **Audio IT:** `audio/ita/bagno_slide17[ITA].mp3` (slide 17)
- **Audio EN:** `audio/en/bagno_slide17[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-vasca` — file presente

---

## Sala Bevilacqua (`sala_bevilacqua`)

Tre hotspot. Il quiz Bevilacqua è agganciato **solo** a `camino` (`sala_bevilacqua_camino`). `sala` e `scarpa` non lo ereditano.

### `camino` — in app

- **Marker:** foto `trigger_camino.jpg` + QR `trigger_camino_qr.jpg`
- **Immagini:** 1 — `camino.jpg`
- **Audio IT:** `audio/ita/camino_slide7[ITA].mp3` (slide 7)
- **Audio EN:** `audio/en/camino_slide7[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-bevilacqua` — file presente (chiave specifica `sala_bevilacqua_camino`, prima di `camino`)

### `sala` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_sala_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_stanza.jpg`, `carousel_2_lampadario.jpg`
- **Audio IT:** `audio/ita/sala_slide6[ITA].mp3` (slide 6)
- **Audio EN:** `audio/en/sala_slide6[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (il mapping Bevilacqua non matcha questa cartella)

### `scarpa` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_scarpa_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_scarpa.jpg`, `carousel_2_scarpa.jpg`
- **Audio IT:** `audio/ita/scarpa_slide8[ITA].mp3` (slide 8)
- **Audio EN:** `audio/en/scarpa_slide8[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (il mapping Bevilacqua non matcha questa cartella)

---

## Sala da pranzo (`sala_pranzo`)

Quattro hotspot. Nessun nidificato sotto `camera` (le tre cartelle extra sono sorelle).

### `camera` — in app

- **Marker:** foto `trigger_sala.jpg` + QR `trigger_sala_qr.jpg`
- **Immagini:** 1 — `sala_da_pranzo.jpg`
- **Audio IT:** `audio/ita/camera_slide37[ITA].mp3` (slide 37)
- **Audio EN:** `audio/en/camera_slide37[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `camino_due` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_caminodue_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_camino.jpg`, `carousel_2_camino.jpg`
- **Audio IT:** `audio/ita/camino_slide38[ITA].mp3` (slide 38) — **stesso audio** di `camino_uno`
- **Audio EN:** `audio/en/camino_slide38[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-camino` — file presente (condiviso con Camera Verde e Salone)

### `camino_uno` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_caminouno_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_camino.jpg`, `carousel_2_camino.jpg`
- **Audio IT:** `audio/ita/camino_slide38[ITA].mp3` (slide 38)
- **Audio EN:** `audio/en/camino_slide38[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-camino` — file presente

### `porta` — overlay pronto, no marker 8th Wall

- **Marker:** solo QR `trigger_porta_qr.jpg`
- **Immagini:** carosello **3** — `carousel_1_porta.jpg`, `carousel_2_porta.jpg`, `carousel_3_porta.jpg` (unico hotspot a 3 slide; lo sync fa `slice(0, 3)`)
- **Audio IT:** `audio/ita/porta_slide39[ITA].mp3` (slide 39)
- **Audio EN:** `audio/en/porta_slide39[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Sala della stufa valtellinese (`sala_stufa_valtellinese`)

Quattro hotspot. Tutti in app.

### `dettaglio_pianoforte_due`

- **Marker:** foto museo `trigger_pianoforte.jpg` + foto test ufficio `trigger_pianoforte_1.jpg` (libri scaffale). Nessun `*_qr` in questa cartella
- **Immagini:** carosello 2 — `carousel_1_pianoforte.jpg`, `carousel_2_pianoforte.jpg`
- **Audio IT:** `audio/ita/dettaglio_slide24[ITA].mp3` (slide 24)
- **Audio EN:** `audio/en/dettaglio_slide24[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `dettaglio_pianoforte_uno`

- **Marker:** solo QR `trigger_pianoforte_qr.jpg`
- **Immagini:** 1 — `cuore_pianoforte.jpg`
- **Audio IT:** `audio/ita/dettaglio_slide23[ITA].mp3` (slide 23)
- **Audio EN:** `audio/en/dettaglio_slide23[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/texten.rtf` (nome file EN senza underscore)
- **Quiz:** no

### `orologio`

- **Marker:** solo QR `trigger_orologio_qr.jpg`
- **Immagini:** 1 — `orologio.jpg`
- **Audio IT:** `audio/ita/orologio_slide26[ITA].mp3` (slide 26)
- **Audio EN:** `audio/en/orologio_slide26[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `stanza`

- **Marker:** solo foto `trigger_stanza.jpg` (niente QR in cartella)
- **Immagini:** 1 — `stanza.jpg`
- **Audio IT:** `audio/ita/stanza_slide22[ITA].mp3` (slide 22)
- **Audio EN:** `audio/en/stanza_slide22[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Salone d’onore (`salone_onore`)

Cinque hotspot. Marker in cartella: **solo QR**. Tutti in app.

### `camino`

- **Marker:** QR `trigger_camino_qr.jpg`
- **Immagini:** 1 — `camino.jpg`
- **Audio IT:** `audio/ita/camino_slide33a_[ITA].mp3` (slide 33a)
- **Audio EN:** `audio/en/camino_slide33a_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** `bv-quiz-camino` — file presente (condiviso con Camera Verde)

### `lampada`

- **Marker:** QR `trigger_lampada_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_torciera.jpg`, `carousel_2_disegno.jpg`
- **Audio IT:** `audio/ita/lampada_slide35_[ITA].mp3` (slide 35)
- **Audio EN:** `audio/en/lampada_slide35_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `lasena`

- **Marker:** QR `trigger_lasena_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_lasena.jpg`, `carousel_2_disegno.jpg`
- **Audio IT:** `audio/ita/lasena_slide34[ITA].mp3` (slide 34; nome file senza `_` prima di `[ITA]`)
- **Audio EN:** `audio/en/lasena_slide34_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no (`bv-quiz-lesena` non ha JSON)

### `salone`

- **Marker:** QR `trigger_salone_qr.jpg`
- **Immagini:** 1 — `salone_boiserie.jpg`
- **Audio IT:** `audio/ita/salone_slide33b_[ITA].mp3` (slide 33b)
- **Audio EN:** `audio/en/salone_slide33b_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

### `tappezzeria`

- **Marker:** QR `trigger_tappezzeria_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_tappezzeria.jpg`, `carousel_2_disegno.jpg`
- **Audio IT (due file):** `tappezzeria_slide36[ITA]-esv2-50p-bg-10p-music-10p.mp3`, `tappezzeria_slide36[ITA].mp3` — lo sync prende `files[0]` (oggi in JSON è la variante esv2)
- **Audio EN (due file):** `tappezzeria_slide36_[ENG]-esv2-50p-bg-10p-music-10p.mp3`, `tappezzeria_slide36_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Scalone d’ingresso (`scalone_ingresso`)

Un hotspot. In app.

- **Marker:** solo QR `trigger_scalone_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_scalone.jpg`, `carousel_2_scalone.jpg`
- **Audio IT:** `audio/ita/scalone_Slide1[ITA].mp3` (slide 1; `Slide` con S maiuscola)
- **Audio EN:** `audio/en/scalone_slide1_[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Studio (`studio`)

Un hotspot. In app.

- **Marker:** solo QR `trigger_studio_qr.jpg`
- **Immagini:** carosello 2 — `carousel_1_porta.jpg`, `carousel_2_porta.jpg`
- **Audio IT:** `audio/ita/studio_slide40[ITA].mp3` (slide 40)
- **Audio EN:** `audio/en/studio_slide40[ENG].mp3`
- **Testi:** `testi/ita/text_ita.rtf`, `testi/en/text_en.rtf`
- **Quiz:** no

---

## Tabella riassuntiva

| Stanza | Hotspot | Stato | Marker | Slide | Quiz |
|--------|---------|-------|--------|------:|------|
| Biblioteca | capitello_busto | in app | foto + QR | 1 | no |
| Biblioteca | capitello_teschio | **no marker 8th Wall** | solo QR | 1 | no (teschio senza JSON) |
| Biblioteca | stanza | in app | foto + QR | 2 | no |
| Camera Fausto | capitello | **no marker 8th Wall** | solo QR | 1 | no |
| Camera Fausto | dettaglio_porta | **no marker 8th Wall** | solo QR | 1 | no |
| Camera Fausto | stanza | in app | foto + QR | 1 | no |
| Camera Rossa | camera | **no marker 8th Wall** | solo QR | 1 | no |
| Camera Rossa | credenza | **no marker 8th Wall** | solo QR | 1 | vetrina OK (duplicato) |
| Camera Rossa | decorazione_credenza | **no marker 8th Wall** | solo QR | 1 | vetrina OK (duplicato) |
| Camera Rossa | dettaglio_credenza | in app | foto + QR | 2 | vetrina OK |
| Camera Verde | camera | **no marker 8th Wall** | solo QR | 1 | no |
| Camera Verde | dettaglio_camino | in app | foto + QR | 2 | camino OK (condiviso) |
| Camera Verde | dettaglio_letto | **no marker 8th Wall** | solo QR | 2 | no |
| Galleria armi | armatura_1 | in app | foto + QR | 1 | no (armatura senza JSON) |
| Galleria armi | armatura_2 | in app | foto + QR | 1 | no (armatura senza JSON) |
| Galleria armi | armatura_3 | in app | foto + QR | 1 | no (armatura senza JSON) |
| Galleria armi | stanza | in app | solo QR | 1 | no |
| Galleria cupola | candelabro | in app | foto + QR | 1 | no |
| Galleria cupola | portiera | in app | foto + QR | 1 | no (portiera senza JSON) |
| Galleria cupola | stanza | in app | solo QR | 1 | no |
| Labirinto | (root) | in app | foto + QR | 1 | no |
| Sala affresco | capitello | in app | foto + QR | 2 | no |
| Sala affresco | sala | **no marker 8th Wall** | solo QR | 1 | no |
| Sala affresco | serliana | **no marker 8th Wall** | solo QR | 2 | no (serliana senza JSON) |
| Sala bagno | (root) | in app | foto + QR | 2 | vasca OK |
| Sala Bevilacqua | camino | in app | foto + QR | 1 | bevilacqua OK |
| Sala Bevilacqua | sala | **no marker 8th Wall** | solo QR | 2 | no |
| Sala Bevilacqua | scarpa | **no marker 8th Wall** | solo QR | 2 | no |
| Sala pranzo | camera | in app | foto + QR | 1 | no |
| Sala pranzo | camino_due | **no marker 8th Wall** | solo QR | 2 | camino OK |
| Sala pranzo | camino_uno | **no marker 8th Wall** | solo QR | 2 | camino OK |
| Sala pranzo | porta | **no marker 8th Wall** | solo QR | 3 | no |
| Stufa valtellinese | pianoforte_due | in app | 2 foto (museo + test) | 2 | no |
| Stufa valtellinese | pianoforte_uno | in app | solo QR | 1 | no |
| Stufa valtellinese | orologio | in app | solo QR | 1 | no |
| Stufa valtellinese | stanza | in app | solo foto | 1 | no |
| Salone d’onore | camino | in app | solo QR | 1 | camino OK (condiviso) |
| Salone d’onore | lampada | in app | solo QR | 2 | no |
| Salone d’onore | lasena | in app | solo QR | 2 | no (lesena senza JSON) |
| Salone d’onore | salone | in app | solo QR | 1 | no |
| Salone d’onore | tappezzeria | in app | solo QR | 2 | no |
| Scalone | (root) | in app | solo QR | 2 | no |
| Studio | (root) | in app | solo QR | 2 | no |

**43** cartelle contenuto in `src/asset/`, tutte in `targetsData.json`. **15** senza JSON 8th Wall in `image-targets/` (camera non li vede). Cartelle `src/asset/brand` e `src/asset/icons` non sono trigger.

Slide sul disco: 24 hotspot a 1 foto, 18 a carosello da 2, 1 a carosello da 3 (`sala_pranzo/porta`).

Quiz JSON esistenti: 4 file.  
In `targetsData.json`: **9** hotspot con `quizId` (vetrina ×3, vasca ×1, bevilacqua ×1, camino ×4). Armatura, portiera, lasena, teschio e serliana **non** hanno bottone. `sala` e `scarpa` Bevilacqua restano senza quiz.

---

## Mapping quiz (`sync-targets.js`)

Chiavi in ordine (la prima che matcha vince). Se `src/quizbase/<id>/questions.json` **non esiste**, `quizId` resta `null`.

| Chiave nel path | `quizId` | JSON sul disco | Chi lo prende |
|-----------------|----------|----------------|---------------|
| `sala_bevilacqua_camino` | `bv-quiz-bevilacqua` | sì | solo il camino Bevilacqua |
| `vetrina` / `credenza` | `bv-quiz-vetrina` | sì | dettaglio_credenza, credenza, decorazione_credenza |
| `camino` | `bv-quiz-camino` | sì | Camera Verde, Salone, pranzo camino_uno/due. **Non** Bevilacqua camino (chiave più specifica sopra) |
| `vasca` / `bagno` | `bv-quiz-vasca` | sì | sala_bagno |
| `armatura` | `bv-quiz-armatura` | **no** | 3 armature → nessun bottone |
| `portiera` | `bv-quiz-portiera` | **no** | portiera → nessun bottone |
| `lesena` / `lasena` | `bv-quiz-lesena` | **no** | lasena → nessun bottone |
| `serliana` | `bv-quiz-serliana` | **no** | serliana → nessun bottone |
| `teschio` | `bv-quiz-teschio` | **no** | capitello_teschio → nessun bottone |

`biblioteca/capitello_busto` e `camera_fausto/capitello` **non** matchano: la chiave è `teschio`, non `capitello`.  
`sala_bevilacqua/sala` e `scarpa` **non** matchano: non c’è più una chiave `bevilacqua` sulla stanza.

Per attivare un quiz mancante: aggiungere `src/quizbase/bv-quiz-<nome>/questions.json` e rilanciare lo sync. Non serve toccare il mapping se la chiave c’è già.

---

## Anomalie ancora aperte

1. **Duplicato Camera Rossa:** `credenza` ≈ `decorazione_credenza` (stessi mp3, stessa jpg, stesso `trigger_credenza_qr.jpg`). Tenerne uno.
2. ~~Estensione doppia audio EN~~ — sistemato (`[ENG].mp3`).
3. ~~Typo `texte_ita.rtf`~~ — sistemato (`text_ita.rtf`).
4. ~~Serliana 5 foto + QR~~ — sistemato (resta `trigger_serliana_qr.jpg`).
5. ~~Mapping quiz per substring~~ — sistemato (4 set 2026): `quizId` solo se il JSON esiste; Bevilacqua solo sul camino; fetch quiz in silent (niente banner `asset_load`).
6. **Cartelle `quiz/` vuote** in tutti gli hotspot: non servono allo sync (legge `src/quizbase/`).

---

## Fuori da questo schema

- `src/asset/brand`, `src/asset/icons` — PWA / grafica, non AR
- Varianti Image Target 8th Wall (`image-targets/*.json`): un hotspot può avere più id (`…_qr` e foto). Contenuto sempre quello della cartella
- Test ufficio: stesse cartelle, `trigger_*.jpg` sostituiti/aggiunti; testi e audio restano museo — [test-ufficio.md](test-ufficio.md)
