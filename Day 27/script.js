// const { jsxs } = require("react/jsx-runtime")

const balanceE = document.querySelector(".balance")
const formE = document.querySelector("#add-transation")
const discriptionE = document.querySelector("#descripton")
const amountE = document.querySelector("#amount")
const transationlist = document.querySelector(".transaction-list")


let transactions = JSON.parse(localStorage.getItem('transactions')) || []


function updateBalnce(){
    const totalBalance = transactions.reduce((acc,transaction)=>{
        return acc+transaction.amount;
    },0)
balanceE.textContent =  `₹${Math.abs(totalBalance).toFixed(2)}`;

if(totalBalance<0){
    balanceE.classList.add('debit')
    balanceE.classList.remove('credit');
    balanceE.textContent = `₹${Math.abs(totalBalance).toFixed(2)}`
}

else if(totalBalance>0){
    balanceE.classList.add('credit')
    balanceE.classList.remove('debit');
    balanceE.textContent = `₹${totalBalance.toFixed(2)}`
}
else{
    balanceE.classList.remove('debit','credit')
}

localStorage.setItem('transactions',JSON.stringify(transactions));

}


function addtransactionHistory(transaction){
const item = document.createElement('li')
const sign = transaction.amount< 0 ? "-" : "+";

const transactiontype = transaction.amount <0 ? "debit" : "credit"

item.innerHTML = `


`


}

