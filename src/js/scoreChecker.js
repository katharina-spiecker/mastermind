import UI from './ui';

export default class ScoreChecker {
    
    constructor(state){
        this.fullCorrect = 0;
        this.halfCorrect = 0;
        this.ui = new UI();
        this.state = state;
    }

    /**
     * Checks if accuracy of guesses.
     * @public
     * @param {*} boardsContainer
     */
     checkMatches(boardsContainer) {
        // compare full first, if not: half
        for (let i = 0; i < 4; i++) {
            if (this.state.codeInput[i] == this.state.secretCode[i]) {
                this.fullCorrect++;
            } else {
                // check if color is at another position
                for (let j = i + 1; j < 4; j++) {
                    if (this.state.codeInput[i] == this.state.secretCode[j]) {
                        this.halfCorrect++;
                    }
                }
                for (let j = i - 1; j >= 0; j--) {
                    if (this.state.codeInput[i] == this.state.secretCode[j]) {
                        this.halfCorrect++;
                    }
                }
            }
        }
        this._displayAccuracy(boardsContainer);
        this._checkWin();
    }

    /**
     * Checks if player has won.
     * @private
     */
    _checkWin(){
        if (this.fullCorrect == 4) {
            let adjustedString = this.state.round == 1 ? "round" : "rounds";
            this.ui.modal.innerText = `You cracked the code! You have made it in ${this.state.round} ${adjustedString}!`;
            this.ui.toggleDisplayMode();
            const event = new Event('userWon');
            document.dispatchEvent(event);
        } else {
            this.state.round ++;
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
        this.state.codeInput = [];
        this.state.guessAmount = 0;
    }
}