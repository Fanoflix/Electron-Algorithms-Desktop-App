
const electron = require('electron');
const {ipcRenderer} = electron;

// caching HTML references
const matrix = document.querySelector('.matrix');
matrix.addEventListener('click', playAlgorithm);

function playAlgorithm(event) {
    if (event.target.className !== 'matrix') {
        console.log(event.target.className + '  Clicked INSIDE')
    }
}