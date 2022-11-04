export default class UI {

    construct(state){
        this.modal = document.getElementById("custom-modal");
        this.modalBackdrop = document.getElementById("custom-modal-backdrop");
        this.state = state;
    }

    /**
     * Reverts last move.
     * @public
     */
    undoLastMove(boardsContainer){
        this.state.codeInput.pop();
        let guesses = boardsContainer.lastElementChild.getElementsByClassName("guesses-dot");
        guesses[this.state.guessAmount-1].style.backgroundColor = "#fff";
        this.state.guessAmount --;
    }

    /**
     * Inserts new gameboard.
     * @public
     * @param {*} boardsContainer
     * @param {*} scoreChecker
     */
    insertBoard(boardsContainer, scoreChecker) {
        const gameBoard = document.querySelector("#gameBoard");
        const clonedBoard = gameBoard.cloneNode(true); //true because all descendants of the node should be cloned as well
        this._resetColors(clonedBoard); //reset to original state
        boardsContainer.appendChild(clonedBoard);
        colorOptions = clonedBoard.querySelectorAll(".color-option");
        colorOptions.forEach((option) => {
            option.addEventListener("click", (e) => this.fillColor(e, boardsContainer));
        });
        clonedBoard.querySelector("#check-btn").addEventListener("click", () => scoreChecker.checkMatches(boardsContainer, this.modal, this.modalBackdrop));
        clonedBoard.querySelector("#undo-btn").addEventListener("click", () => this.undoLastMove(boardsContainer));
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
     * @param {*} boardsContainer
     */
    fillColor(event, boardsContainer) {
        let color = "#" + event.target.dataset.color;

        if (this.state.guessAmount < 4) {
            let guesses = boardsContainer.lastElementChild.getElementsByClassName("guesses-dot");
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
            this.toggleDisplayMode(this.modalBackdrop);
        }
    }

    /**
     * @public
     * @param {*} node 
     */
    toggleDisplayMode(node){
        if(node.classList.contains("d-none")){
            node.classList.remove("d-none")
        } else {
            node.classList.add("d-none")
        }
    }

}