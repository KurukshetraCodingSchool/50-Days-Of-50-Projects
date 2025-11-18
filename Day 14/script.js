let num = 0;

let loader = document.querySelector(".loader")


let interval = setInterval(()=>{
num++;
loader.textContent = num + "%"
if(num>=100){
    clearInterval(interval)
    loader.textContent = "Ram Ram Bhaiyon"
    loader.style.display  = 'none'
}

},40)
