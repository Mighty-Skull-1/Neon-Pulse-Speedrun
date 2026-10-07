/**
 * Neon Pulse: Precision Speedrun Edition
 * Electron Desktop App & Steamworks Entry Point (main.js)
 */

const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    mainWindow = new BrowserWindow({
        width: Math.min(1280, width),
        height: Math.min(720, height),
        minWidth: 960,
        minHeight: 540,
        backgroundColor: '#030712',
        autoHideMenuBar: true,
        title: 'Neon Pulse: Precision Speedrun Edition',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    // Attempt Steamworks initialization if available
    try {
        const steamworks = require('steamworks.js');
        if (steamworks && typeof steamworks.init === 'function') {
            const client = steamworks.init();
            console.log('[SteamDesktop] Steamworks initialized successfully! AppID:', client.appId);
        }
    } catch(err) {
        console.log('[SteamDesktop] Running without Steam client (Standalone DRM-free mode).');
    }

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
