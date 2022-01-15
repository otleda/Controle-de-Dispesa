const transactionsUl = document.querySelector('#transactions')

const dummyTransaction = [ 
     {id: 1, name: 'Violao folk', amount: - 835},
     {id: 2, name: 'Salario', amount: 3500},
     {id: 3, name: 'Freela', amount: 250},
     {id: 4, name: 'Mercado', amount: - 150},
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
     transactionsUl.append(li)
}

/*Pegando valores da chave amount de dentro da array de obj dummyTransaction[],
com map(), passando o reduce(), para somar todos os valores e passando toFIxed()
para acrescentar duas casas decimais.
*/
const updateBalanceValues = () => {
     const valueAmounts = dummyTransaction.map(value => value.amount)

     console.log(valueAmounts);
     const total = valueAmounts.reduce((accumulator, value) => accumulator + value, 0).toFixed(2)

     console.log(total);
}

const init = () => {
     dummyTransaction.forEach(addTransactionIntoDom)
     updateBalanceValues()
}

init()

