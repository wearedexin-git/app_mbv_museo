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
const bibliotecacapitelloteschiocapitelloTeschioJson = require('../image-targets/biblioteca_capitello_teschio_capitelloTeschio.json');
const bibliotecacapitelloteschiocapitelloTeschioqrJson = require('../image-targets/biblioteca_capitello_teschio_capitelloTeschio_qr.json');
const bibliotecastanzastanzaJson = require('../image-targets/biblioteca_stanza_stanza.json');
const bibliotecastanzastanzaqrJson = require('../image-targets/biblioteca_stanza_stanza_qr.json');
const camerafaustocapitellocapitelloJson = require('../image-targets/camera_fausto_capitello_capitello.json');
const camerafaustocapitellocapitelloqrJson = require('../image-targets/camera_fausto_capitello_capitello_qr.json');
const camerafaustodettaglioportadettaglioJson = require('../image-targets/camera_fausto_dettaglio_porta_dettaglio.json');
const camerafaustodettaglioportadettaglioqrJson = require('../image-targets/camera_fausto_dettaglio_porta_dettaglio_qr.json');
const camerafaustostanzastanza1Json = require('../image-targets/camera_fausto_stanza_stanza_1.json');
const camerafaustostanzastanza2Json = require('../image-targets/camera_fausto_stanza_stanza_2.json');
const camerafaustostanzastanzaqrJson = require('../image-targets/camera_fausto_stanza_stanza_qr.json');
const camerarossacameracameraJson = require('../image-targets/camera_rossa_camera_camera.json');
const camerarossacameracameraqrJson = require('../image-targets/camera_rossa_camera_camera_qr.json');
const camerarossacredenzacredenzaJson = require('../image-targets/camera_rossa_credenza_credenza.json');
const camerarossacredenzacredenzaqrJson = require('../image-targets/camera_rossa_credenza_credenza_qr.json');
const camerarossadecorazionecredenzacredenzaJson = require('../image-targets/camera_rossa_decorazione_credenza_credenza.json');
const camerarossadecorazionecredenzacredenzaqrJson = require('../image-targets/camera_rossa_decorazione_credenza_credenza_qr.json');
const camerarossadettagliocredenzacredenzaJson = require('../image-targets/camera_rossa_dettaglio_credenza_credenza.json');
const camerarossadettagliocredenzacredenzaqrJson = require('../image-targets/camera_rossa_dettaglio_credenza_credenza_qr.json');
const cameraverdecameracameraJson = require('../image-targets/camera_verde_camera_camera.json');
const cameraverdecameracameraqrJson = require('../image-targets/camera_verde_camera_camera_qr.json');
const cameraverdedettagliocaminocaminoJson = require('../image-targets/camera_verde_dettaglio_camino_camino.json');
const cameraverdedettagliocaminocaminoqrJson = require('../image-targets/camera_verde_dettaglio_camino_camino_qr.json');
const cameraverdedettagliolettolettoJson = require('../image-targets/camera_verde_dettaglio_letto_letto.json');
const cameraverdedettagliolettolettoqrJson = require('../image-targets/camera_verde_dettaglio_letto_letto_qr.json');
const galleriaarmiarmatura1armatura1Json = require('../image-targets/galleria_armi_armatura_1_armatura1.json');
const galleriaarmiarmatura1armatura1qrJson = require('../image-targets/galleria_armi_armatura_1_armatura1_qr.json');
const galleriaarmiarmatura2armatura2Json = require('../image-targets/galleria_armi_armatura_2_armatura2.json');
const galleriaarmiarmatura2armatura2qrJson = require('../image-targets/galleria_armi_armatura_2_armatura2_qr.json');
const galleriaarmiarmatura3armatura3Json = require('../image-targets/galleria_armi_armatura_3_armatura3.json');
const galleriaarmiarmatura3armatura3qrJson = require('../image-targets/galleria_armi_armatura_3_armatura3_qr.json');
const galleriaarmistanzagalleriaJson = require('../image-targets/galleria_armi_stanza_galleria.json');
const galleriaarmistanzagalleriamuseoJson = require('../image-targets/galleria_armi_stanza_galleria_museo.json');
const galleriaarmistanzagalleriamuseo1Json = require('../image-targets/galleria_armi_stanza_galleria_museo_1.json');
const galleriaarmistanzagalleriamuseo2Json = require('../image-targets/galleria_armi_stanza_galleria_museo_2.json');
const galleriaarmistanzagalleriamuseo3Json = require('../image-targets/galleria_armi_stanza_galleria_museo_3.json');
const galleriaarmistanzagalleriamuseo5Json = require('../image-targets/galleria_armi_stanza_galleria_museo_5.json');
const galleriaarmistanzagalleriaqrJson = require('../image-targets/galleria_armi_stanza_galleria_qr.json');
const galleriacupolacandelabrocandelabriJson = require('../image-targets/galleria_cupola_candelabro_candelabri.json');
const galleriacupolacandelabrocandelabriqrJson = require('../image-targets/galleria_cupola_candelabro_candelabri_qr.json');
const galleriacupolaportieraportieraJson = require('../image-targets/galleria_cupola_portiera_portiera.json');
const galleriacupolaportieraportieraqrJson = require('../image-targets/galleria_cupola_portiera_portiera_qr.json');
const galleriacupolastanzastanzaJson = require('../image-targets/galleria_cupola_stanza_stanza.json');
const galleriacupolastanzastanzamuseoJson = require('../image-targets/galleria_cupola_stanza_stanza_museo.json');
const galleriacupolastanzastanzamuseo1Json = require('../image-targets/galleria_cupola_stanza_stanza_museo_1.json');
const galleriacupolastanzastanzamuseo2Json = require('../image-targets/galleria_cupola_stanza_stanza_museo_2.json');
const galleriacupolastanzastanzaqrJson = require('../image-targets/galleria_cupola_stanza_stanza_qr.json');
const labirintolabirintoJson = require('../image-targets/labirinto_labirinto.json');
const labirintolabirintoqrJson = require('../image-targets/labirinto_labirinto_qr.json');
const salaaffrescocapitellocapitelloJson = require('../image-targets/sala_affresco_capitello_capitello.json');
const salaaffrescocapitellocapitelloqrJson = require('../image-targets/sala_affresco_capitello_capitello_qr.json');
const salaaffrescosalasalaJson = require('../image-targets/sala_affresco_sala_sala.json');
const salaaffrescosalasalaqrJson = require('../image-targets/sala_affresco_sala_sala_qr.json');
const salaaffrescoserlianaserlianaJson = require('../image-targets/sala_affresco_serliana_serliana.json');
const salaaffrescoserlianaserlianaqrJson = require('../image-targets/sala_affresco_serliana_serliana_qr.json');
const salabagnobagnoJson = require('../image-targets/sala_bagno_bagno.json');
const salabagnobagnoqrJson = require('../image-targets/sala_bagno_bagno_qr.json');
const salabevilacquacaminocaminoJson = require('../image-targets/sala_bevilacqua_camino_camino.json');
const salabevilacquacaminocaminoqrJson = require('../image-targets/sala_bevilacqua_camino_camino_qr.json');
const salabevilacquasalasalaJson = require('../image-targets/sala_bevilacqua_sala_sala.json');
const salabevilacquasalasalaqrJson = require('../image-targets/sala_bevilacqua_sala_sala_qr.json');
const salabevilacquascarpascarpaJson = require('../image-targets/sala_bevilacqua_scarpa_scarpa.json');
const salabevilacquascarpascarpaqrJson = require('../image-targets/sala_bevilacqua_scarpa_scarpa_qr.json');
const salapranzocamerasalaJson = require('../image-targets/sala_pranzo_camera_sala.json');
const salapranzocamerasalaqrJson = require('../image-targets/sala_pranzo_camera_sala_qr.json');
const salapranzocaminoduecaminodueJson = require('../image-targets/sala_pranzo_camino_due_caminodue.json');
const salapranzocaminoduecaminodueqrJson = require('../image-targets/sala_pranzo_camino_due_caminodue_qr.json');
const salapranzocaminounocaminounoJson = require('../image-targets/sala_pranzo_camino_uno_caminouno.json');
const salapranzocaminounocaminounoqrJson = require('../image-targets/sala_pranzo_camino_uno_caminouno_qr.json');
const salapranzoportaportaJson = require('../image-targets/sala_pranzo_porta_porta.json');
const salapranzoportaportaqrJson = require('../image-targets/sala_pranzo_porta_porta_qr.json');
const salastufavaltellinesedettagliopianoforteduepianoforteJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte.json');
const salastufavaltellinesedettagliopianoforteunopianoforteqrJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_qr.json');
const salastufavaltellineseorologioorologioJson = require('../image-targets/sala_stufa_valtellinese_orologio_orologio.json');
const salastufavaltellineseorologioorologioqrJson = require('../image-targets/sala_stufa_valtellinese_orologio_orologio_qr.json');
const salastufavaltellinesestanzastanzaJson = require('../image-targets/sala_stufa_valtellinese_stanza_stanza.json');
const saloneonorecaminocaminoJson = require('../image-targets/salone_onore_camino_camino.json');
const saloneonorecaminocaminoqrJson = require('../image-targets/salone_onore_camino_camino_qr.json');
const saloneonorelampadalampadaJson = require('../image-targets/salone_onore_lampada_lampada.json');
const saloneonorelampadalampadaqrJson = require('../image-targets/salone_onore_lampada_lampada_qr.json');
const saloneonorelasenalasenaJson = require('../image-targets/salone_onore_lasena_lasena.json');
const saloneonorelasenalasenaqrJson = require('../image-targets/salone_onore_lasena_lasena_qr.json');
const saloneonoresalonesaloneJson = require('../image-targets/salone_onore_salone_salone.json');
const saloneonoresalonesaloneqrJson = require('../image-targets/salone_onore_salone_salone_qr.json');
const saloneonoretappezzeriatappezzeriaJson = require('../image-targets/salone_onore_tappezzeria_tappezzeria.json');
const saloneonoretappezzeriatappezzeriaqrJson = require('../image-targets/salone_onore_tappezzeria_tappezzeria_qr.json');
const scaloneingressoscaloneJson = require('../image-targets/scalone_ingresso_scalone.json');
const scaloneingressoscaloneqrJson = require('../image-targets/scalone_ingresso_scalone_qr.json');
const studiostudioJson = require('../image-targets/studio_studio.json');
const studiostudioqrJson = require('../image-targets/studio_studio_qr.json');

  XR8.XrController.configure({
    disableWorldTracking: true,
    imageTargetData: [bibliotecacapitellobustocapitelloBustoJson, bibliotecacapitellobustocapitelloBustoqrJson, bibliotecacapitelloteschiocapitelloTeschioJson, bibliotecacapitelloteschiocapitelloTeschioqrJson, bibliotecastanzastanzaJson, bibliotecastanzastanzaqrJson, camerafaustocapitellocapitelloJson, camerafaustocapitellocapitelloqrJson, camerafaustodettaglioportadettaglioJson, camerafaustodettaglioportadettaglioqrJson, camerafaustostanzastanza1Json, camerafaustostanzastanza2Json, camerafaustostanzastanzaqrJson, camerarossacameracameraJson, camerarossacameracameraqrJson, camerarossacredenzacredenzaJson, camerarossacredenzacredenzaqrJson, camerarossadecorazionecredenzacredenzaJson, camerarossadecorazionecredenzacredenzaqrJson, camerarossadettagliocredenzacredenzaJson, camerarossadettagliocredenzacredenzaqrJson, cameraverdecameracameraJson, cameraverdecameracameraqrJson, cameraverdedettagliocaminocaminoJson, cameraverdedettagliocaminocaminoqrJson, cameraverdedettagliolettolettoJson, cameraverdedettagliolettolettoqrJson, galleriaarmiarmatura1armatura1Json, galleriaarmiarmatura1armatura1qrJson, galleriaarmiarmatura2armatura2Json, galleriaarmiarmatura2armatura2qrJson, galleriaarmiarmatura3armatura3Json, galleriaarmiarmatura3armatura3qrJson, galleriaarmistanzagalleriaJson, galleriaarmistanzagalleriamuseoJson, galleriaarmistanzagalleriamuseo1Json, galleriaarmistanzagalleriamuseo2Json, galleriaarmistanzagalleriamuseo3Json, galleriaarmistanzagalleriamuseo5Json, galleriaarmistanzagalleriaqrJson, galleriacupolacandelabrocandelabriJson, galleriacupolacandelabrocandelabriqrJson, galleriacupolaportieraportieraJson, galleriacupolaportieraportieraqrJson, galleriacupolastanzastanzaJson, galleriacupolastanzastanzamuseoJson, galleriacupolastanzastanzamuseo1Json, galleriacupolastanzastanzamuseo2Json, galleriacupolastanzastanzaqrJson, labirintolabirintoJson, labirintolabirintoqrJson, salaaffrescocapitellocapitelloJson, salaaffrescocapitellocapitelloqrJson, salaaffrescosalasalaJson, salaaffrescosalasalaqrJson, salaaffrescoserlianaserlianaJson, salaaffrescoserlianaserlianaqrJson, salabagnobagnoJson, salabagnobagnoqrJson, salabevilacquacaminocaminoJson, salabevilacquacaminocaminoqrJson, salabevilacquasalasalaJson, salabevilacquasalasalaqrJson, salabevilacquascarpascarpaJson, salabevilacquascarpascarpaqrJson, salapranzocamerasalaJson, salapranzocamerasalaqrJson, salapranzocaminoduecaminodueJson, salapranzocaminoduecaminodueqrJson, salapranzocaminounocaminounoJson, salapranzocaminounocaminounoqrJson, salapranzoportaportaJson, salapranzoportaportaqrJson, salastufavaltellinesedettagliopianoforteduepianoforteJson, salastufavaltellinesedettagliopianoforteunopianoforteqrJson, salastufavaltellineseorologioorologioJson, salastufavaltellineseorologioorologioqrJson, salastufavaltellinesestanzastanzaJson, saloneonorecaminocaminoJson, saloneonorecaminocaminoqrJson, saloneonorelampadalampadaJson, saloneonorelampadalampadaqrJson, saloneonorelasenalasenaJson, saloneonorelasenalasenaqrJson, saloneonoresalonesaloneJson, saloneonoresalonesaloneqrJson, saloneonoretappezzeriatappezzeriaJson, saloneonoretappezzeriatappezzeriaqrJson, scaloneingressoscaloneJson, scaloneingressoscaloneqrJson, studiostudioJson, studiostudioqrJson],
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
    imageTargets: ['biblioteca_capitello_busto_capitelloBusto', 'biblioteca_capitello_busto_capitelloBusto_qr', 'biblioteca_capitello_teschio_capitelloTeschio', 'biblioteca_capitello_teschio_capitelloTeschio_qr', 'biblioteca_stanza_stanza', 'biblioteca_stanza_stanza_qr', 'camera_fausto_capitello_capitello', 'camera_fausto_capitello_capitello_qr', 'camera_fausto_dettaglio_porta_dettaglio', 'camera_fausto_dettaglio_porta_dettaglio_qr', 'camera_fausto_stanza_stanza_1', 'camera_fausto_stanza_stanza_2', 'camera_fausto_stanza_stanza_qr', 'camera_rossa_camera_camera', 'camera_rossa_camera_camera_qr', 'camera_rossa_credenza_credenza', 'camera_rossa_credenza_credenza_qr', 'camera_rossa_decorazione_credenza_credenza', 'camera_rossa_decorazione_credenza_credenza_qr', 'camera_rossa_dettaglio_credenza_credenza', 'camera_rossa_dettaglio_credenza_credenza_qr', 'camera_verde_camera_camera', 'camera_verde_camera_camera_qr', 'camera_verde_dettaglio_camino_camino', 'camera_verde_dettaglio_camino_camino_qr', 'camera_verde_dettaglio_letto_letto', 'camera_verde_dettaglio_letto_letto_qr', 'galleria_armi_armatura_1_armatura1', 'galleria_armi_armatura_1_armatura1_qr', 'galleria_armi_armatura_2_armatura2', 'galleria_armi_armatura_2_armatura2_qr', 'galleria_armi_armatura_3_armatura3', 'galleria_armi_armatura_3_armatura3_qr', 'galleria_armi_stanza_galleria', 'galleria_armi_stanza_galleria_museo', 'galleria_armi_stanza_galleria_museo_1', 'galleria_armi_stanza_galleria_museo_2', 'galleria_armi_stanza_galleria_museo_3', 'galleria_armi_stanza_galleria_museo_5', 'galleria_armi_stanza_galleria_qr', 'galleria_cupola_candelabro_candelabri', 'galleria_cupola_candelabro_candelabri_qr', 'galleria_cupola_portiera_portiera', 'galleria_cupola_portiera_portiera_qr', 'galleria_cupola_stanza_stanza', 'galleria_cupola_stanza_stanza_museo', 'galleria_cupola_stanza_stanza_museo_1', 'galleria_cupola_stanza_stanza_museo_2', 'galleria_cupola_stanza_stanza_qr', 'labirinto_labirinto', 'labirinto_labirinto_qr', 'sala_affresco_capitello_capitello', 'sala_affresco_capitello_capitello_qr', 'sala_affresco_sala_sala', 'sala_affresco_sala_sala_qr', 'sala_affresco_serliana_serliana', 'sala_affresco_serliana_serliana_qr', 'sala_bagno_bagno', 'sala_bagno_bagno_qr', 'sala_bevilacqua_camino_camino', 'sala_bevilacqua_camino_camino_qr', 'sala_bevilacqua_sala_sala', 'sala_bevilacqua_sala_sala_qr', 'sala_bevilacqua_scarpa_scarpa', 'sala_bevilacqua_scarpa_scarpa_qr', 'sala_pranzo_camera_sala', 'sala_pranzo_camera_sala_qr', 'sala_pranzo_camino_due_caminodue', 'sala_pranzo_camino_due_caminodue_qr', 'sala_pranzo_camino_uno_caminouno', 'sala_pranzo_camino_uno_caminouno_qr', 'sala_pranzo_porta_porta', 'sala_pranzo_porta_porta_qr', 'sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte', 'sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_qr', 'sala_stufa_valtellinese_orologio_orologio', 'sala_stufa_valtellinese_orologio_orologio_qr', 'sala_stufa_valtellinese_stanza_stanza', 'salone_onore_camino_camino', 'salone_onore_camino_camino_qr', 'salone_onore_lampada_lampada', 'salone_onore_lampada_lampada_qr', 'salone_onore_lasena_lasena', 'salone_onore_lasena_lasena_qr', 'salone_onore_salone_salone', 'salone_onore_salone_salone_qr', 'salone_onore_tappezzeria_tappezzeria', 'salone_onore_tappezzeria_tappezzeria_qr', 'scalone_ingresso_scalone', 'scalone_ingresso_scalone_qr', 'studio_studio', 'studio_studio_qr']
  });
  log('🚀 XR8.run() called');
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);
