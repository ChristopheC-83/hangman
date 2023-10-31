import {updateScore} from "./basisFunctions.js"

// reset
export function reset() {
  location.reload();
}

//  reset keys

//   export function resetKey(letters) {
//     letters.forEach((letter) => {
//       if (letter.classList.contains("right")) {
//         letter.classList.remove("right");
//       }
//       if (letter.classList.contains("wrong")) {
//         letter.classList.remove("wrong");
//       }
//     });
//   }

// you lose
export function youLose() {
    sessionStorage.removeItem("score");
    updateScore(0);
    const tryAgain = confirm("Vous avez perdu !  recommencer ?");
    tryAgain ? reset() : alert("A bientôt");
  }

  //bonne lettre
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
  });
}

//  mauvaise lettre
function badLetter(letterElement) {
  if (!letterElement.classList.contains("right")) {
    letterElement.classList.add("wrong");
    testLeftText -= 1;
    updateTestLeft(testLeftText, testMax);

    if (testLeftText === 0) {
      updateRecord(scoreText, recordText);
      showRecord();
      setTimeout(() => {
        youLose();
        sessionStorage.removeItem("score");
        scoreText = 0;
        updateScore(0);
      }, 150);
    }
  }
}