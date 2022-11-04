import toggleDisplayMode from "./helper";
import UI from './ui';

export default class ScoreChecker {
    
    constructor(){
        this.fullCorrect = 0;
        this.halfCorrect = 0;
        this.ui = new UI();
    }

    /**
     * Checks if accuracy of guesses.
     * @public
     * @param {*} boardsContainer
     * @param {*} modal 
     * @param {*} modalBackdrop
     * @param {*} state 
     * @param {function} resetGame
     */
     checkMatches(boardsContainer, modal, modalBackdrop, state, resetGame) {
        // compare full first, if not: half
        for (let i = 0; i < 4; i++) {
            if (state.codeInput[i] == state.secretCode[i]) {
                this.fullCorrect++;
            } else {
                // check if color is at another position
                for (let j = i + 1; j < 4; j++) {
                    if (state.codeInput[i] == state.secretCode[j]) {
                        this.halfCorrect++;
                    }
                }
                for (let j = i - 1; j >= 0; j--) {
                    if (state.codeInput[i] == state.secretCode[j]) {
                        this.halfCorrect++;
                    }
                }
            }
        }
        this._displayAccuracy(boardsContainer);
        this._checkWin(modal, modalBackdrop, state, resetGame);
    }

    /**
     * Checks if player has won.
     * @private
     */
    _checkWin(modal, modalBackdrop, state, resetGame){
        if (this.fullCorrect == 4) {
            let adjustedString = state.round == 1 ? "round" : "rounds";
            modal.innerText = `You cracked the code! You have made it in ${state.round} ${adjustedString}!`;
            toggleDisplayMode(modalBackdrop);
            resetGame();
        } else {
            state.round ++;
            this.ui.insertBoard();
            this._resetInput();
        }
    }

    /**
     * Colors status dots according to accuracy of guesses.
     * @private
     */
    _displayAccuracy(boardsContainer) {
        let currentBoard =  boardsContainer.lastElementChild;
        let statusButtons = currentBoard.querySelectorAll(".status");
        for(let i = 0; i < this.fullCorrect; i ++){
            statusButtons[i].style.backgroundColor = "black";
        }
        for(let i = this.fullCorrect; i < this.fullCorrect + this.halfCorrect; i ++){
            statusButtons[i].style.backgroundColor = "white";
        }
    }

    /**
     * @private
     */
    _resetInput() {
        state.codeInput = [];
        state.guessAmount = 0;
    }
}