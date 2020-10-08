// selectors
const boardsContainer = document.querySelector('#boardsContainer');
const gameBoard = document.querySelector('#gameBoard');

//global vars
var secretCode = [];
var randomPositions = [];
var codeInput = [];
var codeOptions = ["#FFA737", "#A37774", "#EEEBD0", "#00A6ED", "#FFF700", "#000000"];
var guessAmount = 0;
var fullCorrect = 0,
    halfCorrect = 0;

// event listeners
document.querySelector('.choice-instruction').addEventListener('click', printInstructions);

//foldale instructions
function printInstructions() {
    let instructionContainer = document.querySelector('#instructionContainer');
    if (!instructionContainer.hasChildNodes()) {
        const instructionText = document.createElement('p');
        instructionText.innerText = "There was a secret code generated and you have to solve it. The code consists of 4 different colors, with each color only occuring once. Crack the code with as few attempts as possible. On the right side of the game board you see how many pins are on the correct spot with the correct color, indicated by black, and how many pins have the correct color but are at the wrong spot, indicated by white. Click 'Check' to check your answer.";
        instructionContainer.appendChild(instructionText);
    } else if (instructionContainer.hasChildNodes()) {
        instructionContainer.removeChild(instructionContainer.childNodes[0]);
    }
}

function resetColors(obj) {
    let statuses = obj.getElementsByClassName("status");
    let guesses = obj.getElementsByClassName("guesses-dot");
    //convert HTMLCollection into an array
    statuses = [...statuses];
    guesses = [...guesses];

    let removeStyle = function(arr) {
        arr.forEach(val => val.hasAttribute("style") && val.removeAttribute("style"))
    }
    removeStyle(statuses)
    removeStyle(guesses)
}

function insertBoard() {
    var clonedBoard = gameBoard.cloneNode(true); //true because all descendants of the node should be cloned as well
    resetColors(clonedBoard); //reset to original state
    boardsContainer.appendChild(clonedBoard);
}

// generate 4 non repeating random numbers
function codeCreation() {
    let randomNum;
    for (let i = 0; i < 4; i++) {
        randomNum = Math.floor(Math.random() * 6); // random num btw 0-5
        while (randomPositions.includes(randomNum)) { //while num already exists, generate new one
            randomNum = Math.floor(Math.random() * 6);
        }
        randomPositions.push(randomNum);
        secretCode.push(codeOptions[randomNum]);
    }
}


// if color is pressed, change background color and add color to codeInput array

function fillColor(event) {
    //convert id name into the color
    let color = "#" + event.target.id.substring(5);

    if (guessAmount < 4) {
        boardsContainer.lastElementChild.getElementsByClassName("guesses-dot")[guessAmount].style.backgroundColor = color;
        codeInput.push(color);
        guessAmount++;
    }

}

function checkMatches() {

    fullCorrect = 0, halfCorrect = 0;
    // compare full first, if not: half
    for (i = 0; i < 4; i++) {
        if (codeInput[i] == secretCode[i]) {
            fullCorrect++;
        } else {
            for (let j = i + 1; j < 4; j++) {
                if (codeInput[i] == secretCode[j]) {
                    halfCorrect++;
                }
            }
            for (let j = i - 1; j >= 0; j--) {
                if (codeInput[i] == secretCode[j]) {
                    halfCorrect++;
                }
            }

        }
    }

    colorStatus();
    checkWin();

}

function colorStatus() {
    let statusIterator = 0;
    while (statusIterator < 4) {
        for (let fullI = 0; fullI < fullCorrect; fullI++) {
            boardsContainer.lastElementChild.getElementsByClassName("status")[statusIterator].style.backgroundColor = "black";
            statusIterator++;
        }
        for (let halfI = 0; halfI < halfCorrect; halfI++) {
            boardsContainer.lastElementChild.getElementsByClassName("status")[statusIterator].style.backgroundColor = "white";
            statusIterator++;
        }
        break;
    }
}

function checkWin() {
    if (fullCorrect == 4) {
        alert("Congratulations, you have won!");
        /*
        if(confirm("Do you want to play again?")) {
            resetGame();
        } else {
            alert("See you soon Mastermind")
        }
        */

    } else {
        insertBoard();
        resetInput();;
    }
}

function resetInput() {
    codeInput = [];
    guessAmount = 0;
}

// function resetGame() {
//     resetInput();
//     secretCode = [];
//     randomPositions = [];
//     codeCreation();
//     let gameboards = boardsContainer.querySelectorAll("#gameBoard");
//     insertBoard()
//     for(let i=0; i < gameboards.length-1; i++) {
//         boardsContainer.removeChild(boardsContainer.firstChild);
//     }
// }

// var fullCorrect = 0, halfCorrect = 0;