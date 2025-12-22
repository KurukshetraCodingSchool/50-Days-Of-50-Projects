const API_KEY = "b9a5e69d"; // Free demo key - agar nahi chale to apna key add karo
const API_URL = "https://www.omdbapi.com/";

const container = document.getElementById("movieContainer");
const searchInput = document.getElementById("search-input");

// Enter key se search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovie();
  }
});

async function searchMovie() {
  const query = searchInput.value.trim();

  if (query === "") {
    showError("Please enter a movie name");
    return;
  }

  showLoading();

  try {
    // OMDb API call
    const res = await fetch(
      `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();

    // OMDb API error handling
    if (data.Response === "False") {
      if (data.Error && data.Error.includes("API key")) {
        showError("API Key issue. Please get a free key from http://www.omdbapi.com/apikey.aspx");
      } else {
        showError(data.Error || "No movies found. Try a different search term.");
      }
      return;
    }

    if (data.Search && data.Search.length > 0) {
      displayMovies(data.Search);
    } else {
      showError("No movies found. Try a different search term.");
    }
  } catch (error) {
    console.error("Search error:", error);
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      showError("Network error. Please check your internet connection.");
    } else {
      showError(`Error: ${error.message}`);
    }
  }
}

function displayMovies(movies) {
  container.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");

    const posterPath = movie.Poster && movie.Poster !== "N/A" 
      ? movie.Poster 
      : "https://via.placeholder.com/300x450/333/fff?text=No+Poster";

    const year = movie.Year || "N/A";
    const imdbID = movie.imdbID || "";

    div.innerHTML = `
      <img src="${posterPath}" alt="${movie.Title} poster" loading="lazy" onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=No+Poster'">
      <h3>${movie.Title}</h3>
      <p class="year">${year}</p>
      ${imdbID ? `<p class="imdb">IMDb ID: ${imdbID}</p>` : ""}
    `;

    // Click pe details fetch kar sakte ho (optional)
    div.addEventListener("click", () => {
      fetchMovieDetails(imdbID);
    });

    container.appendChild(div);
  });
}


async function fetchMovieDetails(imdbID){

if(!imdbID) return;

try{
  const res = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}`);
  const data = await res.json();
  if(data.Response==="True"){
    showMovieDetails(data)
  }

}

catch(error){
console.error('Details Error : ' , error);
}


}


function showMovieDetails(movie){
  const modal = document.createElement("div");
  modal.className = "movie-modal";
  modal.innerHTML  = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <img src="${movie.Poster !== "N?A" ? movie.Poster : "https://placehold.co/600x400?font=roboto"}" alt="${movie.Title}">
                    <div class="model-info">
                        <h2>${movie.Title}</h2> 
                        <p>Year:${movie.Year}</p>
                        <p>Rating:${movie.imdbRating}</p>
                        <p>Director:${movie.Director}</p>
                    </div>
                </div>

            </div>
  `

document.body.appendChild(modal)
modal.querySelector(".close-modal").addEventListener("click",()=>{
modal.remove();
})

modal.addEventListener("click",(e)=>{
if(e.target === modal) modal.remove();
})

}

function showLoading()
{
  container.innerHTML = `
  <div class="loading">
            <div class="spinner"></div>
            <p>Searching Movie......</p>
           </div>
  `;
}

function showError(message){
container.innerHTML=  `
<div class = "error >
<h1> ${message} </h1>
</div> 
`
}

window.addEventListener("DOMContentLoaded",()=>{
  container.innerHTML =  `
     <div class="welcome">
            <h2>Welcome to Movie Search</h2>
            <p>Search for any Movie to get started</p>
           </div>

  `

})