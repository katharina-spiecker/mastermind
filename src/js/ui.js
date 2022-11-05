import scoreChecker from './scoreChecker';

export default class UI {

    constructor(state){
        this.modal = document.getElementById("custom-modal");
        this.modalBackdrop = document.getElementById("custom-modal-backdrop");
        this.boardsContainer = document.querySelector("#boardsContainer");
        this.state = state;
        this.scoreChecker = new scoreChecker();
    }

    /**
     * Reverts last move.
     * @public
     */
    undoLastMove(){
        this.state.codeInput.pop();
        let guesses = this.boardsContainer.lastElementChild.getElementsByClassName("guesses-dot");
        guesses[this.state.guessAmount-1].style.backgroundColor = "#fff";
        this.state.guessAmount --;
    }

    /**
     * Inserts new gameboard.
     * @public
     */
    insertBoard() {
        const gameBoard = document.querySelector("#gameBoard");
        const clonedBoard = gameBoard.cloneNode(true); //true because all descendants of the node should be cloned as well
        this._resetColors(clonedBoard); //reset to original state
        this.boardsContainer.appendChild(clonedBoard);
        this.state.colorOptions = clonedBoard.querySelectorAll(".color-option");
        this.state.colorOptions.forEach((option) => {
            option.addEventListener("click", this.fillColor);
        });
        clonedBoard.querySelector("#check-btn").addEventListener("click", () => this.scoreChecker.checkMatches(this.boardsContainer));
        clonedBoard.querySelector("#undo-btn").addEventListener("click", () => this.undoLastMove());
    }

    /**
     * @private
     * @param {*} clonedBoard 
     */
    _resetColors(clonedBoard) {
        let statuses = clonedBoard.getElementsByClassName("status");
        let guesses = clonedBoard.getElementsByClassName("guesses-dot");
        //convert HTMLCollection into an array
        statuses = [...statuses];
        guesses = [...guesses];
    
        this._removeStyle(statuses);
        this._removeStyle(guesses);
    }

    /**
     * @private
     * @param {*} arr 
     */
    _removeStyle(arr){
        arr.forEach(
            (val) => val.hasAttribute("style") && val.removeAttribute("style")
        ); 
    }

    /**
     * Changes background color of 4 guesses circles.
     * @public
     * @param {*} event
     */
    fillColor(event) {
        let color = "#" + event.target.dataset.color;

        if (this.state.guessAmount < 4) {
            let guesses = this.boardsContainer.lastElementChild.getElementsByClassName("guesses-dot");
            guesses[this.state.guessAmount].style.backgroundColor = color;
            this.state.codeInput.push(color);
            this.state.guessAmount++;
        }
    }

    /**
     * Close modal.
     * @public
     * @param {*} e 
     */
    closeModal(e){
        if(e.target.id == "custom-modal-backdrop"){
            this.toggleDisplayMode();
        }
    }

    /**
     * @public
     */
    toggleDisplayMode(){
        let node = this.modalBackdrop;
        if(node.classList.contains("d-none")){
            node.classList.remove("d-none")
        } else {
            node.classList.add("d-none")
        }
    }

}