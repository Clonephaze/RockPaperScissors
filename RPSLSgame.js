let userScore = localStorage.getItem('userScore') ? parseInt(localStorage.getItem('userScore'), 10) : 0;
const userScoreCurrent = document.getElementById("user-score");
const gameboard = document.querySelector(".gameboard");
const scissors = document.querySelector(".token-scissors");
const paper = document.querySelector(".token-paper");
const rock = document.querySelector(".token-rock");
const lizard = document.querySelector(".token-lizard");
const spock = document.querySelector(".token-spock");
const resultsBoard = document.querySelector(".results-board");
const result = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const userCircles = document.getElementById("user-circles");
const userTokenChoice = document.getElementById("user-token");
const userTokenChoiceImg = document.getElementById("user-token-img");
const computerTokenChoice = document.getElementById("computer-token");
const computerTokenChoiceImg = document.getElementById("computer-token-img");
const computerCircles = document.getElementById("computer-circles");
const playAgainBtn = document.getElementById("play-again");

function doConfetti() {
    //https://confetti.js.org/
    if (window.innerWidth < 768) {
        const duration = 1 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 20, spread: 90, ticks: 60, zIndex: 0, gravity: 1.3 };

        function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
        }, 250);
    } else {
        const duration = 1 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, gravity: 1.3 };

        function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
        }, 250);
    }
}

function computerPlay() {
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}

function disableTokens() {
    scissors.setAttribute("disabled", "disabled");
    paper.setAttribute("disabled", "disabled");
    rock.setAttribute("disabled", "disabled");
    lizard.setAttribute("disabled", "disabled");
    spock.setAttribute("disabled", "disabled");
}

function enableTokens() {
    scissors.removeAttribute("disabled");
    paper.removeAttribute("disabled");
    rock.removeAttribute("disabled");
    lizard.removeAttribute("disabled");
    spock.removeAttribute("disabled");
}

function userWins() {
    userScore++;
    localStorage.setItem('userScore', userScore);
    resultTitle.textContent = "YOU WIN";
    setTimeout(() => {
        userScoreCurrent.textContent = userScore;

        setTimeout(() => {
            result.classList.add("scale-in-hor-center");
            playAgainBtn.removeAttribute("disabled");

            setTimeout(() => {
                doConfetti();
                userCircles.setAttribute("data-win", true);
            }, 100);
        }, 300);
    }, 3000);
}

function userTies() {
    resultTitle.textContent = "IT'S A TIE!";
    setTimeout(() => {

        setTimeout(() => {
            result.classList.add("scale-in-hor-center");
            playAgainBtn.removeAttribute("disabled");
        }, 300);
    }, 3000);
}

function userLoses() {
    if (userScore === 0) {
        resultTitle.textContent = "YOU LOSE";
        setTimeout(() => {

            setTimeout(() => {
                result.classList.add("scale-in-hor-center");
                playAgainBtn.removeAttribute("disabled");

                setTimeout(() => {
                    computerCircles.setAttribute("data-win", true);
                }, 100)
            }, 300)
        }, 3000);
        return;
    }

    userScore--;
    localStorage.setItem('userScore', userScore);
    resultTitle.textContent = "YOU LOSE";
    setTimeout(() => {
        userScoreCurrent.textContent = userScore;
        setTimeout(() => {
            result.classList.add("scale-in-hor-center");
            playAgainBtn.removeAttribute("disabled");

            setTimeout(() => {
                computerCircles.setAttribute("data-win", true);
            }, 100)
        }, 300)
    }, 3000);
}

function choiceMade(choice, computerChoice) {
    disableTokens();
    gameboard.classList.add("slide-out-elliptic-left-bck");
    resultsBoard.classList.add("puff-in-center")

    const classChoice = event.target.className;
    const classChoiceComputer = computerChoice;

    fetch('gamePieces.json')
        .then(response => response.json())
        .then(data => {
            const gamePieces = data.gamePieces;
            const gamePieceUser = gamePieces.find(piece => piece.class === classChoice);
            const gamePieceComputer = gamePieces.find(piece => piece.name === classChoiceComputer);
            const imgUrlUser = gamePieceUser.image;
            const imgUrlComputer = gamePieceComputer.image;
            const pieceClassUser = gamePieceUser.class;
            const pieceClassComputer = gamePieceComputer.class;
            const altTextUser = gamePieceUser.alt;
            const altTextComputer = gamePieceComputer.alt;
            const ariaLabelUser = gamePieceUser.ariaLabel;
            const ariaLabelComputer = gamePieceComputer.ariaLabel;

            userTokenChoice.classList.add(pieceClassUser);
            userTokenChoice.setAttribute("aria-label", ariaLabelUser);
            userTokenChoiceImg.src = imgUrlUser;
            userTokenChoiceImg.alt = altTextUser;

            computerTokenChoice.classList.add(pieceClassComputer);
            computerTokenChoice.setAttribute("aria-label", ariaLabelComputer);
            computerTokenChoiceImg.src = imgUrlComputer;
            computerTokenChoiceImg.alt = altTextComputer;
        })
        
    setTimeout(() => {
        userTokenChoice.classList.add("scale-in-center");
        setTimeout(() => {
            computerTokenChoice.classList.add("scale-in-center");
        }, 300);
    }, 1700);
        
    if (choice === "win") {
        userWins();
    } else if (choice === "tie") {
        userTies();
    } else {
        userLoses();
    }
}

function gameFunction(userChoice) {
    const computerChoice = computerPlay();
    
    switch (userChoice + computerChoice) {
        case "scissorspaper":
        case "paperrock":
        case "rocklizard":
        case "lizardspock":
        case "spockscissors":
        case "scissorslizard":
        case "paperspock":
        case "rockscissors":
        case "lizardpaper":
        case "spockrock": {
            choiceMade("win", computerChoice);
        }
        break;
        case "scissorsscissors":
        case "paperpaper":
        case "rockrock":
        case "lizardlizard":
        case "spockspock": {
            choiceMade("tie", computerChoice);
        }
        break;
        default: {
            choiceMade("lose", computerChoice);
        }

    }
}

function main() {
    document.addEventListener("click", (tokenChoice) => {
        document.removeEventListener("click", main);
        switch (tokenChoice.target) {
            case scissors: {
                gameFunction("scissors");
            } break;
            case paper: {
                gameFunction("paper");
            } break;
            case rock: {
                gameFunction("rock");
            } break;
            case lizard: {
                gameFunction("lizard");
            } break;
            case spock: {
                gameFunction("spock");
            } break;  
        }
    })
}

main()

function populateScore() {
    document.addEventListener("DOMContentLoaded", () => {
        userScoreCurrent.textContent = userScore;
    })
}

populateScore()

function playAgain() {
    playAgainBtn.addEventListener("click", () => {
        resultsBoard.classList.replace("puff-in-center","slide-out-bck-center");

        setTimeout(() => {
            gameboard.classList.replace("slide-out-elliptic-left-bck","slide-in-elliptic-right-fwd")
            enableTokens();

            setTimeout(() => {
                result.classList.remove("scale-in-hor-center");
                playAgainBtn.setAttribute("disabled", "disabled");
 
                gameboard.classList.remove("slide-in-elliptic-right-fwd");
                resultsBoard.classList.remove("slide-out-bck-center");
 
                userTokenChoice.classList.remove("scale-in-center", "token-rock", "token-paper", "token-scissors", "token-lizard", "token-spock");
                userTokenChoice.removeAttribute("aria-label");
                userTokenChoiceImg.src = "placeholder.png";
                userTokenChoiceImg.alt = "Place holder until choices are made";
 
                computerTokenChoice.classList.remove("scale-in-center", "token-rock", "token-paper", "token-scissors", "token-lizard", "token-spock");
                computerTokenChoice.removeAttribute("aria-label");
                computerTokenChoiceImg.src = "placeholder.png";
                computerTokenChoiceImg.alt = "Place holder until choices are made";
 
                userCircles.setAttribute("data-win", false);
                computerCircles.setAttribute("data-win", false);
 
                resultTitle.textContent = "";
            }, 700);
        }, 700);
    });
}

playAgain();

let confirmReset = false;

function resetScore() {
    if (!confirmReset) {
        confirmReset = true;
        console.log("Are you sure?");
        userScoreCurrent.style.cursor = "pointer";
        return;
    }

    userScore = 0;
    localStorage.setItem('userScore', userScore);
    userScoreCurrent.textContent = userScore;
    userScoreCurrent.style.cursor = "text";
    console.log("Score reset!");
    console.log("Score: " + userScore);
    confirmReset = false;
}

userScoreCurrent.addEventListener("click", resetScore)