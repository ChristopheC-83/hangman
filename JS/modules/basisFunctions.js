import { initialWords } from "./wordsList.js";

const scoreShow = document.querySelector(".score");
const tests_left = document.querySelector(".tests_left");
const tests_max = document.querySelector(".tests_max");
const flashNewRecord = document.querySelector(".newRecord p");
let newWord;
let oldWord;
export let chosenWord;

// nb aléatoire pour sélection mot dans liste
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// renouvellement mots sans repetition
export function numberWord(max) {
  do {
    newWord = getRandomNumber(max);
    console.log(newWord);
  } while (newWord === oldWord);
  oldWord = newWord;
  return newWord;
}

// MAJ record
export function updateRecord(scoreText, recordText) {
  if (scoreText > recordText) {
    localStorage.setItem("record", scoreText);
    flashNewRecord.classList.remove("dnone");
    flashNewRecord.classList.add("newRecordAnimation");
    setTimeout(() => {
      flashNewRecord.classList.add("dnone");
      flashNewRecord.classList.remove("newRecordAnimation");
    }, 3000);
  }
}

// gestion affichage
export function updateScore(score) {
  scoreShow.textContent = score;
}

// MAJ nb coups restants
export function updateTestLeft(testLeftText, testMax) {
  tests_left.textContent = testLeftText;
  tests_max.textContent = testMax;
}

// nouveau mot
export function newWordToPlay() {
  chosenWord = initialWords[numberWord(initialWords.length)].toUpperCase();
  return chosenWord;
}
