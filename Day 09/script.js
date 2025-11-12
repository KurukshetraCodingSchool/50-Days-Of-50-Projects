let main = document.querySelector('main')
let colors = ['#e74c3c', '#8e44ad' ,"#3498db" , "#e67e22", "#2ecc71"];



for (let i =0; i<256; i++){
    let box = document.createElement('div')
    box.classList.add('box')

    box.addEventListener('mouseover' ,()=> setColor(box) )
   box.addEventListener('mouseout' , ()=> removeColor(box))

    main.appendChild(box)
}


function setColor(elam){
    let color = getRandomColor()
    elam.style.background = color
    elam.style.boxShadow  = `0 0 2px ${color},  0 0 10px ${color}`
}

function removeColor(elem){
elem.style.background = '#1d1d1d'
elem.style.boxShadow = '0 0 2px #000'
}

function getRandomColor(){
    return colors[Math.floor(Math.random() * colors.length)]
}