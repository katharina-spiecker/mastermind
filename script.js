const boardsContainer = document.querySelector("#boardsContainer");
const gameBoard = document.querySelector("#gameBoard");
const instructionContainer = document.getElementById("instructionContainer");
let colorOptions = document.querySelectorAll(".color-option");

const codeOptions = ["#FFA737","#A37774","#EEEBD0","#00A6ED","#FFF700","#000000"];
let secretCode;
let randomPositions;
let codeInput;
let guessAmount;
let fullCorrect;
let halfCorrect;

initValues();
registerEventListeners();

function initValues(){
    guessAmount = 0;
    secretCode = [];
    randomPositions = [];
    codeInput = [];
}

function registerEventListeners(){
    console.log("registerEventListeners called")
    document.addEventListener("DOMContentLoaded", codeCreation);
    colorOptions.forEach((option) => {
        option.addEventListener("click", fillColor);
    });
    document.querySelector(".choice-instruction").addEventListener("click", () => {
        toggleDisplayMode(instructionContainer)
    });
    document.getElementById("check-btn").addEventListener("click", checkMatches);
}

function toggleDisplayMode(node){
    if(node.classList.contains("d-none")){
        node.classList.remove("d-none")
    } else {
        node.classList.add("d-none")
    }
}

function resetColors(obj) {
    let statuses = obj.getElementsByClassName("status");
    let guesses = obj.getElementsByClassName("guesses-dot");
    //convert HTMLCollection into an array
    statuses = [...statuses];
    guesses = [...guesses];

    let removeStyle = function (arr) {
        arr.forEach(
            (val) => val.hasAttribute("style") && val.removeAttribute("style")
        ); 
    };
    removeStyle(statuses);
    removeStyle(guesses);
}

function insertBoard() {
    var clonedBoard = gameBoard.cloneNode(true); //true because all descendants of the node should be cloned as well
    resetColors(clonedBoard); //reset to original state
    boardsContainer.appendChild(clonedBoard);
}

// generate 4 non-repeating random numbers
function codeCreation() {
    console.log("codeCreation")
    let randomNum;
    for (let i = 0; i < 4; i++) {
        randomNum = generateRandomNumber();
        //while num already exists, generate new one since duplicates not allowed
        while (randomPositions.includes(randomNum)) {
            randomNum = generateRandomNumber();
        }
        randomPositions.push(randomNum);
        secretCode.push(codeOptions[randomNum]);
    }
    console.log(randomPositions)
    console.log(secretCode)
}

/**
 * Generates random number between 0-5
 */
function generateRandomNumber(){
    return Math.floor(Math.random() * 6);
}

/**
 * Changes background color of 4 guesses circles
 */
function fillColor(event) {
    console.log("fill color called");
    let color = "#" + event.target.dataset.color;

    if (guessAmount < 4) {
        let guesses = boardsContainer.lastElementChild.getElementsByClassName("guesses-dot");
        guesses[guessAmount].style.backgroundColor = color;
        codeInput.push(color);
        console.log(codeInput)
        guessAmount++;
    }
}

function checkMatches() {
    console.log("checkMatches called");
    fullCorrect = 0;
    halfCorrect = 0;
    // compare full first, if not: half
    for (i = 0; i < 4; i++) {
        if (codeInput[i] == secretCode[i]) {
            fullCorrect++;
        } else {
            // check if color is at another position
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
    console.log(`full correct: ${fullCorrect}, half correct: ${halfCorrect}`)
    displayAccuracy();
    checkWin();
}

/**
 * Colors the status dots according to accuracy of guesses
 */
function displayAccuracy() {
    console.log("displayAccuracy called")
    let currentBoard =  boardsContainer.lastElementChild;
    let statusButtons = currentBoard.querySelectorAll(".status");
    for(let i = 0; i < fullCorrect; i ++){
        statusButtons[i].style.backgroundColor = "black";
    }
    for(let i = fullCorrect; i < fullCorrect + halfCorrect; i ++){
        statusButtons[i].style.backgroundColor = "white";
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
        resetInput();
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
