let currentQuestion = 0;
let trueQuestion = 0;
let falseQuestion = 0;

let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3');

AUDIO_SUCCESS.volume = .2;
AUDIO_WRONG.volume = .2;

function startButton() { // Diese Funktion wird aufgerufen, wenn der Start-Button gedrückt wird.
    document.getElementById('start-div').classList.add('d-none'); 
    document.getElementById('question-div').classList.remove('d-none');
    showQuestion();   
}

function showQuestion() { // Die "showQuestion" Funktion wird aufgerufen, um die nächste Frage anzuzeigen.
    document.getElementById('maxQuestion').innerHTML = questions.length;
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('howQuestion').innerHTML = questions[currentQuestion]['question'];
    document.getElementById('answer_1').innerHTML = questions[currentQuestion]['answer_1'];
    document.getElementById('answer_2').innerHTML = questions[currentQuestion]['answer_2'];
    document.getElementById('answer_3').innerHTML = questions[currentQuestion]['answer_3'];
    document.getElementById('answer_4').innerHTML = questions[currentQuestion]['answer_4'];
}

function answer(index) { //Die Funktion dient dazu, eine Antwort auf eine Quiz-Frage zu überprüfen und das Ergebnis anzuzeigen.
    if (questions[currentQuestion]['right_answer'] == index.slice(-1)) {
        answerTrue(index);
    } else {
        answerFalse(index);
    }
}

function nextButton() { //Diese Funktion dient dazu, zur nächsten Frage im Quiz zu wechseln oder das Quiz zu beenden.
    if (currentQuestion + 1 == questions.length) {
        endCard();
    } else {
        nextQuestion();
    }
}

function replay() { //Diese Funktion dient dazu, das Quiz zu wiederholen.
    removeEndCard();
    removeQuestionCard();
    removeButtons();
    removeAnswerCard();
    removeCaunter();
    showQuestion();
}

function answerTrue(index) {// Mehrere Funktionen! aktualisieren richtigen der Fragen, aktualisieren des Fortschrittsbalkens, ändern der Farben,  aktivieren des "Weiter"-Buttons und des Audio.
    trueQuestion++;
    let progressTrue = (trueQuestion / questions.length) * 100;
    progressTrue = Math.round(progressTrue);
    document.getElementById('progressTrue').style = `width:${progressTrue}%;`;
    document.getElementById('progressTrue').innerHTML = `${progressTrue}%`;
    document.getElementById(index).parentNode.style = "background-color:rgb(183,247,153);";
    document.getElementById(`answerSelect_${questions[currentQuestion]['right_answer']}`).style = "background-color:rgb(78,191,23);color:white;"
    document.getElementById('nextButton').classList.remove('btn-secondary');
    document.getElementById('nextButton').classList.add('btn-success');
    document.getElementById('nextButton').classList.remove('pointer-event-none');
    document.getElementById('allAnswer').classList.add('pointer-event-none');
    AUDIO_SUCCESS.play();
}


function answerFalse(index) {// Mehrere Funktionen! aktualisieren der falschen Fragen, aktualisieren des Fortschrittsbalkens, ändern der Farben,  aktivieren des "Weiter"-Buttons und des Audio.
    falseQuestion++;
    let progressFalse = (falseQuestion / questions.length) * 100;
    progressFalse = Math.round(progressFalse);
    document.getElementById('progressFalse').style = `width:${progressFalse}%;`;
    document.getElementById('progressFalse').innerHTML = `${progressFalse}%`;
    document.getElementById(index).parentNode.style = "background-color:rgb(255,164,164);";
    document.getElementById(`answerSelect_${index.slice(-1)}`).style = "background-color:rgb(248,24,24);color:white;";
    document.getElementById(`answer_${questions[currentQuestion]['right_answer']}`).parentNode.style = "background-color:rgb(183,247,153)";
    document.getElementById(`answerSelect_${questions[currentQuestion]['right_answer']}`).style = "background-color:rgb(78,191,23);color:white;";
    document.getElementById('nextButton').classList.remove('btn-secondary');
    document.getElementById('nextButton').classList.add('btn-danger');
    document.getElementById('nextButton').classList.remove('pointer-event-none');
    document.getElementById('allAnswer').classList.add('pointer-event-none');
    AUDIO_WRONG.play();
}

function endCard() {//Diese Funktion dient dazu, das Quiz zu beenden und das Ergebnis anzuzeigen.
    document.getElementById('question-div').classList.add('d-none');
    document.getElementById('endCard').classList.remove('d-none');
    document.getElementById('endScoreLength').innerHTML = questions.length;
    document.getElementById('endScoreResult').innerHTML = `${trueQuestion} /`;
}

function nextQuestion() { // Diese Funktion dient dazu, zur nächsten Frage zu wechseln.
    document.getElementById('allAnswer').classList.remove('pointer-event-none');
    document.getElementById('nextButton').classList.remove('btn-danger', 'btn-success');
    document.getElementById('nextButton').classList.add('pointer-event-none', 'btn-secondary');
    document.getElementById('answer_1').parentNode.style = "";;
    document.getElementById('answer_2').parentNode.style = "";;
    document.getElementById('answer_3').parentNode.style = "";;
    document.getElementById('answer_4').parentNode.style = "";;
    document.getElementById('answerSelect_1').style = "";;
    document.getElementById('answerSelect_2').style = "";;
    document.getElementById('answerSelect_3').style = "";;
    document.getElementById('answerSelect_4').style = "";;
    currentQuestion++;
    showQuestion();
}

function removeEndCard() {//Diese Funktion dient dazu, die "endCard" auszublenden, indem sie "d-none" bekommt.
    document.getElementById('endCard').classList.add('d-none');
}

function removeQuestionCard() {//Diese Funktion dient dazu, die "question-div" zu entfernen, indem sie "d-none" entfernt.
    document.getElementById('question-div').classList.remove('d-none');
}

function removeButtons() {//Diese Funktion dient dazu, den "Weiter"-Button zurückzusetzen.
    document.getElementById('nextButton').classList.remove('btn-danger', 'btn-success');
    document.getElementById('nextButton').classList.add('pointer-event-none', 'btn-secondary');
}

function removeAnswerCard() { //Diese Funktion dient dazu, die nächste Frage zurückzusetzen, indem bestimmte Elemente zurücksetzt werden.
    document.getElementById('allAnswer').classList.remove('pointer-event-none');
    document.getElementById('answer_1').parentNode.style = "";;
    document.getElementById('answer_2').parentNode.style = "";;
    document.getElementById('answer_3').parentNode.style = "";;
    document.getElementById('answer_4').parentNode.style = "";;
    document.getElementById('answerSelect_1').style = "";;
    document.getElementById('answerSelect_2').style = "";;
    document.getElementById('answerSelect_3').style = "";;
    document.getElementById('answerSelect_4').style = "";;
    document.getElementById('progressTrue').style = `width:0;`;
    document.getElementById('progressFalse').style = `width:0;`;
}

function removeCaunter() {//Diese Funktion dient dazu, die zählenden Variablen für das Quiz zurückzusetzen.
    currentQuestion = 0;
    trueQuestion = 0;
    falseQuestion = 0;
}