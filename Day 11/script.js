const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBER = '0123456789'
const SYMBOL = "!@#$%^&*"


let lengthb = document.querySelector("#length")
let lenValue = document.querySelector("#lenValue")
let lower = document.querySelector("#lowercase")
let upper = document.querySelector("#uppercase")
let number = document.querySelector("#number")
let symbol = document.querySelector("#symbol")
let genpass = document.querySelector("#generate")
let copybtn = document.querySelector("#copy")
let result = document.querySelector(".result")
let note = document.querySelector(".note")


lenValue.textContent = lengthb.value;
lengthb.addEventListener('input', () => lenValue.textContent = lengthb.value);


function randInput(max) {
    if (window.crypto && window.crypto.getRandomValues) {
        const arr = new Uint32Array(1);
        window.crypto.getRandomValues(arr);
        return arr[0] % max;
    }
    return Math.floor(Math.random() * max);
}


function genPassword(length, useLower, useUpper, useNumber, useSymbol) {

    let pools = [];

    if (useLower) pools.push(LOWER);
    if (useUpper) pools.push(UPPER);
    if (useNumber) pools.push(NUMBER);
    if (useSymbol) pools.push(SYMBOL);

    if (pools.length === 0)
        return { error: "Choose at least one character type." }

    if (length < pools.length) {
        return {
            error: `Length must be at least ${pools.length} to include each selected type.`
        }
    }

    let passwordchar = [];

    // Ensure at least one char from each chosen type
    for (let pool of pools) {
        const ch = pool[randInput(pool.length)];
        passwordchar.push(ch);
    }

    const combined = pools.join("");

    // Fill remaining characters
    for (let i = passwordchar.length; i < length; i++) {
        passwordchar.push(combined[randInput(combined.length)]);
    }

    // Fisher-Yates Shuffle
    for (let i = passwordchar.length - 1; i > 0; i--) {
        const j = randInput(i + 1);
        [passwordchar[i], passwordchar[j]] = [passwordchar[j], passwordchar[i]];
    }

    return { password: passwordchar.join("") };
}



genpass.addEventListener("click", () => {

    note.textContent = "";

    const length = Number(lengthb.value);
    const useLower = lower.checked;
    const useUpper = upper.checked;
    const useNumber = number.checked;
    const useSymbol = symbol.checked;

    // Correct argument order!
    const res = genPassword(length, useLower, useUpper, useNumber, useSymbol);

    if (res.error) {
        result.textContent = res.error;
        copybtn.disabled = true;
    } else {
        result.textContent = res.password;
        copybtn.disabled = false;
    }
});



copybtn.addEventListener('click', async () => {
    const pwd = result.textContent;

    if (!pwd || pwd.startsWith("Choose") || pwd.startsWith("Length"))
        return;

    try {
        await navigator.clipboard.writeText(pwd);
        note.textContent = "Password Copied!";
        setTimeout(() => note.textContent = "", 2500);

    } catch (err) {
        note.textContent = "Copy failed!";
    }
});
