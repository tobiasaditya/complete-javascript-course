'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const map = L.map('map').setView([0, 0], 13);
let mapEvent


navigator.geolocation.getCurrentPosition(function (position) {
    // console.log(position)
    const { latitude, longitude } = position.coords
    console.log(latitude, longitude)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //Handling click on map
    map.on('click', function (e) {
        mapEvent = e
        form.classList.remove("hidden")
        inputDistance.focus()

        console.log(mapEvent)


    })
}, function () {
    alert("Couldn't get position")
})

form.addEventListener('submit', function (e) {
    e.preventDefault()
    //Display the marker
    const { lat, lng } = mapEvent.latlng
    L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup'
        }))
        .setPopupContent("Running!")
        .openPopup();

    // form.classList.add("hidden")
    //Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ""
})

inputType.addEventListener('change', function (e) {
    e.preventDefault()
    console.log(e)
    inputElevation.closest(".form__row").classList.toggle('form__row--hidden')
    inputCadence.closest(".form__row").classList.toggle('form__row--hidden')

})