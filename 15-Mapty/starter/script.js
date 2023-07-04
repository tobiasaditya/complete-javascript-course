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

class Workout {
    date = new Date()
    id = (Date.now() + "").slice(-10)

    constructor(coords, distance, duration) {
        this.coords = coords //in [lat,long]
        this.distance = distance //in km
        this.duration = duration //in minutes

    }
}

class Running extends Workout {
    name = "Running"
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence
        this.pace = this.calcPace()
    }

    calcPace() {
        // minutes/km
        return this.duration / this.distance
    }
}

class Cycling extends Workout {
    name = "Cycling"
    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration)
        this.elevation = elevation
        this.speed = this.calcSpeed()

    }

    calcSpeed() {
        // km/hour
        return this.distance / (this.duration / 60)
    }
}


const app = new App()

// const run1 = new Running([10, 10], 10, 60, 15)
// const cycle1 = new Cycling([10, 10], 20, 120, 10)
// console.log(run1)
// console.log(cycle1)