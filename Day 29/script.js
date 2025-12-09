async function getGithubUser() {
    const username = document.getElementById("username").value;
    const result = document.getElementById("result");

    if (username === "") {
        result.innerHTML = `<p>Please enter a username</p>`;
        return;
    }

    result.innerHTML = `<p>Loading...</p>`;

    try {
        // USER DATA
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        
        if (userRes.status === 404) {
            result.innerHTML = `<p>User not found </p>`;
            return;
        }

        const user = await userRes.json();

        // REPO DATA
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await repoRes.json();

        // UI UPDATE
        result.innerHTML = `
            <div class="profile">
                <img src="${user.avatar_url}">
                
                <div class="profile-info">
                    <h2>${user.name || user.login}</h2>
                    <p>@${user.login}</p>
                    <p>${user.bio || "No bio available"}</p>
                    
                </div>
            </div>

            
        `;
    } catch (error) {
        result.innerHTML = `<p>Error fetching data. Try again.</p>`;
    }
}