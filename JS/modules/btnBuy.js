import { getRandomNumber } from "./basisFunctions.js";

const vowelsList = ["A", "E", "I", "O", "U", "Y"];
let letterFound = false;
let proposedLetter;

export function buyVowel(arrayWord) {
    const searchedLetters = arrayWord.filter(
      (element) => vowelsList.includes(element)
    );
    if (searchedLetters.length !== 0) {
      const randomIndex = getRandomNumber(searchedLetters.length);
      proposedLetter = searchedLetters[randomIndex];
      console.log("on propose le : " + proposedLetter);
    } else {
      alert("Le mot ne contient pas plus de consonnes");
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

