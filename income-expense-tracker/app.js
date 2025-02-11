// Select DOM elements
const descInput = document.querySelector("#desc");
const amountInput = document.querySelector("#amount");
const incomeBox = document.querySelector("#income-box");
const expenseBox = document.querySelector("#expense-box");
const balance = document.querySelector("#balance");
const transactionDetails = document.querySelector(".transaction-details");
const form = document.querySelector("form");

// Track total income and expense
let totalIncome = 0;
let totalExpense = 0;

// Function to load transactions from localStorage
const loadTransactions = () => {
  const storedTransactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  storedTransactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      totalIncome += transaction.amount;
    } else {
      totalExpense += Math.abs(transaction.amount);
    }
    transactionDetails.insertAdjacentHTML(
      "beforeend",
      transactionBoxHandler(transaction.desc, transaction.amount)
    );
  });

  updateAmountDisplay();
  updateBalance();
};

// Update balance display
const updateBalance = () => {
  const totalBalance = totalIncome - totalExpense;
  balance.textContent = totalBalance.toFixed(2);
};

// Update income and expense displays
const updateAmountDisplay = () => {
  incomeBox.textContent = `${totalIncome.toFixed(2)}`;
  expenseBox.textContent = `${totalExpense.toFixed(2)}`;
};

// Generate HTML for a transaction box
const transactionBoxHandler = (desc, amount) => {
  const transactionClass = amount < 0 ? "expense" : "income";
  return `
    <div class="rounded-2 py-2 px-3 d-flex align-items-center justify-content-between ${transactionClass} transaction-box">
      <p class="description text-capitalize">${desc}</p>
      <div class="d-flex align-items-center gap-2">
        <p class="amount">₹${amount}</p>
        <i class="ri-close-line remove-transaction" data-amount="${amount}"></i>
      </div>
    </div>
  `;
};

// Save transactions to localStorage
const saveTransactionsToLocalStorage = () => {
  const transactions = [];

  // Get all transaction boxes
  const transactionsBoxes = document.querySelectorAll(".transaction-box");
  transactionsBoxes.forEach((box) => {
    const desc = box.querySelector(".description").textContent;
    const amount = parseFloat(
      box.querySelector(".amount").textContent.replace("₹", "")
    );

    transactions.push({ desc, amount });
  });

  // Save to localStorage
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Add a new transaction
const addTransaction = () => {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!desc || isNaN(amount) || amount === 0) {
    return alert("Please enter a valid description and non-zero amount.");
  }

  if (amount > 0) totalIncome += amount;
  else totalExpense += Math.abs(amount);

  updateAmountDisplay();
  transactionDetails.insertAdjacentHTML(
    "beforeend",
    transactionBoxHandler(desc, amount)
  );
  updateBalance();

  // Save the new transaction to localStorage
  saveTransactionsToLocalStorage();

  // Clear inputs
  descInput.value = "";
  amountInput.value = "";

  // Remove focus from the input fields
  descInput.blur();
  amountInput.blur();
};

// Remove a transaction
const removeTransaction = (e) => {
  const transactionBox = e.target.closest(".transaction-box");
  const amount = parseFloat(e.target.dataset.amount);

  if (amount > 0) totalIncome -= amount;
  else totalExpense -= Math.abs(amount);

  transactionBox.remove();
  updateAmountDisplay();
  updateBalance();

  // Save updated transactions to localStorage
  saveTransactionsToLocalStorage();
};

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTransaction();
});

// Event delegation for removing transactions
transactionDetails.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-transaction")) {
    removeTransaction(e);
  }
});

// Load transactions from localStorage when the page loads
window.addEventListener("DOMContentLoaded", loadTransactions);
