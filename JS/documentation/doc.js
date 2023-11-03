const btnUser = document.querySelector(".user");
const btnDev = document.querySelector(".dev");
const pageUser = document.querySelector(".docUser");
const pageDev = document.querySelector(".docDev");

btnUser.addEventListener('click', ()=>{
    
    console.log("clic user");
    btnUser.classList.add('pageChoose')
    btnDev.classList.remove('pageChoose')
    pageUser.classList.remove('dnone')
    pageDev.classList.add('dnone')
})
btnDev.addEventListener('click', ()=>{
    console.log("clic dev");
    btnUser.classList.remove('pageChoose')
    btnDev.classList.add('pageChoose')
    pageUser.classList.add('dnone')
    pageDev.classList.remove('dnone')
})
