const { app, BrowserWindow } = require('electron');
const path = require('path');

//pornim apl electron
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('pages/login.html');
}

app.whenReady().then(createWindow);

//git sa simulez ca si cum am lucrat din start in git , pentru fiecare fitcher cate un branch, sa fac comituri , pool request si sa integrez in master