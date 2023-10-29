const toggleDarkMode = document.querySelector(".checkbox");
const body = document.querySelector("body");

if (!localStorage.getItem("darkModeMemory")) {
  localStorage.setItem("darkModeMemory", false);
  body.classList.remove("dark");
} else {
  if (localStorage.getItem("darkModeMemory") === true) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
}

toggleDarkMode.addEventListener("change", function () {
  let toggleChecked = this.checked;
  if (toggleChecked) {
    localStorage.setItem("darkModeMemory", false);
    body.classList.remove("dark");
  } else {
    localStorage.setItem("darkModeMemory", true);
    body.classList.add("dark");
  }
});
