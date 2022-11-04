export default class UI {

    /**
     * Reverts last move.
     * @public
     */
    undoLastMove(boardsContainer, state){
        state.codeInput.pop();
        let guesses = boardsContainer.lastElementChild.getElementsByClassName("guesses-dot");
        guesses[state.guessAmount-1].style.backgroundColor = "#fff";
        state.guessAmount --;
    }

    /**
     * Inserts new gameboard.
     * @public
     * @param {*} boardsContainer
     * @param {*} state
     * @param {*} scoreChecker
     */
    insertBoard(boardsContainer, state, scoreChecker) {
        const gameBoard = document.querySelector("#gameBoard");
        const clonedBoard = gameBoard.cloneNode(true); //true because all descendants of the node should be cloned as well
        this._resetColors(clonedBoard); //reset to original state
        boardsContainer.appendChild(clonedBoard);
        colorOptions = clonedBoard.querySelectorAll(".color-option");
        colorOptions.forEach((option) => {
            option.addEventListener("click", (e) => this.fillColor(e, state, boardsContainer));
        });
        clonedBoard.querySelector("#check-btn").addEventListener("click", () => scoreChecker.checkMatches(boardsContainer, modal, modalBackdrop, state));
        clonedBoard.querySelector("#undo-btn").addEventListener("click", () => this.undoLastMove(boardsContainer, state));
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
     * @param {*} state
     * @param {*} boardsContainer
     */
    fillColor(event, state, boardsContainer) {
        let color = "#" + event.target.dataset.color;

        if (state.guessAmount < 4) {
            let guesses = boardsContainer.lastElementChild.getElementsByClassName("guesses-dot");
            guesses[state.guessAmount].style.backgroundColor = color;
            state.codeInput.push(color);
            state.guessAmount++;
        }
    }

    /**
     * Close modal.
     * @public
     * @param {*} e 
     */
    closeModal(e){
        if(e.target.id == "custom-modal-backdrop"){
            this.toggleDisplayMode(modalBackdrop);
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