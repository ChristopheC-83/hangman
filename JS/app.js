import { initialWords } from "./modules/wordsList.js";
import {
  newWordToPlay,
  updateRecord,
  updateScore,
  updateTestLeft,
} from "./modules/basisFunctions.js";

import { reset } from "./modules/basisActions.js";

const btnReset = document.querySelector(".reset");
const btnPropose = document.querySelector(".propose");
const letters = document.querySelectorAll(".letter");
const recordShow = document.querySelector(".record");
const word = document.querySelector(".word");
const imgHangman = document.querySelectorAll(".imgHangman");
const overlay = document.querySelector(".overlay");
const overlay2 = document.querySelector(".overlay2");
const victory = document.querySelector(".victory");
const defeat = document.querySelector(".defeat");
const unknowWord = document.querySelector(".unknowWord");
const nextWord = document.querySelectorAll(".nextWord");
let testMax = 7;
let testLeftText = testMax;
let scoreText = sessionStorage.getItem("score")
  ? parseInt(sessionStorage.getItem("score"))
  : 0;
let recordText;
let chosenLetter;
let chosenWord = newWordToPlay();
let wordInArray = chosenWord.split("");
let arrayWord = wordInArray; //  me permettra de selctionner une lettre à acheter

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

function drawingHangman(testLeftText) {
  let numberImg = 0;
  numberImg = testMax - testLeftText;
  console.log(numberImg);
  imgHangman[numberImg].classList.remove("dnone");
  if (numberImg === 7) {
    imgHangman[4].classList.add("dnone");
    imgHangman[5].classList.add("dnone");
    imgHangman[6].classList.add("dnone");
  }
}

// you lose
function youLose() {
  sessionStorage.removeItem("score");
  updateScore(0);
  unknowWord.textContent = sessionStorage.getItem("motADeviner")
  document.querySelector('.letters').classList.add('dnone')
  defeat.classList.remove("dnone");
  defeat.classList.add("modalAnimation");
  overlay2.classList.remove("dnone");
}

// gestion modale clavier ou souris
function modalsGestion(event){
  if (event) {
    nextWord[
      event==='defeat'?1:0
    ].addEventListener("click", () => {
      reset();
    });
  }
  if(event){
    document.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        reset();
      }
    });
  }

}

// perte 1 point mauvaise lettre ou proposition
function oneLostPoint() {
  testLeftText -= 1;
  updateTestLeft(testLeftText, testMax);
  drawingHangman(testLeftText);

  if (testLeftText === 0) {
    updateRecord(scoreText, recordText);
    showRecord();
    setTimeout(() => {
      youLose();
      sessionStorage.removeItem("score");
      scoreText = 0;
      updateScore(0);
    }, 150);
  }
}

//bonne lettre selectionnée
function goodLetter(letterElement) {
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
    console.log("arrayWord : " + arrayWord);
  });
}

//  mauvaise lettre selectionnée
function badLetter(letterElement) {
  if (!letterElement.classList.contains("right")) {
    letterElement.classList.add("wrong");
    oneLostPoint();
  }
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
  goodLetter(letterElement);
  badLetter(letterElement);
}

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
function testWin(scoreText, recordText) {
  updateRecord(scoreText, recordText);
  showRecord();
  youWin(scoreText);
}

// si victoire, gestion affichage
function youWin(scoreText) {
  let score = scoreText;
  sessionStorage.setItem("score", score);
  victory.classList.remove("dnone");
  victory.classList.add("modalAnimation");
  overlay.classList.remove("dnone");
}

// action sur btn reset
btnReset.addEventListener("click", () => {
  sessionStorage.removeItem("score");
  updateRecord(scoreText, recordText);
  showRecord();
  setTimeout(() => {
    reset();
  }, 1000);
});

// action sur btn proposition mot
btnPropose.addEventListener("click", () => {
  let proposedWord = prompt("Vous pensez à quel mot ?");
  if (proposedWord.toUpperCase() === chosenWord.toUpperCase()) {
    testWin(wordInArray.length, recordText);
  } else {
    oneLostPoint();
  }
});

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

// lancement initial du jeu
updateScore(scoreText);
updateTestLeft(testLeftText, testMax);
showRecord();
showWord();
modalsGestion(defeat)
modalsGestion(victory)

console.log("arrayWord : " + arrayWord); //#################### à effacer à terme
const letters_word = document.querySelectorAll(".letter_word");
