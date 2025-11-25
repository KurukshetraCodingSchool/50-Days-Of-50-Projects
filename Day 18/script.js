let cursor = document.querySelector(".cursor")
let main = document.querySelector("main")



main.addEventListener("mousemove",(e)=>{
cursor.style.left = e.x - 20 + "px"
cursor.style.top = e.y - 20 + "px"
})

main.addEventListener("mouseleave",()=>{
    cursor.style.opacity =0
})

main.addEventListener("mouseenter",()=>{
    cursor.style.opacity = 1
})