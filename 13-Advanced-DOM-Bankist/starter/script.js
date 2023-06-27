'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
    event.preventDefault()
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (v, i) {
    v.addEventListener('click', openModal)
})

// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


// ///lecture
// //Select elements
// console.log(document.documentElement)
// console.log(document.head)
// console.log(document.body)

// const header = document.querySelector(".header")
// const allSections = document.querySelectorAll(".section")

// console.log(allSections)

// console.log(document.getElementById("section--1"))
// const allButtons = document.getElementsByTagName("button")
// console.log(allButtons)

// console.log(document.getElementsByClassName("btn"))

// //Create and insert element
// // insertAdjacentHTML

// const message = document.createElement('div')
// message.classList.add("cookie-message")
// message.textContent = "We use cookies for I don't know what."
// message.innerHTML = "We use cookies for I don't know what. <button class='btn btn--close-cookie'> Got it! </button?>"

// // header.prepend(message)
// // header.append(message.cloneNode(true))
// header.append(message)

// header.before(message)
// header.after(message)

// //Delete elements

// document.querySelector(".btn--close-cookie").addEventListener('click', (e) => {
//     message.remove()
// })


// //Styles
// message.style.backgroundColor = "#37383d"
// message.style.width = '120%'
// console.log(message.style.width)

// console.log(getComputedStyle(message).height)


// document.documentElement.style.setProperty("--color-primary", "orangered")


// //Attribute
// const logo = document.querySelector(".nav__logo")
// logo.alt = "Coba set alt logo"
// logo.setAttribute('alt', "Dari method")
// console.log(logo.getAttribute('alt'))
// console.log(logo.getAttribute('class'))

// //Data Attribute
// console.log(logo.dataset)


const buttonScrollTo = document.querySelector(".btn--scroll-to")
const section1 = document.getElementById("section--1")

buttonScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect()
    console.log(s1coords)
    console.log(e.target.getBoundingClientRect())
    console.log("Current Scroll ", scrollX, scrollY)

    //Scrolling
    //Old way
    // window.scrollTo({
    //     left: s1coords.left,
    //     top: s1coords.top + scrollY, //ditambah Y biar jadi posisi absolut section1 ga peduli scrollnya
    //     behavior: 'smooth'
    // })

    //Newer Way
    section1.scrollIntoView({ behavior: 'smooth' })
})
