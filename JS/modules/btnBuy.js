import { getRandomNumber } from "./basisFunctions.js";

const vowelsList = ["A", "E", "I", "O", "U", "Y"];
const ht_left = document.querySelector("#ht_left");
const suggestedVowel = document.querySelector(".suggestedVowel");
const suggestedConsonant = document.querySelector(".suggestedConsonant");
const suggestedVowelTxt1 = document.querySelector(".suggestedVowel h4");
const suggestedVowelTxt2 = document.querySelector(".suggestedVowel h3");
const suggestedConsonantTxt1 = document.querySelector(".suggestedConsonant h4");
const suggestedConsonantTxt2 = document.querySelector(".suggestedConsonant h3");
let randomIndex;
let proposedLetter;
let searchedLetters;
let nbHT = sessionStorage.getItem("nbHT") ? sessionStorage.getItem("nbHT") : 10; //#################################### remettre 5
ht_left.textContent = nbHT;

// initialisation des Hangman_Token
function sendNbHT() {
  if (sessionStorage.getItem("nbHT") === null) {
    sessionStorage.setItem("nbHT", 10); //#################################### remettre 5
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
      displayVowel("Je vous propose le :", proposedLetter);
    } else {
      displayVowel("Le mot ne contient plus de voyelles");
    }
  } else {
    displayVowel("Vous n'avez plus de Hangman_Token ! Allez vite en acheter !");
  }
}

export function buyConsonant(arrayWord) {
  if (nbHT >= 2) {
    searchedLetters = arrayWord.filter(
      (element) => !vowelsList.includes(element)
    );
    if (searchedLetters.length !== 0) {
      suggestLetter_updateNbHT(2);
      displayConsonant("Je vous propose le :", proposedLetter);
    } else {
      displayConsonant("Le mot ne contient pas plus de consonne.");
    }
  } else {
    if (nbHT === 1) {
      displayConsonant(
        "Vous n'avez plus assez de Hangman_Token ! Allez vite en acheter !"
      );
    } else {
      displayConsonant(
        "Vous n'avez plus de Hangman_Token ! Allez vite en acheter !"
      );
    }
  }
}

function displayVowel(text1, text2 = "") {
  suggestedVowel.classList.remove("dnone");
  suggestedVowelTxt1.textContent = text1;
  suggestedVowelTxt2.textContent = text2;
  setTimeout(() => {
    suggestedVowel.classList.add("dnone");
    suggestedVowelTxt1.textContent = "";
    suggestedVowelTxt2.textContent = "";
  }, 3000);
}
function displayConsonant(text1, text2 = "") {
  suggestedConsonant.classList.remove("dnone");
  suggestedConsonantTxt1.textContent = text1;
  suggestedConsonantTxt2.textContent = text2;
  setTimeout(() => {
    suggestedConsonant.classList.add("dnone");
    suggestedConsonantTxt1.textContent = "";
    suggestedConsonantTxt2.textContent = "";
  }, 3000);
}

function suggestLetter_updateNbHT(cost) {
  randomIndex = getRandomNumber(searchedLetters.length);
  proposedLetter = searchedLetters[randomIndex];
  nbHT -= cost;
  sessionStorage.setItem("nbHT", nbHT);
  ht_left.textContent = nbHT;
  console.log("on propose le : " + proposedLetter);
}
