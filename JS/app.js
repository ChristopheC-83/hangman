const letters = document.querySelectorAll(".letter");
let choice;
console.log(letters);

function checkLetter() {

}

letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    choice = letter.outerText;
    console.log(choice);
    checkLetter();
  });
});
