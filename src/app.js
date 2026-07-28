import * as THREE from 'three';
window.THREE = THREE;
import { CarouselPipelineModule } from './ar-pipeline';

// App Key sul tag <script src="xr.js" appKey="..."> in index.html (questo runtime non espone XR8.configure).

// ON-SCREEN LOGGER (Disabled)
const log = (...args) => { /* console.log(...args); */ };

const onxrloaded = () => {
  log('✅ xrloaded fired');
  log('XR8.Threejs exists: ' + !!XR8.Threejs);
  log('XR8.GlTextureRenderer exists: ' + !!XR8.GlTextureRenderer);

  // Ordine ufficiale 8th Wall: GlTextureRenderer → FullWindowCanvas → Loading → Threejs → XrController → custom
  const modules = [
    XR8.GlTextureRenderer.pipelineModule(),
  ];

  if (window.XRExtras) {
    modules.push(window.XRExtras.FullWindowCanvas.pipelineModule());
    modules.push(window.XRExtras.Loading.pipelineModule());
    modules.push(window.XRExtras.RuntimeError.pipelineModule());
    log('✅ XRExtras loaded');
  }

  modules.push(XR8.Threejs.pipelineModule());
  modules.push(XR8.XrController.pipelineModule());
  modules.push(CarouselPipelineModule());

  const bibliotecacapitellobustocapitelloBustoJson = require('../image-targets/biblioteca_capitello_busto_capitelloBusto.json');
const bibliotecacapitellobustocapitelloBustoqrJson = require('../image-targets/biblioteca_capitello_busto_capitelloBusto_qr.json');
const bibliotecastanzastanzaJson = require('../image-targets/biblioteca_stanza_stanza.json');
const bibliotecastanzastanzaqrJson = require('../image-targets/biblioteca_stanza_stanza_qr.json');
const camerafaustostanzastanza1Json = require('../image-targets/camera_fausto_stanza_stanza_1.json');
const camerafaustostanzastanzaqrJson = require('../image-targets/camera_fausto_stanza_stanza_qr.json');
const camerarossadettagliocredenzacredenzaJson = require('../image-targets/camera_rossa_dettaglio_credenza_credenza.json');
const camerarossadettagliocredenzacredenzaqrJson = require('../image-targets/camera_rossa_dettaglio_credenza_credenza_qr.json');
const cameraverdedettagliocaminocaminoJson = require('../image-targets/camera_verde_dettaglio_camino_camino.json');
const cameraverdedettagliocaminocaminoqrJson = require('../image-targets/camera_verde_dettaglio_camino_camino_qr.json');
const salaaffrescocapitellocapitelloJson = require('../image-targets/sala_affresco_capitello_capitello.json');
const salaaffrescocapitellocapitelloqrJson = require('../image-targets/sala_affresco_capitello_capitello_qr.json');
const salabagnobagnoJson = require('../image-targets/sala_bagno_bagno.json');
const salabagnobagnoqrJson = require('../image-targets/sala_bagno_bagno_qr.json');
const salabevilacquacaminocaminoJson = require('../image-targets/sala_bevilacqua_camino_camino.json');
const salabevilacquacaminocaminoqrJson = require('../image-targets/sala_bevilacqua_camino_camino_qr.json');
const salapranzocamerasalaJson = require('../image-targets/sala_pranzo_camera_sala.json');
const salapranzocamerasalaqrJson = require('../image-targets/sala_pranzo_camera_sala_qr.json');

  XR8.XrController.configure({
    disableWorldTracking: true,
    imageTargetData: [bibliotecacapitellobustocapitelloBustoJson, bibliotecacapitellobustocapitelloBustoqrJson, bibliotecastanzastanzaJson, bibliotecastanzastanzaqrJson, camerafaustostanzastanza1Json, camerafaustostanzastanzaqrJson, camerarossadettagliocredenzacredenzaJson, camerarossadettagliocredenzacredenzaqrJson, cameraverdedettagliocaminocaminoJson, cameraverdedettagliocaminocaminoqrJson, salaaffrescocapitellocapitelloJson, salaaffrescocapitellocapitelloqrJson, salabagnobagnoJson, salabagnobagnoqrJson, salabevilacquacaminocaminoJson, salabevilacquacaminocaminoqrJson, salapranzocamerasalaJson, salapranzocamerasalaqrJson],
  });

  XR8.addCameraPipelineModules(modules);

  // Verifica che il file luminance sia raggiungibile (Debug opzionale)
  // fetch(bibliotecacapitellobustocapitellobustoJson.imagePath)
  //  .then(r => log('🖼️ luminance fetch: ' + r.status))
  //  .catch(e => log('❌ luminance fetch FAILED: ' + e.message));

  const canvas = document.getElementById('camerafeed');
  log('canvas found: ' + !!canvas);

  // LISTENER GLOBALI DI DEBUG — ascolto diretto sull'engine
  XR8.addCameraPipelineModule({
    name: 'debug-listener',
    listeners: [
      { event: 'reality.imagefound',   process: ({detail}) => log('🎯 IMAGE FOUND: ' + detail.name) },
      { event: 'reality.imageupdated', process: ({detail}) => log('🔄 IMAGE UPDATED: ' + detail.name) },
      { event: 'reality.imagelost',    process: ({detail}) => log('❌ IMAGE LOST: ' + detail.name) },
    ]
  });

  XR8.run({ 
    canvas,
    imageTargets: ['biblioteca_capitello_busto_capitelloBusto', 'biblioteca_capitello_busto_capitelloBusto_qr', 'biblioteca_stanza_stanza', 'biblioteca_stanza_stanza_qr', 'camera_fausto_stanza_stanza_1', 'camera_fausto_stanza_stanza_qr', 'camera_rossa_dettaglio_credenza_credenza', 'camera_rossa_dettaglio_credenza_credenza_qr', 'camera_verde_dettaglio_camino_camino', 'camera_verde_dettaglio_camino_camino_qr', 'sala_affresco_capitello_capitello', 'sala_affresco_capitello_capitello_qr', 'sala_bagno_bagno', 'sala_bagno_bagno_qr', 'sala_bevilacqua_camino_camino', 'sala_bevilacqua_camino_camino_qr', 'sala_pranzo_camera_sala', 'sala_pranzo_camera_sala_qr']
  });
  log('🚀 XR8.run() called');
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);
