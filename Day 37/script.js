const postsContainer = document.querySelector(".posts");
const loader = document.querySelector(".loader");

let postCount = 1;
const POSTS_PER_LOAD = 5;

function createPost() {
    const post = document.createElement("div");
    post.classList.add("post");

    post.innerHTML = `
        <h3>Post #${postCount}</h3>
        <p>This is infinite scroll post number ${postCount}.
        Loaded using Intersection Observer.</p>
    `;

    postCount++;
    return post;
}


function postLoad() {
    loader.style.display = "block";

    setTimeout(() => {
        for (let i = 0; i < POSTS_PER_LOAD; i++) {
            postsContainer.appendChild(createPost());
        }
        loader.style.display = "none";
        observeLastPost();
    }, 800);
}

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        observer.disconnect();
        postLoad();
    }
}, {
    threshold: 1
});

function observeLastPost() {
    const posts = document.querySelectorAll(".post");
    const lastPost = posts[posts.length - 1];
    if (lastPost) observer.observe(lastPost);
}


postLoad();