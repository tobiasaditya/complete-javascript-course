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

let map
let mapEvent

class App {
    #map
    #mapEvent
    constructor() {
        this._getPosition()

        form.addEventListener('submit', this._newWorkout.bind(this))

        inputType.addEventListener('change', this._toggleElevationField.bind(this))

    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
            alert("Couldn't get position")
        })
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords
        console.log(latitude, longitude)

        this.#map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);



        //Handling click on map
        this.#map.on('click', this._showForm.bind(this))

    }

    _showForm(event) {
        this.#mapEvent = event
        form.classList.remove("hidden")
        inputDistance.focus()
    }

    _toggleElevationField(event) {
        event.preventDefault()
        inputElevation.closest(".form__row").classList.toggle('form__row--hidden')
        inputCadence.closest(".form__row").classList.toggle('form__row--hidden')
    }

    _newWorkout(event) {
        event.preventDefault()
        //Display the marker
        const { lat, lng } = this.#mapEvent.latlng
        L.marker([lat, lng]).addTo(this.#map)
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
    }
}


const app = new App()