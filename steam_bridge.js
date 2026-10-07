/**
 * Neon Pulse: Precision Speedrun Edition
 * Steamworks & Desktop Runtime Bridge (steam_bridge.js)
 * 
 * Provides seamless integration between Neon Pulse and the Steamworks SDK
 * when packaged with Electron, Tauri, or NW.js via steamworks.js or greenworks.
 * Operates gracefully as a no-op fallback when running in a standard web browser.
 */

(function(global) {
    'use strict';

    const SteamBridge = {
        isAvailable: false,
        client: null,
        appId: 0,
        steamUser: null,

        init() {
            // Check for Node.js / Electron / Tauri environment
            try {
                if (typeof window !== 'undefined' && window.steamworks) {
                    this.client = window.steamworks;
                    this.isAvailable = true;
                    console.log('[SteamBridge] Initialized via window.steamworks');
                } else if (typeof require === 'function') {
                    // Try require steamworks.js or greenworks
                    try {
                        const steamworks = require('steamworks.js');
                        if (steamworks && typeof steamworks.init === 'function') {
                            this.client = steamworks.init();
                            this.isAvailable = true;
                            console.log('[SteamBridge] Initialized via steamworks.js');
                        }
                    } catch(e) {
                        try {
                            const greenworks = require('greenworks');
                            if (greenworks && greenworks.init()) {
                                this.client = greenworks;
                                this.isAvailable = true;
                                console.log('[SteamBridge] Initialized via greenworks');
                            }
                        } catch(e2) {}
                    }
                }
            } catch(err) {
                console.warn('[SteamBridge] Desktop Steamworks SDK not detected, falling back to Web Mode:', err.message);
            }

            if (this.isAvailable && this.client) {
                try {
                    if (this.client.localplayer) {
                        this.steamUser = this.client.localplayer.getName ? this.client.localplayer.getName() : 'Steam Runner';
                        console.log('[SteamBridge] Connected to Steam Account:', this.steamUser);
                        // Auto-sync Pilot Tag to Steam persona name if default
                        if (typeof global.setPilotTag === 'function') {
                            const saved = localStorage.getItem('neon_pulse_pilot_tag');
                            if (!saved || saved === 'PULSE_PILOT') {
                                global.setPilotTag(this.steamUser.toUpperCase(), true);
                            }
                        }
                    }
                } catch(e) {}
            } else {
                console.log('[SteamBridge] Running in Pure Web Browser Mode (Zero Dependencies). Steam hooks active.');
            }

            return this.isAvailable;
        },

        unlockAchievement(achId) {
            if (!achId) return false;
            console.log(`[SteamBridge] Achievement Triggered: ${achId}`);

            if (this.isAvailable && this.client) {
                try {
                    // steamworks.js format
                    if (this.client.achievement && typeof this.client.achievement.activate === 'function') {
                        const success = this.client.achievement.activate(achId);
                        console.log(`[SteamBridge] steamworks.js activate(${achId}):`, success);
                        return success;
                    }
                    // greenworks format
                    if (typeof this.client.activateAchievement === 'function') {
                        this.client.activateAchievement(achId, () => {
                            console.log(`[SteamBridge] greenworks activateAchievement(${achId}) success`);
                        }, (err) => {
                            console.warn(`[SteamBridge] greenworks error:`, err);
                        });
                        return true;
                    }
                } catch(err) {
                    console.warn(`[SteamBridge] Failed to activate Steam achievement:`, err);
                }
            }

            // In browser mode, in-game toasts handle the achievement notification
            return false;
        },

        setRichPresence(statusText) {
            if (!this.isAvailable || !this.client) return;
            try {
                if (this.client.friends && typeof this.client.friends.setRichPresence === 'function') {
                    this.client.friends.setRichPresence('status', statusText);
                    this.client.friends.setRichPresence('steam_display', '#StatusFull');
                }
            } catch(e) {}
        },

        // Steam Cloud saves synchronization helpers
        saveCloud(key, value) {
            try {
                localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            } catch(e) {}

            if (this.isAvailable && this.client && this.client.cloud) {
                try {
                    const str = typeof value === 'string' ? value : JSON.stringify(value);
                    this.client.cloud.writeFile(`${key}.json`, str);
                } catch(e) {}
            }
        },

        loadCloud(key) {
            if (this.isAvailable && this.client && this.client.cloud) {
                try {
                    if (this.client.cloud.isFile(key + '.json')) {
                        return this.client.cloud.readFile(key + '.json');
                    }
                } catch(e) {}
            }
            try {
                return localStorage.getItem(key);
            } catch(e) {
                return null;
            }
        }
    };

    // Auto-init on load
    if (typeof window !== 'undefined') {
        window.SteamBridge = SteamBridge;
        window.addEventListener('load', () => {
            SteamBridge.init();
        });
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = SteamBridge;
    }
})(typeof window !== 'undefined' ? window : globalThis);
