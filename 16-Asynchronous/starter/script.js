'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function renderCountry(responseCountry) {
    const html = `
        <article class="country">
          <img class="country__img" src="${responseCountry.flag}" />
          <div class="country__data">
            <h3 class="country__name">${responseCountry.name}</h3>
            <h4 class="country__region">${responseCountry.region}</h4>
            <p class="country__row"><span>👫</span>${(parseInt(responseCountry.population) / 1000000).toFixed(1)} M</p>
            <p class="country__row"><span>🗣️</span>${responseCountry.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${responseCountry.currencies[0].name}</p>
          </div>
        </article>
    `

    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1
}

function getCountryDataByCode(countryCode) {
    const request = new XMLHttpRequest()
    request.open("GET", "https://restcountries.com/v2/alpha/" + countryCode)
    request.send()
    request.addEventListener('load', function (e) {
        const response = JSON.parse(request.responseText)
        // console.log(response)
        renderCountry(response)

    })

}

function getCountryData(countryName) {
    // Old school way
    const request = new XMLHttpRequest()
    request.open("GET", "https://restcountries.com/v2/name/" + countryName)
    request.send()

    request.addEventListener('load', function (e) {
        const [response] = JSON.parse(this.responseText)
        // console.log(response)
        renderCountry(response)

        //Render neighbour country
        const neighbour = response.borders?.[0]

        if (!neighbour) {
            return
        }

        getCountryDataByCode(neighbour)


    })
}

// getCountryData("indonesia")
// getCountryData("netherland")
// getCountryData("sweden")
///////////////////////////////////////

function getCountryData2(countryName) {
    fetch("https://restcountries.com/v2/name/" + countryName)
        .then(response => response.json())
        .then(data => {
            renderCountry(data[0])
            //Render neighbour country
            const neighbour = data[0].borders?.[0]

            if (!neighbour) {
                return
            }

            getCountryDataByCode2(neighbour)
        })
        .catch(err => {
            console.error(`${err} ckckck`)
            renderError(`Something went wrong ${err}`)

        })
        .finally(() => {
            console.log("Finally!")
        })
}

function getCountryDataByCode2(countryCode) {
    fetch("https://restcountries.com/v2/alpha/" + countryCode)
        .then(response => response.json())
        .then(data => {
            renderCountry(data)
        })
        .catch(err => {
            console.error(`${err} hadeh`)
            renderError(`Something went wrong ${err}`)
        })
        .finally(() => {
            console.log("Finally!")
        })
}

function renderError(message) {
    countriesContainer.insertAdjacentText('beforeend', message)
    countriesContainer.style.opacity = 1
}

btn.addEventListener('click', function (e) {
    getCountryData2("usa")
})

