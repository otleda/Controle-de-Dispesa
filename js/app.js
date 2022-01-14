const transactionsUl = document.querySelector('#transactions')

const dummyTransaction = [ 
     {id: 1, name: 'corda de violao', amount: - 35},
     {id: 2, name: 'salario', amount: 3.500},
     {id: 3, name: 'freela', amount: 250},
     {id: 4, name: 'mercado', amount: - 150},
];

const addTransactionIntoDom = (transaction) => {

     const operator = transaction.amount < 0 ? '-' : '+'
     const cssClass = transaction.amount < 0 ? 'minus' : 'plus'
     const removeOperatoAmount = Math.abs(transaction.amount)
     const li = document.createElement('li')

     li.classList.add(cssClass)
     li.innerHTML = `
          ${transaction.name}<span>${operator} R$${removeOperatoAmount}</span><button class="delete-btn">x</button>
     `
     transactionsUl.append(li)
}

const updateBalanceValues = () => {
     const transactionsAmounts = dummyTransaction.map((value) => value.amount)
     console.log(transactionsAmounts);
}

const init = () => {
     dummyTransaction.forEach(addTransactionIntoDom)
     updateBalanceValues()
}

init()

