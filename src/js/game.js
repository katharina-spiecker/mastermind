import UI from "./ui";
import {generateRandomNumber} from "./helper";
import InputHandler from "./inputHandler";

export default class Game {

    constructor(){
        this.state = {
            guessAmount: 0,
            codeInput: [],
            secretCode: [],
            round: 1,
            colorOptions: null
        };
    }

    /**
     * Starts game.
     * @public
     */
    start(){
        this.state.colorOptions = document.querySelectorAll(".color-option");
        document.addEventListener("DOMContentLoaded", this._codeCreation);
        const inputHandler = new InputHandler(this.state);
        inputHandler.registerEventListeners();
        document.addEventListener("userWon", this._resetGame);
    }

    /**
     * Generates 4 non-repeating random numbers.
     * @private
     */
    _codeCreation() {
        let randomPositions = [];
        let randomNum;
        let availableColors = [];
        this.state.colorOptions.forEach(option => {
            this.state.availableColors.push("#" + option.dataset.color);
        })
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
     * @private
     */
    _resetGame() {
        const ui = new UI(this.state);
        this.state.codeInput = [];
        this.state.guessAmount = 0;
        this.state.round = 0;
        this.state.secretCode = [];
        this._codeCreation();
        let prevGameBoards = ui.boardsContainer.querySelectorAll("#gameBoard");
        ui.insertBoard();
        prevGameBoards.forEach(board => {
            ui.remove();
        });
    }
}