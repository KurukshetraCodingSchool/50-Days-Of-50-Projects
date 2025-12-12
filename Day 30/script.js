window.addEventListener("scroll",()=>{
    let scrollTop = document.documentElement.scrollTop;
    let scrolldown = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (scrollTop / scrolldown) *100
    document.querySelector("#progress").style.width = progress + "%"
    
})