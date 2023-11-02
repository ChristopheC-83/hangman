import { getRandomNumber } from "./basisFunctions.js";

const vowelsList = ["A", "E", "I", "O", "U", "Y"];
const ht_left = document.querySelector("#ht_left");
let randomIndex;
let proposedLetter;
let searchedLetters;
let nbHT = sessionStorage.getItem("nbHT") ? sessionStorage.getItem("nbHT") : 50; //#################################### remettre 5
ht_left.textContent = nbHT;

// initialisation des Hangman_Token
function sendNbHT() {
  if (sessionStorage.getItem("nbHT") === null) {
    sessionStorage.setItem("nbHT", 50); //#################################### remettre 5
  }
}
sendNbHT();
console.log(nbHT); //####################### à effacer

export function buyVowel(arrayWord) {
  if (nbHT > 0) {
    searchedLetters = arrayWord.filter((element) =>
      vowelsList.includes(element)
    );
    if (searchedLetters.length !== 0) {
      suggestLetter_updateNbHT(1);
    } else {
      alert("Le mot ne contient pas plus de voyelles");
    }
  } else {
    alert("Vous n'avez plus de Hangman_Token ! Allez vite en acheter !");
  }
}

export function buyConsonant(arrayWord) {
  if (nbHT > 0) {
    searchedLetters = arrayWord.filter(
      (element) => !vowelsList.includes(element)
    );
    if (searchedLetters.length !== 0) {
      suggestLetter_updateNbHT(2);
    } else {
      alert("Le mot ne contient pas plus de consonnes");
    }
  } else {
    alert("Vous n'avez plus de Hangman_Token ! Allez vite en acheter !");
  }
}

function suggestLetter_updateNbHT(cost) {
  randomIndex = getRandomNumber(searchedLetters.length);
  proposedLetter = searchedLetters[randomIndex];
  nbHT -= cost;
  sessionStorage.setItem("nbHT", nbHT);
  ht_left.textContent = nbHT;
  console.log("on propose le : " + proposedLetter);
}
