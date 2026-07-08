import { UIController } from './ui-controller'
import { getTargetConfig, TargetConfig } from './config/targetsManager'
import { Carousel3D } from './carousel-module'

declare const XR8: any;

export const CarouselPipelineModule = () => {
  let uiController: UIController;
  let carousel3D: Carousel3D;
  let activeTargetId: string | null = null;
  let activeConfig: TargetConfig | null = null;

  return {
    name: 'carousel-pipeline',
    onStart: () => {
      // Setup Three.js integrato in 8th Wall
      const { scene, camera, renderer } = XR8.Threejs.xrScene();
      
      uiController = new UIController();
      carousel3D = new Carousel3D(scene, camera, renderer);

      // Collega Eventi interfaccia a logiche spaziali/dati
      uiController.onNavLeft = () => {
        carousel3D.slideLeft();
        uiController.updateNavButtons(
          carousel3D.getCurrentIndex() > 0,
          carousel3D.getCurrentIndex() < carousel3D.getImagesCount() - 1
        );
      };
      uiController.onNavRight = () => {
        carousel3D.slideRight();
        uiController.updateNavButtons(
          carousel3D.getCurrentIndex() > 0,
          carousel3D.getCurrentIndex() < carousel3D.getImagesCount() - 1
        );
      };
      
      uiController.onLangToggle = (lang) => {
        if(activeConfig) {
          const lData = activeConfig.localization[lang];
          uiController.updateLocalization(lData.infoText, lData.audioSrc);
        }
      };

      uiController.onQuizRequest = () => {
        if (activeConfig && activeConfig.quizId) {
          // Caricamento on-demand del quiz per non appesantire il caricamento iniziale
          const quizPath = `./quizbase/${activeConfig.quizId}/questions.json`;
          fetch(quizPath)
            .then(response => response.json())
            .then(questions => {
              uiController.startQuiz(questions);
            })
            .catch(err => {
              console.error("❌ Errore nel caricamento del quiz:", err);
            });
        }
      };

      uiController.onCloseTarget = () => {
         carousel3D.hideCarousel();
         carousel3D.isTriggerVisible = false;
         
         activeTargetId = null;
         activeConfig = null;
      };
      
      // Wire: click fisico nel 3D => apertura UI
      carousel3D.onTriggerClicked = () => {
         if(!activeConfig) return;
         carousel3D.spawnCarousel(activeConfig.images);
         const langData = activeConfig.localization['it']; // default IT as defined in UI
         uiController.showOverlay(
           langData.infoText, 
           langData.audioSrc, 
           activeConfig.images.length,
           !!activeConfig.quizId // comunica se mostrare il tasto quiz
         );
      };
    },
    
    onUpdate: () => {
      if(carousel3D) carousel3D.update(); // Loop di animazione per il lerp
    },
    
    listeners: [
      {
        event: 'reality.imagefound',
        process: ({ detail }: any) => {
          console.log('🖼️ xrimagefound SCATTATO! Nome:', detail.name);
          if (activeTargetId) return; // evoca blocchi multipli
          const targetName = detail.name;
          const config = getTargetConfig(targetName);
          if(config) {
             console.log('✅ Target config trovato, mostro il trigger 3D');
             activeTargetId = targetName;
             activeConfig = config;
             carousel3D.showTrigger(detail);
          } else {
             console.log('⚠️ Nessun config in targetsManager per:', targetName);
          }
        }
      },
      {
        event: 'reality.imageupdated',
        process: ({ detail }: any) => {
          if(activeTargetId === detail.name) {
             carousel3D.updateTargetTransform(detail);
          }
        }
      },
      {
        event: 'reality.imagelost',
        process: ({ detail }: any) => {
          // Se perdo il tracking PRIMA di aver cliccato il trigger, nascondo il tutto
          // Se ho già cliccato, stiamo fluttuando ancorati all'ultima posizione vista, 
          // quindi si sceglie tipicamente di lasciarlo lì finché l'utente non fa "Chiudi".
          if(carousel3D && carousel3D.isTriggerVisible && activeTargetId === detail.name) {
               carousel3D.hideTrigger();
               activeTargetId = null;
               activeConfig = null;
          }
        }
      }
    ]
  }
}
