import { updateScore } from "./basisFunctions.js";

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
  const tryAgain = confirm(
    "Le mot était : " +
      sessionStorage.getItem("motADeviner") +
      " . Recommencer ?"
  );
  tryAgain ? reset() : alert("A bientôt");
}
