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


function displayMovements(movements) {
    //Clear container first
    containerMovements.innerHTML = ''
    movements.forEach(function (value, idx, _) {


        let type = value < 0 ? "withdrawal" : "deposit";

        let html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${idx} ${type}</div>
          <div class="movements__value">${value}</div>
        </div>`

        containerMovements.insertAdjacentHTML('afterbegin', html)
    })
}

displayMovements(account1.movements)

function createUsername(accounts) {
    accounts.forEach(function (account) {
        account.username = account.owner.split(" ").map(function (v, i, _) {
            return v[0]
        }).join("")
    })

}

function calcDisplayBalance(movements) {
    let balance = movements.reduce(function (accumulator, value, idx, _) {
        return accumulator + value
    }, 0)

    labelBalance.textContent = balance
}

calcDisplayBalance(account1.movements)

function calcDisplaySummary(movements) {
    let incomes = movements.filter(function (v, i) {
        if (v > 0) {
            return v
        }
    }).reduce(function (acc, v) {
        return acc + v
    }, 0)

    let outcomes = movements.filter(function (v, i) {
        if (v < 0) {
            return v
        }
    }).reduce(function (acc, v) {
        return acc + v
    }, 0)

    let interest = movements.filter(function (v, i) {
        if (v > 0) {
            return v
        }
    }).map(function (v, i) {
        return v * 1.2 / 100
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

calcDisplaySummary(account1.movements)


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