let notes = JSON.parse(localStorage.getItem('notes')) || [];

function showNotes() {
    let container = document.querySelector("#notescontainer");
    container.innerHTML = "";

    notes.forEach((element, index) => {
        container.innerHTML += `
            <div class="notes">
                <h3> Tittle -  ${element.tittle}</h3>
                <h4> Sub Tittle - ${element.subtittle}</h4>
                <p> Content -  ${element.content}</p>
            </div>

            <div class="btns" >
            <button class="edit" onclick="editnotes(${index})" >Edit</button>
            <button class="delete" onclick = "deleteNotes(${index})" >Delete</button>
        </div>
        `;
    });
}



function addnotes() {
    let tittle = document.querySelector("#tittle").value.trim();
    let subtittle = document.querySelector("#sub-tittle").value.trim();
    let content = document.querySelector("#content").value.trim();

    if (!tittle || !content) {
        alert("Title and Content are required!");
        return;
    }

    let newNote = { tittle, subtittle, content };

    notes.push(newNote);
    saveNotes();
    showNotes();

   
    document.querySelector("#tittle").value = "";
    document.querySelector("#sub-tittle").value = "";
    document.querySelector("#content").value = "";
}

// console.log(n)
function editnotes(index){
    let n = notes[index];

    let newTittle = prompt("Edit Tittle : ", n.tittle)
    let newSubTittle = prompt("Edit Sub Tittle : ", n.subtittle)
    let newContent = prompt("Edit Content : ", n.content)


    if(newTittle !== null && newContent !== null){
        notes[index] ={
            tittle: newTittle,
            subtittle : newSubTittle,
             content : newContent
        }
        saveNotes()
        showNotes()
    }
    
}


function deleteNotes(index){
notes.splice(index,1)
saveNotes();
showNotes();

}





function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

showNotes();
