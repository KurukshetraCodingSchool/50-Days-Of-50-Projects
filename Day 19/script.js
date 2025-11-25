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
        `;
    });
}


 console.log(notes)
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

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

showNotes();
