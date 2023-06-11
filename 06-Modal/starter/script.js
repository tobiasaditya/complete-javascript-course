'use strict';

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const closeModal = document.querySelector('.close-modal')
const showModal = document.querySelectorAll('.show-modal')

function enableModal() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
function disableModal() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

function disableModalKeys(event) {
    if (event.key != "Escape" || modal.classList.contains('hidden')) {
        return
    }
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}


for (const s of showModal) {
    s.addEventListener('click', enableModal)
}

closeModal.addEventListener('click', disableModal)
overlay.addEventListener('click', disableModal)

document.addEventListener('keydown', disableModalKeys)