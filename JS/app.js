import { initialWords } from "./modules/wordsList.js";
import {
  numberWord,
  reset,
  newWordToPlay,
  resetKey,
  updateRecord,
  updateScore,
  updateTestLeft,
  youLose,
} from "./modules/basisFunctions.js";

const btnReset = document.querySelector(".reset");
const btnPropose = document.querySelector(".propose");
const letters = document.querySelectorAll(".letter");
const recordShow = document.querySelector(".record");
const word = document.querySelector(".word");
let oldScore;
let testLeftText = 7;
let scoreText = sessionStorage.getItem("score")
  ? parseInt(sessionStorage.getItem("score"))
  : 0;
let recordText;
let chosenLetter;

let chosenWord = newWordToPlay();
console.log(chosenWord);
let wordInArray = chosenWord.split("");

let arrayWord = wordInArray;

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

      arrayWord = arrayWord.filter((elt) => elt !== letter);
      if (arrayWord.length === 0) {
        setTimeout(() => {
          testWin(scoreText, wordInArray, recordText);
        }, 150);
      }
    }
  });
  if (!letterElement.classList.contains("right")) {
    letterElement.classList.add("wrong");
    testLeftText -= 1;
    updateTestLeft(testLeftText);

    if (testLeftText === 0) {
      updateRecord(scoreText, recordText);
      showRecord();
      setTimeout(() => {
        youLose();
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

// si victoire
function testWin(scoreText, wordInArray, recordText) {
  updateRecord(scoreText, recordText);
  showRecord();
  youWin(scoreText);
}

function youWin(scoreText) {
  let score = scoreText;
  sessionStorage.setItem("score", score);
  setTimeout(() => {
    alert("c'est gagné !");
    reset();
  }, 150);
}

updateScore(scoreText);
updateTestLeft(testLeftText);
showRecord();
showWord();

const letters_word = document.querySelectorAll(".letter_word");
