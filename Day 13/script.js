let count = 5;

let num = document.querySelector(".number");

let interval = setInterval(()=>{
count--;

if(count>=0){
    num.textContent = count;
}

else{
    num.textContent = "Go!"
    num.style.color = "lightgreen"
    clearInterval(interval)
}


},1000)