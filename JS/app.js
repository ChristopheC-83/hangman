const letters = document.querySelectorAll(".letter");
let choice;
// console.log(letters);

function checkLetter(choice) {
  console.log(choice);
}

letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    choice = letter.outerText;
    checkLetter(choice);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
    choice = event.key;
    checkLetter(choice);
  }
});
