let randomNum = Math.floor(Math.random()*100)
let check = document.querySelector('#check')

let attemp = 0;

check.addEventListener('click', function (){

    let guess =Number(document.querySelector("#guess").value)
    let msg = document.querySelector("#message")
 
    if(guess <1 ||  guess > 100 || isNaN(guess)){
        msg.textContent = "Enter Valid Number"
        return
    }

    attemp++;

document.querySelector("#attemps").textContent = attemp;
    if(guess===randomNum){
        msg.textContent = "Your Guess Number is right"
        
    }

     if(guess>randomNum){
        msg.textContent = "Your Guess Number is too high"
        
    }
     if(guess<randomNum){
        msg.textContent = "Your Guess Number is too low"
        
    }

} )


document.querySelector("#restart").addEventListener('click',()=>{
    attemp = 0;
   let randomNum = Math.floor(Math.random()*100)
   document.querySelector("#attemps").textContent = attemp;
   document.querySelector("#message").textContent = ""
   document.querySelector("#guess").value = ""

})