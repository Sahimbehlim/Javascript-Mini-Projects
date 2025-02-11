const budgetInput = document.querySelector(".budget-box input"),
  setBudgetBtn = document.querySelector(".budget-box button"),
  totalBudgetResult = document.getElementById("total-budget"),
  totalExpenseResult = document.getElementById("total-expense"),
  totalBalanceResult = document.getElementById("total-balance"),
  productTitleInput = document.querySelector(".expense-box").children[1],
  productCostInput = document.querySelector(".expense-box").children[2],
  addProductBtn = document.querySelector(".expense-box button"),
  expenseListWrapper = document.querySelector(".expense-list-wrapper");

let totalBudgetAmount = 0,
  totalExpenseAmount = 0,
  totalBalanceAmount = 0;

// Update HTML content with the current values
const updateHTML = () => {
  totalBudgetResult.textContent = totalBudgetAmount;
  totalExpenseResult.textContent = totalExpenseAmount;
  totalBalanceResult.textContent = totalBalanceAmount;
};

// Set the budget amount and update the results
const setBudget = () => {
  let budgetAmount = parseInt(budgetInput.value);

  if (budgetAmount <= 0 || isNaN(budgetAmount))
    return alert("Enter a valid positive budget value");

  totalBudgetAmount += budgetAmount;
  totalBalanceAmount += budgetAmount;

  updateHTML();
  budgetInput.value = "";
};

// Render the product in the expense list
const renderProduct = (title, cost) => {
  const listBox = `
        <div
          class="d-flex align-items-center justify-content-between px-3 py-2 mb-3 list-box"
        >
          <input type="text" value="${title}" class="fw-medium" readonly />
          <input type="number" value="${cost}" readonly />
          <div class="d-flex align-items-center text-primary gap-2">
            <i class="ri-edit-box-line"></i>
            <i class="ri-delete-back-line"></i>
          </div>
        </div>`;

  expenseListWrapper.insertAdjacentHTML("beforeend", listBox);
};

// Add product to the expense list and update amounts
const addProduct = () => {
  let productTitle = productTitleInput.value,
    productCost = parseInt(productCostInput.value);

  if (!productTitle) return alert("Enter product title");
  if (productCost <= 0 || isNaN(productCost))
    return alert("Enter a valid positive product cost");
  if (productCost > totalBalanceAmount) return alert("Not enough balance!");

  renderProduct(productTitle, productCost);

  totalExpenseAmount += productCost;
  totalBalanceAmount -= productCost;

  updateHTML();

  productTitleInput.value = "";
  productCostInput.value = "";
};

// Handle edit and delete actions for expenses
expenseListWrapper.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".ri-edit-box-line");
  const deleteBtn = e.target.closest(".ri-delete-back-line");
  const currentListBox = e.target.closest(".list-box");
  const currentTitle = currentListBox?.querySelector("input[type='text']");
  const currentCost = currentListBox?.querySelector("input[type='number']");

  if (editBtn) {
    if (!currentTitle.value || !currentCost.value)
      return alert("Value can't be empty!");

    // Toggle editable state and save changes
    currentTitle.toggleAttribute("readonly");
    currentCost.toggleAttribute("readonly");
    currentTitle.classList.toggle("editable");
    currentCost.classList.toggle("editable");
    currentTitle.setAttribute("value", currentTitle.value);
    currentCost.setAttribute("value", currentCost.value);
    e.target.classList.toggle("ri-save-line");

    // Recalculate total expenses and balance
    totalExpenseAmount = [
      ...expenseListWrapper.querySelectorAll(".list-box"),
    ].reduce(
      (total, box) =>
        total + parseInt(box.querySelector("input[type='number']").value),
      0
    );
    totalBalanceAmount = totalBudgetAmount - totalExpenseAmount;

    updateHTML();
  }

  if (deleteBtn) {
    // Remove product and adjust total values
    currentListBox.remove();
    totalExpenseAmount -= parseInt(currentCost.value);
    totalBalanceAmount += parseInt(currentCost.value);

    updateHTML();
  }
});

// Attach event listeners to buttons
setBudgetBtn.addEventListener("click", setBudget);
addProductBtn.addEventListener("click", addProduct);
