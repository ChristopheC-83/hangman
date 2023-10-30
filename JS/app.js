import { initialWords } from "./modules/wordsList.js";
import { getRandomNumber , reset , updateRecord, updateScore, updateTestLeft, testWin} from "./modules/basisFunctions.js";

const btnReset = document.querySelector(".reset");
const btnPropose = document.querySelector(".propose");
const letters = document.querySelectorAll(".letter");
const recordShow = document.querySelector(".record");
const word = document.querySelector(".word");
let testLeftText = 7;
let scoreText = 0;
let recordText;
let chosenLetter;
let chosenWord =
  initialWords[getRandomNumber(initialWords.length)].toUpperCase();
let wordInArray = chosenWord.split("");

// gestion record
function showRecord() {
  if (!localStorage.getItem("record")) {
    localStorage.setItem("record", 0);
    recordText = 0;
  } else {
    recordText = localStorage.getItem("record");
  }
  recordShow.textContent = recordText;
}

// controle lettre

function checkLetter(chosenLetter) {
  const letterElement = document.querySelector(`#${chosenLetter}`);

  if (
    letterElement.classList.contains("right") ||
    letterElement.classList.contains("wrong")
  ) {
    alert("Vous avez déjà joué cette lettre ");
    return;
  }
  wordInArray.forEach((letter, index) => {
    if (chosenLetter === letter) {
      letters_word[index].textContent = letter;
      scoreText += 1;
      updateScore(scoreText);
      letterElement.classList.add("right");
      setTimeout(() => {
        testWin(scoreText, wordInArray, recordText);
      }, 150);
    }
  });
  if (!letterElement.classList.contains("right")) {
    letterElement.classList.add("wrong");
    testLeftText -= 1;
    updateTestLeft(testLeftText);

    if (testLeftText === 0) {
      setTimeout(() => {
        updateRecord(scoreText,recordText)
        const tryAgain = confirm("Vous avez perdu !  recommencer ?");
        tryAgain ? reset() : alert("A bientôt");
      }, 150);
    }
  }
}

// choix lettre sur écran
letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    chosenLetter = letter.outerText;
    checkLetter(chosenLetter);
  });
});
// choix lettre sur clavier
document.addEventListener("keydown", (event) => {
  if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
    chosenLetter = event.key.toUpperCase();
    checkLetter(chosenLetter);
  }
});

// selection d'un mot de la liste et affichage
function showWord() {
  wordInArray.forEach((letter) => {
    let h2Element = document.createElement("h2");
    h2Element.className = "letter_word";
    h2Element.textContent = "_";
    word.appendChild(h2Element);
  });
}



updateScore(scoreText);
updateTestLeft(testLeftText);
showRecord();
showWord();

const letters_word = document.querySelectorAll(".letter_word");
