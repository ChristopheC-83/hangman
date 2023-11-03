const flashNewRecord = document.querySelector(".newRecord p");
const scoreShow = document.querySelector(".score");
const recordShow = document.querySelector(".record");

// MAJ record
export function updateRecord(scoreText, recordText) {
  if (scoreText > recordText) {
    localStorage.setItem("record", scoreText);
    flashNewRecord.classList.remove("dnone");
    flashNewRecord.classList.add("newRecordAnimation");
    setTimeout(() => {
      flashNewRecord.classList.add("dnone");
      flashNewRecord.classList.remove("newRecordAnimation");
    }, 3000);
  }
}

// generation score

export function createScoreIfNull(){
  return sessionStorage.getItem("score") ? sessionStorage.getItem("score"):0
}

// affichage record
export function showRecord(recordText) {
  if (!localStorage.getItem("record")) {
    localStorage.setItem("record", 0);
    recordText = 0;
  } else {
    recordText = localStorage.getItem("record");
  }
  recordShow.textContent = recordText;
}

// gestion affichage
export function updateScore(score) {
  scoreShow.textContent = score;
}
