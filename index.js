// Get DOM elements
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const addExpenseButton = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");

// Load expenses from local storage (if any)
let expenseGroup = JSON.parse(localStorage.getItem("expenses")) || {};

// Add expense handler
addExpenseButton.addEventListener("click", function () {
    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!category) {
        alert("Please select a category.");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const expense = { amount };

    // If category does not exist, create it
    if (!expenseGroup[category]) {
        expenseGroup[category] = [];
    }

    // Add expense to category
    expenseGroup[category].push(expense);

    // Save to Local Storage
    saveToLocalStorage();

    // Update UI
    updateExpenseList();

    // Clear input fields
    amountInput.value = "";
    categoryInput.value = "Food";  // Reset category to default
});

// Update expense list in the UI
function updateExpenseList() {
    expenseList.innerHTML = "";

    Object.keys(expenseGroup).forEach(category => {
        let totalAmount = expenseGroup[category].reduce((sum, expense) => sum + expense.amount, 0);

        // Create category header
        const categoryHeader = document.createElement("h3");
        categoryHeader.textContent = `${category} (Total: $${totalAmount})`;
        categoryHeader.classList.add("category-header");
        expenseList.appendChild(categoryHeader);

        // Loop through expenses in this category
        expenseGroup[category].forEach((expense, index) => {
            const li = document.createElement("li");
            li.classList.add("expense-item");
            li.textContent = `$${expense.amount}`;

            // Delete button
            const deleteBtn = document.createElement("span");
            deleteBtn.innerHTML = "&times;";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => deleteExpense(category, index));

            // Append delete button
            li.appendChild(deleteBtn);
            expenseList.appendChild(li);
        });
    });
}

// Delete expense handler
function deleteExpense(category, index) {
    if (!expenseGroup[category]) return;

    // Remove expense from category
    expenseGroup[category].splice(index, 1);

    // If category is empty, delete it
    if (expenseGroup[category].length === 0) {
        delete expenseGroup[category];
    }

    // Save updated data to Local Storage
    saveToLocalStorage();

    // Update UI after deletion
    updateExpenseList();
}

// Save data to Local Storage
function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenseGroup));
}

// Initialize the expense list on page load
updateExpenseList();
