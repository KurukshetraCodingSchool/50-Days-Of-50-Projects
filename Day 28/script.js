const balanceAmount = document.querySelector(".balance p");
const descriptionE = document.querySelector("#descripton");
const amountE = document.querySelector("#amount");
const transListE = document.querySelector(".transaction-list");

const creditBtn = document.querySelector("#credit");
const debitBtn = document.querySelector("#debit");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateBalance() {
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  balanceAmount.textContent = `₹${total.toFixed(2)}`;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addToHistory(tx) {
  const li = document.createElement("li");

  const sign = tx.amount < 0 ? "-" : "+";
  const typeClass = tx.amount < 0 ? "debit" : "credit";

  li.innerHTML = `
    <span class="transaction-description">${tx.description}</span>
    <span class="${typeClass}">
      ${sign} ₹${Math.abs(tx.amount).toFixed(2)}
    </span>
  `;

  transListE.appendChild(li);
}

function addTransaction(type) {
  const desc = descriptionE.value.trim();
  const amount = parseFloat(amountE.value);

  if (desc === "" || isNaN(amount) || amount <= 0) {
    alert("Enter valid description and amount");
    return;
  }

  const finalAmount = type === "credit" ? Math.abs(amount) : -Math.abs(amount);

  const newTx = {
    id: Math.floor(Math.random() * 99999),
    description: desc,
    amount: finalAmount,
  };

  transactions.push(newTx);

  addToHistory(newTx);
  updateBalance();

  descriptionE.value = "";
  amountE.value = "";
}


creditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTransaction("credit");
});

debitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTransaction("debit");
});


function init() {
  transListE.innerHTML = "";
  transactions.forEach(addToHistory);
  updateBalance();
}

init();
