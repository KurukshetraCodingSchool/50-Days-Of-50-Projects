let images = document.querySelectorAll('.images')

images.forEach( image =>{
    image.addEventListener('click',()=>{
        removeClassList()
        image.classList.add('active')
    })
} )

function removeClassList(){
    images.forEach(image =>{
        image.classList.remove('active')
    })
}