import { initialWords } from "./wordsList.js";

const tests_left = document.querySelector(".tests_left");
const tests_max = document.querySelector(".tests_max");
let newWord;
let oldWord;
export let chosenWord;



// nb aléatoire pour sélection mot dans liste
export function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// renouvellement mots sans repetition
export function numberWord(max) {
  do {
    newWord = getRandomNumber(max);
  } while (newWord === oldWord);
  oldWord = newWord;
  return newWord;
}

// MAJ nb coups restants
export function updateTestLeft(testLeftText, testMax) {
  tests_left.textContent = testLeftText;
  tests_max.textContent = testMax;
}

// nouveau mot
export function newWordToPlay() {
  chosenWord = initialWords[numberWord(initialWords.length)].toUpperCase();
  sessionStorage.setItem("motADeviner", chosenWord);
  return chosenWord;
}
