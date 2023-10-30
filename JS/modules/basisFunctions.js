import { initialWords } from "./wordsList.js";

const scoreShow = document.querySelector(".score");
const tests_left = document.querySelector(".tests_left");
const flashNewRecord = document.querySelector(".newRecord p");
let newWord;
let oldWord;
export let chosenWord;

// nb aléatoire pour sélection mot dans liste

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
  
}

export function numberWord(max) {
  do {
    newWord = getRandomNumber(max);
    console.log(newWord);
  } while (newWord === oldWord);
  oldWord = newWord;
  return newWord;
}

// reset
export function reset() {
  location.reload();
}

//  reset keys

export function resetKey(letters) {
  letters.forEach((letter) => {
    if (letter.classList.contains("right")) {
      letter.classList.remove("right");
    }
    if (letter.classList.contains("wrong")) {
      letter.classList.remove("wrong");
    }
  });
}

// you lose
export function youLose() {
  const tryAgain = confirm("Vous avez perdu !  recommencer ?");
  tryAgain ? reset() : alert("A bientôt");
  localStorage.removeItem('score')
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
export function updateTestLeft(testLeftText) {
  tests_left.textContent = testLeftText;
}

// nouveau mot

export function newWordToPlay() {
  chosenWord = initialWords[numberWord(initialWords.length)].toUpperCase();
  return chosenWord;
}
