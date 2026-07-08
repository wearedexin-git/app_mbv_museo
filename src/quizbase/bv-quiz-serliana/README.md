# Quiz App

Una web app leggera e ottimizzata per mobile per sottoporre quiz agli utenti.

## Caratteristiche

- ✅ **Design responsive** - Ottimizzato per mobile e desktop
- ✅ **Animazioni confetti** - Per risposte corrette
- ✅ **Animazioni tristi** - Per risposte sbagliate
- ✅ **Supporto immagini** - 1-2 immagini per domanda
- ✅ **Caricamento dinamico** - Domande da file JSON
- ✅ **Progress bar** - Mostra l'avanzamento
- ✅ **Risultati finali** - Con punteggio e percentuale
- ✅ **Estremamente leggera** - Solo HTML, CSS e JavaScript vanilla

## Come usare

1. **Apri l'app**: Apri `index.html` in un browser web
2. **Rispondi alle domande**: Seleziona una delle 3 opzioni
3. **Clicca "Avanti"**: Per procedere alla domanda successiva
4. **Vedi i risultati**: Alla fine del quiz

## Come aggiungere/modificare le domande

Le domande sono gestite nel file `questions.json`. Ogni domanda ha questa struttura:

```json
{
  "question": "Testo della domanda",
  "options": [
    "Opzione 1",
    "Opzione 2", 
    "Opzione 3"
  ],
  "correctAnswer": 1,
  "images": []
}
```

### Parametri:

- **question**: Il testo della domanda
- **options**: Array con 3 opzioni di risposta
- **correctAnswer**: Indice della risposta corretta (0, 1, o 2)
- **images**: Array con percorsi delle immagini (opzionale)

### Esempio con immagini:

```json
{
  "question": "Quale animale è questo?",
  "options": [
    "Cane",
    "Gatto", 
    "Coniglio"
  ],
  "correctAnswer": 1,
  "images": [
    "assets/images/gatto.jpg",
    "assets/images/gatto2.jpg"
  ]
}
```

## Struttura file

```
bv-quiz/
├── index.html          # Pagina principale
├── styles.css          # Stili CSS
├── script.js           # Logica JavaScript
├── questions.json      # Domande del quiz
├── assets/
│   └── images/         # Cartella per le immagini
└── README.md           # Questo file
```

## Animazioni

- **Risposta corretta**: Animazione confetti colorati
- **Risposta sbagliata**: Emoji triste con animazione
- **Feedback visivo**: Le opzioni cambiano colore per mostrare la risposta corretta

## Tecnologie utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Design responsive e animazioni
- **JavaScript ES6+** - Logica dell'applicazione
- **JSON** - Dati delle domande

## Ottimizzazioni mobile

- Design responsive con breakpoint per tablet e mobile
- Touch-friendly con bottoni grandi
- Animazioni ottimizzate per dispositivi mobili
- Caricamento veloce senza framework pesanti

## Browser supportati

- Chrome (raccomandato)
- Firefox
- Safari
- Edge

## Note tecniche

- L'app funziona completamente offline
- Non richiede server web (può essere aperta direttamente)
- Le immagini devono essere nella cartella `assets/images/`
- Il file `questions.json` deve essere valido JSON 