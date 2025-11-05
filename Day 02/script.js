let progress = document.querySelector(".progress")
let prev = document.querySelector("#prev")
let next = document.querySelector("#next")
let circles = document.querySelectorAll(".circle")

let currentActive = 1;

next.addEventListener('click',function(){
    currentActive ++;

    if(currentActive > circles.length){
        currentActive = circles.length
    }
  update();
})

prev.addEventListener("click",function(){
    currentActive --;

    if(currentActive < 1){
        currentActive = 1;
    }
    update();
});

function update (){
    circles.forEach(function(cir , idx){
        if(idx < currentActive){
            cir.classList.add('active')
        }
        else{
            cir.classList.remove('active')
        }
    });

    let actives = document.querySelectorAll('.active');

    progress.style.width = 
    ((actives.length - 1 ) / (circles.length - 1 )) * 100 +'%';
    if(currentActive === 1){
        prev.disabled = true;
    }
    else{
        prev.disabled = false;
        next.disabled = false;
    }
}