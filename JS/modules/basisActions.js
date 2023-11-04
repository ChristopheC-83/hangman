const imgHangman = document.querySelectorAll(".imgHangman");

// reset
export function reset() {
  location.reload();
}

// dessin du pendu
export function drawingHangman(testLeftText, testMax) {
  let numberImg = 0;
  numberImg = testMax - testLeftText;
  if (imgHangman[numberImg].classList.contains("dnone")) {
    imgHangman[numberImg].classList.remove("dnone");
  }
  if (numberImg === 7) {
    imgHangman[numberImg].classList.add("appearHead");
  } else {
    imgHangman[numberImg].classList.add("appearHangman");
  }
  if (numberImg === 7) {
    setTimeout(() => {
      imgHangman[4].classList.add("finalHangman");
      imgHangman[5].classList.add("finalHangman");
      imgHangman[6].classList.add("finalHangman");
    }, 100);
  }
}
