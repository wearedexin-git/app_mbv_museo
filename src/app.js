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

  const bibliotecacapitellobustocapitelloBustoqrJson = require('../image-targets/biblioteca_capitello_busto_capitelloBusto_qr.json');
const bibliotecacapitellobustocapitellobustoJson = require('../image-targets/biblioteca_capitello_busto_capitello_busto.json');
const bibliotecacapitellobustocapitellobusto1Json = require('../image-targets/biblioteca_capitello_busto_capitello_busto_1.json');
const bibliotecacapitellobustocapitellobustomuseoJson = require('../image-targets/biblioteca_capitello_busto_capitello_busto_museo.json');
const bibliotecacapitelloteschiocapitelloTeschioqrJson = require('../image-targets/biblioteca_capitello_teschio_capitelloTeschio_qr.json');
const bibliotecacapitelloteschiocapitelloteschioJson = require('../image-targets/biblioteca_capitello_teschio_capitello_teschio.json');
const bibliotecacapitelloteschiocapitelloteschio1Json = require('../image-targets/biblioteca_capitello_teschio_capitello_teschio_1.json');
const bibliotecacapitelloteschiocapitelloteschio2Json = require('../image-targets/biblioteca_capitello_teschio_capitello_teschio_2.json');
const bibliotecacapitelloteschiocapitelloteschiomuseoJson = require('../image-targets/biblioteca_capitello_teschio_capitello_teschio_museo.json');
const bibliotecacapitelloteschiocapitelloteschiomuseo2Json = require('../image-targets/biblioteca_capitello_teschio_capitello_teschio_museo_2.json');
const bibliotecastanzastanzaJson = require('../image-targets/biblioteca_stanza_stanza.json');
const bibliotecastanzastanzamuseoJson = require('../image-targets/biblioteca_stanza_stanza_museo.json');
const bibliotecastanzastanzamuseo1Json = require('../image-targets/biblioteca_stanza_stanza_museo_1.json');
const bibliotecastanzastanzaqrJson = require('../image-targets/biblioteca_stanza_stanza_qr.json');
const camerafaustocapitellocapitelloqrJson = require('../image-targets/camera_fausto_capitello_capitello_qr.json');
const camerafaustodettaglioportadettaglioJson = require('../image-targets/camera_fausto_dettaglio_porta_dettaglio.json');
const camerafaustodettaglioportadettaglio1Json = require('../image-targets/camera_fausto_dettaglio_porta_dettaglio_1.json');
const camerafaustodettaglioportadettagliomuseoJson = require('../image-targets/camera_fausto_dettaglio_porta_dettaglio_museo.json');
const camerafaustodettaglioportadettagliomuseo1Json = require('../image-targets/camera_fausto_dettaglio_porta_dettaglio_museo_1.json');
const camerafaustodettaglioportadettaglioqrJson = require('../image-targets/camera_fausto_dettaglio_porta_dettaglio_qr.json');
const camerafaustostanzacaminomuseoJson = require('../image-targets/camera_fausto_stanza_camino_museo.json');
const camerafaustostanzastanzaJson = require('../image-targets/camera_fausto_stanza_stanza.json');
const camerafaustostanzastanza1Json = require('../image-targets/camera_fausto_stanza_stanza_1.json');
const camerafaustostanzastanza2Json = require('../image-targets/camera_fausto_stanza_stanza_2.json');
const camerafaustostanzastanzamuseoJson = require('../image-targets/camera_fausto_stanza_stanza_museo.json');
const camerafaustostanzastanzaqrJson = require('../image-targets/camera_fausto_stanza_stanza_qr.json');
const camerarossacameracameraJson = require('../image-targets/camera_rossa_camera_camera.json');
const camerarossacameracamera1Json = require('../image-targets/camera_rossa_camera_camera_1.json');
const camerarossacameracameramuseoJson = require('../image-targets/camera_rossa_camera_camera_museo.json');
const camerarossacameracameraqrJson = require('../image-targets/camera_rossa_camera_camera_qr.json');
const camerarossacredenzacredenzaJson = require('../image-targets/camera_rossa_credenza_credenza.json');
const camerarossacredenzacredenzamuseoJson = require('../image-targets/camera_rossa_credenza_credenza_museo.json');
const camerarossacredenzacredenzamuseo1Json = require('../image-targets/camera_rossa_credenza_credenza_museo_1.json');
const camerarossacredenzacredenzaqrJson = require('../image-targets/camera_rossa_credenza_credenza_qr.json');
const camerarossadecorazionecredenzacredenzaJson = require('../image-targets/camera_rossa_decorazione_credenza_credenza.json');
const camerarossadecorazionecredenzacredenzamuseoJson = require('../image-targets/camera_rossa_decorazione_credenza_credenza_museo.json');
const camerarossadecorazionecredenzacredenzamuseo1Json = require('../image-targets/camera_rossa_decorazione_credenza_credenza_museo_1.json');
const camerarossadecorazionecredenzacredenzaqrJson = require('../image-targets/camera_rossa_decorazione_credenza_credenza_qr.json');
const camerarossadettagliocredenzacredenza1Json = require('../image-targets/camera_rossa_dettaglio_credenza_credenza_1.json');
const camerarossadettagliocredenzacredenzaqrJson = require('../image-targets/camera_rossa_dettaglio_credenza_credenza_qr.json');
const cameraverdecameracameramuseoJson = require('../image-targets/camera_verde_camera_camera_museo.json');
const cameraverdecameracameramuseo1Json = require('../image-targets/camera_verde_camera_camera_museo_1.json');
const cameraverdecameracameramuseo2Json = require('../image-targets/camera_verde_camera_camera_museo_2.json');
const cameraverdecameracameraqrJson = require('../image-targets/camera_verde_camera_camera_qr.json');
const cameraverdedettagliocaminocaminoJson = require('../image-targets/camera_verde_dettaglio_camino_camino.json');
const cameraverdedettagliocaminocamino1Json = require('../image-targets/camera_verde_dettaglio_camino_camino_1.json');
const cameraverdedettagliocaminocamino2Json = require('../image-targets/camera_verde_dettaglio_camino_camino_2.json');
const cameraverdedettagliocaminocamino3Json = require('../image-targets/camera_verde_dettaglio_camino_camino_3.json');
const cameraverdedettagliocaminocaminoqrJson = require('../image-targets/camera_verde_dettaglio_camino_camino_qr.json');
const cameraverdedettagliolettolettoJson = require('../image-targets/camera_verde_dettaglio_letto_letto.json');
const cameraverdedettagliolettoletto1Json = require('../image-targets/camera_verde_dettaglio_letto_letto_1.json');
const cameraverdedettagliolettoletto2Json = require('../image-targets/camera_verde_dettaglio_letto_letto_2.json');
const cameraverdedettagliolettolettomuseoJson = require('../image-targets/camera_verde_dettaglio_letto_letto_museo.json');
const cameraverdedettagliolettolettoqrJson = require('../image-targets/camera_verde_dettaglio_letto_letto_qr.json');
const galleriaarmiarmatura1armatura1Json = require('../image-targets/galleria_armi_armatura_1_armatura1.json');
const galleriaarmiarmatura1armatura11Json = require('../image-targets/galleria_armi_armatura_1_armatura1_1.json');
const galleriaarmiarmatura1armatura12Json = require('../image-targets/galleria_armi_armatura_1_armatura1_2.json');
const galleriaarmiarmatura1armatura13Json = require('../image-targets/galleria_armi_armatura_1_armatura1_3.json');
const galleriaarmiarmatura1armatura1qrJson = require('../image-targets/galleria_armi_armatura_1_armatura1_qr.json');
const galleriaarmiarmatura2armatura2Json = require('../image-targets/galleria_armi_armatura_2_armatura2.json');
const galleriaarmiarmatura2armatura22Json = require('../image-targets/galleria_armi_armatura_2_armatura2_2.json');
const galleriaarmiarmatura2armatura23Json = require('../image-targets/galleria_armi_armatura_2_armatura2_3.json');
const galleriaarmiarmatura2armatura2qrJson = require('../image-targets/galleria_armi_armatura_2_armatura2_qr.json');
const galleriaarmiarmatura3armatura3Json = require('../image-targets/galleria_armi_armatura_3_armatura3.json');
const galleriaarmiarmatura3armatura31Json = require('../image-targets/galleria_armi_armatura_3_armatura3_1.json');
const galleriaarmiarmatura3armatura32Json = require('../image-targets/galleria_armi_armatura_3_armatura3_2.json');
const galleriaarmiarmatura3armatura33Json = require('../image-targets/galleria_armi_armatura_3_armatura3_3.json');
const galleriaarmiarmatura3armatura3qrJson = require('../image-targets/galleria_armi_armatura_3_armatura3_qr.json');
const galleriaarmistanzagalleriaJson = require('../image-targets/galleria_armi_stanza_galleria.json');
const galleriaarmistanzagalleriamuseoJson = require('../image-targets/galleria_armi_stanza_galleria_museo.json');
const galleriaarmistanzagalleriamuseo1Json = require('../image-targets/galleria_armi_stanza_galleria_museo_1.json');
const galleriaarmistanzagalleriamuseo2Json = require('../image-targets/galleria_armi_stanza_galleria_museo_2.json');
const galleriaarmistanzagalleriamuseo3Json = require('../image-targets/galleria_armi_stanza_galleria_museo_3.json');
const galleriaarmistanzagalleriamuseo5Json = require('../image-targets/galleria_armi_stanza_galleria_museo_5.json');
const galleriaarmistanzagalleriaqrJson = require('../image-targets/galleria_armi_stanza_galleria_qr.json');
const galleriacupolacandelabrocandelabriJson = require('../image-targets/galleria_cupola_candelabro_candelabri.json');
const galleriacupolacandelabrocandelabri1Json = require('../image-targets/galleria_cupola_candelabro_candelabri_1.json');
const galleriacupolacandelabrocandelabriqrJson = require('../image-targets/galleria_cupola_candelabro_candelabri_qr.json');
const galleriacupolacandelabrocandelabromuseoJson = require('../image-targets/galleria_cupola_candelabro_candelabro_museo.json');
const galleriacupolacandelabrocandelabromuseo1Json = require('../image-targets/galleria_cupola_candelabro_candelabro_museo_1.json');
const galleriacupolaportieraportieraJson = require('../image-targets/galleria_cupola_portiera_portiera.json');
const galleriacupolaportieraportiera1Json = require('../image-targets/galleria_cupola_portiera_portiera_1.json');
const galleriacupolaportieraportiera2Json = require('../image-targets/galleria_cupola_portiera_portiera_2.json');
const galleriacupolaportieraportieraqrJson = require('../image-targets/galleria_cupola_portiera_portiera_qr.json');
const galleriacupolastanzastanzaJson = require('../image-targets/galleria_cupola_stanza_stanza.json');
const galleriacupolastanzastanzamuseoJson = require('../image-targets/galleria_cupola_stanza_stanza_museo.json');
const galleriacupolastanzastanzamuseo1Json = require('../image-targets/galleria_cupola_stanza_stanza_museo_1.json');
const galleriacupolastanzastanzamuseo2Json = require('../image-targets/galleria_cupola_stanza_stanza_museo_2.json');
const galleriacupolastanzastanzaqrJson = require('../image-targets/galleria_cupola_stanza_stanza_qr.json');
const labirintolabirintoJson = require('../image-targets/labirinto_labirinto.json');
const labirintolabirinto1Json = require('../image-targets/labirinto_labirinto_1.json');
const labirintolabirinto2Json = require('../image-targets/labirinto_labirinto_2.json');
const labirintolabirintomuseoJson = require('../image-targets/labirinto_labirinto_museo.json');
const labirintolabirintomuseo1Json = require('../image-targets/labirinto_labirinto_museo_1.json');
const labirintolabirintomuseo2Json = require('../image-targets/labirinto_labirinto_museo_2.json');
const labirintolabirintoqrJson = require('../image-targets/labirinto_labirinto_qr.json');
const salaaffrescocapitellocapitellomuseoJson = require('../image-targets/sala_affresco_capitello_capitello_museo.json');
const salaaffrescocapitellocapitellomuseo1Json = require('../image-targets/sala_affresco_capitello_capitello_museo_1.json');
const salaaffrescocapitellocapitellomuseo2Json = require('../image-targets/sala_affresco_capitello_capitello_museo_2.json');
const salaaffrescocapitellocapitelloqrJson = require('../image-targets/sala_affresco_capitello_capitello_qr.json');
const salaaffrescosalasalaJson = require('../image-targets/sala_affresco_sala_sala.json');
const salaaffrescosalasala1Json = require('../image-targets/sala_affresco_sala_sala_1.json');
const salaaffrescosalasalamuseoJson = require('../image-targets/sala_affresco_sala_sala_museo.json');
const salaaffrescosalasalamuseo1Json = require('../image-targets/sala_affresco_sala_sala_museo_1.json');
const salaaffrescosalasalaqrJson = require('../image-targets/sala_affresco_sala_sala_qr.json');
const salaaffrescoserlianaserlianaJson = require('../image-targets/sala_affresco_serliana_serliana.json');
const salaaffrescoserlianaserliana1Json = require('../image-targets/sala_affresco_serliana_serliana_1.json');
const salaaffrescoserlianaserliana2Json = require('../image-targets/sala_affresco_serliana_serliana_2.json');
const salaaffrescoserlianaserlianamuseoJson = require('../image-targets/sala_affresco_serliana_serliana_museo.json');
const salaaffrescoserlianaserlianamuseo1Json = require('../image-targets/sala_affresco_serliana_serliana_museo_1.json');
const salaaffrescoserlianaserlianaqrJson = require('../image-targets/sala_affresco_serliana_serliana_qr.json');
const salabagnobagnoJson = require('../image-targets/sala_bagno_bagno.json');
const salabagnobagnomuseoJson = require('../image-targets/sala_bagno_bagno_museo.json');
const salabagnobagnomuseo1Json = require('../image-targets/sala_bagno_bagno_museo_1.json');
const salabagnobagnoqrJson = require('../image-targets/sala_bagno_bagno_qr.json');
const salabevilacquacaminocaminoJson = require('../image-targets/sala_bevilacqua_camino_camino.json');
const salabevilacquacaminocamino1Json = require('../image-targets/sala_bevilacqua_camino_camino_1.json');
const salabevilacquacaminocamino2Json = require('../image-targets/sala_bevilacqua_camino_camino_2.json');
const salabevilacquacaminocaminomuseoJson = require('../image-targets/sala_bevilacqua_camino_camino_museo.json');
const salabevilacquacaminocaminomuseo1Json = require('../image-targets/sala_bevilacqua_camino_camino_museo_1.json');
const salabevilacquacaminocaminoqrJson = require('../image-targets/sala_bevilacqua_camino_camino_qr.json');
const salabevilacquasalasalamuseoJson = require('../image-targets/sala_bevilacqua_sala_sala_museo.json');
const salabevilacquasalasalamuseo1Json = require('../image-targets/sala_bevilacqua_sala_sala_museo_1.json');
const salabevilacquasalasalaqrJson = require('../image-targets/sala_bevilacqua_sala_sala_qr.json');
const salabevilacquascarpascarpaJson = require('../image-targets/sala_bevilacqua_scarpa_scarpa.json');
const salabevilacquascarpascarpa1Json = require('../image-targets/sala_bevilacqua_scarpa_scarpa_1.json');
const salabevilacquascarpascarpa2Json = require('../image-targets/sala_bevilacqua_scarpa_scarpa_2.json');
const salabevilacquascarpascarpamuseoJson = require('../image-targets/sala_bevilacqua_scarpa_scarpa_museo.json');
const salabevilacquascarpascarpamuseo1Json = require('../image-targets/sala_bevilacqua_scarpa_scarpa_museo_1.json');
const salabevilacquascarpascarpaqrJson = require('../image-targets/sala_bevilacqua_scarpa_scarpa_qr.json');
const salapranzocamerasalaqrJson = require('../image-targets/sala_pranzo_camera_sala_qr.json');
const salapranzocaminoduecaminodueJson = require('../image-targets/sala_pranzo_camino_due_caminodue.json');
const salapranzocaminoduecaminodueqrJson = require('../image-targets/sala_pranzo_camino_due_caminodue_qr.json');
const salapranzocaminounocaminounoJson = require('../image-targets/sala_pranzo_camino_uno_caminouno.json');
const salapranzocaminounocaminouno1Json = require('../image-targets/sala_pranzo_camino_uno_caminouno_1.json');
const salapranzocaminounocaminounoqrJson = require('../image-targets/sala_pranzo_camino_uno_caminouno_qr.json');
const salapranzoportaportaqrJson = require('../image-targets/sala_pranzo_porta_porta_qr.json');
const salastufavaltellinesedettagliopianoforteduepianoforteJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte.json');
const salastufavaltellinesedettagliopianoforteduepianofortedueJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte_due.json');
const salastufavaltellinesedettagliopianoforteduepianofortemuseoJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte_museo.json');
const salastufavaltellinesedettagliopianoforteunopianoforteJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte.json');
const salastufavaltellinesedettagliopianoforteunopianofortemuseoJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_museo.json');
const salastufavaltellinesedettagliopianoforteunopianofortemuseo1Json = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_museo_1.json');
const salastufavaltellinesedettagliopianoforteunopianoforteqrJson = require('../image-targets/sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_qr.json');
const salastufavaltellineseorologioorologioJson = require('../image-targets/sala_stufa_valtellinese_orologio_orologio.json');
const salastufavaltellineseorologioorologio1Json = require('../image-targets/sala_stufa_valtellinese_orologio_orologio_1.json');
const salastufavaltellineseorologioorologiomuseoJson = require('../image-targets/sala_stufa_valtellinese_orologio_orologio_museo.json');
const salastufavaltellineseorologioorologiomuseo1Json = require('../image-targets/sala_stufa_valtellinese_orologio_orologio_museo_1.json');
const salastufavaltellineseorologioorologioqrJson = require('../image-targets/sala_stufa_valtellinese_orologio_orologio_qr.json');
const salastufavaltellinesestanzastanzaJson = require('../image-targets/sala_stufa_valtellinese_stanza_stanza.json');
const salastufavaltellinesestanzastanzamuseoJson = require('../image-targets/sala_stufa_valtellinese_stanza_stanza_museo.json');
const salastufavaltellinesestanzastanzamuseo1Json = require('../image-targets/sala_stufa_valtellinese_stanza_stanza_museo_1.json');
const saloneonorecaminocaminoqrJson = require('../image-targets/salone_onore_camino_camino_qr.json');
const saloneonorelampadalampadaJson = require('../image-targets/salone_onore_lampada_lampada.json');
const saloneonorelampadalampada1Json = require('../image-targets/salone_onore_lampada_lampada_1.json');
const saloneonorelampadalampada2Json = require('../image-targets/salone_onore_lampada_lampada_2.json');
const saloneonorelampadalampada3Json = require('../image-targets/salone_onore_lampada_lampada_3.json');
const saloneonorelampadalampadaqrJson = require('../image-targets/salone_onore_lampada_lampada_qr.json');
const saloneonorelasenalasenaJson = require('../image-targets/salone_onore_lasena_lasena.json');
const saloneonorelasenalasenaqrJson = require('../image-targets/salone_onore_lasena_lasena_qr.json');
const saloneonoresalonesaloneqrJson = require('../image-targets/salone_onore_salone_salone_qr.json');
const saloneonoretappezzeriatappezzeriaqrJson = require('../image-targets/salone_onore_tappezzeria_tappezzeria_qr.json');
const scaloneingressoscaloneJson = require('../image-targets/scalone_ingresso_scalone.json');
const scaloneingressoscalone1Json = require('../image-targets/scalone_ingresso_scalone_1.json');
const scaloneingressoscalone2Json = require('../image-targets/scalone_ingresso_scalone_2.json');
const scaloneingressoscalone3Json = require('../image-targets/scalone_ingresso_scalone_3.json');
const scaloneingressoscalonemuseoJson = require('../image-targets/scalone_ingresso_scalone_museo.json');
const scaloneingressoscalonemuseo1Json = require('../image-targets/scalone_ingresso_scalone_museo_1.json');
const scaloneingressoscalonemuseo2Json = require('../image-targets/scalone_ingresso_scalone_museo_2.json');
const scaloneingressoscaloneqrJson = require('../image-targets/scalone_ingresso_scalone_qr.json');
const studiostudioJson = require('../image-targets/studio_studio.json');
const studiostudioqrJson = require('../image-targets/studio_studio_qr.json');

  XR8.XrController.configure({
    disableWorldTracking: true,
    imageTargetData: [bibliotecacapitellobustocapitelloBustoqrJson, bibliotecacapitellobustocapitellobustoJson, bibliotecacapitellobustocapitellobusto1Json, bibliotecacapitellobustocapitellobustomuseoJson, bibliotecacapitelloteschiocapitelloTeschioqrJson, bibliotecacapitelloteschiocapitelloteschioJson, bibliotecacapitelloteschiocapitelloteschio1Json, bibliotecacapitelloteschiocapitelloteschio2Json, bibliotecacapitelloteschiocapitelloteschiomuseoJson, bibliotecacapitelloteschiocapitelloteschiomuseo2Json, bibliotecastanzastanzaJson, bibliotecastanzastanzamuseoJson, bibliotecastanzastanzamuseo1Json, bibliotecastanzastanzaqrJson, camerafaustocapitellocapitelloqrJson, camerafaustodettaglioportadettaglioJson, camerafaustodettaglioportadettaglio1Json, camerafaustodettaglioportadettagliomuseoJson, camerafaustodettaglioportadettagliomuseo1Json, camerafaustodettaglioportadettaglioqrJson, camerafaustostanzacaminomuseoJson, camerafaustostanzastanzaJson, camerafaustostanzastanza1Json, camerafaustostanzastanza2Json, camerafaustostanzastanzamuseoJson, camerafaustostanzastanzaqrJson, camerarossacameracameraJson, camerarossacameracamera1Json, camerarossacameracameramuseoJson, camerarossacameracameraqrJson, camerarossacredenzacredenzaJson, camerarossacredenzacredenzamuseoJson, camerarossacredenzacredenzamuseo1Json, camerarossacredenzacredenzaqrJson, camerarossadecorazionecredenzacredenzaJson, camerarossadecorazionecredenzacredenzamuseoJson, camerarossadecorazionecredenzacredenzamuseo1Json, camerarossadecorazionecredenzacredenzaqrJson, camerarossadettagliocredenzacredenza1Json, camerarossadettagliocredenzacredenzaqrJson, cameraverdecameracameramuseoJson, cameraverdecameracameramuseo1Json, cameraverdecameracameramuseo2Json, cameraverdecameracameraqrJson, cameraverdedettagliocaminocaminoJson, cameraverdedettagliocaminocamino1Json, cameraverdedettagliocaminocamino2Json, cameraverdedettagliocaminocamino3Json, cameraverdedettagliocaminocaminoqrJson, cameraverdedettagliolettolettoJson, cameraverdedettagliolettoletto1Json, cameraverdedettagliolettoletto2Json, cameraverdedettagliolettolettomuseoJson, cameraverdedettagliolettolettoqrJson, galleriaarmiarmatura1armatura1Json, galleriaarmiarmatura1armatura11Json, galleriaarmiarmatura1armatura12Json, galleriaarmiarmatura1armatura13Json, galleriaarmiarmatura1armatura1qrJson, galleriaarmiarmatura2armatura2Json, galleriaarmiarmatura2armatura22Json, galleriaarmiarmatura2armatura23Json, galleriaarmiarmatura2armatura2qrJson, galleriaarmiarmatura3armatura3Json, galleriaarmiarmatura3armatura31Json, galleriaarmiarmatura3armatura32Json, galleriaarmiarmatura3armatura33Json, galleriaarmiarmatura3armatura3qrJson, galleriaarmistanzagalleriaJson, galleriaarmistanzagalleriamuseoJson, galleriaarmistanzagalleriamuseo1Json, galleriaarmistanzagalleriamuseo2Json, galleriaarmistanzagalleriamuseo3Json, galleriaarmistanzagalleriamuseo5Json, galleriaarmistanzagalleriaqrJson, galleriacupolacandelabrocandelabriJson, galleriacupolacandelabrocandelabri1Json, galleriacupolacandelabrocandelabriqrJson, galleriacupolacandelabrocandelabromuseoJson, galleriacupolacandelabrocandelabromuseo1Json, galleriacupolaportieraportieraJson, galleriacupolaportieraportiera1Json, galleriacupolaportieraportiera2Json, galleriacupolaportieraportieraqrJson, galleriacupolastanzastanzaJson, galleriacupolastanzastanzamuseoJson, galleriacupolastanzastanzamuseo1Json, galleriacupolastanzastanzamuseo2Json, galleriacupolastanzastanzaqrJson, labirintolabirintoJson, labirintolabirinto1Json, labirintolabirinto2Json, labirintolabirintomuseoJson, labirintolabirintomuseo1Json, labirintolabirintomuseo2Json, labirintolabirintoqrJson, salaaffrescocapitellocapitellomuseoJson, salaaffrescocapitellocapitellomuseo1Json, salaaffrescocapitellocapitellomuseo2Json, salaaffrescocapitellocapitelloqrJson, salaaffrescosalasalaJson, salaaffrescosalasala1Json, salaaffrescosalasalamuseoJson, salaaffrescosalasalamuseo1Json, salaaffrescosalasalaqrJson, salaaffrescoserlianaserlianaJson, salaaffrescoserlianaserliana1Json, salaaffrescoserlianaserliana2Json, salaaffrescoserlianaserlianamuseoJson, salaaffrescoserlianaserlianamuseo1Json, salaaffrescoserlianaserlianaqrJson, salabagnobagnoJson, salabagnobagnomuseoJson, salabagnobagnomuseo1Json, salabagnobagnoqrJson, salabevilacquacaminocaminoJson, salabevilacquacaminocamino1Json, salabevilacquacaminocamino2Json, salabevilacquacaminocaminomuseoJson, salabevilacquacaminocaminomuseo1Json, salabevilacquacaminocaminoqrJson, salabevilacquasalasalamuseoJson, salabevilacquasalasalamuseo1Json, salabevilacquasalasalaqrJson, salabevilacquascarpascarpaJson, salabevilacquascarpascarpa1Json, salabevilacquascarpascarpa2Json, salabevilacquascarpascarpamuseoJson, salabevilacquascarpascarpamuseo1Json, salabevilacquascarpascarpaqrJson, salapranzocamerasalaqrJson, salapranzocaminoduecaminodueJson, salapranzocaminoduecaminodueqrJson, salapranzocaminounocaminounoJson, salapranzocaminounocaminouno1Json, salapranzocaminounocaminounoqrJson, salapranzoportaportaqrJson, salastufavaltellinesedettagliopianoforteduepianoforteJson, salastufavaltellinesedettagliopianoforteduepianofortedueJson, salastufavaltellinesedettagliopianoforteduepianofortemuseoJson, salastufavaltellinesedettagliopianoforteunopianoforteJson, salastufavaltellinesedettagliopianoforteunopianofortemuseoJson, salastufavaltellinesedettagliopianoforteunopianofortemuseo1Json, salastufavaltellinesedettagliopianoforteunopianoforteqrJson, salastufavaltellineseorologioorologioJson, salastufavaltellineseorologioorologio1Json, salastufavaltellineseorologioorologiomuseoJson, salastufavaltellineseorologioorologiomuseo1Json, salastufavaltellineseorologioorologioqrJson, salastufavaltellinesestanzastanzaJson, salastufavaltellinesestanzastanzamuseoJson, salastufavaltellinesestanzastanzamuseo1Json, saloneonorecaminocaminoqrJson, saloneonorelampadalampadaJson, saloneonorelampadalampada1Json, saloneonorelampadalampada2Json, saloneonorelampadalampada3Json, saloneonorelampadalampadaqrJson, saloneonorelasenalasenaJson, saloneonorelasenalasenaqrJson, saloneonoresalonesaloneqrJson, saloneonoretappezzeriatappezzeriaqrJson, scaloneingressoscaloneJson, scaloneingressoscalone1Json, scaloneingressoscalone2Json, scaloneingressoscalone3Json, scaloneingressoscalonemuseoJson, scaloneingressoscalonemuseo1Json, scaloneingressoscalonemuseo2Json, scaloneingressoscaloneqrJson, studiostudioJson, studiostudioqrJson],
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
    imageTargets: ['biblioteca_capitello_busto_capitelloBusto_qr', 'biblioteca_capitello_busto_capitello_busto', 'biblioteca_capitello_busto_capitello_busto_1', 'biblioteca_capitello_busto_capitello_busto_museo', 'biblioteca_capitello_teschio_capitelloTeschio_qr', 'biblioteca_capitello_teschio_capitello_teschio', 'biblioteca_capitello_teschio_capitello_teschio_1', 'biblioteca_capitello_teschio_capitello_teschio_2', 'biblioteca_capitello_teschio_capitello_teschio_museo', 'biblioteca_capitello_teschio_capitello_teschio_museo_2', 'biblioteca_stanza_stanza', 'biblioteca_stanza_stanza_museo', 'biblioteca_stanza_stanza_museo_1', 'biblioteca_stanza_stanza_qr', 'camera_fausto_capitello_capitello_qr', 'camera_fausto_dettaglio_porta_dettaglio', 'camera_fausto_dettaglio_porta_dettaglio_1', 'camera_fausto_dettaglio_porta_dettaglio_museo', 'camera_fausto_dettaglio_porta_dettaglio_museo_1', 'camera_fausto_dettaglio_porta_dettaglio_qr', 'camera_fausto_stanza_camino_museo', 'camera_fausto_stanza_stanza', 'camera_fausto_stanza_stanza_1', 'camera_fausto_stanza_stanza_2', 'camera_fausto_stanza_stanza_museo', 'camera_fausto_stanza_stanza_qr', 'camera_rossa_camera_camera', 'camera_rossa_camera_camera_1', 'camera_rossa_camera_camera_museo', 'camera_rossa_camera_camera_qr', 'camera_rossa_credenza_credenza', 'camera_rossa_credenza_credenza_museo', 'camera_rossa_credenza_credenza_museo_1', 'camera_rossa_credenza_credenza_qr', 'camera_rossa_decorazione_credenza_credenza', 'camera_rossa_decorazione_credenza_credenza_museo', 'camera_rossa_decorazione_credenza_credenza_museo_1', 'camera_rossa_decorazione_credenza_credenza_qr', 'camera_rossa_dettaglio_credenza_credenza_1', 'camera_rossa_dettaglio_credenza_credenza_qr', 'camera_verde_camera_camera_museo', 'camera_verde_camera_camera_museo_1', 'camera_verde_camera_camera_museo_2', 'camera_verde_camera_camera_qr', 'camera_verde_dettaglio_camino_camino', 'camera_verde_dettaglio_camino_camino_1', 'camera_verde_dettaglio_camino_camino_2', 'camera_verde_dettaglio_camino_camino_3', 'camera_verde_dettaglio_camino_camino_qr', 'camera_verde_dettaglio_letto_letto', 'camera_verde_dettaglio_letto_letto_1', 'camera_verde_dettaglio_letto_letto_2', 'camera_verde_dettaglio_letto_letto_museo', 'camera_verde_dettaglio_letto_letto_qr', 'galleria_armi_armatura_1_armatura1', 'galleria_armi_armatura_1_armatura1_1', 'galleria_armi_armatura_1_armatura1_2', 'galleria_armi_armatura_1_armatura1_3', 'galleria_armi_armatura_1_armatura1_qr', 'galleria_armi_armatura_2_armatura2', 'galleria_armi_armatura_2_armatura2_2', 'galleria_armi_armatura_2_armatura2_3', 'galleria_armi_armatura_2_armatura2_qr', 'galleria_armi_armatura_3_armatura3', 'galleria_armi_armatura_3_armatura3_1', 'galleria_armi_armatura_3_armatura3_2', 'galleria_armi_armatura_3_armatura3_3', 'galleria_armi_armatura_3_armatura3_qr', 'galleria_armi_stanza_galleria', 'galleria_armi_stanza_galleria_museo', 'galleria_armi_stanza_galleria_museo_1', 'galleria_armi_stanza_galleria_museo_2', 'galleria_armi_stanza_galleria_museo_3', 'galleria_armi_stanza_galleria_museo_5', 'galleria_armi_stanza_galleria_qr', 'galleria_cupola_candelabro_candelabri', 'galleria_cupola_candelabro_candelabri_1', 'galleria_cupola_candelabro_candelabri_qr', 'galleria_cupola_candelabro_candelabro_museo', 'galleria_cupola_candelabro_candelabro_museo_1', 'galleria_cupola_portiera_portiera', 'galleria_cupola_portiera_portiera_1', 'galleria_cupola_portiera_portiera_2', 'galleria_cupola_portiera_portiera_qr', 'galleria_cupola_stanza_stanza', 'galleria_cupola_stanza_stanza_museo', 'galleria_cupola_stanza_stanza_museo_1', 'galleria_cupola_stanza_stanza_museo_2', 'galleria_cupola_stanza_stanza_qr', 'labirinto_labirinto', 'labirinto_labirinto_1', 'labirinto_labirinto_2', 'labirinto_labirinto_museo', 'labirinto_labirinto_museo_1', 'labirinto_labirinto_museo_2', 'labirinto_labirinto_qr', 'sala_affresco_capitello_capitello_museo', 'sala_affresco_capitello_capitello_museo_1', 'sala_affresco_capitello_capitello_museo_2', 'sala_affresco_capitello_capitello_qr', 'sala_affresco_sala_sala', 'sala_affresco_sala_sala_1', 'sala_affresco_sala_sala_museo', 'sala_affresco_sala_sala_museo_1', 'sala_affresco_sala_sala_qr', 'sala_affresco_serliana_serliana', 'sala_affresco_serliana_serliana_1', 'sala_affresco_serliana_serliana_2', 'sala_affresco_serliana_serliana_museo', 'sala_affresco_serliana_serliana_museo_1', 'sala_affresco_serliana_serliana_qr', 'sala_bagno_bagno', 'sala_bagno_bagno_museo', 'sala_bagno_bagno_museo_1', 'sala_bagno_bagno_qr', 'sala_bevilacqua_camino_camino', 'sala_bevilacqua_camino_camino_1', 'sala_bevilacqua_camino_camino_2', 'sala_bevilacqua_camino_camino_museo', 'sala_bevilacqua_camino_camino_museo_1', 'sala_bevilacqua_camino_camino_qr', 'sala_bevilacqua_sala_sala_museo', 'sala_bevilacqua_sala_sala_museo_1', 'sala_bevilacqua_sala_sala_qr', 'sala_bevilacqua_scarpa_scarpa', 'sala_bevilacqua_scarpa_scarpa_1', 'sala_bevilacqua_scarpa_scarpa_2', 'sala_bevilacqua_scarpa_scarpa_museo', 'sala_bevilacqua_scarpa_scarpa_museo_1', 'sala_bevilacqua_scarpa_scarpa_qr', 'sala_pranzo_camera_sala_qr', 'sala_pranzo_camino_due_caminodue', 'sala_pranzo_camino_due_caminodue_qr', 'sala_pranzo_camino_uno_caminouno', 'sala_pranzo_camino_uno_caminouno_1', 'sala_pranzo_camino_uno_caminouno_qr', 'sala_pranzo_porta_porta_qr', 'sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte', 'sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte_due', 'sala_stufa_valtellinese_dettaglio_pianoforte_due_pianoforte_museo', 'sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte', 'sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_museo', 'sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_museo_1', 'sala_stufa_valtellinese_dettaglio_pianoforte_uno_pianoforte_qr', 'sala_stufa_valtellinese_orologio_orologio', 'sala_stufa_valtellinese_orologio_orologio_1', 'sala_stufa_valtellinese_orologio_orologio_museo', 'sala_stufa_valtellinese_orologio_orologio_museo_1', 'sala_stufa_valtellinese_orologio_orologio_qr', 'sala_stufa_valtellinese_stanza_stanza', 'sala_stufa_valtellinese_stanza_stanza_museo', 'sala_stufa_valtellinese_stanza_stanza_museo_1', 'salone_onore_camino_camino_qr', 'salone_onore_lampada_lampada', 'salone_onore_lampada_lampada_1', 'salone_onore_lampada_lampada_2', 'salone_onore_lampada_lampada_3', 'salone_onore_lampada_lampada_qr', 'salone_onore_lasena_lasena', 'salone_onore_lasena_lasena_qr', 'salone_onore_salone_salone_qr', 'salone_onore_tappezzeria_tappezzeria_qr', 'scalone_ingresso_scalone', 'scalone_ingresso_scalone_1', 'scalone_ingresso_scalone_2', 'scalone_ingresso_scalone_3', 'scalone_ingresso_scalone_museo', 'scalone_ingresso_scalone_museo_1', 'scalone_ingresso_scalone_museo_2', 'scalone_ingresso_scalone_qr', 'studio_studio', 'studio_studio_qr']
  });
  log('🚀 XR8.run() called');
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);
