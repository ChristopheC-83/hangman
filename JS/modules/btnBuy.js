import { getRandomNumber } from "./basisFunctions.js";

const vowelsList = ["A", "E", "I", "O", "U", "Y"];
const ht_left = document.querySelector("#ht_left");
let proposedLetter;
let nbHT = sessionStorage.getItem("nbHT")
  ? sessionStorage.getItem("nbHT")
  : 5;
ht_left.textContent = nbHT;

function sendNbHT() {
  if (sessionStorage.getItem("nbHT") === null) {
    sessionStorage.setItem("nbHT", 5);
  }
}
sendNbHT();
console.log(nbHT);

export function buyVowel(arrayWord) {
  if (nbHT > 0) {
    const searchedLetters = arrayWord.filter((element) =>
      vowelsList.includes(element)
    );
    if (searchedLetters.length !== 0) {
      const randomIndex = getRandomNumber(searchedLetters.length);
      proposedLetter = searchedLetters[randomIndex];
      nbHT -= 1;
      sessionStorage.setItem("nbHT", nbHT);

      ht_left.textContent = nbHT;
      console.log("on propose le : " + proposedLetter);
    } else {
      alert("Le mot ne contient pas plus de consonnes");
    }
  } else {
    alert("Vous n'avez plus de Hangman_Token ! allez vite en acheter !");
  }
}

export function buyConsonant(arrayWord) {
  const searchedLetters = arrayWord.filter(
    (element) => !vowelsList.includes(element)
  );
  if (searchedLetters.length !== 0) {
    const randomIndex = getRandomNumber(searchedLetters.length);
    proposedLetter = searchedLetters[randomIndex];

    console.log("on propose le : " + proposedLetter);
  } else {
    alert("Le mot ne contient pas plus de consonnes");
  }
}
