// wait for the DOM to finish loading before running the game
// get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                alert("You clicked Start!");
            } else {
                let buttonType = this.getAttribute("data-type");
                alert(`You clicked ${buttonType}`);
            }
        });
    }
});

const startButton = document.getElementById('start-btn');
const howToButton = document.getElementById('how-to-btn');
const howToDiv = document.getElementById('how-container');
const contactButton = document.getElementById('contact-btn');
const contactDiv = document.getElementById('contact-container');
// const nextButton = document.getElementById('next-btn');
// const restartButton = document.getElementById('restart-btn');
// const homeButton = document.getElementById('home-btn');
const highscoresButton = document.getElementById('highscore-btn');
const highscoresDiv = document.getElementById('high-container');
const endDiv = document.getElementById('end-container');
const logoReload = document.getElementById('logo');
// const gameDiv = document.getElementById('game');
const gameArea = document.getElementById('game-area');
const containerDiv = document.getElementById('container');
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

/*undefined let variables*/
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

/*list of questions*/
let questions = [
    {
        question: 'When did Sega release the first video game, Sonic the Hedgehog?',
        choice1: '1919',
        choice2: '2019',
        choice3: '1999',
        choice4: '1991',
        answer: 4,
    },
    {
        question: "Which company developed the first Sonic the Hedgehog video game?",
        choice1: "EA",
        choice2: "Sega",
        choice3: "Sony",
        choice4: "Nintendo",
        answer: 2,
    },
    {
        question: "Which of the following was the basis of Doctor Eggman\'s design?",
        choice1: "Hollywood Hulk Hogan",
        choice2: "Si King of 'The Hairy Bikers'",
        choice3: "Theodore Roosevelt",
        choice4: "Daniel Day-Lewis",
        answer: 3,
    }
]

const SCORE_POINTS = 5000
const MAX_QUESTIONS = 4

/*event listener set to the logo button that reloads the home page*/
logoReload.addEventListener("click", reloadGame);

function reloadGame() {
    window.location.replace("../index.html");
}

/*event listener set to the start button that runs the game*/
// startButton.addEventListener("click", runGame);

/*event listener set to show the next question once next button is clicked*/
// nextButton.addEventListener("click", () => {
//     currentQuestionIndex++;
//     setNextQuestion();
// });

/*run the game*/
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    containerDiv.classList.remove('hide');
    startButton.classList.add('hide');
    gameArea.style.top = "65%";
    // howToButton.classList.add('hide');
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
    // highscoresButton.classList.add('hide'); //check these? want to hide leaderbord when in game
    // highscoresDiv.classList.add('hide'); //check these?
};

// const highscoresButton = document.getElementById('highscore-btn');
// const highscoresDiv = document.getElementById('high-container');


/*event listener set to the start button that runs the game*/
startButton.addEventListener("click", startGame);

/*set next question*/
// function setNextQuestion() {
//     resetState();
//     showQuestion(shuffledQuestions[currentQuestionIndex]);
// };


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../end.html')
        
        // my code:
        // endDiv.classList.remove('hide');
        // gameDiv.classList.add('hide');
    }

    questionCounter++
    progressText.innerText = `Destination: ${questionCounter} / ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

/*clear page*/
// function resetState() {
//     clearStatusClass(document.body); //clears body colour?
//     nextButton.classList.add('hide');
//     while (answerButtonsElement.firstChild) {
//         answerButtonsElement.removeChild(answerButtonsElement.firstChild);
//     };
// };

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
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 2000)
    })
})



// function setStatusClass(element, correct) {
//     clearStatusClass(element);
//     if (correct) {
//         element.classList.add('correct');
//         incrementScore();
//     } else {
//         element.classList.add('incorrect');
//         // incrementWrongAnswer();
//     };
// };

// function clearStatusClass(element) {
//     element.classList.remove('correct');
//     element.classList.remove('incorrect');
// };

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


/**everything is correct up until this point. 
scores aren't calculated at finalscore page yet, 
but scores tally correctly */


//attempt to create a function to optimize
// check to see if I eventually use it
function hideContent() {
    startButton.classList.add('hide');
    howToButton.classList.add('hide');
    howToDiv.classList.add('hide');
    contactButton.classList.add('hide');
    highscoresButton.classList.add('hide');
    highscoresDiv.classList.add('hide');
};



//taken from highscores.js file and implemented here
const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

// working list to add score to highscore list
// highScoresList.innerHTML =
// highScores.map(score => {
//     return `<li class="high-score">${score.name} - ${score.score}</li>`
// }).join("")

//experimental
highScoresList.innerHTML =
highScores.map(score => {
    return `<p class="high-score">${score.name} - ${score.score} Air Miles</p>`
}).join("")









// https://sebhastian.com/javascript-show-hide-div-onclick-toggle/ then tweaked to serve my game
// const targetDiv = document.getElementById("third");
// const btn = document.getElementById("toggle");

//this function works. it expands and shows high scores, but keeps all other sections of page.
// highscoresButton.onclick = function () {
//     if (highscoresDiv.style.display !== "block") {
//         highscoresDiv.style.display = "block";
//     } else {
//         highscoresDiv.style.display = "none";
//     }
// };


//experimental attempt to hide all others and just show highscore
//improve js, maybe add hide all for reocurring stuff e.g. hide all start/howTo+contact
//might need to do the same for the How to Play button
highscoresButton.onclick = function () {
    if (highscoresDiv.style.display !== "block") {
        highscoresDiv.style.display = "block";
        startButton.classList.add('hide');
        howToButton.classList.add('hide');
        // howToDiv.classList.add('hide');
        contactButton.classList.add('hide');
    } else {
        highscoresDiv.style.display = "none";
        startButton.classList.remove('hide');
        howToButton.classList.remove('hide');
        // howToDiv.classList.remove('hide');
        contactButton.classList.remove('hide');
    }
};

// trying this way, https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
// function myFunction() {
//     var x = document.getElementById("high-container");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }



//for the how to play popup

//this function works. it expands and shows instructions on how to play, but keeps all other sections of page.
// howToButton.onclick = function () {
//     if (howToDiv.style.display !== "block") {
//         howToDiv.style.display = "block";
//     } else {
//         howToDiv.style.display = "none";
//     }
// };

//same thing but for Hot To Play section
howToButton.onclick = function () {
    if (howToDiv.style.display !== "block") {
        howToDiv.style.display = "block";
        startButton.classList.add('hide');
        contactButton.classList.add('hide');
        highscoresButton.classList.add('hide');
        // hideContent();
        // howToButton.classList.remove('hide');
    } else {
        howToDiv.style.display = "none";
        startButton.classList.remove('hide');
        contactButton.classList.remove('hide');
        highscoresButton.classList.remove('hide');
    }
};

//same thing but for Contact section
contactButton.onclick = function () {
    if (contactDiv.style.display !== "block") {
        contactDiv.style.display = "block";
        startButton.classList.add('hide');
        howToButton.classList.add('hide');
        highscoresButton.classList.add('hide');
        // hideContent();
        // howToButton.classList.remove('hide');
    } else {
        contactDiv.style.display = "none";
        startButton.classList.remove('hide');
        howToButton.classList.remove('hide');
        highscoresButton.classList.remove('hide');
    }
};