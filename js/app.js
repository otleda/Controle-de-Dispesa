const transactionsEl = document.querySelector('#transactions')
const currentValueDisplayEl = document.querySelector('#balance')
const incomeDisplayEl = document.querySelector('#money-plus')
const expenseDisplayEl = document.querySelector('#money-minus')
const formEl = document.querySelector('#form')
const impuTextValueEL = document.querySelector('#text')
const imputAmountValueEl = document.querySelector('#amount')

const dummyTransaction = [ 
     {id: 1, name: 'Violao folk', amount: - 900},
     {id: 2, name: 'Salario', amount: 3500},
     {id: 3, name: 'Freela', amount: 250},   
     {id: 4, name: 'Jobs Design', amount: 150},
     {id: 5, name: 'Mercado', amount: - 150},
     {id: 6, name: 'Jobs Developer', amount: 1150},
     {id: 7, name: '01-Pcl notbook', amount: - 250},
     {id: 8, name: 'Academia', amount: - 100},
]

const removeValue = ID => {
     dummyTransaction = dummyTransaction.filter(transaction => transaction.id != ID)
     init() 
}

const addTransactionIntoDom = (value) => {
     const operator = value.amount < 0 ? '-' : '+'
     const cssClass = value.amount < 0 ? 'minus' : 'plus'
     const removeOperatoAmount = Math.abs(value.amount)
     const li = document.createElement('li')
     li.classList.add(cssClass)

     li.innerHTML = `
          ${value.name}<span>${operator} R$ ${removeOperatoAmount}</span>
          <button class="delete-btn" onClick="removeValue(${value.id})">
               x
          </button>
     `
     transactionsEl.append(li)
}

const updateBalanceValues = () => {
     const valueAmounts = dummyTransaction
          .map(value => value.amount)

     const currentValue = valueAmounts
          .reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
     
     const income = valueAmounts
          .filter((value) => value > 0)
          .reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
     
     const expense = Math.abs(valueAmounts
          .filter((value) => value < 0)
          .reduce((accumulator, value) => accumulator + value, 0))
          .toFixed(2)

     currentValueDisplayEl.textContent = `R$ ${currentValue}`
     incomeDisplayEl.textContent = `R$ ${income}`
     expenseDisplayEl.textContent = `R$ ${expense}`
}

const init = () => {
     transactionsEl.innerHTML = ''
     dummyTransaction.forEach(addTransactionIntoDom)
     updateBalanceValues()
}
init()


const generatorID = () => Math.round(Math.random() * 1000)

formEl.addEventListener('submit', event => {
     event.preventDefault()

     const imputTextValue = impuTextValueEL.value.trim()
     const imputAmountValue = imputAmountValueEl.value.trim()

     if(imputTextValue === ''|| imputAmountValue === '') {
          alert('Por favor inserir os valores nos campos')
          return
     }

     const transaction = {
          id: generatorID(), 
          name: imputTextValue, 
          amount: Number(imputAmountValue)
     }
     
     dummyTransaction.push(transaction)
     init()
     impuTextValueEL.value = ''
     imputAmountValueEl.value = ''
})













