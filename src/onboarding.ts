import { getAppLang, setAppLang } from './lang-state';
import type { AppLang } from './error-messages';

type OnboardingScreenCopy = { title: string; body: string; continueLabel: string };
type OnboardingCopy = {
  langLabel: string;
  screen1: OnboardingScreenCopy;
  screen2: OnboardingScreenCopy;
  screen3: OnboardingScreenCopy;
};

const COPY: Record<AppLang, OnboardingCopy> = {
  it: {
    langLabel: 'IT',
    screen1: {
      title: 'Esperienza Immersiva',
      body:
        "Hai attivato la modalità immersiva. Scansiona la stanza per scoprire disegni storici e curiosità sulle opere che osservi dal vivo.",
      continueLabel: 'Continua',
    },
    screen2: {
      title: 'Avvertenza Modalità Silenzioso',
      body:
        "Su alcuni dispositivi la Modalità Silenzioso potrebbe impedire di sentire l'audioguida. Se riscontri questo problema, ti consigliamo di disattivare la Modalità Silenzioso.",
      continueLabel: 'Continua',
    },
    screen3: {
      title: 'Attiva la fotocamera',
      body:
        'Per vivere l\'esperienza AR abbiamo bisogno di accedere alla fotocamera del tuo dispositivo. Al passo successivo il telefono ti chiederà il permesso.',
      continueLabel: 'Attiva Fotocamera',
    },
  },
  en: {
    langLabel: 'EN',
    screen1: {
      title: 'Immersive Experience',
      body:
        'Immersive mode is now active. Scan the room to discover historical drawings and curiosities about the artworks in front of you.',
      continueLabel: 'Continue',
    },
    screen2: {
      title: 'Silent Mode Notice',
      body:
        'On some devices, Silent Mode may prevent you from hearing the audio guide. If you experience this issue, we recommend disabling Silent Mode.',
      continueLabel: 'Continue',
    },
    screen3: {
      title: 'Enable the camera',
      body:
        "To experience AR we need access to your device's camera. Your phone will ask for permission in the next step.",
      continueLabel: 'Enable Camera',
    },
  },
};

// Mostra le due schermate di onboarding a ogni apertura dell'app, prima che
// venga richiesto il permesso camera. Il flag lingua qui è la stessa fonte
// di verità (lang-state) letta poi da UIController: la scelta fatta qui
// resta valida per tutta la sessione.
export function initOnboarding(onComplete: () => void): void {
  const overlay = document.getElementById('onboarding-overlay');
  const screen1 = document.getElementById('onboarding-screen-1');
  const screen2 = document.getElementById('onboarding-screen-2');
  const screen3 = document.getElementById('onboarding-screen-3');
  const langBtn = document.getElementById('onboarding-lang-btn');
  const title1 = document.getElementById('onboarding-title-1');
  const body1 = document.getElementById('onboarding-body-1');
  const continue1 = document.getElementById('onboarding-continue-1');
  const title2 = document.getElementById('onboarding-title-2');
  const body2 = document.getElementById('onboarding-body-2');
  const continue2 = document.getElementById('onboarding-continue-2');
  const title3 = document.getElementById('onboarding-title-3');
  const body3 = document.getElementById('onboarding-body-3');
  const continue3 = document.getElementById('onboarding-continue-3');

  if (!overlay || !screen1 || !screen2 || !screen3) {
    onComplete();
    return;
  }

  const render = () => {
    const copy = COPY[getAppLang()];
    if (langBtn) langBtn.textContent = copy.langLabel;
    if (title1) title1.textContent = copy.screen1.title;
    if (body1) body1.textContent = copy.screen1.body;
    if (continue1) continue1.textContent = copy.screen1.continueLabel;
    if (title2) title2.textContent = copy.screen2.title;
    if (body2) body2.textContent = copy.screen2.body;
    if (continue2) continue2.textContent = copy.screen2.continueLabel;
    if (title3) title3.textContent = copy.screen3.title;
    if (body3) body3.textContent = copy.screen3.body;
    if (continue3) continue3.textContent = copy.screen3.continueLabel;
  };

  render();

  // Splash: il logo resta da solo, grande e centrato, per un istante prima
  // di animarsi verso l'angolo e lasciar comparire il resto (vedi le regole
  // "onboarding-loaded" nel CSS). La barra si riempie nello stesso lasso di
  // tempo: rAF forza un frame con width:0% dipinto prima di passare a 100%,
  // altrimenti il browser accorpa le due modifiche e la transizione non si vede.
  const progressFill = document.getElementById('onboarding-progress-fill');
  requestAnimationFrame(() => {
    if (progressFill) progressFill.style.width = '100%';
  });

  window.setTimeout(() => {
    overlay.classList.add('onboarding-loaded');
  }, 1200);

  langBtn?.addEventListener('click', () => {
    setAppLang(getAppLang() === 'it' ? 'en' : 'it');
    render();
  });

  continue1?.addEventListener('click', () => {
    screen1.classList.add('hidden');
    screen2.classList.remove('hidden');
  });

  continue2?.addEventListener('click', () => {
    screen2.classList.add('hidden');
    screen3.classList.remove('hidden');
  });

  // Solo qui, al tap dell'utente, l'overlay sparisce e l'AR può partire:
  // è questo il gesto che fa comparire il vero prompt nativo del telefono
  // per il permesso camera (XR8.run(), chiamato da onComplete, lo innesca).
  continue3?.addEventListener('click', () => {
    overlay.classList.add('hidden');
    onComplete();
  });
}
