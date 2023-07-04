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
    #workouts = []
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

    _hideForm() {
        form.style.display = 'none' //biar ilang langsung tanpa animasi(?)
        form.classList.add("hidden")
        setTimeout(() => { form.style.display = 'grid' }, 1000)

        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ""

    }

    _toggleElevationField(event) {
        event.preventDefault()
        inputElevation.closest(".form__row").classList.toggle('form__row--hidden')
        inputCadence.closest(".form__row").classList.toggle('form__row--hidden')
    }

    _newWorkout(event) {
        const validInputs = (...inputs) => inputs.every(i => Number.isFinite(i) && i > 0)

        event.preventDefault()

        const { lat, lng } = this.#mapEvent.latlng


        //Get data from form and validate
        //Create object based on corresponding type (Running/Cycling)

        const type = inputType.value

        const distance = parseFloat(inputDistance.value)
        const duration = parseFloat(inputDuration.value)

        let workout
        if (type === "running") {
            const cadence = parseFloat(inputCadence.value)
            if (!validInputs(distance, duration, cadence)) {
                alert("Invalid input")
                console.log(distance, duration, cadence)
                return
            }
            workout = new Running([lat, lng], distance, duration, cadence)

        } else {
            const elevation = parseFloat(inputElevation.value)
            if (!validInputs(distance, duration, elevation)) {
                alert("Invalid input")
                console.log(distance, duration, elevation)
                return
            }
            workout = new Cycling([lat, lng], distance, duration, elevation)
        }

        //Add new object to workout array
        this.#workouts.push(workout)
        //Render marker
        this._renderWorkoutMarker(workout)

        //Render worker list
        this._renderWorkout(workout)
        console.log(workout.getDescription())
        //Hide form, clear input field
        this._hideForm()

    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.name}-popup`
            }))
            .setPopupContent(workout.getDescription())
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.name}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.getDescription()}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.name === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div >
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`

        if (workout.name === 'running') {
            html +=
                `<div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li > `
        }
        else {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevation}</span>
                <span class="workout__unit">m</span>
            </div>
            </li>`
        }

        form.insertAdjacentHTML('afterend', html)


    }
}

class Workout {
    date = new Date()
    id = (Date.now() + "").slice(-10)

    constructor(coords, distance, duration, name) {
        this.coords = coords //in [lat,long]
        this.distance = distance //in km
        this.duration = duration //in minutes
        this.name = name
    }

    getDescription() {
        this.description = `${this.name.toUpperCase()[0]}${this.name.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()} `
        return this.description
    }


}

class Running extends Workout {
    name = "running"
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration, "running")
        this.cadence = cadence
        this.pace = this.calcPace()
    }

    calcPace() {
        // minutes/km
        return this.duration / this.distance
    }
}

class Cycling extends Workout {
    name = "cycling"
    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration, "cycling")
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