let btn = document.querySelector('button')

const body = document.body;

const saveTheme = localStorage.getItem('theme')

if(saveTheme){
    body.classList.add(saveTheme)
    btn.innerHTML = saveTheme ==="dark" ? "light Mode" : "Dark Mode"
}
else{
    body.classList.add("light")
}

btn.addEventListener("click",()=>{
    if(body.classList.contains("light")){
        body.classList.replace("light" , "dark")
        localStorage.setItem("theme","dark");
        btn.innerHTML = "ligh mode"
    }
    else{
        body.classList.replace("dark" , "light")
        localStorage.setItem("theme","light");
        btn.innerHTML = "Dark Mode"
    }


})