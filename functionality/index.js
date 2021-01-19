const electron = require('electron');
const {ipcRenderer} = electron;


//  \/\/\/\/ MOVE TO THE CORRECT JS FILE WHEN DONE \/\/\/\/
import {LCS, SCS} from './algorithms/globally.js'
// /\/\/\/\ ----------------------------------- /\/\/\/\

// caching HTML references
const matrix = document.querySelector('.matrix');


// event listeners
matrix.addEventListener('click', playAlgorithm);

function playAlgorithm(event) {
    if (event.target.className !== 'matrix') {
        console.log(event.target.className + '  Clicked INSIDE')
        if (event.target.className == 'box LCS') {
            console.log(LCS('aammar', 'amamars'))
            ipcRenderer.send('createInput', event.target.className);
        }
        else if (event.target.className == 'box SCS') {
            
            console.log(SCS('aammar', 'amamars'))
            ipcRenderer.send('createInput', event.target.className);
        }
        else if (event.target.className == 'box LD') {
    
        }
        else if (event.target.className == 'box LIS') {
    
        }
        else if (event.target.className == 'box MCM') {
    
        }
        else if (event.target.className == 'box KP') {
    
        }
        else if (event.target.className == 'box PP') {
    
        }
        else if (event.target.className == 'box RCP') {
    
        }
        else if (event.target.className == 'box CCM') {
    
        }
        else if (event.target.className == 'box WBP') {
    
        }
    }

   
}