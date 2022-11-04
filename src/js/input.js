import UI from './ui';

export default class Input {

    construct(){
        this.restartBtn = document.getElementById("restart-btn");
        this.undoBtn = document.getElementById("undo-btn");
        this.ui = new UI();
    }

    registerEventListeners(){
        document.addEventListener("DOMContentLoaded", codeCreation);
        colorOptions.forEach((option) => {
            option.addEventListener("click", (event) => ui.fillColor(event, state, boardsContainer));
        });
        document.querySelector(".choice-instruction").addEventListener("click", () => {
            let part1 = document.createElement("p");
            part1.innerHTML = "<b>Task:</b> Solve the secret color code. Crack the code with as few attempts as possible.";
            let part2 = document.createElement("p");
            part2.innerHTML = `<b>How:</b>The code consists of 4 different colors.
            Each color only occurs once. On the right side of the game board you see
            how many pins are on the correct spot. Correct spot and correct color = black. Wrong spot but corrent color = white. Click 'Check' to check your answer.`
            modal.innerText = "";
            modal.appendChild(part1);
            modal.appendChild(part2);
            this.ui.toggleDisplayMode(modalBackdrop);
        });
        document.getElementById("check-btn").addEventListener("click", () => scoreChecker.checkMatches(boardsContainer, modal, modalBackdrop, state, resetGame));
        modalBackdrop.addEventListener("click", this.ui.closeModal);
        this.undoBtn.addEventListener("click", () => ui.undoLastMove(boardsContainer, state));
        this.restartBtn.addEventListener("click", resetGame);
    }
}