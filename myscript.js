// selectors
const instructions = document.querySelector('.choice-instruction');
const instructionContainer = document.querySelector('.instruction-container');
const boardsContainer = document.querySelector('#boardsContainer');
const gameBoard = document.querySelector('#gameBoard');

// event listeners
instructions.addEventListener('click', printInstructions);

//foldale instructions

function printInstructions(event) {
    event.preventDefault();
    if (document.getElementsByClassName("instruction-text").length === 0) {
        const instructionDiv = document.createElement('div');
        instructionDiv.classList.add('instruction');
        const instructionText = document.createElement('p');
        instructionText.classList.add('instruction-text');
        instructionText.innerText = "There was a secret code generated and you have to solve it. The code consists of 4 different colors, with each color only occuring once. Crack the code with as few attempts as possible. On the right side of the game board you see how many pins are on the correct spot with the correct color, indicated by black, and how many pins have the correct color but are at the wrong spot, indicated by white. Click 'Check' to check your answer.";
        instructionDiv.appendChild(instructionText);
        instructionContainer.appendChild(instructionDiv);
    }
    else if (document.getElementsByClassName("instruction-text").length == 1) {
        instructionContainer.removeChild(document.getElementsByClassName("instruction")[0]);
    }

}

//make board white

function resetColors(obj) {
    //reset status circles
    let statuses = obj.getElementsByClassName("status");
    for (let i = 0; i < 4; i++) {
        if (statuses[i].hasAttribute("style")) {
            statuses[i].removeAttribute("style")
        }
    }
    //reset guess circles
    let guesses = obj.getElementsByClassName("guesses-dot");
    for (let i = 0; i < 4; i++) {
        if (guesses[i].hasAttribute("style")) {
            guesses[i].removeAttribute("style")
        }
    }
}

function insertBoard() {
    //true because all descendants of the node should be cloned as well
    var clonedBoard = gameBoard.cloneNode(true);
    //reset to orinigal state
    resetColors(clonedBoard);
    boardsContainer.appendChild(clonedBoard);
}

var secretCode = [];
var randomPositions = [];
var codeInput = [];
var codeOptions = ["#FFA737", "#A37774", "#EEEBD0", "#00A6ED", "#FFF700", "#000000"];
var guessAmount = 0;
var fullCorrect = 0, halfCorrect = 0;


// generate 4 non repeating random number
function codeCreation() {
    let randomNum;
    for (let i = 0; i < 4; i++) {
        // random num btw 0-5
        randomNum = Math.floor(Math.random() * 6);
        while (randomPositions.includes(randomNum)) {
            //while num already exists, generate new one
            randomNum = Math.floor(Math.random() * 6);
        }
        randomPositions.push(randomNum);
        secretCode.push(codeOptions[randomNum]);
    }
    console.log(secretCode)
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
        } for (let halfI = 0; halfI < halfCorrect; halfI++) {
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




