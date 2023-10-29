const initialWords = [
  "agneau",
  "aviron",
  "animal",
  "balade",
  "billet",
  "bronze",
  "cabane",
  "cloche",
  "cirage",
  "dentier",
  "drapeau",
  "exemple",
  "fourmis",
  "fraicheur",
  "frileux",
  "grelot",
  "goulot",
  "grandir",
  "humour",
  "hurler",
  "hache",
  "iceberg",
  "imiter",
  "journal",
  "joutte",
  "jargon",
  "kayak",
  "koala",
  "limite",
  "lionne",
  "losange",
  "mondial",
  "menthe",
  "mythe",
  "merguez",
  "nouveau",
  "notaire",
  "oxyde",
  "oiseau",
  "ozone",
  "poulpe",
  "poterie",
  "pouvoir",
  "quartz",
  "querelle",
  "quotas",
  "rapide",
  "roulant",
  "ramoner",
  "scooter",
  "scroller",
  "trousse",
  "tunique",
  "tomate",
  "unique",
  "usurper",
  "utiliser",
  "voiture",
  "valider",
  "vautour",
  "wapiti",
  "wagonnet",
  "xenon",
  "zapping",
  "zodiaque",
];

const letters = document.querySelectorAll(".letter");
const scoreShow = document.querySelector(".score");
const recordShow = document.querySelector(".record");
const word = document.querySelector(".word");
const tests_left = document.querySelector(".tests_left");
let testLeftText = 7;
let scoreText = 0;
let recordText;
let chosenLetter;
let chosenWord =
  initialWords[getRandomNumber(initialWords.length)].toUpperCase();
let wordInArray = chosenWord.split("");

// gestion record
function updateRecord() {
  if (!localStorage.getItem("record")) {
    localStorage.setItem("record", 0);
    recordText = 0;
  } else {
    recordText = localStorage.getItem("record");
  }
  recordShow.textContent = recordText;
}

// gestion affichage
function updateScore(score) {
  scoreShow.textContent = score;
}

function updateTestLeft(testLeftText) {
  tests_left.textContent = testLeftText;
}

// controle lettre

function checkLetter(chosenLetter) {
  const letterElement = document.querySelector(`#${chosenLetter}`);

  if (letterElement.classList.contains("right") ||letterElement.classList.contains("wrong") ){
    alert('Vous avez déjà joué cette lettre ')
    return
  }
  wordInArray.forEach((letter, index) => {
    if (chosenLetter === letter) {
      letters_word[index].textContent = letter;
      scoreText += 1;
      updateScore(scoreText);
      letterElement.classList.add("right");
    }
  });
  if (!letterElement.classList.contains("right")) {
    letterElement.classList.add("wrong");
    testLeftText -= 1;
    updateTestLeft(testLeftText);

    if (testLeftText === 0) {
      setTimeout(() => {
        alert("Vous avez perdu !");
      }, 150);
    }
  }
}

// choix lettre sur écran
letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    chosenLetter = letter.outerText;
    checkLetter(chosenLetter);
  });
});
// choix lettre sur clavier
document.addEventListener("keydown", (event) => {
  if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
    chosenLetter = event.key.toUpperCase();
    checkLetter(chosenLetter);
  }
});
// nb aléatoire pour sélection mot dans liste
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
// selection d'un mot de la liste et affichage
function showWord() {
  wordInArray.forEach((letter) => {
    let h2Element = document.createElement("h2");
    h2Element.className = "letter_word";
    h2Element.textContent = "_";
    word.appendChild(h2Element);
  });
}

updateScore(scoreText);
updateTestLeft(testLeftText);
updateRecord();
console.log("record :" + recordText);
showWord();
const letters_word = document.querySelectorAll(".letter_word");
