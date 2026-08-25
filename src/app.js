import { initMonitoring } from './monitoring/sentry';
initMonitoring();

import * as THREE from 'three';
window.THREE = THREE;
import { CarouselPipelineModule } from './ar-pipeline';
import { ErrorRecovery } from './error-recovery';

window.ErrorRecovery = ErrorRecovery;

// App Key sul tag <script src="xr.js" appKey="..."> in index.html (questo runtime non espone XR8.configure).

// ON-SCREEN LOGGER (Disabled)
const log = (...args) => { /* console.log(...args); */ };

// Init recovery il prima possibile (lingua default IT; ar-pipeline aggiorna getLang)
ErrorRecovery.init({
  getLang: () => 'it',
  isCarouselOpen: () => false,
});

const onxrloaded = () => {
  log('✅ xrloaded fired');
  log('XR8.Threejs exists: ' + !!XR8.Threejs);
  log('XR8.GlTextureRenderer exists: ' + !!XR8.GlTextureRenderer);

  // Permesso camera: messaggio dedicato se negato
  if (navigator.mediaDevices?.getUserMedia) {
    // Non forzare getUserMedia qui (XR8 lo gestisce); ascolta errori runtime
  }

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
  const galleriaarmiarmatura1armatura1qrJson = require('../image-targets/galleria_armi_armatura_1_armatura1_qr.json');
  const galleriaarmiarmatura2armatura2qrJson = require('../image-targets/galleria_armi_armatura_2_armatura2_qr.json');
  const galleriaarmiarmatura3armatura3qrJson = require('../image-targets/galleria_armi_armatura_3_armatura3_qr.json');
  const galleriaarmistanzagalleriaqrJson = require('../image-targets/galleria_armi_stanza_galleria_qr.json');
  const galleriacupolacandelabrocandelabriqrJson = require('../image-targets/galleria_cupola_candelabro_candelabri_qr.json');
  const galleriacupolaportieraportieraqrJson = require('../image-targets/galleria_cupola_portiera_portiera_qr.json');
  const galleriacupolastanzastanzaqrJson = require('../image-targets/galleria_cupola_stanza_stanza_qr.json');
  const labirintolabirintoqrJson = require('../image-targets/labirinto_labirinto_qr.json');
  const salaaffrescocapitellocapitelloJson = require('../image-targets/sala_affresco_capitello_capitello.json');
  const salaaffrescocapitellocapitelloqrJson = require('../image-targets/sala_affresco_capitello_capitello_qr.json');
  const salabagnobagnoJson = require('../image-targets/sala_bagno_bagno.json');
  const salabagnobagnoqrJson = require('../image-targets/sala_bagno_bagno_qr.json');
  const salabevilacquacaminocaminoJson = require('../image-targets/sala_bevilacqua_camino_camino.json');
  const salabevilacquacaminocaminoqrJson = require('../image-targets/sala_bevilacqua_camino_camino_qr.json');
  const salapranzocamerasalaJson = require('../image-targets/sala_pranzo_camera_sala.json');
  const salapranzocamerasalaqrJson = require('../image-targets/sala_pranzo_camera_sala_qr.json');
  const salastufavaltellinesedettagliopianoforteduepianoforteJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte.json');
  const salastufavaltellinesedettagliopianoforteunopianoforteqrJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_qr.json');
  const salastufavaltellineseorologioorologioqrJson = require('../image-targets/sala_stufa_valtellinese_orologio_orologio_qr.json');
  const salastufavaltellinesestanzastanzaJson = require('../image-targets/sala_stufa_valtellinese_stanza_stanza.json');
  const saloneonorecaminocaminoqrJson = require('../image-targets/salone_onore_camino_camino_qr.json');
  const saloneonorelampadalampadaqrJson = require('../image-targets/salone_onore_lampada_lampada_qr.json');
  const saloneonorelasenalasenaqrJson = require('../image-targets/salone_onore_lasena_lasena_qr.json');
  const saloneonoresalonesaloneqrJson = require('../image-targets/salone_onore_salone_salone_qr.json');
  const saloneonoretappezzeriatappezzeriaqrJson = require('../image-targets/salone_onore_tappezzeria_tappezzeria_qr.json');
  const scaloneingressoscaloneqrJson = require('../image-targets/scalone_ingresso_scalone_qr.json');
  const studiostudioqrJson = require('../image-targets/studio_studio_qr.json');

  XR8.XrController.configure({
    // true in test: evita il permesso motion su iOS (bloccante se negato una volta).
    // Con solo image targets l'AR parte comunque; se perdi il marker il carosello
    // può “congelarsi” finché non ritrovi il target (senza SLAM).
    disableWorldTracking: true,
    imageTargetData: [bibliotecacapitellobustocapitelloBustoJson, bibliotecacapitellobustocapitelloBustoqrJson, bibliotecastanzastanzaJson, bibliotecastanzastanzaqrJson, camerafaustostanzastanza1Json, camerafaustostanzastanzaqrJson, camerarossadettagliocredenzacredenzaJson, camerarossadettagliocredenzacredenzaqrJson, cameraverdedettagliocaminocaminoJson, cameraverdedettagliocaminocaminoqrJson, galleriaarmiarmatura1armatura1qrJson, galleriaarmiarmatura2armatura2qrJson, galleriaarmiarmatura3armatura3qrJson, galleriaarmistanzagalleriaqrJson, galleriacupolacandelabrocandelabriqrJson, galleriacupolaportieraportieraqrJson, galleriacupolastanzastanzaqrJson, labirintolabirintoqrJson, salaaffrescocapitellocapitelloJson, salaaffrescocapitellocapitelloqrJson, salabagnobagnoJson, salabagnobagnoqrJson, salabevilacquacaminocaminoJson, salabevilacquacaminocaminoqrJson, salapranzocamerasalaJson, salapranzocamerasalaqrJson, salastufavaltellinesedettagliopianoforteduepianoforteJson, salastufavaltellinesedettagliopianoforteunopianoforteqrJson, salastufavaltellineseorologioorologioqrJson, salastufavaltellinesestanzastanzaJson, saloneonorecaminocaminoqrJson, saloneonorelampadalampadaqrJson, saloneonorelasenalasenaqrJson, saloneonoresalonesaloneqrJson, saloneonoretappezzeriatappezzeriaqrJson, scaloneingressoscaloneqrJson, studiostudioqrJson],
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
    imageTargets: ['biblioteca_capitello_busto_capitelloBusto', 'biblioteca_capitello_busto_capitelloBusto_qr', 'biblioteca_stanza_stanza', 'biblioteca_stanza_stanza_qr', 'camera_fausto_stanza_stanza_1', 'camera_fausto_stanza_stanza_qr', 'camera_rossa_dettaglio_credenza_credenza', 'camera_rossa_dettaglio_credenza_credenza_qr', 'camera_verde_dettaglio_camino_camino', 'camera_verde_dettaglio_camino_camino_qr', 'galleria_armi_armatura_1_armatura1_qr', 'galleria_armi_armatura_2_armatura2_qr', 'galleria_armi_armatura_3_armatura3_qr', 'galleria_armi_stanza_galleria_qr', 'galleria_cupola_candelabro_candelabri_qr', 'galleria_cupola_portiera_portiera_qr', 'galleria_cupola_stanza_stanza_qr', 'labirinto_labirinto_qr', 'sala_affresco_capitello_capitello', 'sala_affresco_capitello_capitello_qr', 'sala_bagno_bagno', 'sala_bagno_bagno_qr', 'sala_bevilacqua_camino_camino', 'sala_bevilacqua_camino_camino_qr', 'sala_pranzo_camera_sala', 'sala_pranzo_camera_sala_qr', 'sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte', 'sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_qr', 'sala_stufa_valtellinese_orologio_orologio_qr', 'sala_stufa_valtellinese_stanza_stanza', 'salone_onore_camino_camino_qr', 'salone_onore_lampada_lampada_qr', 'salone_onore_lasena_lasena_qr', 'salone_onore_salone_salone_qr', 'salone_onore_tappezzeria_tappezzeria_qr', 'scalone_ingresso_scalone_qr', 'studio_studio_qr']
  });
  log('🚀 XR8.run() called');
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);
