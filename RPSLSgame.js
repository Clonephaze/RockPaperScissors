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

function computerPlay() {
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}

function userWins() {
    userScore++;
    localStorage.setItem('userScore', userScore);
    setTimeout(() => {
        userScoreCurrent.textContent = userScore;
        resultTitle.textContent = "YOU WIN";

        setTimeout(() => {
            result.classList.add("scale-in-hor-center");

            setTimeout(() => {
                userCircles.setAttribute("data-win", true);
            }, 100);
        }, 300);
    }, 3000);
    console.log("You win!");
}

function userTies() {
    setTimeout(() => {
        resultTitle.textContent = "IT'S A TIE!";

        setTimeout(() => {
            result.classList.add("scale-in-hor-center");
        }, 300);
    }, 3000);
    console.log("It's a tie!");
}

function userLoses() {
    if (userScore === 0) {
        setTimeout(() => {
            resultTitle.textContent = "YOU LOSE";

            setTimeout(() => {
                result.classList.add("scale-in-hor-center");

                setTimeout(() => {
                    computerCircles.setAttribute("data-win", true);
                }, 100)
            }, 300)
        }, 3000);
        console.log("You lose! Score unchanged.");
        return;
    }

    userScore--;
    localStorage.setItem('userScore', userScore);
    setTimeout(() => {
        userScoreCurrent.textContent = userScore;
        resultTitle.textContent = "YOU LOSE";
        setTimeout(() => {
            result.classList.add("scale-in-hor-center");

            setTimeout(() => {
                computerCircles.setAttribute("data-win", true);
            }, 100)
        }, 300)
    }, 3000);
    
    
    console.log("You lose!");
}

function choiceMade(choice, computerChoice) {
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
            console.log(`You chose ${userChoice} and the computer chose ${computerChoice}`);
            choiceMade("win", computerChoice);
        }
        break;
        case "scissorsscissors":
        case "paperpaper":
        case "rockrock":
        case "lizardlizard":
        case "spockspock": {
            console.log(`You and the computer both chose ${userChoice}`);
            choiceMade("tie", computerChoice);
        }
        break;
        default: {
            console.log(`You chose ${userChoice} and the computer chose ${computerChoice}`);
            choiceMade("lose", computerChoice);
        }

    }
}

function main() {
    document.addEventListener("click", (tokenChoice) => {
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

            onanimationend = () => {
                location.reload();
            }
        }, 710);
    })
}

playAgain()

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