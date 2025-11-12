let insert = document.querySelector("#Insert")


window.addEventListener('keydown',(elam)=>{

    insert.innerHTML= `
    <div class="key">
            ${elam.key === '' ? 'Space' : elam.key}

        </div>

        <div class="key">
            ${elam.keyCode}
            
        </div>

          <div class="key">
            ${elam.code}
            
        </div>


    `

})