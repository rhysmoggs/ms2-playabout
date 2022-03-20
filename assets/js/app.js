// window.onload = sendApiRequest;

// wait for the DOM to finish loading before running the game
// get the button elements and add event listeners to them

// document.addEventListener("DOMContentLoaded", function() {
//     let buttons = document.getElementsByTagName("button");

//     for (let button of buttons){
//         button.addEventListener("click", function() {
//             if (this.getAttribute("data-type") === "start") {
//                 alert("You clicked Start!");
//             } else {
//                 let buttonType = this.getAttribute("data-type");
//                 alert(`You clicked ${buttonType}`);
//             }
//         });
//     }
// });

const startButton = document.getElementById('start-btn');
const howToButton = document.getElementById('how-to-btn');
const howToDiv = document.getElementById('how-container');
const contactButton = document.getElementById('contact-btn');
const contactDiv = document.getElementById('contact-container');

const highscoresButton = document.getElementById('highscore-btn');
const highscoresDiv = document.getElementById('high-container');
const endDiv = document.getElementById('end-container');
const logoReload = document.getElementById('logo');

const gameArea = document.getElementById('game-area');
const containerDiv = document.getElementById('container');

// const question = document.querySelector('#question');
// const choices = Array.from(document.querySelectorAll('.choice-text'));
// const progressText = document.querySelector('#progressText');
// const scoreText = document.querySelector('#score');
// const progressBarFull = document.querySelector('#progressBarFull');

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const plane = document.getElementById('plane');
const loader = document.getElementById('loader');
// const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

/*undefined let variables*/
// let currentQuestion = {}
// let acceptingAnswers = true
// let score = 0
// let questionCounter = 0
// let availableQuestions = []

let questions = []

fetch(
    'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        // startGame();
    })
    .catch((err) => {
        console.error(err);
    });


const SCORE_POINTS = 5000
const MAX_QUESTIONS = 10

/*event listener set to the logo button that reloads the home page*/
logoReload.addEventListener("click", reloadGame);

function reloadGame() {
    window.location.replace("../index.html");
}

/*run the game*/
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    containerDiv.classList.remove('hide');
    startButton.classList.add('hide');
    gameArea.style.top = "65%";
    if (howToButton.style.display !== "block") {
        howToButton.style.display = "none";
        howToDiv.style.display = "none";
    } else {
        howToButton.style.display = "none";
    }; 
    contactButton.classList.add('hide');
    if (highscoresButton.style.display !== "block") {
        highscoresButton.style.display = "none";
        highscoresDiv.style.display = "none";
    } else {
        highscoresButton.style.display = "none";
    };
};

/*event listener set to the start button that runs the game*/
startButton.addEventListener("click", startGame);

//populates question and answers
// function useApiData(data) {
//     document.querySelector("#question").innerHTML = `${data.results[0].question}`;
//     document.querySelector("#choice-1").innerHTML = data.results[0].correct_answer;
//     document.querySelector("#choice-2").innerHTML = data.results[0].incorrect_answers[0];
//     document.querySelector("#choice-3").innerHTML = data.results[0].incorrect_answers[1];
//     document.querySelector("#choice-4").innerHTML = data.results[0].incorrect_answers[2];
// }

//gets questions
// async function sendApiRequest() {
//     let response = await fetch(`https://opentdb.com/api.php?amount=1&category=22&difficulty=easy&type=multiple`);
//     console.log(response)
//     let data = await response.json()
//     console.log(data)
    
//     useApiData(data)
//     if(questionCounter > MAX_QUESTIONS) {
//         localStorage.setItem('mostRecentScore', score)

//         return window.location.assign('../end.html')
//     }
//     questionCounter++
// }

// let correctButton = document.querySelector("#choice-1");

// correctButton.addEventListener("click", ()=>{
//     alert("Correct");
//     sendApiRequest()
// })

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../end.html')
    }

    questionCounter++
    progressText.innerText = `Destination: ${questionCounter} / ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    plane.style.left = "100%"
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerHTML = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerHTML = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}



/*check if the answer is correct/incorrect call it checkAnswer instead?*/
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            // document.getElementById("progressBarFull").style.width += "10%";
            // plane.style.left = "100%"
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 2000)
    })
})

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};