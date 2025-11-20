const regex = {
    fullname:/^[A-Za-z][A-Za-z\s]{1,48}[A-Za-z]$/,
    email:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    phone:/^[6-9]\d{9}$/,
    password: /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/
}


// Elements

const form = document.querySelector(".singupForm")
const fullname = document.querySelector("#fullname")
const email = document.querySelector("#email")
const phone = document.querySelector("#phone")
const password = document.querySelector("#password")
const confirmpass = document.querySelector("#confirm")

//error
const efullname = document.querySelector("#fullnameerror")
const eemail = document.querySelector("#emailerror")
const ephone = document.querySelector("#phoneerror")
const epassword = document.querySelector("#passworderror")
const econfirm = document.querySelector("#confirmerror")
const resultbox = document.querySelector("#forresult")

function showError (el ,msg){
    el.textContent = msg;
    el.classList.remove("hidden")
}
function hideError(el){
    el.textContent = ''
    el.classList.add('hidden')
}

fullname.addEventListener('blur', vaildationfullname)
email.addEventListener('blur', vaildationemail)
phone.addEventListener('blur', vaildationphone)
password.addEventListener('input', vaildationpassword)
confirmpass.addEventListener('input', vaildationconfirm)


// Validation functions

function vaildationfullname(){
    const v = fullname.value.trim();
    if(!v){
        showError(efullname,'Full Name is Required.');
        return false;
    }
    if(!regex.fullname.test(v)){
         showError(efullname,'Enter Valid Name (letters & spaces, min 2 chars)');
         return false;
    }
    hideError(efullname)
    return true;
}

function vaildationemail(){
  const v = email.value.trim();
  if(!v){ 
    showError(eemail,"Email is required.");
    return false;
  }
  if(!regex.email.test(v)){
    showError(eemail,"Enter a valid Email address.");
    return false;
  }
  hideError(eemail);
  return true;
}

function vaildationphone(){
  const v = phone.value.trim();
  if(!v){ 
    showError(ephone,"Phone is required.");
    return false;
  }
  if(!regex.phone.test(v)){
    showError(ephone,"Enter a valid Phone Number.");
    return false;
  }
  hideError(ephone);
  return true;
}

function vaildationpassword(){
  const v = password.value.trim();
  if(!v){ 
    showError(epassword,"Password is required.");
    return false;
  }
  if(!regex.password.test(v)){
    showError(epassword,"Enter a strong password.");
    return false;
  }
  hideError(epassword);
  return true;
}

function vaildationconfirm(){
  const v = confirmpass.value.trim();
  if(!v){ 
    showError(econfirm,"Confirm Password is required.");
    return false;
  }
  if(v !== password.value){
    showError(econfirm,"Passwords do not match.");
    return false;
  }
  hideError(econfirm);
  return true;
}

form.addEventListener('submit', function(e){
    e.preventDefault();

    const okFull = vaildationfullname();
    const okEmail = vaildationemail();
    const okPhone = vaildationphone();
    const okPass = vaildationpassword();
    const okConf = vaildationconfirm();

    if(okFull && okEmail && okPhone && okPass && okConf){
        resultbox.classList.remove('hidden');
        resultbox.textContent = "Signup Successfully";
        resultbox.style.background = "rgba(74,222,125,0.12)";
        resultbox.style.color = '#14532d';
    } else {
        resultbox.classList.remove('hidden');
        resultbox.textContent = "Please Fix Errors";
        resultbox.style.background = "rgba(255,0,0,0.12)";
        resultbox.style.color = '#7f1d1d';
    }
})
