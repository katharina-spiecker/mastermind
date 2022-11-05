import ScoreChecker from './scoreChecker';
import UI from './ui';

export default class InputHandler {

    constructor(state){
        this.restartBtn = document.getElementById("restart-btn");
        this.undoBtn = document.getElementById("undo-btn");
        this.state = state;
    }

    /**
     * @public
     */
    registerEventListeners(){
        const ui = new UI(this.state);
        const scoreChecker = new ScoreChecker(this.state);
        this.state.colorOptions.forEach((option) => {
            option.addEventListener("click", ui.fillColor);
        });
        document.querySelector(".choice-instruction").addEventListener("click", () => {
            let part1 = document.createElement("p");
            part1.innerHTML = "<b>Task:</b> Solve the secret color code. Crack the code with as few attempts as possible.";
            let part2 = document.createElement("p");
            part2.innerHTML = `<b>How:</b>The code consists of 4 different colors.
            Each color only occurs once. On the right side of the game board you see
            how many pins are on the correct spot. Correct spot and correct color = black. Wrong spot but corrent color = white. Click 'Check' to check your answer.`
            ui.modal.innerText = "";
            ui.modal.appendChild(part1);
            ui.modal.appendChild(part2);
            ui.toggleDisplayMode();
        });
        document.getElementById("check-btn").addEventListener("click", () => scoreChecker.checkMatches(ui.boardsContainer));
        ui.modalBackdrop.addEventListener("click", ui.closeModal);
        this.undoBtn.addEventListener("click", () => ui.undoLastMove());
        this.restartBtn.addEventListener("click", () => document.dispatchEvent(new Event('userWon')));
    }
}