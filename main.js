const electron = require('electron');
const url = require('url');
const path = require('path');


const {app, BrowserWindow, Menu, ipcMain, screen} = electron;

process.env.MODE_ENV = 'development';

// WINDOWS
let loadingWindow;
let mainWindow;
let LcsInputWindow;
let ScsInputWindow;


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

    }, 1000)
    
    // Replace the default menu tabs on the top
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

// ==============  Create Input Window ==============
ipcMain.on('createInput', (event, data) => {
    console.log(data)
    if (data == 'box LCS') {
        LcsInputWindow = new BrowserWindow({
            width: 1000,
            height: 860,
            backgroundColor: '#171616',
            opacity: 1,
            title: "Longest Common Subsequence - Select Input",
            webPreferences: {
                nodeIntegration: true,
            }
        });

        LcsInputWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/selectionTemplates/lcsInput.html")
        }));

    }
    else if (data == 'box SCS') {
        ScsInputWindow = new BrowserWindow({
            width: 500,
            height: 600,
            backgroundColor: '#171616',
            opacity: 1,
            title: "Shortest Common Subsequence - Select Input",
            webPreferences: {
                nodeIntegration: true,
            }
        });

        ScsInputWindow.loadURL(url.format({
            pathname: path.join(__dirname, "./templates/selectionTemplates/scsInput.html")
        }));
    }
});

// // ==============  Run Algorithm  ==============
// ipcMain.on('executeAlgo', (event, data) => {
//     console.log(data.name + ' -- str1: ' + data.str1 + ' -- str2: ' + data.str2 );
//     if (data.name == 'LCS') {
//         LcsInputWindow.webContents.send('LCS', data)
//     }
// });




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
