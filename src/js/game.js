import UI from "./js/ui";
import ScoreChecker from "./js/scoreChecker";
import {generateRandomNumber} from "./js/helper";
import InputHandler from "./js/inputHandler";

const boardsContainer = document.querySelector("#boardsContainer");
const colorOptions = document.querySelectorAll(".color-option");

const availableColors = [];

export default class Game {

    constructor(){
        this.state = {
            guessAmount: 0,
            codeInput: [],
            secretCode: [],
            round: 1
        };
    }


    start(){
        this.initValues();
        const inputHandler = new InputHandler(this.state);
        inputHandler.registerEventListeners();
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
            this.state.secretCode.push(availableColors[randomNum]);
        }
    }

    /**
     * Resets game. Triggered on reset game button.
     */
    resetGame() {
        const scoreChecker = new ScoreChecker(this.state);
        const ui = new UI(this.state);
        this.state.codeInput = [];
        this.state.guessAmount = 0;
        this.state.round = 0;
        this.state.secretCode = [];
        codeCreation();
        let prevGameBoards = boardsContainer.querySelectorAll("#gameBoard");
        ui.insertBoard(boardsContainer, this.state, scoreChecker);
        prevGameBoards.forEach(board => {
            ui.remove();
        });
    }
}