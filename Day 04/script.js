let boxes = document.querySelectorAll(".box")

window.addEventListener('scroll',checkBoxes)
checkBoxes();

function checkBoxes(){
    const triggerBotttom = window.innerHeight / 5 * 4

    boxes.forEach(box =>{
        let boxTop = box.getBoundingClientRect().top

        if(boxTop <triggerBotttom){
            box.classList.add('show')
        }
        else{
            box.classList.remove('show')
        }
    })
}