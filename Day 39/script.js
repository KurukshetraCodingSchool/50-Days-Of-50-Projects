const API_KEY =  "b9a5e69d";
const API_URl = "https://www.omdbapi.com/"

const container = document.querySelector('.movieContainer')
const searchInput = document.querySelector('#search-input')



searchInput.addEventListener('keypress',(e)=>{
    if(e.key==="Enter"){
        searchMovie();
    }
})


async function searchMovie (){
    
 const query = searchInput.value.trim();

 if(query===" "){
    showError("Please Enter Movie Name");
    return;
 }


 try{
const res = await fetch(
    `
    ${API_URl}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type = movie`
);

if (!res.ok){
    throw new Error(`HTTPS Error: ${res.status}`);
}
const data = await res.json();


if(data.Response === "False"){
    if(data.Error && data.Error.includes("API Key")){
        showError("API Key issue . Please get free key from https://www.omdbapi.com/");

    }
    else{
        showError(data.Error || "Now Movie found . Try a Diffrent Search Term.")
    }
    return;
}

if(data.Search && data.Search.length >0){
    displayMovies(data.Search)
}
 else{
        showError(data.Error || "Now Movie found . Try a Diffrent Search Term.")
    }

 }

 catch(error){
   console.error("Search Error : ", error);
 
 if(error,message.includes("Failed to feach")|| error.message.includes("NetWork Error")){
    showError("NetWork Error . Please Check your Internet Connection");

 }
 else{
    showError(`Error :  ${error.message}`)
 }
 }
 
}

function displayMovies(movies){
    container.innerHTML = ""

    movies.forEach(movie => {
const div = document.createElement("div");
div.classList.add("movie");
const posterPath = movie.Poster && movie.Poster !== "NA" 
? movie.Poster
:"https://placehold.co/600x400/EEE/31343C";

const year = movie.Year || "NA";


div.innerHTML = `
            <img src="${posterPath}" alt="${movie.tittle}">
            <h3>${movie.tittle}</h3>
            <p>${year} </p>
`

// div.addEventListener("click",()=>{
//     fetch
// })
container.appendChild(div)

    });
}