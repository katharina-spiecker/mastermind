import UI from "./js/ui";
import ScoreChecker from "./js/scoreChecker";
import {generateRandomNumber} from "./js/helper";
import Input from "./js/input";

const boardsContainer = document.querySelector("#boardsContainer");
const colorOptions = document.querySelectorAll(".color-option");
const modal = document.getElementById("custom-modal");
const modalBackdrop = document.getElementById("custom-modal-backdrop");

const availableColors = [];
const ui = new UI();
const scoreChecker = new ScoreChecker();
const input = new Input();

const state = {
    guessAmount: 0,
    codeInput: [],
    secretCode: [],
    round: 1
};

export default class Game {

    start(){
        this.initValues();
        input.registerEventListeners();
    }

    initValues(){
        colorOptions.forEach(option => {
            availableColors.push("#" + option.dataset.color);
        })
    }

    /**
     * Generates 4 non-repeating random numbers.
     */
    codeCreation() {
        let randomPositions = [];
        let randomNum;
        for (let i = 0; i < 4; i++) {
            randomNum = generateRandomNumber();
            //while num already exists, generate new one since duplicates not allowed
            while (randomPositions.includes(randomNum)) {
                randomNum = generateRandomNumber();
            }
            randomPositions.push(randomNum);
            state.secretCode.push(availableColors[randomNum]);
        }
    }

    /**
     * Resets game. Triggered on reset game button.
     */
    resetGame() {
        state.codeInput = [];
        state.guessAmount = 0;
        state.round = 0;
        state.secretCode = [];
        codeCreation();
        let prevGameBoards = boardsContainer.querySelectorAll("#gameBoard");
        ui.insertBoard(boardsContainer, state, scoreChecker);
        prevGameBoards.forEach(board => {
            ui.remove();
        });
    }
}