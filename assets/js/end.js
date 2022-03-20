const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const homeButton = document.getElementById('home-btn');
const logoReload = document.getElementById('logo');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

// finalScore.innerText = mostRecentScore
finalScore.innerText = mostRecentScore + ' miles travelled'

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}














// all my stuff below here

/*event listener set to the home button that reruns to home screen*/
homeButton.addEventListener("click", goHome);

/*use reloadGame instead of this? same thing, which is better?*/
function goHome() {
    window.location.assign('/');
}

/*event listener set to the logo button that reloads the home page*/
logoReload.addEventListener("click", reloadGame);

function reloadGame() {
    window.location.replace("/");
    // window.location.replace("../index.html"); //changed to what's above to test
}