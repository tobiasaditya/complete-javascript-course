'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


function displayMovements(movements, sort = false) {
    //Clear container first
    containerMovements.innerHTML = ''

    let processedMove = sort ? movements.slice().sort((a, b) => a - b) : movements
    console.log(processedMove)
    processedMove.forEach(function (value, idx, _) {


        let type = value < 0 ? "withdrawal" : "deposit";

        let html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${idx} ${type}</div>
          <div class="movements__value">${value}</div>
        </div>`

        containerMovements.insertAdjacentHTML('afterbegin', html)
    })
}



function createUsername(accounts) {
    accounts.forEach(function (account) {
        account.username = account.owner.split(" ").map(function (v, i, _) {
            return v[0]
        }).join("").toLowerCase()
    })

}

createUsername(accounts)

function calcDisplayBalance(account) {
    let balance = account.movements.reduce(function (accumulator, value, idx, _) {
        return accumulator + value
    }, 0)

    account.currentBalance = balance

    labelBalance.textContent = balance
}



function calcDisplaySummary(account) {
    let incomes = account.movements.filter(function (v, i) {
        if (v > 0) {
            return v
        }
    }).reduce(function (acc, v) {
        return acc + v
    }, 0)

    let outcomes = account.movements.filter(function (v, i) {
        if (v < 0) {
            return v
        }
    }).reduce(function (acc, v) {
        return acc + v
    }, 0)

    let interest = account.movements.filter(function (v, i) {
        if (v > 0) {
            return v
        }
    }).map(function (v, i) {
        return v * account.interestRate / 100
    }).filter(function (v, i) {
        if (v > 1) {
            return v
        }
    }).reduce(function (acc, v) {
        return acc + v
    }, 0)


    labelSumIn.textContent = incomes
    labelSumOut.textContent = outcomes * -1
    labelSumInterest.textContent = interest

}



let currentAccount

function login(event) {
    event.preventDefault()
    let username = inputLoginUsername.value
    let pin = inputLoginPin.value

    currentAccount = accounts.find(acc => acc.username == username &&
        acc.pin == pin)
    console.log(currentAccount)

    if (currentAccount) {
        labelWelcome.textContent = "Welcome, " +
            currentAccount.owner.split(" ")[0]
        containerApp.style.opacity = 100

        refreshUI(currentAccount)
    }

    //Clear input field
    inputLoginUsername.value = null
    inputLoginPin.value = null
}

function transfer(event) {
    event.preventDefault()

    let transferAmount = Number(inputTransferAmount.value)
    let transferDestination = accounts.find(owner => owner.username == inputTransferTo.value)

    //validate amount
    if (transferAmount > 0 &&
        transferDestination &&
        currentAccount.currentBalance >= transferAmount &&
        transferDestination != currentAccount) {
        console.log(transferAmount, transferDestination)

        currentAccount.movements.push(-transferAmount)
        transferDestination.movements.push(transferAmount)

        refreshUI(currentAccount)

    }

    inputTransferAmount.value = null
    inputTransferTo.value = null
}

function closeAccount(event) {
    event.preventDefault()
    console.log(accounts)

    let inputUsername = inputCloseUsername.value
    let inputPin = Number(inputClosePin.value)

    if (currentAccount.username === inputUsername && currentAccount.pin === inputPin) {
        let accIdx = accounts.findIndex(acc => acc.username === currentAccount.username)

        if (accIdx != -1) {
            accounts.splice(accIdx, 1)
            containerApp.style.opacity = 0
        }
    }
}

function loan(event) {
    console.log("loan")
    event.preventDefault()

    let loanAmount = Number(inputLoanAmount.value)

    if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {
        console.log("boleh nih")

        currentAccount.movements.push(loanAmount)
        refreshUI(currentAccount)

    }

    inputLoanAmount.value = null


}

let sorted = false

function sortMovement(event) {
    sorted = !sorted
    event.preventDefault()
    displayMovements(currentAccount.movements, sorted)
}

function refreshUI(account) {
    displayMovements(account.movements)
    calcDisplayBalance(account)
    calcDisplaySummary(account)
}

btnLogin.addEventListener('click', login)
btnTransfer.addEventListener('click', transfer)
btnClose.addEventListener('click', closeAccount)
btnLoan.addEventListener('click', loan)
btnSort.addEventListener('click', sortMovement)



// function checkDogs(dogsJulia, dogsKate) {
//     let correctedDogsJulia = dogsJulia.slice(1, -2)
//     let allDogs = correctedDogsJulia.concat(dogsKate)

//     allDogs.forEach(function (value, idx, _) {
//         console.log(`Dog number ${idx + 1} is ${value < 3 ? "is still a puppy" : "is and adult, and is " + value + " years old"}`)
//     })
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])

// function calcAverageHumanAge(ages) {
//     let humanAges = ages.map(function (v, i) {
//         if (v <= 2) {
//             return 2 * v
//         } else {
//             return 16 + v * 4
//         }
//     })

//     let filtered = humanAges.filter(function (v, i) {
//         if (v > 18) {
//             return v
//         }
//     })

//     let avgAge = filtered.reduce(function (acc, v, i) {
//         return acc + v
//     }, 0) / filtered.length

//     console.log(humanAges)
//     console.log(filtered)
//     console.log(avgAge)
// }


// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])