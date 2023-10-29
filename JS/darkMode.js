const toggleDarkModeBtn = document.querySelector(".checkbox");
const body = document.querySelector("body");
const isDarkModeStored = localStorage.getItem("darkMode");
let stateDarkMode=""

function setUpDarkMode(bool) {
  bool ? body.classList.add("dark") : body.classList.remove("dark");
  toggleDarkModeBtn.checked = bool;
}

function toggleDarkMode() {
  stateDarkMode = !body.classList.contains("dark");
  localStorage.setItem("darkMode", stateDarkMode);
  setUpDarkMode(stateDarkMode);
}

if (isDarkModeStored === "true") {
  setUpDarkMode(true);
} else {
  localStorage.setItem("darkMode", false);
  setUpDarkMode(false);
}

toggleDarkModeBtn.addEventListener("change", toggleDarkMode);
