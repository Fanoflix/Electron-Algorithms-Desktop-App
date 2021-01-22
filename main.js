const electron = require('electron');
const url = require('url');
const path = require('path');
const { ipcRenderer } = require('electron');

const {app, BrowserWindow, Menu, ipcMain, screen} = electron;

process.env.NODE_ENV = 'production';

// WINDOWS
let loadingWindow;
let mainWindow;
let ExecutionWindow;


app.on('ready', () => {

    // Making loading window
    loadingWindow = new BrowserWindow({
        width: 320,
        height: 450,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    loadingWindow.setResizable(false);
    
    
    // Show loading screen
    loadingWindow.loadURL(url.format({
        pathname: path.join(__dirname, './templates/loading.html')
    }));

    
    setTimeout( () => { // After 3 sec, show the main window amd close the loading window

        // SCREEN API
        let display = screen.getPrimaryDisplay();
        let currentScreenWidth;
        currentScreenWidth = display.bounds.width;
        currentScreenWidth -= 980;
        currentScreenWidth /= 2;
        // ==========================


        mainWindow = new BrowserWindow({
            backgroundColor: "#000000",
            darkTheme: true,
            webPreferences: {
                nodeIntegration: true,
            }
        });
        

        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/index.html")
        }));

        mainWindow.on('closed', () => {
            app.quit();
        });

        // ---------- UN COMMENT -----------
        // Setting mainWindow properties
        mainWindow.setMinimumSize(980, 900);
        mainWindow.setMaximumSize(980, 900);
        mainWindow.setPosition(currentScreenWidth, 0) // this was one big pain to find out. mainWindow.center() did not work after setting max and min sizes. Had to use the screen API to find the width of the user's display, then subtracted the window's width from it, then divided it by 2. And then used the mainWindow.setPosition(x, y[,animate]) function to manually set the screen's position. Bruh.

        // When user closes the main window, the app shuts down
        mainWindow.on('closed', () => {
            app.quit();
        });

        loadingWindow.close(); // This line must be the last line in the timeout function or every window will be closed (think why, future Ammar might forget)
        loadingWindow = null;
    }, 3000)
    
    // Replace the default menu tabs on the top
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

// ==============  Create Input Window ==============
ipcMain.on('createInput', (event, data) => {
    ExecutionWindow = new BrowserWindow({
        // width: 1000,
        // height: 860,
        backgroundColor: '#171616',
        opacity: 1,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    ExecutionWindow.maximize();
    
    if (data == 'box LCS') {
        ExecutionWindow.title = "Longest Common Sub Sequence " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/LCS.html")
        }));
    }
    else if (data == 'box SCS') {
        ExecutionWindow.title = "Shortest Common Sub Sequence " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/SCS.html")
        }));
    }
    else if (data == 'box LD') {
        ExecutionWindow.title = "Levenshtein Distance " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/LD.html")
        }));
    }
    else if (data == 'box LIS') {
        ExecutionWindow.title = "Longest Increasing Subsequence " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/LIS.html")
        }));
    }
    else if (data == 'box MCM') {
        ExecutionWindow.title = "Matrix Chain Multiplication " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/MCM.html")
        }));
    }
    else if (data == 'box KP') {
        ExecutionWindow.title = "0/1 Knapsack Problem " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/KP.html")
        }));
    }
    else if (data == 'box PP') {
        ExecutionWindow.title = "Partition Problem " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/PP.html")
        }));
    }
    else if (data == 'box RCP') {
        ExecutionWindow.title = "Rod Cutting Problem " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/RCP.html")
        }));
    }
    else if (data == 'box CCM') {
        ExecutionWindow.title = "Coin-change Problem " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/CCM.html")
        }));
    }
    else if (data == 'box WBP') {
        ExecutionWindow.title = "Word Break Problem " + "- Select Input";
        ExecutionWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/WBP.html")
        }));
    }
    else if (data == 'box close') {
        app.quit();
    }

    ExecutionWindow.on('closed', () =>{
        ExecutionWindow = null;
    })

});
// Menus are array of objects
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Quit',
                accelerator: "CmdOrCtrl+Q",
                click() {
                    app.quit()
                }
            }
        ],
    }
];

// Handling Mac menu bug
if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({})
};

// Developer tools accessible if in development
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push ({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Dev Tools',
                accelerator: "CmdOrCtrl+I",
                click(item, currentWindow) {
                    currentWindow.toggleDevTools();
                }
            }
        ]
    });
}
