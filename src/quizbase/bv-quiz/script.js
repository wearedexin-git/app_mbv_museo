class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
        this.correctAnswers = 0;
        this.totalAnswered = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.loadQuestions();
    }

    initializeElements() {
        // DOM elements
        this.loadingEl = document.getElementById('loading');
        this.questionContentEl = document.getElementById('questionContent');
        this.resultsScreenEl = document.getElementById('resultsScreen');
        this.questionTextEl = document.getElementById('questionText');
        this.imagesContainerEl = document.getElementById('imagesContainer');
        this.optionsContainerEl = document.getElementById('optionsContainer');
        this.nextBtnEl = document.getElementById('nextBtn');
        this.restartBtnEl = document.getElementById('restartBtn');
        this.progressFillEl = document.getElementById('progressFill');
        this.currentQuestionEl = document.getElementById('currentQuestion');
        this.totalQuestionsEl = document.getElementById('totalQuestions');
        this.correctAnswersEl = document.getElementById('correctAnswers');
        this.totalAnsweredEl = document.getElementById('totalAnswered');
        this.scorePercentageEl = document.getElementById('scorePercentage');
        this.confettiContainerEl = document.getElementById('confettiContainer');
        this.sadAnimationEl = document.getElementById('sadAnimation');
    }

    bindEvents() {
        this.nextBtnEl.addEventListener('click', () => this.nextQuestion());
        this.restartBtnEl.addEventListener('click', () => this.restartQuiz());
    }

    async loadQuestions() {
        try {
            const response = await fetch('questions.json');
            if (!response.ok) {
                throw new Error('Errore nel caricamento delle domande');
            }
            this.questions = await response.json();
            this.totalQuestionsEl.textContent = this.questions.length;
            this.showQuestion();
        } catch (error) {
            console.error('Errore:', error);
            this.showError('Errore nel caricamento delle domande. Verifica che il file questions.json sia presente.');
        }
    }

    showError(message) {
        this.loadingEl.innerHTML = `
            <div style="color: #dc3545; font-size: 1.1rem;">
                <p>❌ ${message}</p>
                <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Ricarica
                </button>
            </div>
        `;
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        // Hide loading, show question content
        this.loadingEl.style.display = 'none';
        this.questionContentEl.style.display = 'block';
        this.resultsScreenEl.style.display = 'none';

        // Update progress
        this.updateProgress();
        
        // Set question text
        this.questionTextEl.textContent = question.question;
        
        // Clear previous images and options
        this.imagesContainerEl.innerHTML = '';
        this.optionsContainerEl.innerHTML = '';
        
        // Add images if present
        if (question.images && question.images.length > 0) {
            question.images.forEach(imagePath => {
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = 'Immagine domanda';
                img.className = 'question-image';
                img.onerror = () => {
                    img.style.display = 'none';
                };
                this.imagesContainerEl.appendChild(img);
            });
        }
        
        // Add options
        question.options.forEach((option, index) => {
            const optionEl = document.createElement('button');
            optionEl.className = 'option';
            optionEl.textContent = option;
            optionEl.dataset.index = index;
            
            optionEl.addEventListener('click', () => this.selectOption(optionEl, index));
            this.optionsContainerEl.appendChild(optionEl);
        });
        
        // Reset state
        this.selectedAnswer = null;
        this.nextBtnEl.disabled = true;
    }

    selectOption(optionEl, index) {
        // Remove previous selection
        const allOptions = this.optionsContainerEl.querySelectorAll('.option');
        allOptions.forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Select new option
        optionEl.classList.add('selected');
        this.selectedAnswer = index;
        this.nextBtnEl.disabled = false;
    }

    nextQuestion() {
        if (this.selectedAnswer === null) return;
        
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = this.selectedAnswer === question.correctAnswer;
        
        // Show correct/incorrect feedback
        this.showAnswerFeedback(isCorrect);
        
        // Update score
        if (isCorrect) {
            this.correctAnswers++;
        }
        this.totalAnswered++;
        
        // Wait for animation to complete, then move to next question
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.showQuestion();
        }, 2000);
    }

    showAnswerFeedback(isCorrect) {
        const allOptions = this.optionsContainerEl.querySelectorAll('.option');
        const question = this.questions[this.currentQuestionIndex];
        
        // Disable all options
        allOptions.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Show correct answer
        allOptions[question.correctAnswer].classList.add('correct');
        
        // Show user's selection if incorrect
        if (!isCorrect && this.selectedAnswer !== question.correctAnswer) {
            allOptions[this.selectedAnswer].classList.add('incorrect');
        }
        
        // Show animation
        if (isCorrect) {
            this.showConfetti();
        } else {
            this.showSadAnimation();
        }
    }

    showConfetti() {
        // Create confetti elements
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            this.confettiContainerEl.appendChild(confetti);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            this.confettiContainerEl.innerHTML = '';
        }, 3000);
    }

    showSadAnimation() {
        this.sadAnimationEl.textContent = '😢';
        this.sadAnimationEl.style.display = 'block';
        
        setTimeout(() => {
            this.sadAnimationEl.style.display = 'none';
        }, 2000);
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFillEl.style.width = progress + '%';
        this.currentQuestionEl.textContent = this.currentQuestionIndex + 1;
    }

    showResults() {
        this.questionContentEl.style.display = 'none';
        this.resultsScreenEl.style.display = 'block';
        
        this.correctAnswersEl.textContent = this.correctAnswers;
        this.totalAnsweredEl.textContent = this.totalAnswered;
        
        const percentage = this.totalAnswered > 0 ? Math.round((this.correctAnswers / this.totalAnswered) * 100) : 0;
        this.scorePercentageEl.textContent = percentage + '%';
        
        // Add emoji based on score
        let emoji = '😢';
        if (percentage >= 80) emoji = '🎉';
        else if (percentage >= 60) emoji = '😊';
        else if (percentage >= 40) emoji = '😐';
        
        this.scorePercentageEl.innerHTML = `${emoji} ${percentage}% ${emoji}`;
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
        this.correctAnswers = 0;
        this.totalAnswered = 0;
        this.showQuestion();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
}); 