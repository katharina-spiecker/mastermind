

const boardsContainer = document.querySelector("#boardsContainer");
const gameBoard = document.querySelector("#gameBoard");
let colorOptions = document.querySelectorAll(".color-option");
const roundDisplay = document.getElementById("round-display");
const modal = document.getElementById("custom-modal");
const modalBackdrop = document.getElementById("custom-modal-backdrop");
const restartBtn = document.getElementById("restart-btn");
const undoBtn = document.getElementById("undo-btn");


let availableColors = [];
let secretCode;
let randomPositions;
let codeInput;
let guessAmount;
let fullCorrect;
let halfCorrect;
let round;

// todo: choose font: load serve font from repo
// todo: account for adding same color twice
// todo: reset individual move
// todo: all 4 have to be used

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
        let part1 = document.createElement("p");
        part1.innerHTML = "<b>Task:</b> Solve the secret color code. Crack the code with as few attempts as possible.";
        let part2 = document.createElement("p");
        part2.innerHTML = `<b>How:</b>The code consists of 4 different colors.
        Each color only occurs once. On the right side of the game board you see
        how many pins are on the correct spot. Correct spot and correct color = black. Wrong spot but corrent color = white. Click 'Check' to check your answer.`
        modal.appendChild(part1);
        modal.appendChild(part2);
        toggleDisplayMode(modalBackdrop);
    });
    document.getElementById("check-btn").addEventListener("click", checkMatches);
    modalBackdrop.addEventListener("click", () => {
        toggleDisplayMode(modalBackdrop);
    })
    undoBtn.addEventListener("click", undoLastMove);
    restartBtn.addEventListener("click", resetGame);
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
    clonedBoard.querySelector("#undo-btn").addEventListener("click", undoLastMove);
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
    checkWin();
}

function checkWin(){
    if (fullCorrect == 4) {
        let adjustedString = round == 1 ? "round" : "rounds";
        modal.innerText = `You cracked the code! You have made it in ${round} ${adjustedString}!`;
        toggleDisplayMode(modalBackdrop);
        resetGame();
    } else {
        round ++;
        updateRoundDisplay();
        insertBoard();
        resetInput();
    }
}

function updateRoundDisplay(){
    roundDisplay.innerText = round;
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

/**
 * Resets game.
 * Triggered on reset game button.
 */
function resetGame() {
    codeInput = [];
    guessAmount = 0;
    round = 0;
    updateRoundDisplay();
    secretCode = [];
    randomPositions = [];
    codeCreation();
    let prevGameBoards = boardsContainer.querySelectorAll("#gameBoard");
    insertBoard();
    prevGameBoards.forEach(board => {
        board.remove();
    });
}

/**
 * Reverts last move
 */
function undoLastMove(){
    codeInput.pop();
    let guesses = boardsContainer.lastElementChild.getElementsByClassName("guesses-dot");
    guesses[guessAmount-1].style.backgroundColor = "#fff";
    guessAmount --;
}