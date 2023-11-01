import { initialWords } from "./modules/wordsList.js";
import {
  newWordToPlay,
  updateRecord,
  updateScore,
  updateTestLeft,
} from "./modules/basisFunctions.js";

import { reset } from "./modules/basisActions.js";

const btnPropose = document.querySelector(".propose");
const btnReset = document.querySelector(".reset");
const btnSuggestedWord = document.querySelector("#btnSuggestedWord");
const defeat = document.querySelector(".defeat");
const formSuggestedWord = document.querySelector("#formSuggestedWord");
const imgHangman = document.querySelectorAll(".imgHangman");
const letters = document.querySelectorAll(".letter");
const recordShow = document.querySelector(".record");
const nextWord = document.querySelectorAll(".nextWord");
const overlay = document.querySelector(".overlay");
const overlay2 = document.querySelector(".overlay2");
const suggestWord = document.querySelector(".suggestWord");
const suggestedWord = document.querySelector("#suggestedWord");
const unknowWord = document.querySelector(".unknowWord");
const victory = document.querySelector(".victory");
const word = document.querySelector(".word");
let isFormSubmitted = false;
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
console.log(nextWord);
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
// dessin du pendu
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
// Créez une fonction pour activer l'écoute des événements clavier
function activateKeyboard() {
  document.addEventListener("keydown", keydownHandler);
}

// Créez une fonction pour désactiver l'écoute des événements clavier
function deactivateKeyboard() {
  document.removeEventListener("keydown", keydownHandler);
}

// Ajoutez un gestionnaire d'événements pour les événements clavier
const keydownHandler = (event) => {
  if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
    chosenLetter = event.key.toUpperCase();
    checkLetter(chosenLetter);
  }
};

// gestion modale clavier ou souris
function modalsGestion() {
  if (nextWord) {
    nextWord.forEach((btn) => {
      btn.addEventListener("click", () => {
        reset();
      });
    });

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
      endParty(0, defeat);
      unknowWord.textContent = sessionStorage.getItem("motADeviner");
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
  activateKeyboard();
}

// si victoire
function testWin(scoreText, recordText) {
  updateRecord(scoreText, recordText);
  showRecord();
  endParty(scoreText, victory);
}

function endParty(scoreText, end) {
  deactivateKeyboard();
  sessionStorage.setItem("score", scoreText);
  end.classList.remove("dnone");
  end.classList.add("modalAnimation");
  overlay.classList.remove("dnone");
  modalsGestion();
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
  suggestWord.classList.remove("dnone");
  deactivateKeyboard();
  suggestedWord.focus();
  submitSuggestedWord();
});
// fonction soumission formulaire
function submitSuggestedWord() {
  if (isFormSubmitted) {
    //empeche le cumul des appels à la fonction
    return;
  } else {
    formSuggestedWord.addEventListener("submit", (event) => {
      event.preventDefault();
      isFormSubmitted = true;
      let proposedWord = suggestedWord.value;
      if (proposedWord.toUpperCase() === chosenWord.toUpperCase()) {
        testWin(wordInArray.length, recordText);
      } else {
        alert("non, ce n'est pas le mot " + proposedWord + " !");
        oneLostPoint();
      }
      suggestedWord.value = "";
      suggestWord.classList.add("dnone");
      activateKeyboard();
    });
  }
}

// choix lettre sur écran
letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    chosenLetter = letter.outerText;
    checkLetter(chosenLetter);
  });
});

// lancement initial du jeu
function startGame() {
  updateScore(scoreText);
  updateTestLeft(testLeftText, testMax);
  showRecord();
  showWord();
  console.log("arrayWord : " + arrayWord); //#################### à effacer à terme
}

startGame();
const letters_word = document.querySelectorAll(".letter_word");
