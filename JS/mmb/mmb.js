const buy = document.querySelector(".buy");

buy.addEventListener("click", () => {
  localStorage.setItem("record", 0);
  sessionStorage.setItem("nbHT", 5);
});
