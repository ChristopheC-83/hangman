import { initialWords } from "./modules/wordsList.js";
import { newWordToPlay, updateTestLeft } from "./modules/basisFunctions.js";

import {
  updateRecord,
  showRecord,
  updateScore,
} from "./modules/scoreFunctions.js";

import { reset, drawingHangman } from "./modules/basisActions.js";
import { buyVowel, buyConsonant } from "./modules/btnBuy.js";

const badWord = document.querySelector(".badWord");
const btnBuyVowel = document.querySelector("#buy_vowel");
const btnBuyConsonant = document.querySelector("#buy_consonant");
const btnPropose = document.querySelector(".propose");
const btnReset = document.querySelector(".reset");
const cancel = document.querySelector(".cancel");
const defeat = document.querySelector(".defeat");
const formSuggestedWord = document.querySelector("#formSuggestedWord");
const letters = document.querySelectorAll(".letter");
const nextWord = document.querySelectorAll(".nextWord");
const btnCloseModal = document.querySelectorAll(".closeModal");
const overlay = document.querySelector(".overlay");
const sameLetter = document.querySelector(".sameLetter");
const suggestWord = document.querySelector(".suggestWord");
const suggestedWord = document.querySelector("#suggestedWord");
const unknowWord = document.querySelector(".unknowWord");
const victory = document.querySelector(".victory");
const word = document.querySelector(".word");
let activeKeyboard = true;
let isFormSubmitted = false;
let testMax = 7;
let testLeftText = testMax;
let scoreText = sessionStorage.getItem("score")
  ? parseInt(sessionStorage.getItem("score"))
  : 0;
let recordText = localStorage.getItem("record")
? parseInt(localStorage.getItem("record"))
: 0;;
let chosenLetter;
let chosenWord = newWordToPlay();
let wordInArray = chosenWord.split("");
let arrayWord = wordInArray; //  me permettra de selectionner une lettre à acheter

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
  if (!activeKeyboard) {
    return;
  }
  activateKeyboard = false;
  setTimeout(() => {
    activeKeyboard = true;
  }, 200);
  if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
    chosenLetter = event.key.toUpperCase();
    checkLetter(chosenLetter);
    activeKeyboard = false;
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

// pour fermer une modale sans reset
function addDnone(elt) {
  if (elt) {
    elt.classList.add("dnone");
  }
}

// gestion modale clavier ou souris
function closeModal(elt) {
  if (btnCloseModal) {
    btnCloseModal.forEach((btn) => {
      btn.addEventListener("click", () => {
        addDnone(elt);
        addDnone(overlay);
      });
    });
    document.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        addDnone(elt);
        addDnone(overlay);
      }
    });
  }
}

// perte 1 point mauvaise lettre ou proposition
function oneLostPoint() {
  testLeftText -= 1;
  updateTestLeft(testLeftText, testMax);
  drawingHangman(testLeftText, testMax);

  if (testLeftText === 0) {
    console.log("s : " + scoreText);
    console.log("r : " + recordText);
    updateRecord(scoreText, recordText);
    showRecord(localStorage.getItem("record"));
    console.log("s : " + scoreText);
    console.log("r : " + recordText);
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
    console.log("arrayWord : " + arrayWord); //#################### à effacer à terme
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
    sameLetter.classList.remove("dnone");
    setTimeout(() => {
      closeModal(sameLetter);
    }, 500);
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
  showRecord(localStorage.getItem("record"));
  endParty(scoreText, victory);
}

function endParty(scoreText, end) {
  deactivateKeyboard();
  sessionStorage.setItem("score", scoreText);
  end.classList.remove("dnone");
  end.classList.add("modalAnimation");
  overlay.classList.remove("dnone");
  setTimeout(() => {
    modalsGestion();
  }, 250);
}

// action sur btn reset
btnReset.addEventListener("click", () => {
  sessionStorage.removeItem("score");
  updateRecord(scoreText, recordText);
  showRecord(localStorage.getItem("record"));
  setTimeout(() => {
    reset();
  }, 1000);
});

// achats joker
btnBuyVowel.addEventListener("click", () => {
  buyVowel(arrayWord);
});
btnBuyConsonant.addEventListener("click", () => {
  buyConsonant(arrayWord);
});

// action sur btn proposition mot
btnPropose.addEventListener("click", () => {
  overlay.classList.remove("dnone");
  suggestWord.classList.remove("dnone");
  deactivateKeyboard();
  suggestedWord.focus();
  submitSuggestedWord();
});

// fonction soumission formulaire
function submitSuggestedWord() {
  closeSuggestedWord();
  if (isFormSubmitted) {
    //empeche le cumul des appels à la fonction
    return;
  } else {
    formSuggestedWord.addEventListener("submit", (event) => {
      event.preventDefault();
      isFormSubmitted = true;
      let proposedWord = suggestedWord.value;
      if (proposedWord.toUpperCase() === chosenWord.toUpperCase()) {
        let newScore = parseInt(wordInArray.length) + parseInt(sessionStorage.getItem('score'))
        testWin(newScore, recordText);
      } else {
        badWord.classList.remove("dnone");
        setTimeout(() => {
          closeModal(badWord);
        }, 500);
        oneLostPoint();
      }
      suggestedWord.value = "";
      suggestWord.classList.add("dnone");
      activateKeyboard();
    });
  }
}
// fermer la fenetre de suggestion
function closeSuggestedWord() {
  cancel.addEventListener("click", () => {
    suggestWord.classList.add("dnone");
    overlay.classList.add("dnone");
  });
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
  showRecord(localStorage.getItem("record"));
  showWord();
  console.log("arrayWord : " + arrayWord); //#################### à effacer à terme
}

startGame();
const letters_word = document.querySelectorAll(".letter_word");

console.log("s : " + scoreText);
console.log("r : " + recordText);
