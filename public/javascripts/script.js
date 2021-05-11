let themeButton = document.getElementById("themeButton");

function themeFunc() { 
    if (this.checked) {
        user.theme = "dark";    
    } else {
        user.theme = "light";
    }
}

console.log("du lugter")

themeButton.addEventListener('click', themeFunc)