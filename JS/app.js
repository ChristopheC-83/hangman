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
let chosenLetter;
let chosenWord=initialWords[getRandomNumber(initialWords.length)].toUpperCase();
let wordInArray = chosenWord.split("");

// gestion record
if (!localStorage.getItem("record")) {
  localStorage.setItem("record", 0);
  record = 0;
  recordShow.textContent = record;
} else {
  record = localStorage.getItem("record");
  recordShow.textContent = record;
}


function checkLetter(chosenLetter) {
  wordInArray.forEach((letter, index) => {
    if(letter===chosenLetter){
      letters_word[index].textContent = letter
    }
  
  })
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
 
  wordInArray.forEach(letter => {
    let h2Element = document.createElement('h2');
    h2Element.className = 'letter_word';
    h2Element.textContent = '_'
    word.appendChild(h2Element); 
  });
}
showWord();
const letters_word = document.querySelectorAll('.letter_word')
console.log(letters_word);
console.log(chosenWord[0]);
function updateScore() {}
