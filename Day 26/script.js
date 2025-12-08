let  expenses = JSON.parse(localStorage.getItem("expenses")) || []

const tittle = document.querySelector("#tittle");
const amount = document.querySelector("#amount");
const addbtn = document.querySelector("#addbtn");
const list = document.querySelector("#list")
const totalText = document.querySelector("#total")

showExpense()

addbtn.addEventListener("click",()=>{
const t = tittle.value.trim();
const a = Number(amount.value);

if(t==="" || a <= "0"){
    alert("Please Enter Valid Value");
    return;
}


const expense= {
    id: Date.now(),
    tittle:t,
    amount:a
    
};

expenses.push(expense);
localStorage.setItem("expenses",JSON.stringify(expenses))
tittle.value = "";
amount.value ="";

showExpense()
})


function showExpense (){
list.innerHTML = " "
let total = 0 ;
expenses.forEach(element => {
    total += element.amount;
    const li = document.createElement("li")

    li.innerHTML = `
    ${element.tittle} - ₹${element.amount}
<button id="deletebtn" onclick="deleteExpense(${element.id})" >Delete</button>

    `;
    list.appendChild(li)
    totalText.textContent = total

});
}


function deleteExpense(id){
expenses = expenses.filter(e=> e.id !== id);
localStorage.setItem("expenses",JSON.stringify(expenses))
showExpense()
}