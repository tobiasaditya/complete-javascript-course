'use strict';

function Person(firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
}


const orang = new Person("nama", 1998)

Person.prototype.calcAge = function () {
    console.log(2023 - this.birthYear)
}

orang.calcAge()


//Coding Challenge #1

function Car(make, speed) {
    this.make = make
    this.speed = speed
}

Car.prototype = {
    accelerate() {
        this.speed += 10
        console.log("Accel ! Current Speed : " + this.speed)
    },
    brake() {
        this.speed -= 5
        console.log("Break ! Current Speed : " + this.speed)
    }
}

const car1 = new Car("BWW", 10)
car1.accelerate()
car1.accelerate()
car1.brake()


class CarCl {
    constructor(make, speed) {
        this.make = make
        this.speed = speed
    }

    accelerate() {
        this.speed += 10
        console.log("Accel ! Current Speed : " + this.speed)
    }
    brake() {
        this.speed -= 5
        console.log("Break ! Current Speed : " + this.speed)
    }

    get speedUS() {
        return this.speed / 1.6
    }

    set speedUS(speed) {
        this._speed = speed * 1.6
    }

}


const carKelas = new CarCl("Toyota", 10)
console.log(carKelas)
carKelas.accelerate()
carKelas.brake()
console.log(carKelas.make)


function ElectricVehicle(make, speed, charge) {
    Car.call(this, make, speed)
    this.charge = charge
}

ElectricVehicle.prototype = Object.create(Car.prototype)
ElectricVehicle.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo
}

ElectricVehicle.prototype.accelerate = function () {
    this.speed += 20
    this.charge -= 1
    console.log(`${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}%`)
}

const tesla = new ElectricVehicle("Tesla", 10, 10)

console.log(tesla)
tesla.accelerate()
tesla.chargeBattery(90)
console.log(tesla)
tesla.accelerate()


class ElectricVehicleCl extends CarCl {

    #nama = ""
    constructor(make, speed, charge) {
        super(make, speed)
        this.charge = charge
    }

    chargeBattery(chargeTo) {
        this.charge = chargeTo
    }

    accelerate() {
        this.speed += 20
        this.charge -= 1
        console.log(`${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}%`)
        this.#privateFunction()
    }

    #privateFunction() {
        console.log("Coba private")
    }

    static helper() {
        console.log("Helper static method")
    }
}

const wuling = new ElectricVehicleCl("Wuling", 20, 50)
wuling.chargeBattery(100)
wuling.accelerate()

ElectricVehicleCl.helper()