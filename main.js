const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

process.env.MODE_ENV = 'development';

// WINDOWS
let loadingWindow;
let mainWindow;
let lcsWindow;


app.on('ready', () => {

    // Making loading window
    loadingWindow = new BrowserWindow({
        width: 320,
        height: 370,
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
        
        mainWindow = new BrowserWindow({
            backgroundColor: "#000000",
            webPreferences: {
                nodeIntegration: true,
            }
        });

        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/index.html")
        }));

        // Setting mainWindow properties
        mainWindow.setMinimumSize(980, 900);
        mainWindow.setMaximumSize(980, 900);
        mainWindow.center();
        // When user closes the main window, the app shuts down
        mainWindow.on('closed', () => {
            app.quit();
        });

        loadingWindow.close(); // This line must be the last line in the timeout function or every window will be closed (think why, future Ammar might forget)

    }, 1000)
    
    // Replace the default menu tabs on the top
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

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
    },
    {
        label: 'Info',
        submenu: [
            {
                label: 'About',
                click() {
                    // Show information about author
                }
            }
        ]
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
