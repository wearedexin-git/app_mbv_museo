# Creazione e integrazione di un nuovo Image Target

> Flusso aggiornato (preprocess + CLI reale + sync): **[`image-targets-pipeline.md`](image-targets-pipeline.md)**.  
> Questo file resta la procedura Studio / integrazione in `app.js`. Lo script `@8thwall/cli` indicato sotto **non esiste su npm**; nel progetto si usa `npx @8thwall/image-target-cli` via `scripts/generate-targets-force.js`.

## 1. Creare l'Image Target con 8th Wall

1. **Usare l'interfaccia web di 8th Wall Studio**
   - Accedi a [8th Wall Studio](https://studio.8thwall.com).
   - Vai nella sezione **Image Targets** → **Create New**.
   - Carica l'immagine (PNG/JPG) che vuoi usare come target.
   - Imposta un **nome** (es. `mytarget`).
   - Salva: verranno generati due file:
     - `mytarget.json`
     - `mytarget_luminance.png`

2. **(Facoltativo) Creare il target da CLI**
   ```bash
   npx -y @8thwall/cli image-target create \
       --name mytarget \
       --image ./assets/images/mytarget.png \
       --output ./image-targets
   ```
   - Il comando crea `mytarget.json` e `mytarget_luminance.png` nella cartella indicata.

## 2. Copiare i file nella struttura del progetto

```bash
# Assicurati di essere nella root del progetto
cd "/Users/giuseppedifuccia/Downloads/testPeppe copia"

# Copia i file generati nella cartella image‑targets
cp ./mytarget.json ./image-targets/
cp ./mytarget_luminance.png ./image-targets/
```

## 3. Aggiornare il codice per includere il nuovo target

### 3.1 `src/app.js`

Aggiungi l'import del nuovo JSON e includilo nella configurazione di XR8:

```javascript
// Dopo le altre importazioni dei target JSON
const targetJsonMy = require('../image-targets/mytarget.json');

// Dentro XR8.XrController.configure → imageTargetData
imageTargetData: [targetJson, targetJson2, targetJson3, targetJsonMy],
```

E aggiungilo anche nella chiamata a `XR8.run`:

```javascript
XR8.run({
  canvas,
  imageTargets: ['imgdemo', 'imgdemo2', 'imgdemo3', 'mytarget']
});
```

### 3.2 `src/config/targetsManager.ts`

Aggiungi una nuova voce all'array `targetConfigs` con le immagini e le traduzioni per il nuovo target:

```typescript
{
  id: "mytarget",
  images: [
    "./assets/images/mytarget_1.png",
    "./assets/images/mytarget_2.png",
    "./assets/images/mytarget_3.png"
  ],
  localization: {
    it: {
      infoText: "Testo informativo in italiano per il nuovo target.",
      audioSrc: "./assets/audio/audio.mp4"
    },
    en: {
      infoText: "English info text for the new target.",
      audioSrc: "./assets/audio/en-presagio_nel_vento.mp3"
    }
  }
},
```

> **Nota:** le immagini indicizzate (`mytarget_1.png`, …) devono essere presenti nella cartella `src/assets/images/`.

### 3.3 (Opzionale) Aggiornare eventuali riferimenti statici

Se il progetto usa un file di configurazione Webpack per copiare le risorse, verifica che la cartella `image-targets` sia inclusa nel plugin `CopyWebpackPlugin` (già presente). Non è necessario modificare `webpack.config.js` a meno che tu abbia spostato la cartella.

## 4. Testare il nuovo target

```bash
# Avvia il server di sviluppo
npm run serve
```

Apri il browser all'indirizzo indicato (di solito `http://localhost:8080`). Punta la fotocamera verso l'immagine appena aggiunta: dovresti vedere il trigger, il carousel e i log `IMAGE FOUND` con il nome `mytarget`.

---

**Riepilogo dei comandi**

```bash
# 1. (CLI) Creare il target
npx -y @8thwall/cli image-target create \
    --name mytarget \
    --image ./assets/images/mytarget.png \
    --output ./image-targets

# 2. Copiare i file (se creati manualmente)
cp ./mytarget.json ./image-targets/
cp ./mytarget_luminance.png ./image-targets/

# 3. Avviare l'app in sviluppo
npm run serve
```

Con questi passaggi il nuovo Image Target sarà riconosciuto e integrato nel carousel dell’app.
