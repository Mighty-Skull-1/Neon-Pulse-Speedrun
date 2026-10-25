/**
 * Neon Pulse: Precision Speedrun Edition
 * Steamworks & Desktop Runtime Bridge (steam_bridge.js)
 *
 * In the Electron/Steam build, preload.js exposes window.neonDesktop and all Steam calls are
 * forwarded to the main process (steamworks.js). In a normal web browser this is a no-op and
 * the in-game achievement toasts are used instead.
 *
 * Achievement IDs are sent exactly as defined in game.js ACHIEVEMENTS (e.g. "first_steps").
 * Create achievements with the same API names in the Steamworks partner site.
 */

(function (global) {
    'use strict';

    const desktop = () => (typeof global.neonDesktop === 'object' && global.neonDesktop) ? global.neonDesktop : null;

    // Mark the document as a desktop build ASAP so CSS can fill the window
    try {
        if (desktop() && global.document && global.document.documentElement) {
            global.document.documentElement.classList.add('desktop-build');
        }
    } catch (e) { /* ignore */ }

    const SteamBridge = {
        isDesktop: !!desktop(),
        isAvailable: false,
        isSteamDeck: false,
        appId: 0,
        steamUser: null,
        _inited: false,
        _sent: new Set(),

        init() {
            if (this._inited) return this.isAvailable;
            this._inited = true;
            const d = desktop();
            if (!d) {
                console.log('[SteamBridge] Browser build — Steam features disabled.');
                return false;
            }
            try {
                const info = d.steamInfo() || {};
                this.isAvailable = !!info.available;
                this.appId = info.appId || 0;
                this.steamUser = info.name || null;
                this.isSteamDeck = !!info.isSteamDeck;
            } catch (e) {
                this.isAvailable = false;
            }

            if (this.isAvailable && this.steamUser) {
                console.log('[SteamBridge] Connected to Steam as', this.steamUser);
                // Use the Steam persona as the pilot tag if the player never set one
                try {
                    const saved = localStorage.getItem('neon_pulse_pilot_tag');
                    if ((!saved || saved === 'PULSE_PILOT') && typeof global.setPilotTag === 'function') {
                        global.setPilotTag(String(this.steamUser).toUpperCase(), true);
                    }
                } catch (e) { /* ignore */ }
            } else {
                console.log('[SteamBridge] Desktop build without Steam (DRM-free mode).');
            }
            return this.isAvailable;
        },

        unlockAchievement(achId) {
            if (!achId) return false;
            if (global.game && global.game.isCreditsRoll) return false;
            if (!this._inited) this.init();
            if (!this.isAvailable) return false;
            if (this._sent.has(achId)) return true;
            const d = desktop();
            if (!d) return false;
            this._sent.add(achId);
            try {
                Promise.resolve(d.activateAchievement(achId)).then((ok) => {
                    if (!ok) {
                        this._sent.delete(achId); // allow a retry later (e.g. API name not configured yet)
                        console.warn('[SteamBridge] Steam rejected achievement', achId);
                    }
                }).catch(() => this._sent.delete(achId));
            } catch (e) {
                this._sent.delete(achId);
                return false;
            }
            return true;
        },

        // Re-send every locally unlocked achievement (safe — Steam ignores repeats)
        syncAchievements(ids) {
            if (!this._inited) this.init();
            if (!this.isAvailable || !ids) return;
            Array.from(ids).forEach(id => this.unlockAchievement(id));
        },

        setRichPresence(statusText) {
            const d = desktop();
            if (!this.isAvailable || !d) return;
            try {
                d.setRichPresence('status', String(statusText || '').slice(0, 255));
                d.setRichPresence('steam_display', '#StatusFull');
            } catch (e) { /* ignore */ }
        },

        saveCloud(key, value) {
            const str = typeof value === 'string' ? value : JSON.stringify(value);
            try { localStorage.setItem(key, str); } catch (e) { /* ignore */ }
            const d = desktop();
            if (this.isAvailable && d) {
                try { d.cloudWrite(`${key}.json`, str); } catch (e) { /* ignore */ }
            }
        },

        loadCloud(key) {
            const d = desktop();
            if (this.isAvailable && d) {
                try {
                    const v = d.cloudRead(`${key}.json`);
                    if (v != null) return v;
                } catch (e) { /* ignore */ }
            }
            try { return localStorage.getItem(key); } catch (e) { return null; }
        },

        // Desktop helpers (fall back to browser behaviour)
        toggleFullscreen() {
            const d = desktop();
            if (d) { try { return d.toggleFullscreen(); } catch (e) { /* ignore */ } }
            return null;
        },
        isFullscreen() {
            const d = desktop();
            if (d) { try { return !!d.isFullscreen(); } catch (e) { /* ignore */ } }
            return !!(global.document && (global.document.fullscreenElement || global.document.webkitFullscreenElement));
        },
        copyText(text) {
            const d = desktop();
            if (d) { try { d.clipboardWrite(String(text)); return Promise.resolve(true); } catch (e) { /* ignore */ } }
            if (global.navigator && global.navigator.clipboard && global.navigator.clipboard.writeText) {
                return global.navigator.clipboard.writeText(String(text)).then(() => true).catch(() => false);
            }
            return Promise.resolve(false);
        },
        readText() {
            const d = desktop();
            if (d) { try { return Promise.resolve(d.clipboardRead() || ''); } catch (e) { /* ignore */ } }
            if (global.navigator && global.navigator.clipboard && global.navigator.clipboard.readText) {
                return global.navigator.clipboard.readText().catch(() => '');
            }
            return Promise.resolve('');
        },
        quit() {
            const d = desktop();
            if (d) d.quit();
        }
    };

    if (typeof window !== 'undefined') {
        window.SteamBridge = SteamBridge;
        window.addEventListener('load', () => SteamBridge.init());
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = SteamBridge;
    }
})(typeof window !== 'undefined' ? window : globalThis);
