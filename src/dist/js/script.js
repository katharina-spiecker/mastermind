

const boardsContainer = document.querySelector("#boardsContainer");
const gameBoard = document.querySelector("#gameBoard");
let colorOptions = document.querySelectorAll(".color-option");
const roundDisplay = document.getElementById("round-display");
const modal = document.getElementById("custom-modal");
const modalBackdrop = document.getElementById("custom-modal-backdrop");

let availableColors = [];
let secretCode;
let randomPositions;
let codeInput;
let guessAmount;
let fullCorrect;
let halfCorrect;
let round;

// split code into files
// todo: choose font: load serve font from repo
// todo: account for adding same color twice
// todo: reset game

initValues();
registerEventListeners();

function initValues(){
    console.log("init values")
    guessAmount = 0;
    secretCode = [];
    randomPositions = [];
    codeInput = [];
    round = 1;
    colorOptions.forEach(option => {
        availableColors.push("#" + option.dataset.color);
    })
    console.log(availableColors);
}

function registerEventListeners(){
    console.log("registerEventListeners called")
    document.addEventListener("DOMContentLoaded", codeCreation);
    colorOptions.forEach((option) => {
        option.addEventListener("click", fillColor);
    });
    document.querySelector(".choice-instruction").addEventListener("click", () => {
        let content = `There was a secret code generated and you have to solve it. The code consists of 4 different colors,
        with each color only occuring once. Crack the code with as few attempts as possible. On the right side of the game board you see
        how many pins are on the correct spot with the correct color, indicated by black, and how many pins have the correct color but
        are at the wrong spot, indicated by white. Click 'Check' to check your answer.`;
        
        modal.innerText = content;
        toggleDisplayMode(modalBackdrop);
    });
    document.getElementById("check-btn").addEventListener("click", checkMatches);
    modalBackdrop.addEventListener("click", () => {
        toggleDisplayMode(modalBackdrop);
    })
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

    removeStyle(statuses);
    removeStyle(guesses);
}

function removeStyle(arr){
    arr.forEach(
        (val) => val.hasAttribute("style") && val.removeAttribute("style")
    ); 
}

function insertBoard() {
    var clonedBoard = gameBoard.cloneNode(true); //true because all descendants of the node should be cloned as well
    resetColors(clonedBoard); //reset to original state
    boardsContainer.appendChild(clonedBoard);
    colorOptions = clonedBoard.querySelectorAll(".color-option");
    colorOptions.forEach((option) => {
        option.addEventListener("click", fillColor);
    });
    clonedBoard.querySelector("#check-btn").addEventListener("click", checkMatches);

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
        secretCode.push(availableColors[randomNum]);
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
    displayAccuracy();
    // check win
    if (fullCorrect == 4) {
        let adjustedString = round == 1 ? "round" : "rounds";
        modal.innerText = `You cracked the code! You have made it in ${round} ${adjustedString}!`;
        toggleDisplayMode(modalBackdrop);
    } else {
        round ++;
        roundDisplay.innerText = round;
        insertBoard();
        resetInput();
    }
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
