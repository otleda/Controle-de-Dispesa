const transactionsEl = document.querySelector('#transactions')
const currentValueDisplayEl = document.querySelector('#balance')
const incomeDisplayEl = document.querySelector('#money-plus')
const expenseDisplayEl = document.querySelector('#money-minus')

console.log({currentValueDisplayEl, incomeDisplayEl, expenseDisplayEl})

const dummyTransaction = [ 
     {id: 1, name: 'Violao folk', amount: - 900},
     {id: 2, name: 'Salario', amount: 3500},
     {id: 3, name: 'Freela', amount: 250},
     {id: 4, name: 'Jobs Design', amount: 150},
     {id: 5, name: 'Mercado', amount: - 150},
     {id: 6, name: 'Jobs Developer', amount: 1150},
     {id: 7, name: '01-Pcl notbook', amount: - 250},
     {id: 8, name: 'Academia', amount: - 100},
];

const addTransactionIntoDom = (value) => {

     const operator = value.amount < 0 ? '-' : '+'
     const cssClass = value.amount < 0 ? 'minus' : 'plus'

     const removeOperatoAmount = Math.abs(value.amount)

     const li = document.createElement('li')

     li.classList.add(cssClass)
     li.innerHTML = `
          ${value.name}<span>${operator} R$${removeOperatoAmount}</span><button class="delete-btn">x</button>
     `
     transactionsEl.append(li)
}

/*Pegando valores da chave amount de dentro da array de obj dummyTransaction[],
com map(), passando o reduce(), para somar todos os valores e passando toFIxed()
para acrescentar duas casas decimais.
*/
const updateBalanceValues = () => {
     const valueAmounts = dummyTransaction
          .map(value => value.amount)

     const currentValue = valueAmounts
          .reduce((accumulator, value) => accumulator + value, 0)
          .toFixed(2)

     const income = valueAmounts
          .filter((value) => value > 0)
          .reduce((accumulator, value) => accumulator + value, 0)
          .toFixed(2)
     
     const expense = valueAmounts
          .filter((value) => value < 0)
          .reduce((accumulator, value) => accumulator + value, 0)
          .toFixed(2)

     //add os valores nos display da aplicacao
     currentValueDisplayEl.textContent = `R$ ${currentValue}`
     incomeDisplayEl.textContent = `R$ ${income}`
     expenseDisplayEl.textContent = `R$ ${expense}`

     console.log(`
          Despesas ${expense}, 
          Receita ${income}, 
          Saldo atual ${currentValue}
          `);
}

const init = () => {
     dummyTransaction
          .forEach(addTransactionIntoDom)

     updateBalanceValues()
}
init()

