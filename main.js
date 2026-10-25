/**
 * Neon Pulse: Precision Speedrun Edition
 * Electron main process (desktop / Steam build)
 *
 * - The game page runs sandboxed (contextIsolation on, nodeIntegration off). It talks to
 *   this process only through the small API in preload.js.
 * - Steamworks (steamworks.js) is initialised here, once, and the Steam overlay is enabled.
 * - Set your Steam App ID in package.json ("steamAppId") or in steam_appid.txt next to the
 *   executable. When the game is launched from Steam, Steam provides it automatically.
 */

const { app, BrowserWindow, ipcMain, screen, shell, clipboard, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const IS_DEV = !app.isPackaged || process.argv.includes('--dev');

// ---------------------------------------------------------------------------
// Steamworks
// ---------------------------------------------------------------------------
let steamworks = null;
let steamClient = null;
let steamAppId = 0;

function readSteamAppId() {
    if (process.env.SteamAppId) return parseInt(process.env.SteamAppId, 10) || 0;
    try {
        const pkg = require('./package.json');
        if (pkg.steamAppId) return parseInt(pkg.steamAppId, 10) || 0;
    } catch (e) { /* ignore */ }
    const candidates = [
        path.join(path.dirname(process.execPath), 'steam_appid.txt'),
        path.join(__dirname, 'steam_appid.txt'),
        path.join(process.cwd(), 'steam_appid.txt')
    ];
    for (const file of candidates) {
        try {
            const id = parseInt(fs.readFileSync(file, 'utf8').trim(), 10);
            if (id) return id;
        } catch (e) { /* not found */ }
    }
    return 0;
}

function initSteam() {
    try {
        steamworks = require('steamworks.js');
    } catch (e) {
        console.log('[Steam] steamworks.js not installed — running DRM-free without Steam features.');
        return;
    }
    try {
        steamAppId = readSteamAppId();
        steamClient = steamAppId ? steamworks.init(steamAppId) : steamworks.init();
        console.log('[Steam] Steamworks initialised. AppID:', steamAppId || '(from Steam)');
    } catch (e) {
        steamClient = null;
        console.log('[Steam] Steam client not running or App ID missing — continuing without Steam.', e && e.message);
    }
}

function steamCall(fn, fallback) {
    if (!steamClient) return fallback;
    try { return fn(steamClient); } catch (e) { console.warn('[Steam]', e && e.message); return fallback; }
}

// Must be called before the app is ready so the overlay can hook the renderer.
initSteam();
if (steamworks && typeof steamworks.electronEnableSteamOverlay === 'function') {
    try { steamworks.electronEnableSteamOverlay(); } catch (e) { console.warn('[Steam] overlay', e && e.message); }
}

// ---------------------------------------------------------------------------
// Window
// ---------------------------------------------------------------------------
let mainWindow = null;
const BASE_W = 1280;
const BASE_H = 720;

const prefsFile = () => path.join(app.getPath('userData'), 'window-prefs.json');
function loadWindowPrefs() {
    try { return JSON.parse(fs.readFileSync(prefsFile(), 'utf8')) || {}; } catch (e) { return {}; }
}
function saveWindowPrefs(prefs) {
    try { fs.writeFileSync(prefsFile(), JSON.stringify(prefs)); } catch (e) { /* ignore */ }
}

// Scale the whole UI with the window so menus stay readable at 1080p/1440p/4K
function applyUiZoom() {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    const [w, h] = mainWindow.getContentSize();
    const zoom = Math.max(0.75, Math.min(3, Math.min(w / BASE_W, h / BASE_H)));
    mainWindow.webContents.setZoomFactor(zoom);
}

function createWindow() {
    const prefs = loadWindowPrefs();
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: Math.min(BASE_W, width),
        height: Math.min(BASE_H, height),
        minWidth: 960,
        minHeight: 540,
        useContentSize: true,
        backgroundColor: '#030712',
        autoHideMenuBar: true,
        fullscreen: !!prefs.fullscreen || process.argv.includes('--fullscreen'),
        title: 'Neon Pulse Speedrun',
        ...(fs.existsSync(path.join(__dirname, 'build', 'icon.png')) ? { icon: path.join(__dirname, 'build', 'icon.png') } : {}),
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            devTools: IS_DEV,
            spellcheck: false,
            backgroundThrottling: false
        }
    });

    if (!IS_DEV) Menu.setApplicationMenu(null);

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        applyUiZoom();
    });
    mainWindow.on('resize', applyUiZoom);
    mainWindow.webContents.on('did-finish-load', applyUiZoom);

    const notifyFs = () => {
        if (!mainWindow || mainWindow.isDestroyed()) return;
        const on = mainWindow.isFullScreen();
        saveWindowPrefs({ ...loadWindowPrefs(), fullscreen: on });
        mainWindow.webContents.send('win:fullscreen-changed', on);
        setTimeout(applyUiZoom, 50);
    };
    mainWindow.on('enter-full-screen', notifyFs);
    mainWindow.on('leave-full-screen', notifyFs);

    // Never navigate the game window away or open new Electron windows; send web links to the browser
    mainWindow.webContents.on('will-navigate', (e, url) => {
        if (!url.startsWith('file://')) e.preventDefault();
    });
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (/^https:\/\//i.test(url)) shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.on('closed', () => { mainWindow = null; });
}

// ---------------------------------------------------------------------------
// IPC API used by preload.js
// ---------------------------------------------------------------------------
const safeName = (s) => String(s || '').replace(/[^A-Za-z0-9_.-]/g, '_').slice(0, 64);

ipcMain.on('steam:info', (e) => {
    e.returnValue = {
        available: !!steamClient,
        appId: steamAppId || steamCall(c => c.utils.getAppId(), 0),
        name: steamCall(c => c.localplayer.getName(), null),
        isSteamDeck: steamCall(c => !!(c.utils && c.utils.isSteamRunningOnSteamDeck && c.utils.isSteamRunningOnSteamDeck()), false),
        isDev: IS_DEV
    };
});

ipcMain.handle('steam:achievement', (_e, id) => {
    const name = safeName(id);
    return steamCall(c => {
        // steamworks.js activate() sets the achievement and stores stats (shows the Steam popup)
        return !!c.achievement.activate(name);
    }, false);
});

ipcMain.on('steam:rich-presence', (_e, key, value) => {
    steamCall(c => c.localplayer.setRichPresence(String(key).slice(0, 64), value == null ? null : String(value).slice(0, 255)));
});

ipcMain.handle('steam:cloud-write', (_e, name, content) => {
    return steamCall(c => c.cloud.writeFile(safeName(name), String(content)), false);
});

ipcMain.on('steam:cloud-read', (e, name) => {
    e.returnValue = steamCall(c => {
        const file = safeName(name);
        const exists = typeof c.cloud.fileExists === 'function' ? c.cloud.fileExists(file) : true;
        return exists ? c.cloud.readFile(file) : null;
    }, null);
});

ipcMain.on('win:toggle-fullscreen', (e) => {
    if (mainWindow) mainWindow.setFullScreen(!mainWindow.isFullScreen());
    e.returnValue = mainWindow ? mainWindow.isFullScreen() : false;
});
ipcMain.on('win:set-fullscreen', (e, on) => {
    if (mainWindow) mainWindow.setFullScreen(!!on);
    e.returnValue = !!on;
});
ipcMain.on('win:is-fullscreen', (e) => {
    e.returnValue = mainWindow ? mainWindow.isFullScreen() : false;
});

ipcMain.on('clipboard:write', (_e, text) => { clipboard.writeText(String(text).slice(0, 200000)); });
ipcMain.on('clipboard:read', (e) => { e.returnValue = clipboard.readText().slice(0, 200000); });

ipcMain.on('shell:open-external', (_e, url) => {
    if (/^https:\/\//i.test(String(url))) shell.openExternal(String(url));
});

ipcMain.on('app:quit', () => app.quit());

// ---------------------------------------------------------------------------
// App lifecycle
// ---------------------------------------------------------------------------
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
