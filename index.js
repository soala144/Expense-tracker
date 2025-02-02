let expenses = []

// getting values from html 
const categoryInput = document.getElementById("category")
const amountInput = document.getElementById("amount")
const addExpenseButton = document.getElementById("addExpense")

addExpenseButton.addEventListener("click", function(){
    const category = categoryInput.value
    const amount = parseInt(amountInput.value) 

    if(isNaN(amount) || amount <=0){
        alert("Please enter a solid amount")
        return
    }

    const expense = {category, amount}

    expenses.push(expense)
    console.log(expenses)
})
