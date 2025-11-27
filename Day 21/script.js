function register(){
    let user ={
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        pass: document.querySelector("#password").value,
    };

    if(user.name === "" || user.email === "" || user.pass === ""){
        alert("Please Fill Details")
        return;
    }

    localStorage.setItem("userData",JSON.stringify(user))
    console.log(user.name)
    alert("User Register Sucessfull")
     window.location.href = "login.html"

}



function login(){

let storedUser = JSON.parse(localStorage.getItem("userData"))


let email = document.querySelector("#email").value;
let pass = document.querySelector("#password").value;


if(email === storedUser.email && pass === storedUser.pass){
    alert("Login Sucessfully !");
    localStorage.setItem("isLoggedIn" , "true")
    window.location.href = "dashboard.html";
}

else{
    alert("Invalid Email And password")
}

}

let logged = localStorage.getItem("isLoggedIn")

// if(logged !== true){
//     window.location.href = "login.html"
// }


let user = JSON.parse(localStorage.getItem("userData"));
document.querySelector("span").innerText = user.name


function logout(){
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html"
}



