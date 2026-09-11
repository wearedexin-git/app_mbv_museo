import { initMonitoring } from './monitoring/sentry';
initMonitoring();

import * as THREE from 'three';
window.THREE = THREE;
import { CarouselPipelineModule } from './ar-pipeline';
import { ErrorRecovery } from './error-recovery';
import { PwaPrecache } from './pwa-precache';
import { initOnboarding } from './onboarding';
import { getAppLang } from './lang-state';

window.ErrorRecovery = ErrorRecovery;
window.PwaPrecache = PwaPrecache;

// App Key sul tag <script src="xr.js" appKey="..."> in index.html (questo runtime non espone XR8.configure).

// ON-SCREEN LOGGER (Disabled)
const log = (...args) => { /* console.log(...args); */ };

// Init recovery il prima possibile (lingua da onboarding; ar-pipeline aggiorna getLang su uiController)
ErrorRecovery.init({
  getLang: () => getAppLang(),
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
const bibliotecacapitelloteschiocapitelloTeschioJson = require('../image-targets/biblioteca_capitello_teschio_capitelloTeschio.json');
const bibliotecastanzastanzaJson = require('../image-targets/biblioteca_stanza_stanza.json');
const bibliotecastanzastanzaqrJson = require('../image-targets/biblioteca_stanza_stanza_qr.json');
const camerafaustocapitellocapitelloJson = require('../image-targets/camera_fausto_capitello_capitello.json');
const camerafaustodettaglioportadettaglioJson = require('../image-targets/camera_fausto_dettaglio_porta_dettaglio.json');
const camerafaustostanzastanza1Json = require('../image-targets/camera_fausto_stanza_stanza_1.json');
const camerafaustostanzastanzaqrJson = require('../image-targets/camera_fausto_stanza_stanza_qr.json');
const camerarossacameracameraJson = require('../image-targets/camera_rossa_camera_camera.json');
const camerarossacredenzacredenzaJson = require('../image-targets/camera_rossa_credenza_credenza.json');
const camerarossadecorazionecredenzacredenzaJson = require('../image-targets/camera_rossa_decorazione_credenza_credenza.json');
const camerarossadettagliocredenzacredenzaJson = require('../image-targets/camera_rossa_dettaglio_credenza_credenza.json');
const camerarossadettagliocredenzacredenzaqrJson = require('../image-targets/camera_rossa_dettaglio_credenza_credenza_qr.json');
const cameraverdecameracameraJson = require('../image-targets/camera_verde_camera_camera.json');
const cameraverdedettagliocaminocaminoJson = require('../image-targets/camera_verde_dettaglio_camino_camino.json');
const cameraverdedettagliocaminocaminoqrJson = require('../image-targets/camera_verde_dettaglio_camino_camino_qr.json');
const cameraverdedettagliolettolettoJson = require('../image-targets/camera_verde_dettaglio_letto_letto.json');
const galleriaarmiarmatura1armatura1Json = require('../image-targets/galleria_armi_armatura_1_armatura1.json');
const galleriaarmiarmatura1armatura1qrJson = require('../image-targets/galleria_armi_armatura_1_armatura1_qr.json');
const galleriaarmiarmatura2armatura2Json = require('../image-targets/galleria_armi_armatura_2_armatura2.json');
const galleriaarmiarmatura2armatura2qrJson = require('../image-targets/galleria_armi_armatura_2_armatura2_qr.json');
const galleriaarmiarmatura3armatura3Json = require('../image-targets/galleria_armi_armatura_3_armatura3.json');
const galleriaarmiarmatura3armatura3qrJson = require('../image-targets/galleria_armi_armatura_3_armatura3_qr.json');
const galleriaarmistanzagalleriaJson = require('../image-targets/galleria_armi_stanza_galleria.json');
const galleriaarmistanzagalleriaqrJson = require('../image-targets/galleria_armi_stanza_galleria_qr.json');
const galleriacupolacandelabrocandelabriJson = require('../image-targets/galleria_cupola_candelabro_candelabri.json');
const galleriacupolacandelabrocandelabriqrJson = require('../image-targets/galleria_cupola_candelabro_candelabri_qr.json');
const galleriacupolaportieraportieraJson = require('../image-targets/galleria_cupola_portiera_portiera.json');
const galleriacupolaportieraportieraqrJson = require('../image-targets/galleria_cupola_portiera_portiera_qr.json');
const galleriacupolastanzastanzaJson = require('../image-targets/galleria_cupola_stanza_stanza.json');
const galleriacupolastanzastanzaqrJson = require('../image-targets/galleria_cupola_stanza_stanza_qr.json');
const labirintolabirintoJson = require('../image-targets/labirinto_labirinto.json');
const labirintolabirinto1Json = require('../image-targets/labirinto_labirinto_1.json');
const labirintolabirintoqrJson = require('../image-targets/labirinto_labirinto_qr.json');
const salaaffrescocapitellocapitelloJson = require('../image-targets/sala_affresco_capitello_capitello.json');
const salaaffrescocapitellocapitelloqrJson = require('../image-targets/sala_affresco_capitello_capitello_qr.json');
const salaaffrescosalasalaJson = require('../image-targets/sala_affresco_sala_sala.json');
const salaaffrescoserlianaserlianaJson = require('../image-targets/sala_affresco_serliana_serliana.json');
const salaaffrescoserlianaserliana1Json = require('../image-targets/sala_affresco_serliana_serliana_1.json');
const salabagnobagnoJson = require('../image-targets/sala_bagno_bagno.json');
const salabagnobagnoqrJson = require('../image-targets/sala_bagno_bagno_qr.json');
const salabevilacquacaminocaminoJson = require('../image-targets/sala_bevilacqua_camino_camino.json');
const salabevilacquacaminocaminoqrJson = require('../image-targets/sala_bevilacqua_camino_camino_qr.json');
const salabevilacquasalasalaJson = require('../image-targets/sala_bevilacqua_sala_sala.json');
const salabevilacquascarpascarpaJson = require('../image-targets/sala_bevilacqua_scarpa_scarpa.json');
const salapranzocamerasalaJson = require('../image-targets/sala_pranzo_camera_sala.json');
const salapranzocamerasalaqrJson = require('../image-targets/sala_pranzo_camera_sala_qr.json');
const salapranzocaminoduecaminodueJson = require('../image-targets/sala_pranzo_camino_due_caminodue.json');
const salapranzocaminounocaminounoJson = require('../image-targets/sala_pranzo_camino_uno_caminouno.json');
const salapranzoportaportaJson = require('../image-targets/sala_pranzo_porta_porta.json');
const salastufavaltellinesedettagliopianoforteduepianoforteJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte.json');
const salastufavaltellinesedettagliopianoforteduepianoforte1Json = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte_1.json');
const salastufavaltellinesedettagliopianoforteunopianoforteqrJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_qr.json');
const salastufavaltellineseorologioorologioJson = require('../image-targets/sala_stufa_valtellinese_orologio_orologio.json');
const salastufavaltellineseorologioorologioqrJson = require('../image-targets/sala_stufa_valtellinese_orologio_orologio_qr.json');
const salastufavaltellinesestanzastanzaJson = require('../image-targets/sala_stufa_valtellinese_stanza_stanza.json');
const saloneonorecaminocaminoJson = require('../image-targets/salone_onore_camino_camino.json');
const saloneonorecaminocaminoqrJson = require('../image-targets/salone_onore_camino_camino_qr.json');
const saloneonorelampadalampadaJson = require('../image-targets/salone_onore_lampada_lampada.json');
const saloneonorelampadalampadaqrJson = require('../image-targets/salone_onore_lampada_lampada_qr.json');
const saloneonorelasenalasenaJson = require('../image-targets/salone_onore_lasena_lasena.json');
const saloneonorelasenalasena1Json = require('../image-targets/salone_onore_lasena_lasena_1.json');
const saloneonorelasenalasenaqrJson = require('../image-targets/salone_onore_lasena_lasena_qr.json');
const saloneonoresalonesalone1Json = require('../image-targets/salone_onore_salone_salone_1.json');
const saloneonoresalonesaloneqrJson = require('../image-targets/salone_onore_salone_salone_qr.json');
const saloneonoretappezzeriatappezzeriaJson = require('../image-targets/salone_onore_tappezzeria_tappezzeria.json');
const saloneonoretappezzeriatappezzeriaqrJson = require('../image-targets/salone_onore_tappezzeria_tappezzeria_qr.json');
const scaloneingressoscalone1Json = require('../image-targets/scalone_ingresso_scalone_1.json');
const scaloneingressoscalone2Json = require('../image-targets/scalone_ingresso_scalone_2.json');
const scaloneingressoscaloneqrJson = require('../image-targets/scalone_ingresso_scalone_qr.json');
const studiostudio1Json = require('../image-targets/studio_studio_1.json');
const studiostudio2Json = require('../image-targets/studio_studio_2.json');
const studiostudioqrJson = require('../image-targets/studio_studio_qr.json');

  XR8.XrController.configure({
    // true in test: evita il permesso motion su iOS (bloccante se negato una volta).
    // Con solo image targets l'AR parte comunque; se perdi il marker il carosello
    // può “congelarsi” finché non ritrovi il target (senza SLAM).
    disableWorldTracking: true,
    imageTargetData: [bibliotecacapitellobustocapitelloBustoJson, bibliotecacapitellobustocapitelloBustoqrJson, bibliotecacapitelloteschiocapitelloTeschioJson, bibliotecastanzastanzaJson, bibliotecastanzastanzaqrJson, camerafaustocapitellocapitelloJson, camerafaustodettaglioportadettaglioJson, camerafaustostanzastanza1Json, camerafaustostanzastanzaqrJson, camerarossacameracameraJson, camerarossacredenzacredenzaJson, camerarossadecorazionecredenzacredenzaJson, camerarossadettagliocredenzacredenzaJson, camerarossadettagliocredenzacredenzaqrJson, cameraverdecameracameraJson, cameraverdedettagliocaminocaminoJson, cameraverdedettagliocaminocaminoqrJson, cameraverdedettagliolettolettoJson, galleriaarmiarmatura1armatura1Json, galleriaarmiarmatura1armatura1qrJson, galleriaarmiarmatura2armatura2Json, galleriaarmiarmatura2armatura2qrJson, galleriaarmiarmatura3armatura3Json, galleriaarmiarmatura3armatura3qrJson, galleriaarmistanzagalleriaJson, galleriaarmistanzagalleriaqrJson, galleriacupolacandelabrocandelabriJson, galleriacupolacandelabrocandelabriqrJson, galleriacupolaportieraportieraJson, galleriacupolaportieraportieraqrJson, galleriacupolastanzastanzaJson, galleriacupolastanzastanzaqrJson, labirintolabirintoJson, labirintolabirinto1Json, labirintolabirintoqrJson, salaaffrescocapitellocapitelloJson, salaaffrescocapitellocapitelloqrJson, salaaffrescosalasalaJson, salaaffrescoserlianaserlianaJson, salaaffrescoserlianaserliana1Json, salabagnobagnoJson, salabagnobagnoqrJson, salabevilacquacaminocaminoJson, salabevilacquacaminocaminoqrJson, salabevilacquasalasalaJson, salabevilacquascarpascarpaJson, salapranzocamerasalaJson, salapranzocamerasalaqrJson, salapranzocaminoduecaminodueJson, salapranzocaminounocaminounoJson, salapranzoportaportaJson, salastufavaltellinesedettagliopianoforteduepianoforteJson, salastufavaltellinesedettagliopianoforteduepianoforte1Json, salastufavaltellinesedettagliopianoforteunopianoforteqrJson, salastufavaltellineseorologioorologioJson, salastufavaltellineseorologioorologioqrJson, salastufavaltellinesestanzastanzaJson, saloneonorecaminocaminoJson, saloneonorecaminocaminoqrJson, saloneonorelampadalampadaJson, saloneonorelampadalampadaqrJson, saloneonorelasenalasenaJson, saloneonorelasenalasena1Json, saloneonorelasenalasenaqrJson, saloneonoresalonesalone1Json, saloneonoresalonesaloneqrJson, saloneonoretappezzeriatappezzeriaJson, saloneonoretappezzeriatappezzeriaqrJson, scaloneingressoscalone1Json, scaloneingressoscalone2Json, scaloneingressoscaloneqrJson, studiostudio1Json, studiostudio2Json, studiostudioqrJson],
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
    imageTargets: ['biblioteca_capitello_busto_capitelloBusto', 'biblioteca_capitello_busto_capitelloBusto_qr', 'biblioteca_capitello_teschio_capitelloTeschio', 'biblioteca_stanza_stanza', 'biblioteca_stanza_stanza_qr', 'camera_fausto_capitello_capitello', 'camera_fausto_dettaglio_porta_dettaglio', 'camera_fausto_stanza_stanza_1', 'camera_fausto_stanza_stanza_qr', 'camera_rossa_camera_camera', 'camera_rossa_credenza_credenza', 'camera_rossa_decorazione_credenza_credenza', 'camera_rossa_dettaglio_credenza_credenza', 'camera_rossa_dettaglio_credenza_credenza_qr', 'camera_verde_camera_camera', 'camera_verde_dettaglio_camino_camino', 'camera_verde_dettaglio_camino_camino_qr', 'camera_verde_dettaglio_letto_letto', 'galleria_armi_armatura_1_armatura1', 'galleria_armi_armatura_1_armatura1_qr', 'galleria_armi_armatura_2_armatura2', 'galleria_armi_armatura_2_armatura2_qr', 'galleria_armi_armatura_3_armatura3', 'galleria_armi_armatura_3_armatura3_qr', 'galleria_armi_stanza_galleria', 'galleria_armi_stanza_galleria_qr', 'galleria_cupola_candelabro_candelabri', 'galleria_cupola_candelabro_candelabri_qr', 'galleria_cupola_portiera_portiera', 'galleria_cupola_portiera_portiera_qr', 'galleria_cupola_stanza_stanza', 'galleria_cupola_stanza_stanza_qr', 'labirinto_labirinto', 'labirinto_labirinto_1', 'labirinto_labirinto_qr', 'sala_affresco_capitello_capitello', 'sala_affresco_capitello_capitello_qr', 'sala_affresco_sala_sala', 'sala_affresco_serliana_serliana', 'sala_affresco_serliana_serliana_1', 'sala_bagno_bagno', 'sala_bagno_bagno_qr', 'sala_bevilacqua_camino_camino', 'sala_bevilacqua_camino_camino_qr', 'sala_bevilacqua_sala_sala', 'sala_bevilacqua_scarpa_scarpa', 'sala_pranzo_camera_sala', 'sala_pranzo_camera_sala_qr', 'sala_pranzo_camino_due_caminodue', 'sala_pranzo_camino_uno_caminouno', 'sala_pranzo_porta_porta', 'sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte', 'sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte_1', 'sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_qr', 'sala_stufa_valtellinese_orologio_orologio', 'sala_stufa_valtellinese_orologio_orologio_qr', 'sala_stufa_valtellinese_stanza_stanza', 'salone_onore_camino_camino', 'salone_onore_camino_camino_qr', 'salone_onore_lampada_lampada', 'salone_onore_lampada_lampada_qr', 'salone_onore_lasena_lasena', 'salone_onore_lasena_lasena_1', 'salone_onore_lasena_lasena_qr', 'salone_onore_salone_salone_1', 'salone_onore_salone_salone_qr', 'salone_onore_tappezzeria_tappezzeria', 'salone_onore_tappezzeria_tappezzeria_qr', 'scalone_ingresso_scalone_1', 'scalone_ingresso_scalone_2', 'scalone_ingresso_scalone_qr', 'studio_studio_1', 'studio_studio_2', 'studio_studio_qr']
  });
  log('🚀 XR8.run() called');
}

// Avvia il motore AR (e quindi la richiesta del permesso camera) solo dopo
// che l'utente ha completato le due schermate di onboarding, anche se il
// motore XR8 è già pronto prima. Il caricamento di xr.js prosegue comunque
// in background durante l'onboarding: non lo blocchiamo, solo l'avvio.
let xr8Ready = false;
let onboardingDone = false;
let arStarted = false;

const tryStartAr = () => {
  if (xr8Ready && onboardingDone && !arStarted) {
    arStarted = true;
    onxrloaded();
  }
};

if (window.XR8) {
  xr8Ready = true;
} else {
  window.addEventListener('xrloaded', () => {
    xr8Ready = true;
    tryStartAr();
  });
}

initOnboarding(() => {
  onboardingDone = true;
  tryStartAr();
});

tryStartAr();
