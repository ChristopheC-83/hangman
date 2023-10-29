const toggleDarkMode = document.querySelector(".checkbox");
const body =document.querySelector('body')

toggleDarkMode.addEventListener("change", function(){
    const toggleChecked = this.checked
    

    console.log("toggleChecked");
    if (toggleChecked) {
        body.classList.add('dark')
    } else {
        body.classList.remove('dark')
    }
})

