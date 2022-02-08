const transactionsUl = document.querySelector('#transactions')
const currentValueDisplayEl = document.querySelector('#balance')
const incomeDisplayEl = document.querySelector('#money-plus')
const expenseDisplayEl = document.querySelector('#money-minus')
const formEl = document.querySelector('#form')
const impuTextValueEL = document.querySelector('#text')
const imputAmountValueEl = document.querySelector('#amount')

// Google Local Storage
const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : []

// Delete Values to List
const removeValue = ID => {
     transactions = transactions.filter(transaction => transaction.id != ID)
     updateLocalStorage()
     init()
}

// Add value to DOM
const addTransactionIntoDom = (value) => {
     const operator = value.amount < 0 ? '-' : ''
     const removeOperatoAmount = Math.abs(value.amount)
     const cssClass = value.amount < 0 ? 'minus' : 'plus'
     const li = document.createElement('li')
     li.classList.add(cssClass)

     li.innerHTML = `
          ${value.name}<span>${operator} R$ ${removeOperatoAmount}</span>
          <button class="delete-btn" onClick="removeValue(${value.id})">
               x
          </button>
     ` 
     transactionsUl.append(li)
}

// Get currentValues
const getCurrentValue = valueAmounts => valueAmounts
          .reduce((accumulator, value) => accumulator + value, 0)
          .toFixed(2)


// Get Incomes
const getIncome = (valueAmounts) => {
     return valueAmounts
          .filter((value) => value > 0)
          .reduce((accumulator, value) => accumulator + value, 0)
          .toFixed(2)
}

// Get Expenses
const getExpenses = (valueAmounts) => {
    return Math.abs(valueAmounts.filter((value) => value < 0)
          .reduce((accumulator, value) => accumulator + value, 0)).toFixed(2)
}

// Add to Display
const addToDisplay = (currentValue , income, expense) => {
     currentValueDisplayEl.textContent = `R$ ${currentValue}`
     incomeDisplayEl.textContent = `R$ ${income}`
     expenseDisplayEl.textContent = `R$ ${expense}`
}
   
// Updating the values in the DOM
const updateBalanceValues = () => {
     const valueAmounts = transactions.map(value => value.amount)

     const currentValue = getCurrentValue(valueAmounts)
     const income = getIncome(valueAmounts)
     const expense = getExpenses(valueAmounts)

     addToDisplay(currentValue, income, expense)
}

const init = () => {
     transactionsUl.innerHTML = ''
     transactions.forEach(addTransactionIntoDom)
     updateBalanceValues()
}
init()

// Updating the values in the LocalStorage
const updateLocalStorage = () => {
     localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Generating random ID
const generatorID = () => Math.round(Math.random() * 1000)

// Adding values to Array
const addTOTransactionsArray = (name, amount) => {
     transactions.push({ 
          id: generatorID(), 
          name: name,  
          amount: Number(amount)
     })
}

// Cleared form values
const cleanValueInputs = () => {
     impuTextValueEL.value = ''
     imputAmountValueEl.value = ''
}

// Submitting the form
const formSubmit = event => {
     event.preventDefault()

     const transactionName = impuTextValueEL.value.trim()
     const transactionAmount = imputAmountValueEl.value.trim()
     const haveSomeEmptyImput =  transactionName === ''|| transactionAmount === ''
     
     if(haveSomeEmptyImput) {
          alert('Por favor inserir os valores nos campos')
          return
     }

     addTOTransactionsArray(transactionName, transactionAmount)
     init()
     updateLocalStorage()
     cleanValueInputs()
}

formEl.addEventListener('submit', formSubmit)













