export class UIController {
  private overlay: HTMLElement;
  private langBtn: HTMLElement;
  private closeBtn: HTMLElement;
  private audioBtn: HTMLElement;
  private infoBtn: HTMLElement;
  private quizBtn: HTMLElement;
  private navLeftBtn: HTMLElement;
  private navRightBtn: HTMLElement;
  
  private infoBottomSheet: HTMLElement;
  private infoPanel: HTMLElement;
  private quizPanel: HTMLElement;
  private infoText: HTMLElement;
  private quizQuestion: HTMLElement;
  private quizOptions: HTMLElement;
  private closeSheetBtn: HTMLElement;
  private audioPlayer: HTMLAudioElement;

  private currentQuiz: any[] = [];
  private currentQuestionIdx = 0;

  private customAudioPlayer: HTMLElement;
  private playPauseBtn: HTMLElement;
  private progressContainer: HTMLElement;
  private progressBar: HTMLElement;
  private timeDisplay: HTMLElement;
  private closePlayerBtn: HTMLElement;

  // Stato UI
  private currentLang: 'it' | 'en' = 'it';
  public onLangToggle?: (lang: 'it' | 'en') => void;
  public onCloseTarget?: () => void;
  public onNavLeft?: () => void;
  public onNavRight?: () => void;
  public onAudioToggle?: (isPlaying: boolean) => void;
  public onQuizRequest?: () => void;

  private isAudioPlaying = false;

  constructor() {
    this.overlay = document.getElementById('ar-ui-overlay')!;
    this.langBtn = document.getElementById('lang-btn')!;
    this.closeBtn = document.getElementById('close-btn')!;
    this.audioBtn = document.getElementById('audio-btn')!;
    this.infoBtn = document.getElementById('info-btn')!;
    this.quizBtn = document.getElementById('quiz-btn')!;
    this.navLeftBtn = document.getElementById('nav-left-btn')!;
    this.navRightBtn = document.getElementById('nav-right-btn')!;
    
    this.infoBottomSheet = document.getElementById('info-bottomsheet')!;
    this.infoPanel = document.getElementById('info-panel')!;
    this.quizPanel = document.getElementById('quiz-panel')!;
    this.infoText = document.getElementById('info-text')!;
    this.quizQuestion = document.getElementById('quiz-question')!;
    this.quizOptions = document.getElementById('quiz-options')!;
    this.closeSheetBtn = document.getElementById('close-sheet-btn')!;
    this.audioPlayer = document.getElementById('ar-audio-player') as HTMLAudioElement;

    this.customAudioPlayer = document.getElementById('custom-audio-player')!;
    this.playPauseBtn = document.getElementById('play-pause-btn')!;
    this.progressContainer = document.getElementById('progress-container')!;
    this.progressBar = document.getElementById('progress-bar')!;
    this.timeDisplay = document.getElementById('time-display')!;
    this.closePlayerBtn = document.getElementById('close-player-btn')!;

    this.bindEvents();
  }

  private formatTime(seconds: number): string {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  private bindEvents() {
    this.langBtn.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'it' ? 'en' : 'it';
      this.langBtn.innerHTML = this.currentLang.toUpperCase();
      if(this.onLangToggle) this.onLangToggle(this.currentLang);
    });

    this.closeBtn.addEventListener('click', () => {
      this.hideOverlay();
      if (this.onCloseTarget) this.onCloseTarget();
    });

    this.infoBtn.addEventListener('click', () => {
      this.infoPanel.classList.remove('hidden');
      this.quizPanel.classList.add('hidden');
      this.infoBottomSheet.classList.remove('hidden');
    });

    this.quizBtn.addEventListener('click', () => {
      if(this.onQuizRequest) this.onQuizRequest();
    });

    this.closeSheetBtn.addEventListener('click', () => {
      this.infoBottomSheet.classList.add('hidden');
    });

    this.audioBtn.addEventListener('click', () => {
      this.customAudioPlayer.classList.toggle('hidden');
    });

    this.playPauseBtn.addEventListener('click', () => {
      if (this.isAudioPlaying) {
        this.audioPlayer.pause();
      } else {
        this.audioPlayer.play().catch(e => console.error("Audio play failed:", e));
      }
    });

    this.closePlayerBtn.addEventListener('click', () => {
      this.customAudioPlayer.classList.add('hidden');
      this.audioPlayer.pause();
    });

    this.audioPlayer.addEventListener('play', () => {
      this.isAudioPlaying = true;
      this.playPauseBtn.innerHTML = '<span class="material-symbols-rounded">pause</span>';
      this.audioBtn.innerHTML = '<span class="material-symbols-rounded">volume_up</span>';
      if (this.onAudioToggle) this.onAudioToggle(true);
    });

    this.audioPlayer.addEventListener('pause', () => {
      this.isAudioPlaying = false;
      this.playPauseBtn.innerHTML = '<span class="material-symbols-rounded">play_arrow</span>';
      this.audioBtn.innerHTML = '<span class="material-symbols-rounded">volume_off</span>';
      if (this.onAudioToggle) this.onAudioToggle(false);
    });

    this.audioPlayer.addEventListener('timeupdate', () => {
      const current = this.audioPlayer.currentTime;
      const duration = this.audioPlayer.duration || 0;
      
      if (duration > 0) {
        const percent = (current / duration) * 100;
        this.progressBar.style.width = percent + '%';
      }
      this.timeDisplay.innerText = this.formatTime(current) + ' / ' + this.formatTime(duration);
    });

    this.progressContainer.addEventListener('click', (e) => {
      const rect = this.progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      this.audioPlayer.currentTime = percent * (this.audioPlayer.duration || 0);
    });

    this.navLeftBtn.addEventListener('click', () => {
      if (this.onNavLeft) this.onNavLeft();
    });

    this.navRightBtn.addEventListener('click', () => {
      if (this.onNavRight) this.onNavRight();
    });
    
    this.audioPlayer.addEventListener('ended', () => {
      this.audioPlayer.pause();
    });
  }

  // Chiamato quando il Target confermato
  public showOverlay(localizedInfoText: string, audioSrc: string, imagesCount: number, hasQuiz: boolean) {
    this.infoText.innerHTML = localizedInfoText;
    
    // Setup Audio
    this.audioPlayer.src = audioSrc;
    this.audioPlayer.load();
    this.isAudioPlaying = false;
    this.audioBtn.innerHTML = '<span class="material-symbols-rounded">volume_off</span>';

    // Gestione visibilità frecce navigazione
    if (imagesCount > 1) {
      this.navLeftBtn.classList.remove('hidden');
      this.navRightBtn.classList.remove('hidden');
      this.updateNavButtons(false, true); // Al caricamento siamo sempre all'indice 0
    } else {
      this.navLeftBtn.classList.add('hidden');
      this.navRightBtn.classList.add('hidden');
    }

    // Visibilità Pulsante Quiz
    if(hasQuiz) this.quizBtn.classList.remove('hidden');
    else this.quizBtn.classList.add('hidden');

    this.infoPanel.classList.remove('hidden');
    this.quizPanel.classList.add('hidden');

    this.overlay.classList.remove('hidden');
  }

  public hideOverlay() {
    this.overlay.classList.add('hidden');
    this.infoBottomSheet.classList.add('hidden');
    this.customAudioPlayer.classList.add('hidden');
    this.audioPlayer.pause();
  }

  public updateNavButtons(canGoLeft: boolean, canGoRight: boolean) {
    this.navLeftBtn.style.opacity = canGoLeft ? '1' : '0.3';
    this.navLeftBtn.style.pointerEvents = canGoLeft ? 'auto' : 'none';
    
    this.navRightBtn.style.opacity = canGoRight ? '1' : '0.3';
    this.navRightBtn.style.pointerEvents = canGoRight ? 'auto' : 'none';
  }

  public updateLocalization(localizedInfoText: string, audioSrc: string) {
    this.infoText.innerHTML = localizedInfoText;
    
    const wasPlaying = this.isAudioPlaying;
    
    this.audioPlayer.pause();
    this.audioPlayer.src = audioSrc;
    this.audioPlayer.load();
    
    if(wasPlaying) {
      this.audioPlayer.play().catch(e => console.error(e));
    }
  }

  // LOGICA QUIZ
  public startQuiz(questions: any[]) {
    this.currentQuiz = questions;
    this.currentQuestionIdx = 0;
    this.showQuestion();
    
    const wasInfoVisible = !this.infoBottomSheet.classList.contains('hidden');
    this.infoPanel.classList.add('hidden');
    this.quizPanel.classList.remove('hidden');
    if(!wasInfoVisible) this.infoBottomSheet.classList.remove('hidden');
  }

  private showQuestion() {
    const qData = this.currentQuiz[this.currentQuestionIdx];
    this.quizQuestion.innerText = qData.question;
    this.quizOptions.innerHTML = '';
    
    qData.options.forEach((opt: string, i: number) => {
      const btn = document.createElement('div');
      btn.className = 'quiz-option';
      btn.innerText = opt;
      btn.onclick = () => this.handleOptionClick(i, qData.correctAnswer, btn);
      this.quizOptions.appendChild(btn);
    });
  }

  private handleOptionClick(index: number, correct: number, btn: HTMLElement) {
    const allOpts = this.quizOptions.querySelectorAll('.quiz-option');
    allOpts.forEach(o => o.classList.add('disabled'));

    if(index === correct) {
      btn.classList.add('correct');
      setTimeout(() => this.nextQuestion(), 1500);
    } else {
      btn.classList.add('wrong');
      allOpts[correct].classList.add('correct');
      setTimeout(() => this.nextQuestion(), 2500);
    }
  }

  private nextQuestion() {
    this.currentQuestionIdx++;
    if(this.currentQuestionIdx < this.currentQuiz.length) {
      this.showQuestion();
    } else {
      this.showResult();
    }
  }

  private showResult() {
    this.quizQuestion.innerText = this.currentLang === 'it' ? "Sfida Completata!" : "Challenge Completed!";
    this.quizOptions.innerHTML = `<div class="quiz-option" style="text-align:center">${this.currentLang === 'it' ? 'Bravo! Hai scoperto i segreti di questo oggetto.' : 'Well done! You discovered the secrets of this object.'}</div>`;
    
    setTimeout(() => {
        this.infoBottomSheet.classList.add('hidden');
    }, 3000);
  }
}
