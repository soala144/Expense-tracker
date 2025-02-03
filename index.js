let expense = []

// getting values from html 
const categoryInput = document.getElementById("category")
const amountInput = document.getElementById("amount")
const addExpenseButton = document.getElementById("addExpense")
const expenseGroup = {}
addExpenseButton.addEventListener("click", function(){
    const category = categoryInput.value
    const amount = parseFloat(amountInput.value) 

    if(isNaN(amount) || amount <=0){
        alert("Please enter a solid amount")
        return
    }

    const expense = {amount}
    
    if(!expenseGroup[category]){
        expenseGroup[category] = []
    }

    expenseGroup[category].push(expense)
    updateExpenseList()
    amountInput.innerHTML =""

})
const expensList = document.getElementById("expenseList")
function updateExpenseList(){
    expensList.innerHTML = ""

    Object.keys(expenseGroup).forEach(category => {
        let totalAmount = expenseGroup[category].reduce((sum, expense) => sum + expense.amount, 0)
        const categoryHeader = document.createElement("h3")
        categoryHeader.textContent = `${category} (Total: $${totalAmount})`
        expensList.appendChild(categoryHeader)


        expenseGroup[category].forEach((expense, index) =>{
            const li = document.createElement("li")
            li.textContent =`$${expense.amount}`
            

            const deleteBtn = document.createElement("span")
            deleteBtn.innerHTML = "&times"
            deleteBtn.style.cursor ="pointer"
            deleteBtn.style.color = "red"
            deleteBtn.style.fontSize = "18px"
            deleteBtn.style.marginLeft = "10px"
            deleteBtn.addEventListener("click", () => deleteExpense(category, index))

            li.appendChild(deleteBtn)
            expensList.appendChild(li)
        })
    })
}

function deleteExpense(category,  index){
    expenseGroup[category].splice(index, 1)

    if(expenseGroup[category].length === 0){
        delete expenseGroup[category]    
    }
}