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
let score = 0;
let record;
let chosenWord;
let chosenLetter;

if (!localStorage.getItem("record")) {
  localStorage.setItem("record", 0);
  record = 0;
  recordShow.textContent = record;
} else {
  record = localStorage.getItem("record");
  recordShow.textContent = record;
}

// console.log(letters);

function checkLetter(chosenLetter) {
  console.log(chosenLetter);
}

letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    chosenLetter = letter.outerText;
    checkLetter(chosenLetter);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
    chosenLetter = event.key;
    checkLetter(chosenLetter);
  }
});

function updateScore() {}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function showWord() {
    let wordInArray = initialWords[getRandomNumber(initialWords.length)].split("");
  console.log(wordInArray);
    wordInArray.forEach(letter => {
      word.innerHTML+='<span class="letter_word"><h2>'+letter+'</h2></span>'
    });
}

showWord();
