(()=>{"use strict";class t{constructor(t){this.fullCorrect=0,this.halfCorrect=0,this.state=t}checkMatches(t){for(let t=0;t<4;t++)if(this.state.codeInput[t]==this.state.secretCode[t])this.fullCorrect++;else{for(let e=t+1;e<4;e++)this.state.codeInput[t]==this.state.secretCode[e]&&this.halfCorrect++;for(let e=t-1;e>=0;e--)this.state.codeInput[t]==this.state.secretCode[e]&&this.halfCorrect++}this._displayAccuracy(t),this._checkWin()}_checkWin(){const t=new e(this.state);if(4==this.fullCorrect){let e=1==this.state.round?"round":"rounds";t.modal.innerText=`You cracked the code! You have made it in ${this.state.round} ${e}!`,t.toggleDisplayMode();const s=new Event("userWon");document.dispatchEvent(s)}else this.state.round++,t.insertBoard(),this._resetInput()}_displayAccuracy(t){let e=t.lastElementChild.querySelectorAll(".status");for(let t=0;t<this.fullCorrect;t++)e[t].style.backgroundColor="black";for(let t=this.fullCorrect;t<this.fullCorrect+this.halfCorrect;t++)e[t].style.backgroundColor="white"}_resetInput(){this.state.codeInput=[],this.state.guessAmount=0}}class e{constructor(t){this.modal=document.getElementById("custom-modal"),this.modalBackdrop=document.getElementById("custom-modal-backdrop"),this.boardsContainer=document.querySelector("#boardsContainer"),this.state=t,self=this}undoLastMove(){this.state.codeInput.pop(),this.boardsContainer.lastElementChild.getElementsByClassName("guesses-dot")[this.state.guessAmount-1].style.backgroundColor="#fff",this.state.guessAmount--}insertBoard(){const e=new t(this.state),s=document.querySelector("#gameBoard").cloneNode(!0);this._resetColors(s),this.boardsContainer.appendChild(s),this.state.colorOptions=s.querySelectorAll(".color-option"),this.state.colorOptions.forEach((t=>t.addEventListener("click",this.fillColor.bind(this)))),s.querySelector("#check-btn").addEventListener("click",(()=>e.checkMatches(this.boardsContainer))),s.querySelector("#undo-btn").addEventListener("click",(()=>this.undoLastMove()))}_resetColors(t){let e=t.getElementsByClassName("status"),s=t.getElementsByClassName("guesses-dot");e=[...e],s=[...s],this._removeStyle(e),this._removeStyle(s)}_removeStyle(t){t.forEach((t=>t.hasAttribute("style")&&t.removeAttribute("style")))}fillColor(t){let e="#"+t.target.dataset.color;self.state.guessAmount<4&&(self.boardsContainer.lastElementChild.getElementsByClassName("guesses-dot")[self.state.guessAmount].style.backgroundColor=e,self.state.codeInput.push(e),self.state.guessAmount++)}closeModal(t){"custom-modal-backdrop"==t.target.id&&self.toggleDisplayMode()}toggleDisplayMode(){let t=this.modalBackdrop;t.classList.contains("d-none")?t.classList.remove("d-none"):t.classList.add("d-none")}}function s(){return Math.floor(6*Math.random())}class o{constructor(t){this.restartBtn=document.getElementById("restart-btn"),this.undoBtn=document.getElementById("undo-btn"),this.state=t}registerEventListeners(){const s=new e(this.state),o=new t(this.state);this.state.colorOptions.forEach((t=>{t.addEventListener("click",s.fillColor)})),document.querySelector(".choice-instruction").addEventListener("click",(()=>{let t=document.createElement("p");t.innerHTML="<b>Task:</b> Solve the secret color code. Crack the code with as few attempts as possible.";let e=document.createElement("p");e.innerHTML="<b>How:</b>The code consists of 4 different colors.\n            Each color only occurs once. On the right side of the game board you see\n            how many pins are on the correct spot. Correct spot and correct color = black. Wrong spot but corrent color = white. Click 'Check' to check your answer.",s.modal.innerText="",s.modal.appendChild(t),s.modal.appendChild(e),s.toggleDisplayMode()})),document.getElementById("check-btn").addEventListener("click",(()=>o.checkMatches(s.boardsContainer))),s.modalBackdrop.addEventListener("click",s.closeModal),this.undoBtn.addEventListener("click",(()=>s.undoLastMove())),this.restartBtn.addEventListener("click",(()=>document.dispatchEvent(new Event("userWon"))))}}(new class{constructor(){this.state={guessAmount:0,codeInput:[],secretCode:[],round:1,colorOptions:null}}start(){this.state.colorOptions=document.querySelectorAll(".color-option"),document.addEventListener("DOMContentLoaded",this._codeCreation.bind(this)),new o(this.state).registerEventListeners(),document.addEventListener("userWon",this._resetGame.bind(this))}_codeCreation(){let t,e=[],o=[];this.state.colorOptions.forEach((t=>{o.push("#"+t.dataset.color)}));for(let r=0;r<4;r++){for(t=s();e.includes(t);)t=s();e.push(t),this.state.secretCode.push(o[t])}}_resetGame(){const t=new e(this.state);this.state.codeInput=[],this.state.guessAmount=0,this.state.round=0,this.state.secretCode=[],this._codeCreation();let s=t.boardsContainer.querySelectorAll("#gameBoard");t.insertBoard(),s.forEach((t=>{t.remove()}))}}).start()})();