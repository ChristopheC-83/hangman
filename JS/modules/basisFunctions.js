
const scoreShow = document.querySelector(".score");
const tests_left = document.querySelector(".tests_left");

// nb aléatoire pour sélection mot dans liste
export function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

// reset 
export function reset() {
  location.reload();
}

// MAJ record
export function updateRecord(scoreText,recordText ){
  if(scoreText > recordText ){
    localStorage.setItem("record", scoreText)
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

// si victoire
export function testWin(scoreText, wordInArray, recordText) {
  if (scoreText === wordInArray.length) {
    alert("c'est gagné !");
    updateRecord(scoreText,recordText)
  }
}