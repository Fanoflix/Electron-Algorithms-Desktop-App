const { app } = require('electron');
const electron = require('electron');
const {ipcRenderer} = electron;


// caching HTML references
const matrix = document.querySelector('.matrix');

// event listeners
matrix.addEventListener('click', playAlgorithm);

function playAlgorithm(event) {
    if (event.target.className !== 'matrix') {
        ipcRenderer.send('createInput', event.target.className);
    }
}