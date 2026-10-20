/**
 * Neon Pulse: Precision Speedrun Edition
 * Preload bridge (runs with contextIsolation). Exposes a tiny, safe API to the game page as
 * window.neonDesktop. The page itself never gets Node.js access.
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('neonDesktop', {
    isDesktop: true,
    platform: process.platform,

    // Steam
    steamInfo: () => ipcRenderer.sendSync('steam:info'),
    activateAchievement: (id) => ipcRenderer.invoke('steam:achievement', String(id)),
    setRichPresence: (key, value) => ipcRenderer.send('steam:rich-presence', String(key), value == null ? null : String(value)),
    cloudWrite: (name, content) => ipcRenderer.invoke('steam:cloud-write', String(name), String(content)),
    cloudRead: (name) => ipcRenderer.sendSync('steam:cloud-read', String(name)),

    // Window
    toggleFullscreen: () => ipcRenderer.sendSync('win:toggle-fullscreen'),
    setFullscreen: (on) => ipcRenderer.sendSync('win:set-fullscreen', !!on),
    isFullscreen: () => ipcRenderer.sendSync('win:is-fullscreen'),
    onFullscreenChange: (cb) => {
        if (typeof cb !== 'function') return;
        ipcRenderer.on('win:fullscreen-changed', (_e, on) => cb(!!on));
    },

    // Misc
    clipboardWrite: (text) => ipcRenderer.send('clipboard:write', String(text)),
    clipboardRead: () => ipcRenderer.sendSync('clipboard:read'),
    openExternal: (url) => ipcRenderer.send('shell:open-external', String(url)),
    quit: () => ipcRenderer.send('app:quit')
});
