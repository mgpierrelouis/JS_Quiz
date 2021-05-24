var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var submitButton = document.getElementById('submit-btn')
var instructionsEl = document.getElementById('instructions')
var questContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')
var timerEl= document.getElementById('timer')
var startingMinutes = 2
var time = startingMinutes * 60

var shuffledQuestions, currentQuestion

startButton.addEventListener('click' , startGame)
nextButton.addEventListener('click' , () => {
    currentQuestionIndex++
    setNextQuestion()
    startTimer()
})

setInterval(startTimer, 1000);

function startTimer() {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds
    minutes = minutes < 1 ? '' : minutes
    timerEl.textContent = `${minutes}:${seconds}`
    time--;

    if(time <= 0) {
        timerEl.textContent = "Time's Up!"
        submitButton.classList.remove('hide')        
    }

}

function startGame() {
    startButton.classList.add('hide')
    timerEl.classList.remove('hide')
    shuffledQuestions =  questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questContainerEl.classList.remove('hide')
    instructionsEl.classList.add('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
    }
}
function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        submitButton.classList.remove('hide')
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')    
}

var questions = [
    {   
        question: 'What year did JavaScript debut?',
            answers: [
                { text: '1969', correct: false },
                { text: '1984', correct: false },
                { text: '1995', correct: true },
                { text: '2002', correct: false },

        ]
    },

    {
        question: 'What company owns the trademark for JavaScript?',
            answers: [
                { text: 'Apple', correct: false },
                { text: 'Oracle', correct: true },
                { text: 'Microsoft', correct: false },
                { text: 'Amazon', correct: false },
            ]
    },

    {
        question: 'Which of these would be the most appropriate use for JavaScript?',
            answers: [
                { text: 'Provide style customization for webpage elements', correct: false},
                { text: 'Display the main contents of the page for the user', correct: false},
                { text: 'Connect the user to the world wide web', correct: false},
                { text: 'Facilitate communicaiton between the user and web application', correct: true},
            ]        

    },

    {
        question: 'Which of these is a free data library designed to simplify HTML DOM tree traversal?',
            answers: [
                {text: 'CSS', correct: false },
                {text: 'HTML', correct: false },
                {text: 'iOS', correct: false },
                {text: 'JQuery', correct: true },
            ]
    },
]