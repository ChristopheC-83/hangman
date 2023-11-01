
const imgHangman = document.querySelectorAll(".imgHangman");

// reset
export function reset() {
  location.reload();
}

// dessin du pendu
export function drawingHangman(testLeftText, testMax) {
  let numberImg = 0;
  numberImg = testMax - testLeftText;
  imgHangman[numberImg].classList.remove("dnone");
  if (numberImg === 7) {
    imgHangman[4].classList.add("dnone");
    imgHangman[5].classList.add("dnone");
    imgHangman[6].classList.add("dnone");
  }
}

