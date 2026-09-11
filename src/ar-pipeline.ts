import { UIController } from './ui-controller'
import { getTargetConfig, TargetConfig } from './config/targetsManager'
import { Carousel3D } from './carousel-module'
import { ErrorRecovery } from './error-recovery'

declare const XR8: any;

export const CarouselPipelineModule = () => {
  let uiController: UIController;
  let carousel3D: Carousel3D;
  let activeTargetId: string | null = null;
  let activeConfig: TargetConfig | null = null;

  const sameHotspot = (foundName: string, activeName: string | null, config: TargetConfig | null) => {
    if (!activeName || !config) return false;
    if (foundName === activeName) return true;
    // QR / varianti foto dello stesso contenuto (prefisso config.id)
    return foundName === config.id || foundName.startsWith(config.id + '_');
  };

  return {
    name: 'carousel-pipeline',
    onStart: () => {
      const { scene, camera, renderer } = XR8.Threejs.xrScene();

      uiController = new UIController();
      carousel3D = new Carousel3D(scene, camera, renderer);
      uiController.showScan();

      // Chiude l'hotspot attivo e torna alla scansione: stessa azione della
      // X manuale, riusata anche quando il marker resta perso troppo a lungo.
      const closeActiveHotspot = () => {
        uiController.hideOverlay();
        carousel3D.hideCarousel();
        carousel3D.hideTrigger();
        activeTargetId = null;
        activeConfig = null;
        ErrorRecovery.noteTrackingRestored();
        uiController.showScan();
      };

      // Collega lingua e stato carosello al hub errori
      ErrorRecovery.configure({
        getLang: () => uiController.getLang(),
        isCarouselOpen: () => !!carousel3D?.isCarouselOpen,
        isQuizOpen: () => uiController.isQuizOpen(),
        onTrackingTimeout: () => closeActiveHotspot(),
      });

      uiController.onNavLeft = () => {
        if (ErrorRecovery.isBlocked()) return;
        carousel3D.slideLeft();
        uiController.updateNavButtons(
          carousel3D.getCurrentIndex() > 0,
          carousel3D.getCurrentIndex() < carousel3D.getImagesCount() - 1
        );
      };
      uiController.onNavRight = () => {
        if (ErrorRecovery.isBlocked()) return;
        carousel3D.slideRight();
        uiController.updateNavButtons(
          carousel3D.getCurrentIndex() > 0,
          carousel3D.getCurrentIndex() < carousel3D.getImagesCount() - 1
        );
      };

      uiController.onLangToggle = (lang) => {
        ErrorRecovery.syncLanguage();
        if (activeConfig) {
          const lData = activeConfig.localization[lang];
          uiController.updateLocalization(lData.infoText, lData.audioSrc);
        }
      };

      uiController.onQuizRequest = () => {
        if (ErrorRecovery.isBlocked()) return;
        if (activeConfig && activeConfig.quizId) {
          const quizPath = `./quizbase/${activeConfig.quizId}/questions.json`;
          ErrorRecovery.fetchWithTimeout(quizPath, undefined, { silent: true })
            .then((response) => {
              if (!response.ok) throw new Error(`quiz ${response.status}`);
              return response.json();
            })
            .then((questions) => {
              uiController.startQuiz(questions);
            })
            .catch((err) => {
              console.error('❌ Errore nel caricamento del quiz:', err);
              uiController.setQuizAvailable(false);
            });
        }
      };

      // Nota: ui-controller chiama già hideOverlay() prima di onCloseTarget
      // sul tap manuale della X; closeActiveHotspot() lo rifà comunque
      // (idempotente) perché lo stesso path serve anche il timeout automatico.
      uiController.onCloseTarget = () => {
        closeActiveHotspot();
      };

      carousel3D.onTriggerClicked = () => {
        if (ErrorRecovery.isBlocked()) return;
        if (!activeConfig) return;
        carousel3D.spawnCarousel(activeConfig.images);
        const langData = activeConfig.localization[uiController.getLang()];
        uiController.showOverlay(
          langData.infoText,
          langData.audioSrc,
          activeConfig.images.length,
          !!activeConfig.quizId
        );
      };
    },

    onUpdate: () => {
      ErrorRecovery.heartbeat();
      if (carousel3D) carousel3D.update();
    },

    listeners: [
      {
        event: 'reality.imagefound',
        process: ({ detail }: any) => {
          const targetName = detail.name;
          const config = getTargetConfig(targetName);

          // Carosello già aperto: se ritroviamo lo stesso hotspot, riaggancia con smooth
          if (carousel3D?.isCarouselOpen) {
            if (sameHotspot(targetName, activeTargetId, activeConfig)) {
              activeTargetId = targetName;
              carousel3D.resumeTracking(detail);
              ErrorRecovery.noteTrackingRestored();
            }
            return;
          }

          // Sessione attiva su altro target (sfera visibile): ignora
          if (activeTargetId && !carousel3D.isTrackingFrozen()) return;

          if (config) {
            activeTargetId = targetName;
            activeConfig = config;
            uiController.hideScan();
            carousel3D.showTrigger(detail);
          }
        },
      },
      {
        event: 'reality.imageupdated',
        process: ({ detail }: any) => {
          if (!activeTargetId) return;
          if (detail.name !== activeTargetId && !sameHotspot(detail.name, activeTargetId, activeConfig)) {
            return;
          }
          ErrorRecovery.noteTrackingRestored();
          carousel3D.updateTargetTransform(detail);
        },
      },
      {
        event: 'reality.imagelost',
        process: ({ detail }: any) => {
          if (!carousel3D || activeTargetId !== detail.name) return;

          // Prima del tap: nascondi sfera e libera lo scan
          if (carousel3D.isTriggerVisible && !carousel3D.isCarouselOpen) {
            carousel3D.hideTrigger();
            activeTargetId = null;
            activeConfig = null;
            uiController.showScan();
            return;
          }

          // Carosello aperto: non congelare subito (avvicinamento → micro imagelost)
          if (carousel3D.isCarouselOpen) {
            carousel3D.noteTargetLost();
            ErrorRecovery.noteTrackingLost();
          }
        },
      },
    ],
  };
};
