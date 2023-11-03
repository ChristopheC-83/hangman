
import { newWordToPlay, updateTestLeft } from "./modules/basisFunctions.js";

import {
  updateRecord,
  showRecord,
  updateScore,
  createScoreIfNull,
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
const label = document.querySelector("#label");
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
let activeKeyboard = true;    // acive ou désactive le clavier physique vis à vis des modales                              
let isFormSubmitted = false;  // permet de ne pas lancer "proposer mot" plusieurs fois et perdre plusieurs points
let testMax = 7;              // à modifier... mais attention les images ... à adapter en fonction    
let testLeftText = testMax;   // nb de coup restant
let scoreText = createScoreIfNull()
let recordText = localStorage.getItem("record")   //record mis en mémoire à chaque fin de manche
  ? parseInt(localStorage.getItem("record"))
  : 0;
let chosenLetter;                          // lettre choisie à l'écran ou sur clavier physique
let chosenWord = newWordToPlay();         // mot à deviner
let wordInArray = chosenWord.split("");  // mot à deviner découpé dans un tableau
let leftLetters = wordInArray;            // lettre restant à découvrir. Utile pour les achat de voyelles et consonnes

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
  activeKeyboard = false;
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
        resetAfterCloseModal(elt)
      });
    });
    document.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        resetAfterCloseModal(elt)
      }
    });
  }
}
// action après fermeture modale par clavier ou souris
function resetAfterCloseModal(elt){
  addDnone(elt);
  addDnone(overlay);
  activeKeyboard = true;
  activateKeyboard();
  if(elt===badWord){
    oneLostPoint()
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

      leftLetters = leftLetters.filter((elt) => elt !== letter);
      if (leftLetters.length === 0) {
        updateRecord(scoreText, recordText)
        setTimeout(() => {
        testWin(scoreText, wordInArray, recordText);
          
        }, 150);
      }
    }
    console.log("leftLetters : " + leftLetters); //#################### à effacer à terme
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
    overlay.classList.remove("dnone");
    activeKeyboard = false;
    deactivateKeyboard(),
      setTimeout(() => {
        closeModal(sameLetter);
      }, 500);
  } else {
    goodLetter(letterElement);
    badLetter(letterElement);
  }
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
  buyVowel(leftLetters);
});
btnBuyConsonant.addEventListener("click", () => {
  buyConsonant(leftLetters);
});

// action sur btn proposition mot
btnPropose.addEventListener("click", () => {
  overlay.classList.remove("dnone");
  suggestWord.classList.remove("dnone");
  deactivateKeyboard();
  activeKeyboard = false; 
  suggestedWord.focus();
  submitSuggestedWord();
});

// fonction soumission formulaire
function submitSuggestedWord() {
  console.log("submitSuggestedWord en cours");
  closeSuggestedWord();
  if (isFormSubmitted) {
    isFormSubmitted = true; //empeche le cumul des appels à la fonction
    return;
  } else {
    formSuggestedWord.addEventListener("submit", (event) => {
      event.preventDefault();
      isFormSubmitted = true;
      let proposedWord = suggestedWord.value;
      if(proposedWord===""){
        let textInitial = label.innerText
        label.innerText = "C'est vide ! Propose une mot ! 😅"
        setTimeout(() => {
          label.innerText =textInitial
        }, 3000);
        return
      }
      if (proposedWord.toUpperCase() === chosenWord.toUpperCase()) {
        let oldScore = createScoreIfNull()
        let newScore =
          parseInt(wordInArray.length) +
          parseInt(oldScore);
        testWin(newScore, recordText);
      } else {
        badWord.classList.remove("dnone");
        console.log("ici ?")
        setTimeout(() => {
          closeModal(badWord);
        }, 500);
        // oneLostPoint();
      }
      suggestedWord.value = "";
      suggestWord.classList.add("dnone");
      activateKeyboard();
      isFormSubmitted = false;
      return;
    });
  }
  
  isFormSubmitted = true;
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
  console.log("leftLetters : " + leftLetters); //#################### à effacer à terme
}

startGame();
const letters_word = document.querySelectorAll(".letter_word");

