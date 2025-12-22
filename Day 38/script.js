const API_KEY =  "b9a5e69d";
const API_URl = "https://www.omdbapi.com/"

const container = document.querySelector('.movieContainer')
const searchInput = document.querySelector('#search-input')



searchInput.addEventListener('keypress',(e)=>{
    if(e.key==="Enter"){
        searchMovie();
    }
})