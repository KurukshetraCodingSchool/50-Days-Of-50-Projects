let display = document.querySelector("#Display");
let buttons = document.querySelectorAll(".btn");
let clear = document.querySelector(".clear");
let eqaul = document.querySelector("#equal");


buttons.forEach(element => {
    element.addEventListener('click',()=>{
        display.value += element.textContent;
    });
});


clear.addEventListener('click',()=>{
    display.value = '';
}) 

eqaul.addEventListener('click',()=>{
    try{
        display.value = eval(display.value);
    }
    catch{
        display.value = 'Error';
    }
})