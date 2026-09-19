/**
 * Neon Pulse: 10-Level Precision Speedrun Edition
 * Pure Vanilla JavaScript - Modular High-Performance Architecture
 */

// ============================================================================
// 1. SOUND ENGINE (Web Audio API Synthesizer)
// ============================================================================
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.musicTimer = null;
        this.bassNoteIdx = 0;
        this.currentBpm = 128;
        this.isPlayingMusic = false;
        this.ringCombo = 0;
        this.lastRingTime = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playJump(isDouble = false) {
        if (this.muted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            if (isDouble) {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(380, now);
                osc.frequency.exponentialRampToValueAtTime(760, now + 0.14);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
            } else {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(240, now);
                osc.frequency.exponentialRampToValueAtTime(560, now + 0.11);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
            }

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.14);
        } catch(e) {}
    }

    playDash() {
        if (this.muted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(650, now);
            osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.18);
        } catch(e) {}
    }

    playChrono() {
        if (this.muted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.linearRampToValueAtTime(220, now + 0.35);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.35);
        } catch(e) {}
    }

    playSlide() {
        if (this.muted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
            gain.gain.setValueAtTime(0.14, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.12);
        } catch(e) {}
    }

    playBoostPad() {
        if (this.muted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(340, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
            gain.gain.setValueAtTime(0.22, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.16);
        } catch(e) {}
    }

    playTrampoline() {
        if (this.muted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(780, now + 0.22);
            gain.gain.setValueAtTime(0.32, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.22);
        } catch(e) {}
    }

    playRing() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            if (now - this.lastRingTime < 1.8) {
                this.ringCombo = (this.ringCombo + 1) % 4;
            } else {
                this.ringCombo = 0;
            }
            this.lastRingTime = now;

            // Arpeggio notes: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
            const notes = [523.25, 659.25, 783.99, 1046.50];
            const baseFreq = notes[this.ringCombo];

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.16);
            gain.gain.setValueAtTime(0.26, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.16);
        } catch(e) {}
    }

    playGravityRing() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            // Geometry Dash-style reverse-synth warp chord (D5 + F#5 + A5 collapsing downward)
            const freqs = [587.33, 739.99, 880.00];
            freqs.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = idx === 0 ? 'sawtooth' : 'sine';
                osc.frequency.setValueAtTime(freq, now);
                osc.frequency.exponentialRampToValueAtTime(freq * 0.42, now + 0.22);
                gain.gain.setValueAtTime(0.20, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.22);
            });
        } catch(e) {}
    }

    playShard() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [587.33, 880].forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.06);
                gain.gain.setValueAtTime(0.24, now + i * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + i * 0.06);
                osc.stop(now + i * 0.06 + 0.35);
            });
        } catch(e) {}
    }

    playDeath() {
        if (this.muted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(190, now);
            osc.frequency.exponentialRampToValueAtTime(35, now + 0.26);
            gain.gain.setValueAtTime(0.28, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.26);
        } catch(e) {}
    }

    playVictory() {
        if (this.muted || !this.ctx) return;
        try {
            const notes = [440, 554.37, 659.25, 880];
            const now = this.ctx.currentTime;
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                gain.gain.setValueAtTime(0.22, now + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + idx * 0.08);
                osc.stop(now + idx * 0.08 + 0.4);
            });
        } catch(e) {}
    }

    startMusic(bpm) {
        this.stopMusic();
        this.currentBpm = bpm || 128;
        if (this.muted || !this.ctx) return;
        const interval = (60 / this.currentBpm) * 1000 * 0.5;
        const bassNotes = [55, 55, 65, 55, 49, 49, 73, 65];
        this.bassNoteIdx = 0;
        this.isPlayingMusic = true;
        this.musicTimer = setInterval(() => {
            if (this.muted || !this.ctx || !this.isPlayingMusic) return;
            try {
                const now = this.ctx.currentTime;
                const freq = bassNotes[this.bassNoteIdx % bassNotes.length];
                this.bassNoteIdx++;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.12);
            } catch(e) {}
        }, interval);
    }

    pauseMusic() {
        if (this.musicTimer) {
            clearInterval(this.musicTimer);
            this.musicTimer = null;
        }
    }

    resumeMusic() {
        if (this.isPlayingMusic && !this.muted) {
            this.startMusic(this.currentBpm);
        }
    }

    stopMusic() {
        this.pauseMusic();
        this.isPlayingMusic = false;
    }
}

const audio = new SoundEngine();

// ============================================================================
// 2. SKINS & DAILY REWARDS SYSTEM
// ============================================================================
const SKINS = [
    { id: "cyan", name: "CYBER CYAN", color: "#06b6d4", glow: "rgba(6,182,212,0.8)", unlockDay: 1 },
    { id: "violet", name: "PHANTOM VIOLET", color: "#a855f7", glow: "rgba(168,85,247,0.8)", unlockDay: 2 },
    { id: "emerald", name: "NEO EMERALD", color: "#10b981", glow: "rgba(16,185,129,0.8)", unlockDay: 3 },
    { id: "solar", name: "SOLAR FLARE", color: "#f59e0b", glow: "rgba(245,158,11,0.8)", unlockDay: 4 },
    { id: "crimson", name: "BLOOD CRIMSON", color: "#ef4444", glow: "rgba(239,68,68,0.8)", unlockDay: 5 },
    { id: "glitch", name: "GLITCH SHIFTER", color: "#ec4899", glow: "rgba(236,72,153,0.8)", unlockDay: 6 },
    { id: "apex_gold", name: "APEX CHAMPION", color: "#eab308", glow: "rgba(234,179,8,1.0)", unlockDay: 7 }
];

const DAILY_REWARDS_DATA = [
    { day: 1, title: "+500 CREDITS", desc: "Starter Pack + Cyan Exosuit", icon: "💎", skin: "cyan" },
    { day: 2, title: "PHANTOM SUIT", desc: "Violet Exosuit & Aura", icon: "🔮", skin: "violet" },
    { day: 3, title: "+1500 CREDITS", desc: "Neo Emerald Skin", icon: "💚", skin: "emerald" },
    { day: 4, title: "SOLAR FLARE", desc: "Solar Trail & Amber Glow", icon: "☀️", skin: "solar" },
    { day: 5, title: "OVERCLOCK PERK", desc: "Blood Crimson Suit", icon: "🩸", skin: "crimson" },
    { day: 6, title: "GLITCH SPECTER", desc: "Chameleon Shifter Skin", icon: "🧬", skin: "glitch" },
    { day: 7, title: "APEX CHAMPION", desc: "Royal Gold Crown & Aura", icon: "👑", skin: "apex_gold" }
];

const dailySystem = {
    streak: 1,
    lastClaimTimestamp: 0,
    unlockedSkins: new Set(["cyan"]),
    activeSkin: "cyan",

    load() {
        try {
            const saved = localStorage.getItem('neon_pulse_daily_save');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.streak = parsed.streak || 1;
                this.lastClaimTimestamp = parsed.lastClaimTimestamp || 0;
                if (parsed.unlockedSkins) {
                    parsed.unlockedSkins.forEach(s => this.unlockedSkins.add(s));
                }
                this.activeSkin = parsed.activeSkin || "cyan";
            }
        } catch(e) {}
        this.updateBadge();
    },

    save() {
        try {
            localStorage.setItem('neon_pulse_daily_save', JSON.stringify({
                streak: this.streak,
                lastClaimTimestamp: this.lastClaimTimestamp,
                unlockedSkins: Array.from(this.unlockedSkins),
                activeSkin: this.activeSkin
            }));
        } catch(e) {}
    },

    isClaimReady() {
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        return (now - this.lastClaimTimestamp) >= oneDayMs;
    },

    claim() {
        if (!this.isClaimReady()) return null;
        const reward = DAILY_REWARDS_DATA[(this.streak - 1) % 7];
        if (reward.skin) {
            this.unlockedSkins.add(reward.skin);
            this.activeSkin = reward.skin;
        }
        this.lastClaimTimestamp = Date.now();
        this.streak = (this.streak % 7) + 1;
        this.save();
        this.updateBadge();
        return reward;
    },

    forceSimulatePassage() {
        this.lastClaimTimestamp = Date.now() - (25 * 60 * 60 * 1000);
        this.save();
        this.updateBadge();
    },

    updateBadge() {
        const ingameBadge = document.getElementById('daily-badge');
        const mainDot = document.getElementById('main-daily-dot');
        const ready = this.isClaimReady();
        if (ingameBadge) {
            if (ready) ingameBadge.classList.remove('hidden');
            else ingameBadge.classList.add('hidden');
        }
        if (mainDot) {
            if (ready) mainDot.classList.remove('hidden');
            else mainDot.classList.add('hidden');
        }
    }
};

dailySystem.load();

// ============================================================================
// 3. 10 HANDCRAFTED CURATED LEVELS DATASET
// ============================================================================
const SECTORS = [
    { id: 1, name: "HIGHLINE METROPOLIS", color: "#06b6d4", dimension: 1, levels: [1, 2] },
    { id: 2, name: "KINETIC LABS", color: "#10b981", dimension: 1, levels: [3, 4] },
    { id: 3, name: "QUANTUM CORE", color: "#8b5cf6", dimension: 1, levels: [5, 6] },
    { id: 4, name: "SYNTHWAVE SKYWAY", color: "#ec4899", dimension: 1, levels: [7, 8] },
    { id: 5, name: "APEX DEMONS", color: "#f59e0b", dimension: 1, levels: [9, 10] },
    { id: 6, name: "COSMIC GATEWAY", color: "#818cf8", dimension: 2, levels: [11, 12] },
    { id: 7, name: "ASTRAL ABYSS", color: "#38bdf8", dimension: 2, levels: [13, 14] },
    { id: 8, name: "EVENT HORIZON", color: "#a855f7", dimension: 2, levels: [15, 16] },
    { id: 9, name: "QUANTUM FRACTURE", color: "#f43f5e", dimension: 2, levels: [17, 18] },
    { id: 10, name: "SINGULARITY CORE", color: "#fbbf24", dimension: 2, levels: [19, 20] }
];

const CURATED_LEVELS = [
    // ------------------------------------------------------------------------
    // LEVEL 1: HIGHWAY ZERO (Introduction to momentum, speed pads, low spikes, slide gates)
    // ------------------------------------------------------------------------
    {
        id: 1,
        sectorId: 1,
        name: "01 // HIGHWAY ZERO",
        sectorName: "HIGHLINE METROPOLIS",
        subtitle: "HIGHLINE METROPOLIS — STAGE 01",
        difficulty: "NORMAL",
        bpm: 124,
        startSpeed: 270,
        maxSpeed: 360,
        length: 4200,
        color: "#06b6d4",
        platforms: [
            { x: 0, y: 400, w: 4500, h: 100 },
            { x: 1800, y: 320, w: 900, h: 20 }
        ],
        spikes: [
            { x: 750, y: 400, w: 30, h: 28, inverted: false },
            { x: 1350, y: 400, w: 30, h: 28, inverted: false },
            { x: 2250, y: 320, w: 30, h: 28, inverted: false },
            { x: 3100, y: 400, w: 30, h: 28, inverted: false },
            { x: 3500, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 1050, y: 355, w: 85, h: 14 },
            { x: 2850, y: 355, w: 90, h: 14 }
        ],
        speedPads: [
            { x: 450, y: 396, w: 60, boostVx: 220 },
            { x: 2700, y: 396, w: 60, boostVx: 240 }
        ],
        trampolines: [
            { x: 1720, y: 394, w: 55, launchVy: -650 }
        ],
        glitchPlatforms: [],
        rings: [
            { x: 3350, y: 260, r: 20, color: "#06b6d4", boostY: -560 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 1090, y: 380, taken: false },
            { id: 2, x: 2250, y: 240, taken: false },
            { id: 3, x: 3750, y: 345, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 2: CYBER CHASM (Rooftop floating islands over bottomless voids)
    // ------------------------------------------------------------------------
    {
        id: 2,
        sectorId: 1,
        name: "02 // CYBER CHASM",
        sectorName: "HIGHLINE METROPOLIS",
        subtitle: "HIGHLINE METROPOLIS — STAGE 02",
        difficulty: "HARD",
        bpm: 130,
        startSpeed: 290,
        maxSpeed: 385,
        length: 4600,
        color: "#14b8a6",
        platforms: [
            { x: 0, y: 400, w: 920, h: 100 },
            { x: 1000, y: 390, w: 700, h: 110 },
            { x: 1760, y: 330, w: 720, h: 170 },
            { x: 2540, y: 380, w: 840, h: 120 },
            { x: 3440, y: 340, w: 720, h: 160 },
            { x: 4220, y: 400, w: 800, h: 100 }
        ],
        spikes: [
            { x: 650, y: 400, w: 30, h: 28, inverted: false },
            { x: 1350, y: 390, w: 30, h: 28, inverted: false },
            { x: 2160, y: 330, w: 30, h: 28, inverted: false }, // Spaced 135px after laser
            { x: 2850, y: 380, w: 30, h: 28, inverted: false },
            { x: 3750, y: 340, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 1950, y: 285, w: 75, h: 14 }
        ],
        speedPads: [
            { x: 450, y: 396, w: 60, boostVx: 240 },
            { x: 2320, y: 326, w: 60, boostVx: 250 }
        ],
        trampolines: [
            { x: 1600, y: 384, w: 50, launchVy: -650 },
            { x: 3300, y: 374, w: 50, launchVy: -680 }
        ],
        glitchPlatforms: [],
        rings: [
            { x: 2450, y: 250, r: 26, color: "#14b8a6", boostY: -580 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 960, y: 325, taken: false },
            { id: 2, x: 2520, y: 200, taken: false },
            { id: 3, x: 4120, y: 280, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 3: LASER VAULT (Slide gauntlets, alternating high/low laser fences)
    // ------------------------------------------------------------------------
    {
        id: 3,
        sectorId: 2,
        name: "03 // LASER VAULT",
        sectorName: "KINETIC LABS",
        subtitle: "KINETIC LABS — STAGE 03",
        difficulty: "HARD",
        bpm: 136,
        startSpeed: 305,
        maxSpeed: 400,
        length: 4800,
        color: "#f59e0b",
        platforms: [
            { x: 0, y: 400, w: 5200, h: 100 },
            { x: 2300, y: 320, w: 850, h: 20 }
        ],
        spikes: [
            { x: 800, y: 400, w: 30, h: 28, inverted: false },
            { x: 1550, y: 400, w: 30, h: 28, inverted: false },
            { x: 2050, y: 400, w: 30, h: 28, inverted: false },
            { x: 2750, y: 400, w: 30, h: 28, inverted: false }, // Grounded at 400
            { x: 3700, y: 400, w: 30, h: 28, inverted: false },
            { x: 4200, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 1100, y: 355, w: 140, h: 14 },
            { x: 1750, y: 355, w: 120, h: 14 },
            { x: 2450, y: 275, w: 100, h: 14 },
            { x: 3350, y: 355, w: 130, h: 14 },
            { x: 3950, y: 355, w: 130, h: 14 }
        ],
        speedPads: [
            { x: 920, y: 396, w: 60, boostVx: 230 },
            { x: 3200, y: 396, w: 60, boostVx: 240 }
        ],
        trampolines: [
            { x: 2220, y: 394, w: 50, launchVy: -640 }
        ],
        glitchPlatforms: [],
        rings: [
            { x: 2950, y: 200, r: 20, color: "#f59e0b", boostY: -580 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 1170, y: 382, taken: false },
            { id: 2, x: 2500, y: 302, taken: false },
            { id: 3, x: 4015, y: 382, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 4: VERTIGO SPIRE (High trampoline catapults & tiered sky platforms)
    // ------------------------------------------------------------------------
    {
        id: 4,
        sectorId: 2,
        name: "04 // VERTIGO SPIRE",
        sectorName: "KINETIC LABS",
        subtitle: "KINETIC LABS — STAGE 04",
        difficulty: "EXPERT",
        bpm: 142,
        startSpeed: 320,
        maxSpeed: 420,
        length: 5100,
        color: "#10b981",
        platforms: [
            { x: 0, y: 400, w: 900, h: 100 },
            { x: 850, y: 260, w: 800, h: 20 },
            { x: 1680, y: 190, w: 850, h: 20 },
            { x: 2580, y: 280, w: 750, h: 20 },
            { x: 3380, y: 350, w: 750, h: 20 },
            { x: 4150, y: 400, w: 1200, h: 100 }
        ],
        spikes: [
            { x: 600, y: 400, w: 30, h: 28, inverted: false },
            { x: 1250, y: 260, w: 30, h: 28, inverted: false },
            { x: 2080, y: 190, w: 30, h: 28, inverted: false },
            { x: 2950, y: 280, w: 30, h: 28, inverted: false },
            { x: 3750, y: 350, w: 30, h: 28, inverted: false },
            { x: 4500, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 1080, y: 215, w: 80, h: 14 },
            { x: 1920, y: 145, w: 80, h: 14 }
        ],
        speedPads: [
            { x: 450, y: 396, w: 60, boostVx: 230 },
            { x: 4250, y: 396, w: 60, boostVx: 260 }
        ],
        trampolines: [
            { x: 750, y: 394, w: 55, launchVy: -720 },
            { x: 1580, y: 254, w: 50, launchVy: -660 }
        ],
        glitchPlatforms: [],
        rings: [
            { x: 2520, y: 170, r: 20, color: "#10b981", boostY: -560 },
            { x: 3320, y: 230, r: 20, color: "#10b981", boostY: -560 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 870, y: 170, taken: false },
            { id: 2, x: 2080, y: 110, taken: false },
            { id: 3, x: 3420, y: 165, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 5: GRAVITY FLUX (Ceiling runner, magnetic rails, inverted spikes)
    // ------------------------------------------------------------------------
    {
        id: 5,
        sectorId: 3,
        name: "05 // GRAVITY FLUX",
        sectorName: "QUANTUM CORE",
        subtitle: "QUANTUM CORE — STAGE 05",
        difficulty: "EXPERT",
        bpm: 148,
        startSpeed: 335,
        maxSpeed: 435,
        length: 5300,
        color: "#8b5cf6",
        platforms: [
            { x: 0, y: 400, w: 1300, h: 100 },
            { x: 1200, y: 110, w: 1800, h: 20 },
            { x: 2800, y: 400, w: 2800, h: 100 }
        ],
        spikes: [
            { x: 650, y: 400, w: 30, h: 28, inverted: false },
            { x: 1000, y: 400, w: 30, h: 28, inverted: false },
            { x: 1800, y: 130, w: 30, h: 30, inverted: true },
            { x: 2350, y: 130, w: 30, h: 30, inverted: true },
            { x: 3400, y: 400, w: 30, h: 28, inverted: false },
            { x: 4100, y: 400, w: 30, h: 28, inverted: false },
            { x: 4600, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 2050, y: 170, w: 90, h: 14 },
            { x: 3750, y: 355, w: 100, h: 14 }
        ],
        speedPads: [
            { x: 450, y: 396, w: 60, boostVx: 240 },
            { x: 3100, y: 396, w: 60, boostVx: 260 }
        ],
        trampolines: [
            { x: 1150, y: 394, w: 50, launchVy: -620 }
        ],
        glitchPlatforms: [],
        rings: [
            { type: 'GRAVITY', targetGravity: -1, x: 1250, y: 280, r: 28, color: "#38bdf8", flipVy: 320 },
            { type: 'GRAVITY', targetGravity: 1, x: 2850, y: 180, r: 28, color: "#38bdf8", flipVy: 320 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 1350, y: 160, taken: false },
            { id: 2, x: 2050, y: 145, taken: false },
            { id: 3, x: 4350, y: 345, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 6: PHASE RUNWAY (Rhythmically phasing glitch blocks over bottomless pit)
    // ------------------------------------------------------------------------
    {
        id: 6,
        sectorId: 3,
        name: "06 // PHASE RUNWAY",
        sectorName: "QUANTUM CORE",
        subtitle: "QUANTUM CORE — STAGE 06",
        difficulty: "MASTER",
        bpm: 154,
        startSpeed: 350,
        maxSpeed: 450,
        length: 5500,
        color: "#a855f7",
        platforms: [
            { x: 0, y: 400, w: 1000, h: 100 },
            { x: 2500, y: 380, w: 600, h: 120 },
            { x: 4260, y: 400, w: 1500, h: 100 }
        ],
        spikes: [
            { x: 600, y: 400, w: 30, h: 28, inverted: false },
            { x: 2970, y: 380, w: 30, h: 28, inverted: false },
            { x: 4700, y: 400, w: 30, h: 28, inverted: false },
            { x: 5050, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 2750, y: 335, w: 80, h: 14 }
        ],
        speedPads: [
            { x: 450, y: 396, w: 60, boostVx: 250 },
            { x: 4450, y: 396, w: 60, boostVx: 270 }
        ],
        trampolines: [
            { x: 880, y: 394, w: 50, launchVy: -650 }
        ],
        glitchPlatforms: [
            { x: 1050, y: 340, w: 320, h: 18, period: 2.6, activeRatio: 0.88, offset: 0 },
            { x: 1400, y: 300, w: 320, h: 18, period: 2.6, activeRatio: 0.88, offset: 0.9 },
            { x: 1750, y: 260, w: 320, h: 18, period: 2.6, activeRatio: 0.88, offset: 1.8 },
            { x: 2150, y: 320, w: 320, h: 18, period: 2.6, activeRatio: 0.88, offset: 0.1 },
            { x: 3150, y: 340, w: 320, h: 18, period: 2.6, activeRatio: 0.88, offset: 0 },
            { x: 3550, y: 340, w: 320, h: 18, period: 2.6, activeRatio: 0.88, offset: 0.5 },
            { x: 3950, y: 340, w: 320, h: 18, period: 2.6, activeRatio: 0.88, offset: 1.8 }
        ],
        rings: [
            { x: 2400, y: 260, r: 26, color: "#a855f7", boostY: -580 },
            { x: 4250, y: 260, r: 26, color: "#a855f7", boostY: -580 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 1860, y: 200, taken: false },
            { id: 2, x: 3650, y: 295, taken: false },
            { id: 3, x: 4850, y: 320, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 7: AERIAL MATRIX (Mid-air jump ring chains over giant chasm drops)
    // ------------------------------------------------------------------------
    {
        id: 7,
        sectorId: 4,
        name: "07 // AERIAL MATRIX",
        sectorName: "SYNTHWAVE SKYWAY",
        subtitle: "SYNTHWAVE SKYWAY — STAGE 07",
        difficulty: "MASTER",
        bpm: 160,
        startSpeed: 365,
        maxSpeed: 470,
        length: 5800,
        color: "#ec4899",
        platforms: [
            { x: 0, y: 400, w: 1000, h: 100 },
            { x: 2450, y: 380, w: 850, h: 120 },
            { x: 4550, y: 400, w: 1400, h: 100 }
        ],
        spikes: [
            { x: 650, y: 400, w: 30, h: 28, inverted: false },
            { x: 2920, y: 380, w: 30, h: 28, inverted: false },
            { x: 4900, y: 400, w: 30, h: 28, inverted: false },
            { x: 5300, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 2650, y: 335, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 450, y: 396, w: 60, boostVx: 260 },
            { x: 4650, y: 396, w: 60, boostVx: 280 }
        ],
        trampolines: [
            { x: 880, y: 394, w: 50, launchVy: -660 },
            { x: 3200, y: 374, w: 50, launchVy: -660 }
        ],
        glitchPlatforms: [],
        rings: [
            { x: 1040, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 1260, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 1480, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 1700, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 1920, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 2140, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 2360, y: 220, r: 30, color: "#ec4899", boostY: -560 },

            { x: 3360, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 3580, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 3800, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 4020, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 4240, y: 220, r: 30, color: "#ec4899", boostY: -560 },
            { x: 4460, y: 220, r: 30, color: "#ec4899", boostY: -560 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 1810, y: 145, taken: false },
            { id: 2, x: 2650, y: 380, taken: false },
            { id: 3, x: 3910, y: 145, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 8: POLARITY CRISIS (Dual alternating gravity portals + air rings)
    // ------------------------------------------------------------------------
    {
        id: 8,
        sectorId: 4,
        name: "08 // POLARITY CRISIS",
        sectorName: "SYNTHWAVE SKYWAY",
        subtitle: "SYNTHWAVE SKYWAY — STAGE 08",
        difficulty: "MASTER",
        bpm: 166,
        startSpeed: 380,
        maxSpeed: 490,
        length: 6100,
        color: "#f97316",
        platforms: [
            { x: 0, y: 400, w: 1100, h: 100 },
            { x: 1050, y: 110, w: 1500, h: 20 },
            { x: 2450, y: 400, w: 1300, h: 100 },
            { x: 3650, y: 110, w: 1400, h: 20 },
            { x: 4950, y: 400, w: 1500, h: 100 }
        ],
        spikes: [
            { x: 700, y: 400, w: 30, h: 28, inverted: false },
            { x: 1650, y: 130, w: 30, h: 30, inverted: true },
            { x: 2100, y: 130, w: 30, h: 30, inverted: true },
            { x: 2900, y: 400, w: 30, h: 28, inverted: false },
            { x: 3300, y: 400, w: 30, h: 28, inverted: false },
            { x: 4200, y: 130, w: 30, h: 30, inverted: true },
            { x: 4600, y: 130, w: 30, h: 30, inverted: true },
            { x: 5500, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 1850, y: 170, w: 90, h: 14 },
            { x: 3100, y: 355, w: 90, h: 14 },
            { x: 4400, y: 170, w: 90, h: 14 }
        ],
        speedPads: [
            { x: 450, y: 396, w: 60, boostVx: 260 },
            { x: 2650, y: 396, w: 60, boostVx: 270 }
        ],
        trampolines: [
            { x: 950, y: 394, w: 50, launchVy: -640 },
            { x: 3520, y: 394, w: 50, launchVy: -640 }
        ],
        glitchPlatforms: [],
        rings: [
            { type: 'GRAVITY', targetGravity: -1, x: 1060, y: 280, r: 28, color: "#38bdf8", flipVy: 320 },
            { type: 'GRAVITY', targetGravity: 1, x: 2440, y: 180, r: 28, color: "#38bdf8", flipVy: 320 },
            { type: 'GRAVITY', targetGravity: -1, x: 3640, y: 280, r: 28, color: "#38bdf8", flipVy: 320 },
            { type: 'GRAVITY', targetGravity: 1, x: 4940, y: 180, r: 28, color: "#38bdf8", flipVy: 320 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 1850, y: 145, taken: false },
            { id: 2, x: 3100, y: 382, taken: false },
            { id: 3, x: 4400, y: 145, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 9: OVERDRIVE CORE (High speed, crumbling phase blocks, tight lasers)
    // ------------------------------------------------------------------------
    {
        id: 9,
        sectorId: 5,
        name: "09 // OVERDRIVE CORE",
        sectorName: "APEX DEMONS",
        subtitle: "APEX DEMONS — STAGE 09",
        difficulty: "DEMON",
        bpm: 174,
        startSpeed: 400,
        maxSpeed: 520,
        length: 6500,
        color: "#ef4444",
        platforms: [
            { x: 0, y: 400, w: 1000, h: 100 },
            { x: 2450, y: 380, w: 850, h: 120 },
            { x: 4400, y: 380, w: 850, h: 120 },
            { x: 5500, y: 400, w: 1400, h: 100 }
        ],
        spikes: [
            { x: 700, y: 400, w: 30, h: 28, inverted: false },
            { x: 2920, y: 380, w: 30, h: 28, inverted: false },
            { x: 4850, y: 380, w: 30, h: 28, inverted: false },
            { x: 6000, y: 400, w: 30, h: 28, inverted: false },
            { x: 6300, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 2650, y: 335, w: 85, h: 14 },
            { x: 4600, y: 335, w: 85, h: 14 },
            { x: 5750, y: 355, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 450, y: 396, w: 60, boostVx: 250 },
            { x: 2480, y: 376, w: 60, boostVx: 260 },
            { x: 5500, y: 396, w: 60, boostVx: 280 }
        ],
        trampolines: [
            { x: 880, y: 394, w: 50, launchVy: -680 }
        ],
        glitchPlatforms: [
            { x: 1050, y: 340, w: 320, h: 18, period: 2.5, activeRatio: 0.86, offset: 0 },
            { x: 1400, y: 310, w: 320, h: 18, period: 2.5, activeRatio: 0.86, offset: 0.8 },
            { x: 1750, y: 280, w: 320, h: 18, period: 2.5, activeRatio: 0.86, offset: 1.6 },
            { x: 2100, y: 320, w: 320, h: 18, period: 2.5, activeRatio: 0.86, offset: 2.4 },

            { x: 3350, y: 330, w: 320, h: 18, period: 2.5, activeRatio: 0.86, offset: 0 },
            { x: 3700, y: 300, w: 320, h: 18, period: 2.5, activeRatio: 0.86, offset: 0.8 },
            { x: 4050, y: 320, w: 320, h: 18, period: 2.5, activeRatio: 0.86, offset: 1.6 }
        ],
        rings: [
            { x: 3200, y: 260, r: 28, color: "#ef4444", boostY: -600 },
            { x: 5280, y: 320, r: 30, color: "#ef4444", boostY: -600 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 1750, y: 220, taken: false },
            { id: 2, x: 3700, y: 240, taken: false },
            { id: 3, x: 5390, y: 250, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 10: OMNIPULSE ZERO (The Grand Finale: integrates all mechanics)
    // ------------------------------------------------------------------------
    {
        id: 10,
        sectorId: 5,
        name: "10 // OMNIPULSE ZERO",
        sectorName: "APEX DEMONS",
        subtitle: "APEX DEMONS — STAGE 10 [FINALE]",
        difficulty: "NEARLY IMPOSSIBLE",
        bpm: 182,
        startSpeed: 420,
        maxSpeed: 550,
        length: 7000,
        color: "#eab308",
        platforms: [
            { x: 0, y: 400, w: 1000, h: 100 },
            { x: 1050, y: 270, w: 800, h: 20 },
            { x: 1900, y: 110, w: 1500, h: 20 },
            { x: 3500, y: 370, w: 650, h: 130 },
            { x: 5500, y: 400, w: 1900, h: 100 }
        ],
        spikes: [
            { x: 650, y: 400, w: 30, h: 28, inverted: false },
            { x: 1550, y: 270, w: 30, h: 28, inverted: false },
            { x: 2450, y: 130, w: 30, h: 30, inverted: true },
            { x: 2950, y: 130, w: 30, h: 30, inverted: true },
            { x: 3800, y: 370, w: 30, h: 28, inverted: false },
            { x: 5900, y: 400, w: 30, h: 28, inverted: false },
            { x: 6330, y: 400, w: 30, h: 28, inverted: false },
            { x: 6750, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 1250, y: 225, w: 80, h: 14 },
            { x: 2700, y: 170, w: 90, h: 14 },
            { x: 6100, y: 355, w: 80, h: 14 },
            { x: 6520, y: 355, w: 80, h: 14 }
        ],
        speedPads: [
            { x: 450, y: 396, w: 60, boostVx: 290 },
            { x: 3600, y: 366, w: 60, boostVx: 300 },
            { x: 5650, y: 396, w: 60, boostVx: 310 }
        ],
        trampolines: [
            { x: 880, y: 394, w: 50, launchVy: -720 }
        ],
        glitchPlatforms: [
            { x: 4150, y: 340, w: 320, h: 18, period: 2.8, activeRatio: 0.88, offset: 0 },
            { x: 4500, y: 310, w: 320, h: 18, period: 2.8, activeRatio: 0.88, offset: 0 },
            { x: 4850, y: 330, w: 320, h: 18, period: 2.8, activeRatio: 0.88, offset: 0 }
        ],
        rings: [
            { type: 'GRAVITY', targetGravity: -1, x: 1880, y: 220, r: 28, color: "#38bdf8", flipVy: 320 },
            { type: 'GRAVITY', targetGravity: 1, x: 3380, y: 180, r: 28, color: "#38bdf8", flipVy: 320 },
            { x: 5220, y: 320, r: 28, color: "#eab308", boostY: -620 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 1290, y: 250, taken: false },
            { id: 2, x: 2700, y: 145, taken: false },
            { id: 3, x: 6550, y: 382, taken: false }
        ]
    },

// ------------------------------------------------------------------------
    // LEVEL 11: ASTRAL ENTRY (Objective: CORE_HUNTER - Collect all 3 Cores)
    // ------------------------------------------------------------------------
    {
        id: 11,
        dimension: 2,
        sectorId: 6,
        name: "11 // ASTRAL ENTRY",
        sectorName: "COSMIC GATEWAY",
        subtitle: "COSMIC GATEWAY — STAGE 11",
        difficulty: "HARD",
        bpm: 130,
        startSpeed: 280,
        maxSpeed: 370,
        length: 4600,
        color: "#818cf8",
        objective: {
            type: "CORE_HUNTER",
            title: "CORE HUNTER",
            desc: "Collect all 3 Quantum Cores to unlock the Exit Gate",
            icon: "💎",
            target: 3
        },
        platforms: [
            { x: 0, y: 400, w: 1400, h: 100 },
            { x: 1460, y: 350, w: 1100, h: 20 },
            { x: 2620, y: 320, w: 1100, h: 20 },
            { x: 3780, y: 400, w: 900, h: 100 }
        ],
        spikes: [
            { x: 650, y: 400, w: 30, h: 28, inverted: false },
            { x: 1050, y: 400, w: 30, h: 28, inverted: false },
            { x: 1850, y: 350, w: 30, h: 28, inverted: false },
            { x: 2250, y: 350, w: 30, h: 28, inverted: false },
            { x: 3000, y: 320, w: 30, h: 28, inverted: false },
            { x: 3400, y: 320, w: 30, h: 28, inverted: false },
            { x: 4100, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 820, y: 355, w: 85, h: 14 },
            { x: 2050, y: 305, w: 85, h: 14 },
            { x: 3200, y: 275, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 400, y: 396, w: 60, boostVx: 220 },
            { x: 1600, y: 346, w: 60, boostVx: 240 },
            { x: 3850, y: 396, w: 60, boostVx: 250 }
        ],
        trampolines: [
            { x: 1340, y: 394, w: 50, launchVy: -660 },
            { x: 2500, y: 344, w: 50, launchVy: -660 },
            { x: 3660, y: 314, w: 50, launchVy: -660 }
        ],
        rings: [],
        portals: [],
        shards: [
            { id: 1, x: 650, y: 310, taken: false },
            { id: 2, x: 1850, y: 260, taken: false },
            { id: 3, x: 3000, y: 230, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 12: HYPERION DRIFT (Objective: SPEED_LOCK - Maintain speed >= 380)
    // ------------------------------------------------------------------------
    {
        id: 12,
        dimension: 2,
        sectorId: 6,
        name: "12 // HYPERION DRIFT",
        sectorName: "COSMIC GATEWAY",
        subtitle: "COSMIC GATEWAY — STAGE 12",
        difficulty: "HARD",
        bpm: 134,
        startSpeed: 400,
        maxSpeed: 500,
        length: 4800,
        color: "#38bdf8",
        objective: {
            type: "SPEED_LOCK",
            title: "SPEED LOCK",
            desc: "Maintain velocity ≥ 380 px/s! Flameout drops reset run",
            icon: "⚡",
            target: 380
        },
        platforms: [
            { x: 0, y: 400, w: 1200, h: 100 },
            { x: 1350, y: 350, w: 1100, h: 20 },
            { x: 2600, y: 350, w: 1100, h: 20 },
            { x: 3850, y: 400, w: 1050, h: 100 }
        ],
        spikes: [
            { x: 600, y: 400, w: 30, h: 28, inverted: false },
            { x: 950, y: 400, w: 30, h: 28, inverted: false },
            { x: 1750, y: 350, w: 30, h: 28, inverted: false },
            { x: 2150, y: 350, w: 30, h: 28, inverted: false },
            { x: 3000, y: 350, w: 30, h: 28, inverted: false },
            { x: 3400, y: 350, w: 30, h: 28, inverted: false },
            { x: 4200, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 750, y: 355, w: 90, h: 14 },
            { x: 1950, y: 305, w: 90, h: 14 },
            { x: 3200, y: 305, w: 90, h: 14 }
        ],
        speedPads: [
            { x: 300, y: 396, w: 60, boostVx: 220 },
            { x: 1500, y: 346, w: 60, boostVx: 240 },
            { x: 2750, y: 346, w: 60, boostVx: 240 },
            { x: 4000, y: 396, w: 60, boostVx: 260 }
        ],
        trampolines: [
            { x: 1100, y: 394, w: 50, launchVy: -660 },
            { x: 2350, y: 344, w: 50, launchVy: -660 },
            { x: 3600, y: 344, w: 50, launchVy: -660 }
        ],
        rings: [],
        portals: [],
        shards: [
            { id: 1, x: 600, y: 310, taken: false },
            { id: 2, x: 1750, y: 260, taken: false },
            { id: 3, x: 3000, y: 260, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 13: PACIFIST RUNWAY (Objective: NO_DOUBLE_JUMP - Ground jumps & slides only)
    // ------------------------------------------------------------------------
    {
        id: 13,
        dimension: 2,
        sectorId: 7,
        name: "13 // PACIFIST RUNWAY",
        sectorName: "ASTRAL ABYSS",
        subtitle: "ASTRAL ABYSS — STAGE 13",
        difficulty: "HARD",
        bpm: 128,
        startSpeed: 280,
        maxSpeed: 360,
        length: 4500,
        color: "#c084fc",
        objective: {
            type: "NO_DOUBLE_JUMP",
            title: "PACIFIST SLIDE",
            desc: "Thrusters jammed! No air double jumps — ground jumps & slides only",
            icon: "🚷",
            target: 0
        },
        platforms: [
            { x: 0, y: 400, w: 1100, h: 100 },
            { x: 1220, y: 400, w: 950, h: 100 },
            { x: 2280, y: 360, w: 950, h: 20 },
            { x: 3340, y: 400, w: 1200, h: 100 }
        ],
        spikes: [
            { x: 550, y: 400, w: 30, h: 28, inverted: false },
            { x: 880, y: 400, w: 30, h: 28, inverted: false },
            { x: 1550, y: 400, w: 30, h: 28, inverted: false },
            { x: 1900, y: 400, w: 30, h: 28, inverted: false },
            { x: 2600, y: 360, w: 30, h: 28, inverted: false },
            { x: 2950, y: 360, w: 30, h: 28, inverted: false },
            { x: 3750, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 700, y: 355, w: 90, h: 14 },
            { x: 1720, y: 355, w: 90, h: 14 },
            { x: 2770, y: 315, w: 90, h: 14 },
            { x: 3950, y: 355, w: 90, h: 14 }
        ],
        speedPads: [
            { x: 350, y: 396, w: 60, boostVx: 200 },
            { x: 1350, y: 396, w: 60, boostVx: 220 },
            { x: 3450, y: 396, w: 60, boostVx: 220 }
        ],
        trampolines: [],
        rings: [
            { x: 1160, y: 360, r: 28, color: "#c084fc", boostY: -580 },
            { x: 2220, y: 350, r: 28, color: "#c084fc", boostY: -580 },
            { x: 3280, y: 360, r: 28, color: "#c084fc", boostY: -580 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 550, y: 310, taken: false },
            { id: 2, x: 1550, y: 310, taken: false },
            { id: 3, x: 2600, y: 270, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 14: CHRONO COLLAPSE (Objective: CHRONO_COUNTDOWN - 7.0s timer + Chrono Orbs)
    // ------------------------------------------------------------------------
    {
        id: 14,
        dimension: 2,
        sectorId: 7,
        name: "14 // CHRONO COLLAPSE",
        sectorName: "ASTRAL ABYSS",
        subtitle: "ASTRAL ABYSS — STAGE 14",
        difficulty: "EXPERT",
        bpm: 136,
        startSpeed: 300,
        maxSpeed: 420,
        length: 4900,
        color: "#f43f5e",
        objective: {
            type: "CHRONO_COUNTDOWN",
            title: "CHRONO CLOCK",
            desc: "Quantum collapse in 7.0s! Collect Chrono Orbs for +3.5s extensions",
            icon: "⏱️",
            target: 7.0
        },
        platforms: [
            { x: 0, y: 400, w: 1300, h: 100 },
            { x: 1360, y: 350, w: 1100, h: 20 },
            { x: 2520, y: 310, w: 1100, h: 20 },
            { x: 3680, y: 400, w: 1300, h: 100 }
        ],
        spikes: [
            { x: 600, y: 400, w: 30, h: 28, inverted: false },
            { x: 950, y: 400, w: 30, h: 28, inverted: false },
            { x: 1750, y: 350, w: 30, h: 28, inverted: false },
            { x: 2150, y: 350, w: 30, h: 28, inverted: false },
            { x: 2900, y: 310, w: 30, h: 28, inverted: false },
            { x: 3300, y: 310, w: 30, h: 28, inverted: false },
            { x: 4100, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 760, y: 355, w: 85, h: 14 },
            { x: 1950, y: 305, w: 85, h: 14 },
            { x: 3100, y: 265, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 350, y: 396, w: 60, boostVx: 220 },
            { x: 1550, y: 346, w: 60, boostVx: 240 },
            { x: 2700, y: 306, w: 60, boostVx: 240 }
        ],
        trampolines: [
            { x: 1240, y: 394, w: 50, launchVy: -660 },
            { x: 2400, y: 344, w: 50, launchVy: -660 },
            { x: 3560, y: 304, w: 50, launchVy: -660 }
        ],
        rings: [],
        chronoOrbs: [
            { id: 1, x: 1300, y: 260, taken: false },
            { id: 2, x: 2460, y: 210, taken: false },
            { id: 3, x: 3620, y: 180, taken: false }
        ],
        portals: [],
        shards: [
            { id: 1, x: 600, y: 310, taken: false },
            { id: 2, x: 1750, y: 260, taken: false },
            { id: 3, x: 2900, y: 220, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 15: GRAVITON VOID (Objective: ZERO_G - Halved gravity + 3x air jumps)
    // ------------------------------------------------------------------------
    {
        id: 15,
        dimension: 2,
        sectorId: 8,
        name: "15 // GRAVITON VOID",
        sectorName: "EVENT HORIZON",
        subtitle: "EVENT HORIZON — STAGE 15",
        difficulty: "EXPERT",
        bpm: 132,
        startSpeed: 290,
        maxSpeed: 380,
        length: 5200,
        color: "#06b6d4",
        objective: {
            type: "ZERO_G",
            title: "ZERO-G FLOAT",
            desc: "Halved gravity (g = 950). Float across vast chasms with 3x air thrusters!",
            icon: "🚀",
            target: 950
        },
        platforms: [
            { x: 0, y: 400, w: 1250, h: 100 },
            { x: 1380, y: 360, w: 1150, h: 20 },
            { x: 2650, y: 320, w: 1150, h: 20 },
            { x: 3920, y: 400, w: 1400, h: 100 }
        ],
        spikes: [
            { x: 500, y: 400, w: 30, h: 28, inverted: false },
            { x: 800, y: 400, w: 30, h: 28, inverted: false },
            { x: 1650, y: 360, w: 30, h: 28, inverted: false },
            { x: 2050, y: 360, w: 30, h: 28, inverted: false },
            { x: 2950, y: 320, w: 30, h: 28, inverted: false },
            { x: 3350, y: 320, w: 30, h: 28, inverted: false },
            { x: 4250, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            // Safe grounded lasers
            { x: 1050, y: 355, w: 85, h: 14 },
            { x: 2350, y: 315, w: 85, h: 14 },
            { x: 4450, y: 355, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 300, y: 396, w: 60, boostVx: 220 },
            { x: 1500, y: 356, w: 60, boostVx: 240 },
            { x: 2750, y: 316, w: 60, boostVx: 240 }
        ],
        trampolines: [
            { x: 1200, y: 394, w: 50, launchVy: -520 },
            { x: 2480, y: 354, w: 50, launchVy: -520 },
            { x: 3750, y: 314, w: 50, launchVy: -520 }
        ],
        rings: [],
        portals: [],
        shards: [
            { id: 1, x: 500, y: 290, taken: false },
            { id: 2, x: 1650, y: 250, taken: false },
            { id: 3, x: 2950, y: 210, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 16: SENTINEL PURSUIT (Objective: SENTINEL_CHASE - Advancing death wall)
    // ------------------------------------------------------------------------
    {
        id: 16,
        dimension: 2,
        sectorId: 8,
        name: "16 // SENTINEL PURSUIT",
        sectorName: "EVENT HORIZON",
        subtitle: "EVENT HORIZON — STAGE 16",
        difficulty: "EXPERT",
        bpm: 140,
        startSpeed: 320,
        maxSpeed: 440,
        length: 5000,
        color: "#fbbf24",
        objective: {
            type: "SENTINEL_CHASE",
            title: "SENTINEL PURSUIT",
            desc: "A towering laser death wall sweeps from behind! Never look back",
            icon: "👹",
            target: 0
        },
        platforms: [
            { x: 0, y: 400, w: 1300, h: 100 },
            { x: 1360, y: 360, w: 1100, h: 20 },
            { x: 2520, y: 320, w: 1100, h: 20 },
            { x: 3680, y: 400, w: 1400, h: 100 }
        ],
        spikes: [
            { x: 600, y: 400, w: 30, h: 28, inverted: false },
            { x: 950, y: 400, w: 30, h: 28, inverted: false },
            { x: 1750, y: 360, w: 30, h: 28, inverted: false },
            { x: 2150, y: 360, w: 30, h: 28, inverted: false },
            { x: 2900, y: 320, w: 30, h: 28, inverted: false },
            { x: 3300, y: 320, w: 30, h: 28, inverted: false },
            { x: 4100, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 760, y: 355, w: 85, h: 14 },
            { x: 1950, y: 315, w: 85, h: 14 },
            { x: 3100, y: 275, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 350, y: 396, w: 60, boostVx: 220 },
            { x: 1550, y: 356, w: 60, boostVx: 240 },
            { x: 2700, y: 316, w: 60, boostVx: 240 },
            { x: 3850, y: 396, w: 60, boostVx: 260 }
        ],
        trampolines: [
            { x: 1240, y: 394, w: 50, launchVy: -660 },
            { x: 2400, y: 354, w: 50, launchVy: -660 },
            { x: 3560, y: 314, w: 50, launchVy: -660 }
        ],
        rings: [],
        portals: [],
        shards: [
            { id: 1, x: 600, y: 310, taken: false },
            { id: 2, x: 1750, y: 270, taken: false },
            { id: 3, x: 2900, y: 230, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 17: PHASE DIVERGENCE (Objective: PHASE_SHIFT - Cyan & Magenta gates/platforms)
    // ------------------------------------------------------------------------
    {
        id: 17,
        dimension: 2,
        sectorId: 9,
        name: "17 // PHASE DIVERGENCE",
        sectorName: "QUANTUM FRACTURE",
        subtitle: "QUANTUM FRACTURE — STAGE 17",
        difficulty: "MASTER",
        bpm: 138,
        startSpeed: 300,
        maxSpeed: 420,
        length: 5100,
        color: "#ec4899",
        objective: {
            type: "PHASE_SHIFT",
            title: "PHASE SHIFT",
            desc: "Pass through Phase Gates to alternate solid platforms between Cyan & Magenta",
            icon: "💠",
            target: 0
        },
        platforms: [
            { x: 0, y: 400, w: 1400, h: 100, phase: "CYAN" },
            { x: 1460, y: 350, w: 1100, h: 20, phase: "MAGENTA" },
            { x: 2620, y: 310, w: 1100, h: 20, phase: "CYAN" },
            { x: 3780, y: 400, w: 1400, h: 100, phase: "MAGENTA" }
        ],
        phaseGates: [
            { x: 1300, targetColor: "MAGENTA" },
            { x: 2480, targetColor: "CYAN" },
            { x: 3640, targetColor: "MAGENTA" }
        ],
        spikes: [
            { x: 600, y: 400, w: 30, h: 28, inverted: false },
            { x: 1000, y: 400, w: 30, h: 28, inverted: false },
            { x: 1800, y: 350, w: 30, h: 28, inverted: false },
            { x: 2200, y: 350, w: 30, h: 28, inverted: false },
            { x: 2950, y: 310, w: 30, h: 28, inverted: false },
            { x: 3350, y: 310, w: 30, h: 28, inverted: false },
            { x: 4200, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 800, y: 355, w: 85, h: 14 },
            { x: 2000, y: 305, w: 85, h: 14 },
            { x: 3150, y: 265, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 350, y: 396, w: 60, boostVx: 220 },
            { x: 1600, y: 346, w: 60, boostVx: 240 },
            { x: 2750, y: 306, w: 60, boostVx: 240 }
        ],
        trampolines: [
            { x: 1340, y: 394, w: 50, launchVy: -660 },
            { x: 2500, y: 344, w: 50, launchVy: -660 },
            { x: 3660, y: 304, w: 50, launchVy: -660 }
        ],
        rings: [],
        portals: [],
        shards: [
            { id: 1, x: 600, y: 310, taken: false },
            { id: 2, x: 1800, y: 260, taken: false },
            { id: 3, x: 2950, y: 220, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 18: ARPEGGIO MATRIX (Objective: RING_CHAIN - Unbroken 8-ring chain)
    // ------------------------------------------------------------------------
    {
        id: 18,
        dimension: 2,
        sectorId: 9,
        name: "18 // ARPEGGIO MATRIX",
        sectorName: "QUANTUM FRACTURE",
        subtitle: "QUANTUM FRACTURE — STAGE 18",
        difficulty: "MASTER",
        bpm: 142,
        startSpeed: 310,
        maxSpeed: 430,
        length: 5200,
        color: "#a855f7",
        objective: {
            type: "RING_CHAIN",
            title: "ARPEGGIO MATRIX",
            desc: "Chain 8 jump rings consecutively in mid-air to charge exit portal!",
            icon: "🎵",
            target: 8
        },
        platforms: [
            { x: 0, y: 400, w: 1200, h: 100 },
            { x: 2480, y: 400, w: 2750, h: 100 }
        ],
        spikes: [
            { x: 550, y: 400, w: 30, h: 28, inverted: false },
            { x: 900, y: 400, w: 30, h: 28, inverted: false },
            { x: 2900, y: 400, w: 30, h: 28, inverted: false },
            { x: 3500, y: 400, w: 30, h: 28, inverted: false },
            { x: 4100, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 720, y: 355, w: 85, h: 14 },
            { x: 3200, y: 355, w: 85, h: 14 },
            { x: 3800, y: 355, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 300, y: 396, w: 60, boostVx: 220 },
            { x: 2650, y: 396, w: 60, boostVx: 250 }
        ],
        trampolines: [
            { x: 1100, y: 394, w: 50, launchVy: -660 }
        ],
        rings: [
            { x: 1280, y: 220, r: 28, color: "#a855f7", boostY: -580 },
            { x: 1440, y: 220, r: 28, color: "#c084fc", boostY: -580 },
            { x: 1600, y: 220, r: 28, color: "#e879f9", boostY: -580 },
            { x: 1760, y: 220, r: 28, color: "#a855f7", boostY: -580 },
            { x: 1920, y: 110, r: 28, color: "#c084fc", boostY: -580 },
            { x: 2080, y: 220, r: 28, color: "#e879f9", boostY: -580 },
            { x: 2240, y: 110, r: 28, color: "#a855f7", boostY: -580 },
            { x: 2400, y: 120, r: 28, color: "#c084fc", boostY: -580 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 550, y: 310, taken: false },
            { id: 2, x: 1440, y: 160, taken: false },
            { id: 3, x: 2900, y: 310, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 19: POLARITY FLUX (Objective: POLARITY_FLUX - Geometry Dash Blue Orbs)
    // ------------------------------------------------------------------------
    {
        id: 19,
        dimension: 2,
        sectorId: 10,
        name: "19 // POLARITY FLUX",
        sectorName: "SINGULARITY CORE",
        subtitle: "SINGULARITY CORE — STAGE 19",
        difficulty: "DEMON",
        bpm: 144,
        startSpeed: 310,
        maxSpeed: 430,
        length: 5400,
        color: "#f97316",
        objective: {
            type: "POLARITY_FLUX",
            title: "POLARITY ACROBATICS",
            desc: "Geometry Dash Blue Gravity Ring acrobatics — flip between ceiling and floor!",
            icon: "🔄",
            target: 0
        },
        platforms: [
            { x: 0, y: 400, w: 1200, h: 100 },
            { x: 1300, y: 60, w: 900, h: 40 }, // ceiling
            { x: 2240, y: 400, w: 950, h: 100 }, // floor
            { x: 3220, y: 60, w: 900, h: 40 }, // ceiling
            { x: 4160, y: 400, w: 1350, h: 100 } // floor
        ],
        spikes: [
            { x: 550, y: 400, w: 30, h: 28, inverted: false },
            { x: 900, y: 400, w: 30, h: 28, inverted: false },
            // Ceiling spikes
            { x: 1700, y: 100, w: 30, h: 28, inverted: true },
            // Floor spikes
            { x: 2550, y: 400, w: 30, h: 28, inverted: false },
            // Ceiling spikes
            { x: 3600, y: 100, w: 30, h: 28, inverted: true },
            { x: 4500, y: 400, w: 30, h: 28, inverted: false },
            { x: 4900, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            { x: 720, y: 355, w: 85, h: 14 },
            { x: 2750, y: 355, w: 85, h: 14 },
            { x: 4700, y: 355, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 300, y: 396, w: 60, boostVx: 220 },
            { x: 4250, y: 396, w: 60, boostVx: 250 }
        ],
        trampolines: [
            { x: 1050, y: 394, w: 50, launchVy: -660 },
            { x: 2980, y: 394, w: 50, launchVy: -660 }
        ],
        rings: [
            { type: 'GRAVITY', targetGravity: -1, x: 1240, y: 220, r: 28, color: "#38bdf8", flipVy: 320 },
            { type: 'GRAVITY', targetGravity: 1, x: 2180, y: 180, r: 28, color: "#38bdf8", flipVy: 320 },
            { type: 'GRAVITY', targetGravity: -1, x: 3160, y: 220, r: 28, color: "#38bdf8", flipVy: 320 },
            { type: 'GRAVITY', targetGravity: 1, x: 4100, y: 180, r: 28, color: "#38bdf8", flipVy: 320 }
        ],
        portals: [],
        shards: [
            { id: 1, x: 550, y: 310, taken: false },
            { id: 2, x: 2550, y: 310, taken: false },
            { id: 3, x: 4500, y: 310, taken: false }
        ]
    },

    // ------------------------------------------------------------------------
    // LEVEL 20: THE OMNI-RIFT (Objective: THE_OMNI_RIFT - Grand Singularity Finale)
    // ------------------------------------------------------------------------
    {
        id: 20,
        dimension: 2,
        sectorId: 10,
        name: "20 // THE OMNI-RIFT",
        sectorName: "SINGULARITY CORE",
        subtitle: "SINGULARITY CORE — STAGE 20 GRAND FINALE",
        difficulty: "NEARLY IMPOSSIBLE",
        bpm: 150,
        startSpeed: 330,
        maxSpeed: 470,
        length: 6000,
        color: "#ef4444",
        objective: {
            type: "THE_OMNI_RIFT",
            title: "THE OMNI-RIFT",
            desc: "The Singularity: Low-G, Chrono clocks, Sentinel chase, and Gravity Rings!",
            icon: "🌌",
            target: 0
        },
        platforms: [
            { x: 0, y: 400, w: 1250, h: 100 },
            { x: 1360, y: 350, w: 1050, h: 20 },
            { x: 2460, y: 60, w: 950, h: 40 }, // ceiling section
            { x: 3500, y: 350, w: 1100, h: 20 },
            { x: 4700, y: 400, w: 1400, h: 100 }
        ],
        spikes: [
            { x: 450, y: 400, w: 30, h: 28, inverted: false },
            { x: 750, y: 400, w: 30, h: 28, inverted: false },
            { x: 1650, y: 350, w: 30, h: 28, inverted: false },
            { x: 2850, y: 100, w: 30, h: 28, inverted: true },
            { x: 3850, y: 350, w: 30, h: 28, inverted: false },
            { x: 5100, y: 400, w: 30, h: 28, inverted: false },
            { x: 5500, y: 400, w: 30, h: 28, inverted: false }
        ],
        lasers: [
            // Safe grounded lasers away from jump arcs
            { x: 2050, y: 305, w: 85, h: 14 },
            { x: 4250, y: 305, w: 85, h: 14 },
            { x: 5300, y: 355, w: 85, h: 14 }
        ],
        speedPads: [
            { x: 300, y: 396, w: 60, boostVx: 220 },
            { x: 1500, y: 346, w: 60, boostVx: 240 },
            { x: 3650, y: 346, w: 60, boostVx: 250 },
            { x: 4850, y: 396, w: 60, boostVx: 270 }
        ],
        trampolines: [
            { x: 1180, y: 394, w: 50, launchVy: -520 },
            { x: 2280, y: 344, w: 50, launchVy: -520 },
            { x: 4400, y: 344, w: 50, launchVy: -520 }
        ],
        rings: [
            { type: 'GRAVITY', targetGravity: -1, x: 2380, y: 200, r: 28, color: "#38bdf8", flipVy: 320 },
            { type: 'GRAVITY', targetGravity: 1, x: 3420, y: 180, r: 28, color: "#38bdf8", flipVy: 320 }
        ],
        chronoOrbs: [
            { id: 1, x: 1180, y: 260, taken: false },
            { id: 2, x: 1750, y: 260, taken: false },
            { id: 3, x: 2380, y: 200, taken: false },
            { id: 4, x: 3420, y: 180, taken: false },
            { id: 5, x: 4400, y: 200, taken: false }
        ],
        portals: [],
        shards: [
            { id: 1, x: 450, y: 310, taken: false },
            { id: 2, x: 2850, y: 220, taken: false },
            { id: 3, x: 5100, y: 310, taken: false }
        ]
    }
];

const LEVELS = CURATED_LEVELS;

// ============================================================================
// 4. GAME STATE & CONSTANTS
// ============================================================================
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const V_WIDTH = 960;
const V_HEIGHT = 540;

// Canvas & Viewport Cache (Eliminates layout thrashing / forced reflows)
let cachedCanvasWidth = 0;
let cachedCanvasHeight = 0;
let cachedScale = 1;
let cachedOffsetX = 0;
let cachedOffsetY = 0;

function updateCanvasViewport() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : { width: canvas.width || 960, height: canvas.height || 540 };
    const w = Math.floor(rect.width || (typeof window !== 'undefined' ? window.innerWidth : 960));
    const h = Math.floor(rect.height || (typeof window !== 'undefined' ? window.innerHeight : 540));
    if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
    }
    cachedCanvasWidth = canvas.width;
    cachedCanvasHeight = canvas.height;
    cachedScale = Math.min(cachedCanvasWidth / V_WIDTH, cachedCanvasHeight / V_HEIGHT);
    cachedOffsetX = (cachedCanvasWidth - V_WIDTH * cachedScale) / 2;
    cachedOffsetY = (cachedCanvasHeight - V_HEIGHT * cachedScale) / 2;
}

if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateCanvasViewport);
    window.addEventListener('orientationchange', updateCanvasViewport);
}

// Background Gradient Caches (Eliminates per-frame Garbage Collection spikes)
let cyberBgGrad = null;
let dim2BgGrad = null;
let nebulaGradViolet = null;
let nebulaGradIndigo = null;
let nebulaGradPink = null;

function getCyberBgGrad() {
    if (!cyberBgGrad && ctx && ctx.createLinearGradient) {
        cyberBgGrad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
        cyberBgGrad.addColorStop(0, '#020617');
        cyberBgGrad.addColorStop(0.7, '#080d1a');
        cyberBgGrad.addColorStop(1, '#02040a');
    }
    return cyberBgGrad;
}

function getDim2BgGrad() {
    if (!dim2BgGrad && ctx && ctx.createLinearGradient) {
        dim2BgGrad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
        dim2BgGrad.addColorStop(0, '#06020f');
        dim2BgGrad.addColorStop(0.5, '#12072b');
        dim2BgGrad.addColorStop(0.85, '#0d041f');
        dim2BgGrad.addColorStop(1, '#05010a');
    }
    return dim2BgGrad;
}

function getNebulaGrad(index) {
    if (!ctx || !ctx.createRadialGradient) return null;
    if (index === 0) {
        if (!nebulaGradViolet) {
            nebulaGradViolet = ctx.createRadialGradient(0, 0, 10, 0, 0, 180);
            nebulaGradViolet.addColorStop(0, 'rgba(168, 85, 247, 0.18)');
            nebulaGradViolet.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        return nebulaGradViolet;
    } else if (index === 1) {
        if (!nebulaGradIndigo) {
            nebulaGradIndigo = ctx.createRadialGradient(0, 0, 10, 0, 0, 180);
            nebulaGradIndigo.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
            nebulaGradIndigo.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        return nebulaGradIndigo;
    } else {
        if (!nebulaGradPink) {
            nebulaGradPink = ctx.createRadialGradient(0, 0, 10, 0, 0, 180);
            nebulaGradPink.addColorStop(0, 'rgba(236, 72, 153, 0.14)');
            nebulaGradPink.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        return nebulaGradPink;
    }
}

const GRAVITY = 1900;
const JUMP_IMPULSE = -580;
const AIR_DIVE_IMPULSE = 750;

const game = {
    currentLevelIdx: 0,
    level: null,
    attempts: 1,
    isPaused: false,
    isCountingDown: false,
    inMainMenu: true,
    botDemo: false,
    shardsCollected: new Set(),
    victory: false,
    lastTime: 0,
    lastFrameDelta: 0.016,
    physicsAccumulator: 0,
    renderAlpha: 1.0,
    screenShake: 0,
    runTime: 0,
    timeScale: 1.0,
    selectedAbility: 'DASH', // 'DASH', 'DOUBLE_JUMP', 'CHRONO'
    abilityCooldown: 0,
    abilityMaxCooldown: 3.5,
    abilityActiveTimer: 0,
    // Collective Exosuit Ability Matrix (All 3 equipped simultaneously)
    abilities: {
        dash: { cd: 0, maxCd: 3.5, activeTimer: 0 },
        thrust: { cd: 0, maxCd: 3.0 },
        chrono: { cd: 0, maxCd: 6.5, activeTimer: 0 }
    },
    // Endless Mode (Cyber Marathon)
    isEndless: false,
    endlessDistance: 0,
    endlessBestDistance: 0,
    endlessLastSpawnX: 0,
    endlessNextWarpMeters: 1000,
    // Ghost Challenge System (Async Racing)
    ghostActive: false,
    ghostData: null,
    ghostRecord: [],
    lastGhostRecordTime: 0,
    // Live Multiplayer WebRTC (1v1 Room Racing)
    isMultiplayer: false,
    mpPeer: null,
    mpConn: null,
    mpIsHost: false,
    mpRoomCode: '',
    mpConnected: false,
    mpCountdown: 0,
    mpRival: null,
    lastMpBroadcastTime: 0,
    pilotTag: 'PULSE_PILOT',
    currentSectorFilter: 'all',
    particles: [],
    shockwaves: [],
    cameraX: undefined,
    currentDimensionTab: 1,
    chronoTimer: 0,
    speedGraceTimer: 1.5,
    sentinelX: -9999,
    phaseColor: 'CYAN',
    ringStreak: 0,
    maxRingStreak: 0,
    inputs: {
        jumpHeld: false,
        slideHeld: false,
        jumpBufferTime: 0,
        jumpPressedThisFrame: false,
        prevJumpHeld: false
    },
    player: {
        x: 80,
        y: 356,
        prevX: 80,
        prevY: 356,
        renderX: 80,
        renderY: 356,
        w: 22,
        h: 44,
        vx: 280,
        vy: 0,
        gravityDir: 1,
        isGrounded: true,
        isSliding: false,
        isJumping: false,
        canDoubleJump: true,
        hasDoubleJumped: false,
        airTime: 0,
        isInvulnerable: false,
        coyoteTimer: 0,
        runCycle: 0,
        trail: []
    }
};

// Pilot Tag persistence
try {
    const savedTag = localStorage.getItem('neon_pulse_pilot_tag');
    if (savedTag) {
        game.pilotTag = savedTag;
        const tagInput = document.getElementById('input-pilot-tag');
        if (tagInput) tagInput.value = savedTag;
        const mainDisplay = document.getElementById('main-pilot-display');
        if (mainDisplay) mainDisplay.innerText = savedTag;
    }
} catch(e) {}

const tagInput = document.getElementById('input-pilot-tag');
if (tagInput) {
    tagInput.addEventListener('change', (e) => {
        game.pilotTag = e.target.value.trim().toUpperCase() || 'PULSE_PILOT';
        try {
            localStorage.setItem('neon_pulse_pilot_tag', game.pilotTag);
        } catch(e) {}
        const mainDisplay = document.getElementById('main-pilot-display');
        if (mainDisplay) mainDisplay.innerText = game.pilotTag;
        populateLeaderboard(game.currentLevelIdx);
    });
}
window.game = game;

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 1000);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

function getActiveSkinData() {
    return SKINS.find(s => s.id === dailySystem.activeSkin) || SKINS[0];
}

// ============================================================================
// 5. LEADERBOARD & PB SYSTEM
// ============================================================================
function getLeaderboard(levelIdx) {
    let localRecords = [];
    try {
        const stored = localStorage.getItem(`neon_pulse_lb_${levelIdx}`);
        if (stored) localRecords = JSON.parse(stored);
    } catch(e) {}

    const mockData = [
        { rank: 1, tag: "CYBER_GHOST", time: 14.820 + (levelIdx * 0.5), ability: "DASH", shards: 3 },
        { rank: 2, tag: "NEXUS_VIPER", time: 15.640 + (levelIdx * 0.5), ability: "DOUBLE_JUMP", shards: 3 },
        { rank: 3, tag: "PULSE_RUNNER", time: 16.410 + (levelIdx * 0.5), ability: "CHRONO", shards: 2 }
    ];

    const combined = [...mockData, ...localRecords];
    combined.sort((a, b) => a.time - b.time);
    return combined.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
}

function saveRunToLeaderboard(levelIdx, time, shards, ability) {
    let localRecords = [];
    try {
        const stored = localStorage.getItem(`neon_pulse_lb_${levelIdx}`);
        if (stored) localRecords = JSON.parse(stored);
    } catch(e) {}

    localRecords.push({
        tag: game.pilotTag,
        time: time,
        shards: shards,
        ability: ability,
        date: Date.now()
    });

    try {
        localStorage.setItem(`neon_pulse_lb_${levelIdx}`, JSON.stringify(localRecords));
    } catch(e) {}
}

function populateLeaderboard(levelIdx) {
    const tbody = document.getElementById('leaderboard-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    const subtitle = document.getElementById('lb-stage-subtitle');
    if (subtitle) subtitle.innerText = LEVELS[levelIdx].name + " // TIME TRIAL RECORDS";

    const data = getLeaderboard(levelIdx);
    data.forEach((row) => {
        const isPlayer = row.tag === game.pilotTag;
        const tr = document.createElement('tr');
        tr.className = `border-b border-neutral-800/40 hover:bg-neutral-800/40 ${isPlayer ? 'bg-cyan-950/40 text-cyan-300 font-bold' : 'text-neutral-300'}`;
        
        let rankBadge = `${row.rank}`;
        if (row.rank === 1) rankBadge = `<span class="text-amber-400 font-bold">🥇 1</span>`;
        else if (row.rank === 2) rankBadge = `<span class="text-neutral-300 font-bold">🥈 2</span>`;
        else if (row.rank === 3) rankBadge = `<span class="text-amber-600 font-bold">🥉 3</span>`;

        tr.innerHTML = `
            <td class="py-2 px-2">${rankBadge}</td>
            <td class="py-2 px-2 font-cyber tracking-wider">${row.tag} ${isPlayer ? '<span class="text-[9px] bg-cyan-900/80 px-1 py-0.5 rounded text-cyan-200">YOU</span>' : ''}</td>
            <td class="py-2 px-2 text-amber-400 font-mono">${formatTime(row.time)}</td>
            <td class="py-2 px-2 text-[10px] text-neutral-400 font-cyber">${row.ability}</td>
            <td class="py-2 px-2 text-pink-400 font-bold">${'◆'.repeat(row.shards || 0)}${'◇'.repeat(3 - (row.shards || 0))}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ============================================================================
// 6. PARTICLES & VISUAL FX
// ============================================================================
function createJumpParticles(p, isDouble = false) {
    const color = isDouble ? '#38bdf8' : getActiveSkinData().color;
    const count = isDouble ? 16 : 8;
    for (let i = 0; i < count; i++) {
        const angle = Math.PI * (isDouble ? 2 : 1) * (i / count);
        game.particles.push({
            x: p.x + p.w / 2,
            y: p.gravityDir === 1 ? p.y + p.h : p.y,
            vx: Math.cos(angle) * (isDouble ? 180 : 120),
            vy: (isDouble ? Math.sin(angle) * 120 : (Math.random() * -120 * p.gravityDir)),
            life: 0.35,
            maxLife: 0.35,
            color: color,
            size: isDouble ? 4 : 3
        });
    }
}

function triggerPhaseDash() {
    if (!game.abilities || !game.abilities.dash) return;
    if (game.abilities.dash.cd > 0 || game.victory || game.isPaused || game.inMainMenu || game.isCountingDown) return;

    const p = game.player;
    game.abilities.dash.cd = game.abilities.dash.maxCd;
    p.isInvulnerable = true;
    game.abilities.dash.activeTimer = 0.24;
    p.x += 165;
    audio.playDash();
    game.screenShake = 7;
    const skin = getActiveSkinData();
    for (let i = 0; i < 22; i++) {
        game.particles.push({
            x: p.x - Math.random() * 165,
            y: p.y + Math.random() * p.h,
            vx: -p.vx * 0.4 + (Math.random() - 0.5) * 80,
            vy: (Math.random() - 0.5) * 60,
            life: 0.32,
            maxLife: 0.32,
            color: skin.color,
            size: 4
        });
    }
    showNotification("⚡ PHASE DASH [SHIFT]!");
    updateAbilityHUD();
}

function triggerThrusterBurst() {
    if (!game.abilities || !game.abilities.thrust) return;
    if (game.abilities.thrust.cd > 0 || game.victory || game.isPaused || game.inMainMenu || game.isCountingDown) return;

    const p = game.player;
    game.abilities.thrust.cd = game.abilities.thrust.maxCd;
    p.vy = JUMP_IMPULSE * 1.16 * p.gravityDir;
    p.isGrounded = false;
    p.isJumping = true;
    p.canDoubleJump = true;
    p.hasDoubleJumped = false;
    audio.playJump(true);
    createJumpParticles(p, true);
    game.screenShake = 5;
    showNotification("🚀 THRUSTERS OVERCLOCKED [E]!");
    updateAbilityHUD();
}

function triggerChronoPulse() {
    if (!game.abilities || !game.abilities.chrono) return;
    if (game.abilities.chrono.cd > 0 || game.victory || game.isPaused || game.inMainMenu || game.isCountingDown) return;

    game.abilities.chrono.cd = game.abilities.chrono.maxCd;
    game.timeScale = 0.45;
    game.abilities.chrono.activeTimer = 2.4;
    audio.playChrono();
    game.screenShake = 4;
    showNotification("⏱️ CHRONO DILATION [Q]!");
    updateAbilityHUD();
}

function triggerAbility() {
    // Collective fallback trigger: executes first ready ability (Dash -> Thrust -> Chrono)
    if (game.abilities.dash.cd <= 0) triggerPhaseDash();
    else if (game.abilities.thrust.cd <= 0) triggerThrusterBurst();
    else if (game.abilities.chrono.cd <= 0) triggerChronoPulse();
}

function updateAbilityHUD() {
    if (!game.abilities) return;

    const meterDash = document.getElementById('meter-dash');
    const meterThrust = document.getElementById('meter-thrust');
    const meterChrono = document.getElementById('meter-chrono');

    if (meterDash) {
        const ratio = game.abilities.dash.cd <= 0 ? 1 : (1 - game.abilities.dash.cd / game.abilities.dash.maxCd);
        meterDash.style.width = Math.floor(ratio * 100) + '%';
        meterDash.className = game.abilities.dash.cd <= 0 
            ? "h-full bg-cyan-400 w-full transition-all duration-75 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            : "h-full bg-neutral-600 transition-all duration-75";
    }

    if (meterThrust) {
        const ratio = game.abilities.thrust.cd <= 0 ? 1 : (1 - game.abilities.thrust.cd / game.abilities.thrust.maxCd);
        meterThrust.style.width = Math.floor(ratio * 100) + '%';
        meterThrust.className = game.abilities.thrust.cd <= 0 
            ? "h-full bg-amber-400 w-full transition-all duration-75 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
            : "h-full bg-neutral-600 transition-all duration-75";
    }

    if (meterChrono) {
        const ratio = game.abilities.chrono.cd <= 0 ? 1 : (1 - game.abilities.chrono.cd / game.abilities.chrono.maxCd);
        meterChrono.style.width = Math.floor(ratio * 100) + '%';
        meterChrono.className = game.abilities.chrono.cd <= 0 
            ? "h-full bg-purple-400 w-full transition-all duration-75 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
            : "h-full bg-neutral-600 transition-all duration-75";
    }

    // Legacy sync
    const meter = document.getElementById('hud-ability-meter');
    if (meter) {
        if (game.abilities.dash.cd <= 0) {
            meter.style.width = '100%';
            meter.className = "h-full bg-cyan-400 w-full transition-all duration-75 shadow-[0_0_8px_rgba(6,182,212,0.8)]";
        } else {
            const ratio = 1 - (game.abilities.dash.cd / game.abilities.dash.maxCd);
            meter.style.width = Math.floor(ratio * 100) + '%';
            meter.className = "h-full bg-neutral-600 transition-all duration-75";
        }
    }
}

function showNotification(text) {
    const toast = document.getElementById('toast-banner');
    if (!toast) return;
    toast.innerText = text;
    toast.classList.remove('hidden');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.add('hidden');
    }, 1800);
}

// ============================================================================
// 7. PHYSICS & PLAYER CONTROLLER
// ============================================================================
function resetPlayerState() {
    const p = game.player;
    p.x = 80;
    p.y = 356;
    p.prevX = 80;
    p.prevY = 356;
    p.renderX = 80;
    p.renderY = 356;
    p.vx = (game.level && game.level.startSpeed) ? game.level.startSpeed : 320;
    p.vy = 0;
    p.gravityDir = 1;
    p.isGrounded = true;
    p.isSliding = false;
    p.isJumping = false;
    p.canDoubleJump = true;
    p.hasDoubleJumped = false;
    p.airTime = 0;
    p.isInvulnerable = false;
    p.trail = [];
    p.coyoteTimer = 0;
    p.h = 44;
    game.runTime = 0;
    game.timeScale = 1.0;
    game.abilityCooldown = 0;
    game.abilityActiveTimer = 0;
    game.inputs.jumpBufferTime = 0;
    game.inputs.jumpPressedThisFrame = false;
    updateAbilityHUD();

    if (game.level && game.level.shards) {
        game.level.shards.forEach(sh => {
            sh.taken = false;
        });
    }
    if (game.level && game.level.rings) {
        game.level.rings.forEach(r => {
            r.lastHitTime = 0;
        });
    }
    game.shockwaves = [];
    game.cameraX = undefined;
    game.shardsCollected.clear();
    updateShardHUD();

    const lvl = game.level;
    game.chronoTimer = (lvl && lvl.objective && lvl.objective.type === 'CHRONO_COUNTDOWN') ? 7.0 : (lvl && lvl.objective && lvl.objective.type === 'THE_OMNI_RIFT') ? 8.5 : 0;
    game.speedGraceTimer = 1.5;
    game.sentinelX = (lvl && lvl.objective && (lvl.objective.type === 'SENTINEL_CHASE' || lvl.objective.type === 'THE_OMNI_RIFT')) ? -260 : -9999;
    game.phaseColor = 'CYAN';
    game.ringStreak = 0;
    game.maxRingStreak = 0;

    if (lvl && lvl.objective && lvl.objective.type === 'NO_DOUBLE_JUMP') {
        p.canDoubleJump = false;
        p.maxAirJumps = 0;
    } else if (lvl && lvl.objective && (lvl.objective.type === 'ZERO_G' || lvl.objective.type === 'THE_OMNI_RIFT')) {
        p.canDoubleJump = true;
        p.maxAirJumps = 3;
    } else {
        p.canDoubleJump = true;
        p.maxAirJumps = 1;
    }
    p.airJumpsDone = 0;

    if (game.abilities) {
        game.abilities.dash.cd = 0;
        game.abilities.dash.activeTimer = 0;
        game.abilities.thrust.cd = 0;
        game.abilities.chrono.cd = 0;
        game.abilities.chrono.activeTimer = 0;
    }
    game.ghostRecord = [];
    game.lastGhostRecordTime = 0;

    if (game.isEndless && game.level) {
        game.level.platforms = [{ x: 0, y: 400, w: 1400, h: 40 }];
        game.level.spikes = [];
        game.level.lasers = [];
        game.level.speedPads = [];
        game.level.trampolines = [];
        game.level.rings = [];
        game.level.portals = [];
        game.level.shards = [];
        game.endlessLastSpawnX = 1400;
        game.endlessDistance = 0;
        game.endlessNextWarpMeters = 1000;
        if (typeof spawnNextEndlessChunk === 'function') {
            for (let i = 0; i < 3; i++) {
                spawnNextEndlessChunk();
            }
        }
    }

    if (lvl && lvl.chronoOrbs) lvl.chronoOrbs.forEach(orb => { orb.taken = false; });
    if (lvl && lvl.phaseGates) lvl.phaseGates.forEach(g => { g.triggered = false; });
    updateObjectiveHUD();
}

function killPlayer(force = false) {
    if (!force && game.player.isInvulnerable) return;

    audio.playDeath();
    game.screenShake = 14;

    if (game.isEndless) {
        showNotification(`💥 MARATHON OVER! DISTANCE: ${game.endlessDistance}m // BEST: ${game.endlessBestDistance}m`);
    }

    const skin = getActiveSkinData();
    for (let i = 0; i < 24; i++) {
        game.particles.push({
            x: game.player.x + 11,
            y: game.player.y + 20,
            vx: (Math.random() - 0.5) * 450,
            vy: (Math.random() - 0.5) * 450,
            life: 0.5,
            maxLife: 0.5,
            color: Math.random() < 0.5 ? skin.color : '#ec4899',
            size: Math.random() * 4 + 3
        });
    }

    game.attempts++;
    const prevTime = game.runTime;
    resetPlayerState();
    if (game.isMultiplayer) {
        game.runTime = prevTime;
        showNotification("⚠️ CRASH PENALTY! SPRINT TO CATCH UP!");
    } else {
        const stopwatch = document.getElementById('hud-stopwatch');
        if (stopwatch) stopwatch.innerText = "00:00.000";
    }
}

function isCeilingOverhead() {
    const p = game.player;
    const lvl = game.level;
    for (let i = 0; i < lvl.lasers.length; i++) {
        const l = lvl.lasers[i];
        if (p.x + p.w > l.x && p.x < l.x + l.w) {
            if (p.y - 24 < l.y + l.h && p.y + p.h > l.y) {
                return true;
            }
        }
    }
    return false;
}

function updatePhysics(rawDt) {
    if (game.victory || game.isPaused || game.inMainMenu || game.isCountingDown) return;

    const dt = rawDt * game.timeScale;
    game.runTime += dt;
    const stopwatch = document.getElementById('hud-stopwatch');
    if (stopwatch) stopwatch.innerText = formatTime(game.runTime);

    if (game.abilityActiveTimer > 0) {
        game.abilityActiveTimer -= dt;
        if (game.abilityActiveTimer <= 0) {
            game.player.isInvulnerable = false;
            game.timeScale = 1.0;
        }
    }
    if (game.abilityCooldown > 0) {
        game.abilityCooldown = Math.max(0, game.abilityCooldown - dt);
        updateAbilityHUD();
    }

    // Collective Ability Matrix cooldown management (uses rawDt so cooldowns recharge in real-time even during slow-mo)
    if (game.abilities) {
        let changed = false;
        if (game.abilities.dash.activeTimer > 0) {
            game.abilities.dash.activeTimer -= rawDt;
            if (game.abilities.dash.activeTimer <= 0) {
                game.player.isInvulnerable = false;
            }
        }
        if (game.abilities.chrono.activeTimer > 0) {
            game.abilities.chrono.activeTimer -= rawDt;
            if (game.abilities.chrono.activeTimer <= 0) {
                game.timeScale = 1.0;
            }
        }
        if (game.abilities.dash.cd > 0) {
            game.abilities.dash.cd = Math.max(0, game.abilities.dash.cd - rawDt);
            changed = true;
        }
        if (game.abilities.thrust.cd > 0) {
            game.abilities.thrust.cd = Math.max(0, game.abilities.thrust.cd - rawDt);
            changed = true;
        }
        if (game.abilities.chrono.cd > 0) {
            game.abilities.chrono.cd = Math.max(0, game.abilities.chrono.cd - rawDt);
            changed = true;
        }
        if (changed) updateAbilityHUD();
    }

    const p = game.player;
    const lvl = game.level;

    // Track previous physics position for smooth render interpolation
    p.prevX = p.x;
    p.prevY = p.y;

    const effectiveGravity = (lvl.objective && (lvl.objective.type === 'ZERO_G' || lvl.objective.type === 'THE_OMNI_RIFT')) ? 950 : GRAVITY;

    // 1. Dynamic Speed Ramp-Up (Standard Level or Endless Mode)
    const progressRatio = (!lvl || !lvl.length) ? 0 : Math.min(1, Math.max(0, p.x / lvl.length));
    if (game.isEndless && typeof updateEndlessMode === 'function') {
        updateEndlessMode(dt);
    } else {
        p.vx = lvl.startSpeed + (lvl.maxSpeed - lvl.startSpeed) * Math.pow(progressRatio, 1.2);
    }

    // Dimension 2 Objective Rule Verifications
    if (lvl.objective && lvl.objective.type === 'SPEED_LOCK') {
        if (p.vx < 380) {
            game.speedGraceTimer -= dt;
            if (game.speedGraceTimer <= 0) {
                killPlayer();
                return;
            }
        } else {
            game.speedGraceTimer = Math.min(1.5, game.speedGraceTimer + dt * 1.5);
        }
    }

    if (lvl.objective && (lvl.objective.type === 'CHRONO_COUNTDOWN' || lvl.objective.type === 'THE_OMNI_RIFT')) {
        game.chronoTimer -= dt;
        if (game.chronoTimer <= 0) {
            killPlayer();
            return;
        }
    }

    if (lvl.objective && (lvl.objective.type === 'SENTINEL_CHASE' || lvl.objective.type === 'THE_OMNI_RIFT')) {
        const targetSentinelSpeed = (lvl.startSpeed + (lvl.maxSpeed - lvl.startSpeed) * Math.pow(progressRatio, 1.2)) * 0.94;
        game.sentinelX += targetSentinelSpeed * dt;
        if (p.x <= game.sentinelX + 16) {
            killPlayer();
            return;
        }
    }

    // 2. Autonomous Bot AI Pilot
    if (game.botDemo) {
        runBotPilotAI();
    }

    // 3. Coyote Time & Air Time Counters
    if (p.isGrounded) {
        p.coyoteTimer = 0.12;
        p.canDoubleJump = (p.maxAirJumps !== undefined ? p.maxAirJumps : 1) > 0;
        p.hasDoubleJumped = false;
        p.airJumpsDone = 0;
        p.airTime = 0;
        p.isJumping = false;
    } else {
        p.coyoteTimer = Math.max(0, p.coyoteTimer - dt);
        p.airTime += dt;
    }

    // 4. Jump Buffer Decay
    if (game.inputs.jumpBufferTime > 0) {
        game.inputs.jumpBufferTime -= dt;
    }

    // 5. Jump Action Handler: Ground Jump & Air Double Jump
    const jumpRequested = game.inputs.jumpPressedThisFrame || (game.inputs.jumpBufferTime > 0);

    if (jumpRequested && (p.isGrounded || p.coyoteTimer > 0)) {
        // Ground Jump
        p.vy = JUMP_IMPULSE * p.gravityDir;
        p.isGrounded = false;
        p.isJumping = true;
        p.coyoteTimer = 0;
        p.canDoubleJump = (p.maxAirJumps !== undefined ? p.maxAirJumps : 1) > 0;
        p.airJumpsDone = 0;
        p.hasDoubleJumped = false;
        p.airTime = 0.02;
        game.inputs.jumpBufferTime = 0;
        game.inputs.jumpPressedThisFrame = false;
        audio.playJump(false);
        createJumpParticles(p, false);
    } else if (jumpRequested && !p.isGrounded && p.canDoubleJump && ((p.airJumpsDone || 0) < (p.maxAirJumps !== undefined ? p.maxAirJumps : 1)) && p.airTime > 0.04) {
        // Air Jump (Multi-jump support for Zero-G)
        p.airJumpsDone = (p.airJumpsDone || 0) + 1;
        const impulseFactor = (p.maxAirJumps > 1) ? 0.90 : 0.95;
        p.vy = JUMP_IMPULSE * impulseFactor * p.gravityDir;
        p.isJumping = true;
        if (p.airJumpsDone >= (p.maxAirJumps !== undefined ? p.maxAirJumps : 1)) {
            p.hasDoubleJumped = true;
            p.canDoubleJump = false;
        }
        game.inputs.jumpBufferTime = 0;
        game.inputs.jumpPressedThisFrame = false;
        audio.playJump(true);
        createJumpParticles(p, true);
        game.screenShake = 4;
    }

    game.inputs.jumpPressedThisFrame = false;

    // 6. Smooth Variable Jump Height (Celeste-style natural gravity curve)
    if (p.isJumping && !game.inputs.jumpHeld && (p.vy * p.gravityDir < -80)) {
        p.vy += effectiveGravity * 1.35 * p.gravityDir * dt;
    }

    // 7. Slide & Rapid Air-Dive
    const mustStaySliding = isCeilingOverhead();
    if (game.inputs.slideHeld || mustStaySliding) {
        if (!p.isSliding) {
            p.isSliding = true;
            if (p.isGrounded && p.gravityDir === 1) {
                p.y += (44 - 20); // Keep feet flush with the platform
            }
            p.h = 20;
            audio.playSlide();
        }
        if (!p.isGrounded && !p.isJumping && (p.vy * p.gravityDir < AIR_DIVE_IMPULSE)) {
            p.vy = Math.min(AIR_DIVE_IMPULSE, (p.vy * p.gravityDir + 2400 * dt)) * p.gravityDir;
        }
    } else {
        if (p.isSliding) {
            p.isSliding = false;
            if (p.isGrounded && p.gravityDir === 1) {
                p.y -= (44 - 20); // Restore height smoothly upward without floor clipping
            }
            p.h = 44;
        }
    }

    // 8. Gravity Acceleration
    p.vy += effectiveGravity * p.gravityDir * dt;
    p.vy = Math.max(-1000, Math.min(1000, p.vy));

    // NaN / Infinity Safety Shield
    if (isNaN(p.x) || !isFinite(p.x)) p.x = p.prevX || 100;
    if (isNaN(p.y) || !isFinite(p.y)) { p.y = 356; p.vy = 0; }
    if (isNaN(p.vx) || !isFinite(p.vx)) p.vx = 320;
    if (isNaN(p.vy) || !isFinite(p.vy)) p.vy = 0;

    // 9. Position Advancement
    p.x += p.vx * dt;

    // 10. Platform Collisions
    const prevY = p.y;
    p.y += p.vy * dt;
    p.isGrounded = false;

    const maxStep = Math.max(35, Math.abs(p.vy * dt) + 15);

    for (let i = 0; i < lvl.platforms.length; i++) {
        const plat = lvl.platforms[i];
        if (plat.phase && plat.phase !== 'NEUTRAL' && plat.phase !== game.phaseColor) {
            continue;
        }
        if (p.x + p.w > plat.x && p.x < plat.x + plat.w) {
            if (p.gravityDir === 1 && p.vy >= 0) {
                if (prevY + p.h <= plat.y + maxStep && p.y + p.h >= plat.y) {
                    p.y = plat.y - p.h;
                    p.vy = 0;
                    p.isGrounded = true;
                    p.isJumping = false;
                    break;
                }
            } else if (p.gravityDir === -1 && p.vy <= 0) {
                const platBottom = plat.y + plat.h;
                if (prevY >= platBottom - maxStep && p.y <= platBottom) {
                    p.y = platBottom;
                    p.vy = 0;
                    p.isGrounded = true;
                    p.isJumping = false;
                    break;
                }
            }
        }
    }

    // Glitch Phasing Platforms
    if (lvl.glitchPlatforms) {
        const nowSec = game.runTime;
        for (let i = 0; i < lvl.glitchPlatforms.length; i++) {
            const gp = lvl.glitchPlatforms[i];
            const cyclePos = ((nowSec + (gp.offset || 0)) % gp.period) / gp.period;
            const isSolid = cyclePos < gp.activeRatio;
            if (isSolid && p.x + p.w > gp.x && p.x < gp.x + gp.w) {
                if (p.gravityDir === 1 && p.vy >= 0) {
                    if (prevY + p.h <= gp.y + maxStep && p.y + p.h >= gp.y) {
                        p.y = gp.y - p.h;
                        p.vy = 0;
                        p.isGrounded = true;
                        p.isJumping = false;
                        break;
                    }
                }
            }
        }
    }

    // 11. Bottomless Void Death Check (Force kill even during phase invulnerability)
    if (p.y > 520 || p.y < -140) {
        killPlayer(true);
        return;
    }

    // 12. Run Cycle Animation Counter
    if (p.isGrounded && !p.isSliding) {
        p.runCycle += dt * (p.vx / 28);
    }

    // 13. Dynamic Exosuit Trail
    const skin = getActiveSkinData();
    if (Math.random() < 0.45) {
        p.trail.unshift({
            x: p.x,
            y: p.y,
            h: p.h,
            isSliding: p.isSliding,
            alpha: p.isInvulnerable ? 0.9 : 0.6,
            color: p.isInvulnerable ? '#ffffff' : skin.color
        });
        if (p.trail.length > 9) p.trail.pop();
    }

    // 14. Check Interactive Items
    checkInteractions();

    // Ghost Recording (15Hz)
    if (!game.isEndless && !game.victory) {
        if (game.runTime - game.lastGhostRecordTime >= 0.065) {
            game.ghostRecord.push({
                t: Math.round(game.runTime * 100) / 100,
                x: Math.round(p.x),
                y: Math.round(p.y),
                s: p.isSliding ? 1 : 0
            });
            game.lastGhostRecordTime = game.runTime;
        }
    }

    // Multiplayer State Broadcast (30Hz)
    if (game.isMultiplayer && typeof MP !== 'undefined') {
        MP.broadcastState();
    }

    // Live AI Rival Simulation
    if (game.isMultiplayer && game.mpRival && game.mpRival.isAI && typeof updateAiRival === 'function') {
        updateAiRival(dt);
    }

    // Live Race Delta HUD Badge (Multiplayer / Ghost)
    let rivalX = null;
    if (game.isMultiplayer && game.mpRival) {
        rivalX = game.mpRival.x;
    } else if (game.ghostActive && game.ghostData && game.ghostData.path) {
        const path = game.ghostData.path;
        if (path.length > 0) {
            const t = game.runTime;
            if (t >= path[path.length - 1].t) rivalX = path[path.length - 1].x;
            else {
                for (let i = 0; i < path.length - 1; i++) {
                    if (path[i].t <= t && path[i + 1].t >= t) {
                        const ratio = (t - path[i].t) / (path[i + 1].t - path[i].t || 0.001);
                        rivalX = path[i].x + (path[i + 1].x - path[i].x) * ratio;
                        break;
                    }
                }
            }
        }
    }
    const raceBadge = document.getElementById('hud-race-badge');
    const raceDelta = document.getElementById('hud-race-delta');
    if (rivalX !== null && raceBadge && raceDelta) {
        raceBadge.classList.remove('hidden');
        const deltaM = Math.round((p.x - rivalX) / 10);
        if (deltaM >= 0) {
            raceDelta.innerText = `+${deltaM}m AHEAD`;
            raceBadge.className = "flex items-center gap-1 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
        } else {
            raceDelta.innerText = `${deltaM}m BEHIND`;
            raceBadge.className = "flex items-center gap-1 bg-rose-950/80 px-2 py-1 rounded border border-rose-500/60 shadow-[0_0_10px_rgba(244,63,94,0.3)]";
        }
    } else if (raceBadge) {
        raceBadge.classList.add('hidden');
    }

    // 15. Progress Bar & Victory Check
    if (game.isEndless) {
        // Endless Mode progress and distance handled dynamically in updateEndlessMode
    } else {
        const progress = Math.min(100, Math.floor((p.x / lvl.length) * 100));
        const fill = document.getElementById('hud-progress-fill');
        const pct = document.getElementById('hud-pct-text');
        if (fill) fill.style.width = progress + '%';
        if (pct) pct.innerText = progress + '%';

        // Objective Exit Locks
        if (lvl.objective && lvl.objective.type === 'CORE_HUNTER') {
            if (p.x >= lvl.length - 20 && game.shardsCollected.size < 3) {
                p.x = lvl.length - 25;
                p.vx = 0;
                return;
            }
        }
        if (lvl.objective && lvl.objective.type === 'RING_CHAIN') {
            if (p.x >= lvl.length - 20 && (game.maxRingStreak || 0) < 8) {
                p.x = lvl.length - 25;
                p.vx = 0;
                return;
            }
        }

        updateObjectiveHUD();

        // 16. Level Completion
        if (p.x >= lvl.length && !game.victory) {
            triggerVictory();
        }
    }
}

// ============================================================================
// 8. INTERACTION RESOLUTION (HAZARDS, PADS, RINGS, PORTALS, SHARDS)
// ============================================================================
function checkInteractions() {
    const p = game.player;
    const lvl = game.level;

    // 1. Speed Boost Pads
    if (lvl.speedPads) {
        for (let i = 0; i < lvl.speedPads.length; i++) {
            const pad = lvl.speedPads[i];
            if (p.x + p.w > pad.x && p.x < pad.x + pad.w && Math.abs((p.y + p.h) - pad.y) < 25) {
                p.vx += (pad.boostVx !== undefined ? pad.boostVx : 200);
                audio.playBoostPad();
                game.screenShake = 6;
                for (let k = 0; k < 12; k++) {
                    game.particles.push({
                        x: pad.x + Math.random() * pad.w,
                        y: pad.y,
                        vx: p.vx * 0.7,
                        vy: (Math.random() - 0.5) * 60,
                        life: 0.3,
                        maxLife: 0.3,
                        color: '#f59e0b',
                        size: 3
                    });
                }
            }
        }
    }

    // 2. Kinetic Trampolines
    if (lvl.trampolines) {
        for (let i = 0; i < lvl.trampolines.length; i++) {
            const tramp = lvl.trampolines[i];
            if (p.x + p.w > tramp.x && p.x < tramp.x + tramp.w && Math.abs((p.y + p.h) - tramp.y) < 25) {
                p.vy = (tramp.launchVy !== undefined ? tramp.launchVy : -640) * p.gravityDir;
                p.isGrounded = false;
                p.isJumping = false;
                p.canDoubleJump = true;
                p.hasDoubleJumped = false;
                p.airTime = 0.05;
                audio.playTrampoline();
                game.screenShake = 7;
                for (let k = 0; k < 15; k++) {
                    game.particles.push({
                        x: tramp.x + tramp.w / 2,
                        y: tramp.y,
                        vx: (Math.random() - 0.5) * 160,
                        vy: -Math.random() * 220,
                        life: 0.35,
                        maxLife: 0.35,
                        color: '#10b981',
                        size: 4
                    });
                }
            }
        }
    }

    // 3. Spikes
    if (!p.isInvulnerable && lvl.spikes) {
        for (let i = 0; i < lvl.spikes.length; i++) {
            const s = lvl.spikes[i];
            const spikeY = s.inverted ? s.y : s.y - s.h;
            if (
                p.x + p.w - 4 > s.x &&
                p.x + 4 < s.x + s.w &&
                p.y + p.h - 3 > spikeY &&
                p.y + 3 < spikeY + s.h
            ) {
                killPlayer();
                return;
            }
        }
    }

    // 4. Lasers
    if (!p.isInvulnerable && lvl.lasers) {
        for (let i = 0; i < lvl.lasers.length; i++) {
            const l = lvl.lasers[i];
            const overlapX = (p.x + p.w - 3 > l.x) && (p.x + 3 < l.x + l.w);
            const overlapY = (p.y + p.h - 2 > l.y) && (p.y + 2 < l.y + l.h);
            if (overlapX && overlapY) {
                killPlayer();
                return;
            }
        }
    }

    // 5. Jump Rings & Geometry Dash Gravity Rings
    if (lvl.rings) {
        for (let i = 0; i < lvl.rings.length; i++) {
        const r = lvl.rings[i];
        const dx = (p.x + p.w / 2) - r.x;
        const dy = (p.y + p.h / 2) - r.y;
        const dist = Math.hypot(dx, dy);
        const radius = r.r || r.radius || 24;
        if (dist < radius + 26) {
            const now = game.runTime;
            if ((now - (r.lastHitTime || 0) > 0.35) && (!p.isGrounded || game.inputs.jumpHeld || game.inputs.jumpBufferTime > 0 || game.inputs.jumpPressedThisFrame)) {
                r.lastHitTime = now;
                if (r.type === 'GRAVITY') {
                    p.gravityDir = (r.targetGravity !== undefined) ? r.targetGravity : ((r.targetDir !== undefined) ? r.targetDir : (p.gravityDir * -1));
                    p.vy = (r.flipVy !== undefined ? r.flipVy : 340) * p.gravityDir;
                    p.isJumping = false;
                    p.canDoubleJump = true;
                    p.hasDoubleJumped = false;
                    p.airTime = 0.05;
                    audio.playGravityRing();
                    game.screenShake = 8;
                    if (game.shockwaves) {
                        game.shockwaves.push({
                            x: r.x,
                            y: r.y,
                            r: 12,
                            maxR: 75,
                            color: '#38bdf8',
                            alpha: 1
                        });
                    }
                    for (let k = 0; k < 16; k++) {
                        const angle = (Math.PI * 2 * k) / 16;
                        game.particles.push({
                            x: r.x,
                            y: r.y,
                            vx: Math.cos(angle) * 190,
                            vy: Math.sin(angle) * 190,
                            life: 0.38,
                            maxLife: 0.38,
                            color: k % 2 === 0 ? '#38bdf8' : '#60a5fa',
                            size: 4
                        });
                    }
                } else {
                    p.vy = (r.boostY !== undefined ? r.boostY : -580) * p.gravityDir;
                    game.ringStreak = (game.ringStreak || 0) + 1;
                    game.maxRingStreak = Math.max(game.maxRingStreak || 0, game.ringStreak);
                    p.isJumping = false;
                    p.canDoubleJump = true;
                    p.hasDoubleJumped = false;
                    p.airTime = 0.05;
                    audio.playRing();
                    game.screenShake = 5;
                    if (game.shockwaves) {
                        game.shockwaves.push({
                            x: r.x,
                            y: r.y,
                            r: 12,
                            maxR: 65,
                            color: r.color || '#06b6d4',
                            alpha: 1
                        });
                    }
                    for (let k = 0; k < 12; k++) {
                        const angle = (Math.PI * 2 * k) / 12;
                        game.particles.push({
                            x: r.x,
                            y: r.y,
                            vx: Math.cos(angle) * 160,
                            vy: Math.sin(angle) * 160,
                            life: 0.35,
                            maxLife: 0.35,
                            color: r.color,
                            size: 3.5
                        });
                    }
                }
            }
        }
    }
}

    // 6. Gravity Portals
    if (lvl.portals) {
        for (let i = 0; i < lvl.portals.length; i++) {
            const prt = lvl.portals[i];
            if (p.x + p.w > prt.x && p.x < prt.x + prt.w && p.y + p.h > prt.y && p.y < prt.y + prt.h) {
                if (p.gravityDir !== prt.targetGravity) {
                    p.gravityDir = prt.targetGravity;
                    p.vy = 200 * p.gravityDir;
                    p.isJumping = false;
                    p.canDoubleJump = true;
                    p.hasDoubleJumped = false;
                    audio.playJump(true);
                    game.screenShake = 6;
                }
            }
        }
    }

    // Ring streak reset if grounded on starting pad
    if (p.isGrounded && lvl.objective && lvl.objective.type === 'RING_CHAIN') {
        if (p.x < 1200) {
            game.ringStreak = 0;
        }
    }

    // Chrono Orbs
    if (lvl.chronoOrbs) {
        for (let i = 0; i < lvl.chronoOrbs.length; i++) {
            const orb = lvl.chronoOrbs[i];
            if (orb.taken) continue;
            const dx = (p.x + p.w / 2) - orb.x;
            const dy = (p.y + p.h / 2) - orb.y;
            if (Math.hypot(dx, dy) < 34) {
                orb.taken = true;
                game.chronoTimer = Math.min(10.0, (game.chronoTimer || 0) + 3.5);
                audio.playBoostPad();
                game.screenShake = 4;
                showNotification("⏳ +3.5s CHRONO EXPANSION!");
                for (let k = 0; k < 12; k++) {
                    const angle = (Math.PI * 2 * k) / 12;
                    game.particles.push({
                        x: orb.x,
                        y: orb.y,
                        vx: Math.cos(angle) * 180,
                        vy: Math.sin(angle) * 180,
                        life: 0.45,
                        maxLife: 0.45,
                        color: '#f59e0b',
                        size: 4
                    });
                }
            }
        }
    }

    // Phase Gates
    if (lvl.phaseGates) {
        for (let i = 0; i < lvl.phaseGates.length; i++) {
            const gate = lvl.phaseGates[i];
            if (p.x + p.w > gate.x && p.x < gate.x + 24) {
                if (!gate.triggered) {
                    gate.triggered = true;
                    game.phaseColor = gate.targetColor;
                    audio.playGravityRing();
                    game.screenShake = 6;
                    showNotification(`⚡ PHASE SHIFT: ${game.phaseColor} ACTIVE!`);
                    if (game.shockwaves) {
                        game.shockwaves.push({
                            x: gate.x,
                            y: 270,
                            r: 10,
                            maxR: 90,
                            color: gate.targetColor === 'CYAN' ? '#06b6d4' : '#ec4899',
                            alpha: 1
                        });
                    }
                }
            }
        }
    }

    // 7. Secret Shards (with subtle magnetic attraction)
    if (lvl.shards) {
        for (let i = 0; i < lvl.shards.length; i++) {
            const sh = lvl.shards[i];
            if (!sh.taken) {
                const dx = (p.x + p.w / 2) - sh.x;
                const dy = (p.y + p.h / 2) - sh.y;
                const dist = Math.hypot(dx, dy);

                // Subtle magnetic pull within 60px
                if (dist < 60 && dist > 0) {
                    const pullStrength = 140 * (1 - dist / 60);
                    sh.x += (dx / dist) * pullStrength * (1 / 120);
                    sh.y += (dy / dist) * pullStrength * (1 / 120);
                }

                if (dist < 52) {
                    sh.taken = true;
                    game.shardsCollected.add(sh.id);
                    audio.playShard();
                    updateShardHUD();
                    showNotification(`SECRET GEM ACQUIRED (${game.shardsCollected.size}/3)!`);
                    for (let k = 0; k < 14; k++) {
                        const angle = (Math.PI * 2 * k) / 14;
                        game.particles.push({
                            x: sh.x,
                            y: sh.y,
                            vx: Math.cos(angle) * 130,
                            vy: Math.sin(angle) * 130,
                            life: 0.4,
                            maxLife: 0.4,
                            color: '#f472b6',
                            size: 3.5
                        });
                    }
                }
            }
        }
    }
}

function updateShardHUD() {
    for (let i = 1; i <= 3; i++) {
        const icon = document.getElementById(`shard-${i}-icon`);
        if (!icon) continue;
        if (game.shardsCollected && game.shardsCollected.has(i)) {
            icon.className = "w-2.5 h-2.5 rounded-sm bg-pink-500 border border-pink-300 shadow-[0_0_8px_rgba(236,72,153,0.9)] transition";
        } else {
            icon.className = "w-2.5 h-2.5 rounded-sm bg-neutral-800 border border-neutral-700 transition";
        }
    }
}

// ============================================================================
// 9. VICTORY & TIME TRIAL RANKING
// ============================================================================
function triggerVictory() {
    if (game.victory) return;
    game.victory = true;
    audio.playVictory();
    audio.pauseMusic();

    const lvl = game.level;
    const finalTime = game.runTime;
    const shardsCount = game.shardsCollected.size;

    const targetParTime = (lvl.length / lvl.startSpeed) * 0.95;
    let rank = "C RANK";
    if (shardsCount === 3 && finalTime <= targetParTime) rank = "S RANK";
    else if (shardsCount >= 2 && finalTime <= targetParTime * 1.15) rank = "A RANK";
    else if (shardsCount >= 1) rank = "B RANK";

    saveRunToLeaderboard(game.currentLevelIdx, finalTime, shardsCount, game.selectedAbility);

    // Save Ghost Run for Challenge Links
    game.lastCompletedGhost = {
        tag: game.pilotTag,
        stage: game.currentLevelIdx,
        time: finalTime,
        skin: dailySystem.activeSkin,
        path: [...game.ghostRecord]
    };

    // Multiplayer Finish Notification
    if (game.isMultiplayer && typeof MP !== 'undefined') {
        MP.broadcastFinish(finalTime);
    }

    try {
        const pbKey = `neon_pulse_pb_${game.currentLevelIdx}`;
        const prevPb = localStorage.getItem(pbKey);
        const pbNotif = document.getElementById('vic-pb-notification');
        if (!prevPb || finalTime < parseFloat(prevPb)) {
            localStorage.setItem(pbKey, finalTime.toString());
            localStorage.setItem(`neon_pulse_shards_${game.currentLevelIdx}`, shardsCount.toString());
            if (pbNotif) pbNotif.classList.remove('hidden');
        } else {
            if (pbNotif) pbNotif.classList.add('hidden');
        }
    } catch(e) {}

    const vicLevel = document.getElementById('victory-level-name');
    const vicTime = document.getElementById('vic-time');
    const vicShards = document.getElementById('vic-shards');
    const vicRank = document.getElementById('vic-rank');

    if (vicLevel) vicLevel.innerText = lvl.name;
    if (vicTime) vicTime.innerText = formatTime(finalTime);
    if (vicShards) vicShards.innerText = `${shardsCount} / 3`;

    const objBox = document.getElementById('vic-objective-box');
    const objTitle = document.getElementById('vic-obj-title');
    const objDesc = document.getElementById('vic-obj-desc');
    const objStatus = document.getElementById('vic-obj-status');
    if (objBox) {
        if (lvl.objective) {
            objBox.classList.remove('hidden');
            if (objTitle) objTitle.innerText = `${lvl.objective.icon || '🎯'} ${lvl.objective.title}`;
            if (objDesc) objDesc.innerText = lvl.objective.desc;
            if (objStatus) objStatus.innerText = 'MISSION ACCOMPLISHED';
        } else {
            objBox.classList.add('hidden');
        }
    }
    if (vicRank) vicRank.innerText = rank;

    if (game.isMultiplayer && typeof MP !== 'undefined' && (MP.connected || (game.mpRival && game.mpRival.isAI))) {
        // Race finish is handled by MP.broadcastFinish / showPodium
        return;
    }

    const vicModal = document.getElementById('modal-victory');
    if (vicModal) {
        vicModal.classList.remove('hidden');
        vicModal.style.display = '';
    }
}

// ============================================================================
// 10. SMART AUTONOMOUS BOT PILOT AI
// ============================================================================
function runBotPilotAI() {
    const p = game.player;
    const lvl = game.level;
    const lookahead = Math.max(85, p.vx * 0.32);

    let mustJump = false;
    let mustSlide = false;

    // 1. Spikes
    for (let i = 0; i < lvl.spikes.length; i++) {
        const s = lvl.spikes[i];
        if (s.x > p.x && s.x - p.x < lookahead) {
            if (!s.inverted && p.gravityDir === 1) mustJump = true;
            else if (s.inverted && p.gravityDir === -1) mustJump = true;
        }
    }

    // 2. Lasers
    for (let i = 0; i < lvl.lasers.length; i++) {
        const l = lvl.lasers[i];
        if (l.x + l.w > p.x && l.x - p.x < lookahead * 0.85) {
            if (l.h <= 35 && l.y <= 360) {
                if (p.isGrounded || isCeilingOverhead()) {
                    mustSlide = true;
                }
            } else if (p.isGrounded && l.h > 35) {
                mustJump = true;
            }
        }
    }

    // 3. Jump Rings & Gravity Rings
    for (let i = 0; i < lvl.rings.length; i++) {
        const r = lvl.rings[i];
        if (r.x > p.x && r.x - p.x < 75 && Math.abs(p.y - r.y) < 110) {
            if (p.isGrounded) {
                mustJump = true;
            }
        }
    }

    // 4. Void / Chasm edge detection
    if (p.isGrounded) {
        const checkX = p.x + p.w + 24;
        let hasSurface = false;
        let hasFloorBelow = false;
        for (let i = 0; i < lvl.platforms.length; i++) {
            const plat = lvl.platforms[i];
            if (plat.phase && plat.phase !== 'NEUTRAL' && plat.phase !== game.phaseColor) continue;
            if (checkX >= plat.x && checkX <= plat.x + plat.w) {
                if (p.gravityDir === 1) {
                    if (Math.abs((p.y + p.h) - plat.y) < 45) {
                        hasSurface = true;
                        break;
                    } else if (plat.y > p.y + p.h && plat.y - (p.y + p.h) <= 150) {
                        hasFloorBelow = true;
                    }
                } else if (p.gravityDir === -1) {
                    if (Math.abs(p.y - (plat.y + plat.h)) < 45) {
                        hasSurface = true;
                        break;
                    } else if (plat.y + plat.h < p.y && p.y - (plat.y + plat.h) <= 150) {
                        hasFloorBelow = true;
                    }
                }
            }
        }
        if (!hasSurface && lvl.glitchPlatforms) {
            const nowSec = game.runTime;
            for (let i = 0; i < lvl.glitchPlatforms.length; i++) {
                const gp = lvl.glitchPlatforms[i];
                const cyclePos = ((nowSec + (gp.offset || 0)) % gp.period) / gp.period;
                const isSolid = cyclePos < gp.activeRatio;
                if (isSolid && checkX >= gp.x && checkX <= gp.x + gp.w) {
                    if (p.gravityDir === 1 && Math.abs((p.y + p.h) - gp.y) < 60) {
                        hasSurface = true;
                        break;
                    }
                }
            }
        }
        if (!hasSurface && !hasFloorBelow) {
            mustJump = true;
        }
    }

    // Trampoline lookahead: don't jump over an upcoming trampoline on the ground
    if (lvl.trampolines && p.isGrounded) {
        for (let i = 0; i < lvl.trampolines.length; i++) {
            const tp = lvl.trampolines[i];
            if (tp.x > p.x && tp.x - p.x < 90 && Math.abs((p.y + p.h) - tp.y) < 30) {
                mustJump = false;
                break;
            }
        }
    }

    // 5. Air recovery with double jump ONLY if falling into void without platform below
    if (!p.isGrounded && p.canDoubleJump && ((p.airJumpsDone || 0) < (p.maxAirJumps || 1))) {
        if (p.gravityDir === 1 && p.vy > 120) {
            let floorBelow = false;
            for (let i = 0; i < lvl.platforms.length; i++) {
                const plat = lvl.platforms[i];
                if (plat.phase && plat.phase !== 'NEUTRAL' && plat.phase !== game.phaseColor) continue;
                if (p.x + p.w > plat.x && p.x < plat.x + plat.w && plat.y >= p.y + p.h - 10) {
                    floorBelow = true;
                    break;
                }
            }
            if (!floorBelow && p.y > 390) mustJump = true;
        } else if (p.gravityDir === -1 && p.vy < -120) {
            let ceilingAbove = false;
            for (let i = 0; i < lvl.platforms.length; i++) {
                const plat = lvl.platforms[i];
                if (plat.phase && plat.phase !== 'NEUTRAL' && plat.phase !== game.phaseColor) continue;
                if (p.x + p.w > plat.x && p.x < plat.x + plat.w && (plat.y + plat.h) <= p.y + 10) {
                    ceilingAbove = true;
                    break;
                }
            }
            if (!ceilingAbove && p.y < 110) mustJump = true;
        }
    }

    // Never force air-dive sliding into voids unless under a ceiling
    if (!p.isGrounded && !isCeilingOverhead()) {
        mustSlide = false;
    }

    if (mustSlide || isCeilingOverhead()) mustJump = false;
    game.inputs.jumpHeld = mustJump;
    if (mustJump && !game.inputs.prevJumpHeld) {
        game.inputs.jumpPressedThisFrame = true;
        game.inputs.jumpBufferTime = 0.16;
    }
    game.inputs.prevJumpHeld = mustJump;
    game.inputs.slideHeld = mustSlide;
}

// ============================================================================
// 11. CANVAS RENDERING ENGINE
// ============================================================================

// ============================================================================
// DIMENSION 2 VISUAL EFFECTS & ENTITIES
// ============================================================================
function drawDimension2Background(cameraX) {
    ctx.fillStyle = getDim2BgGrad() || '#06020f';
    ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

    // Parallax Quantum Nebula Dust (Cached Gradients)
    ctx.save();
    const t = game.runTime * 0.4;
    for (let n = 0; n < 3; n++) {
        const nx = ((n * 380 - cameraX * 0.08 + Math.sin(t + n) * 40) % (V_WIDTH + 400)) - 200;
        const ny = 120 + n * 110 + Math.cos(t * 0.8 + n) * 30;
        const rad = getNebulaGrad(n);
        if (rad) {
            ctx.save();
            ctx.translate(nx, ny);
            ctx.fillStyle = rad;
            ctx.beginPath();
            ctx.arc(0, 0, 180, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    ctx.restore();

    // Starfield Parallax
    ctx.save();
    for (let layer = 1; layer <= 2; layer++) {
        const speed = layer === 1 ? 0.05 : 0.12;
        const count = layer === 1 ? 40 : 25;
        for (let i = 0; i < count; i++) {
            const seed = i * 997 + layer * 31;
            const sx = ((seed * 43.17 - cameraX * speed) % (V_WIDTH + 50)) - 25;
            const sy = (seed * 29.83) % (V_HEIGHT - 60);
            const twinkle = (Math.sin(game.runTime * 3 + seed) + 1) * 0.5;
            ctx.fillStyle = layer === 1 
                ? `rgba(192, 132, 252, ${0.3 + twinkle * 0.5})` 
                : `rgba(255, 255, 255, ${0.4 + twinkle * 0.6})`;
            ctx.beginPath();
            ctx.arc(sx, sy, layer === 1 ? 1.2 : 2.0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.restore();

    // Dimensional Fracture Grid
    ctx.save();
    ctx.strokeStyle = 'rgba(147, 51, 234, 0.08)';
    ctx.lineWidth = 1;
    const gridSpacing = 60;
    const gridOffset = (-cameraX * 0.18) % gridSpacing;
    for (let gx = gridOffset; gx < V_WIDTH; gx += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, V_HEIGHT);
        ctx.stroke();
    }
    for (let gy = 0; gy < V_HEIGHT; gy += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(V_WIDTH, gy);
        ctx.stroke();
    }
    ctx.restore();
}

function drawSentinelDeathWall(cameraX) {
    const sx = game.sentinelX;
    ctx.save();
    const wallGrad = ctx.createLinearGradient(sx - 120, 0, sx + 20, 0);
    wallGrad.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
    wallGrad.addColorStop(0.7, 'rgba(244, 63, 94, 0.7)');
    wallGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(sx - 120, 0, 140, V_HEIGHT);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(sx + 16, 0);
    ctx.lineTo(sx + 16, V_HEIGHT);
    ctx.stroke();

    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 2;
    for (let l = 0; l < 4; l++) {
        const yStart = (l * 130 + (game.runTime * 200) % 130);
        ctx.beginPath();
        ctx.moveTo(sx + 16, yStart);
        ctx.lineTo(sx + 16 + (Math.sin(game.runTime * 15 + l) * 25), yStart + 35);
        ctx.lineTo(sx + 16, yStart + 70);
        ctx.stroke();
    }
    ctx.restore();
}

function drawChronoOrb(orb) {
    ctx.save();
    const t = game.runTime * 3.5;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';

    ctx.beginPath();
    ctx.arc(orb.x, orb.y, 16 + Math.sin(t) * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(orb.x, orb.y);
    ctx.lineTo(orb.x + Math.cos(t * 1.5) * 10, orb.y + Math.sin(t * 1.5) * 10);
    ctx.moveTo(orb.x, orb.y);
    ctx.lineTo(orb.x + Math.cos(-t * 0.7) * 7, orb.y + Math.sin(-t * 0.7) * 7);
    ctx.stroke();
    ctx.restore();
}

function drawPhaseGate(gate) {
    ctx.save();
    const color = gate.targetColor === 'CYAN' ? '#06b6d4' : '#ec4899';
    const isTriggered = gate.triggered;
    ctx.strokeStyle = color;
    ctx.lineWidth = isTriggered ? 2 : 4;
    ctx.shadowColor = color;
    ctx.shadowBlur = isTriggered ? 8 : 22;
    ctx.globalAlpha = isTriggered ? 0.4 : 0.9;

    ctx.beginPath();
    ctx.moveTo(gate.x, 0);
    ctx.lineTo(gate.x, V_HEIGHT);
    ctx.stroke();

    const t = (game.runTime * 120) % 90;
    for (let y = t; y < V_HEIGHT; y += 90) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(gate.x - 8, y);
        ctx.lineTo(gate.x + 8, y);
        ctx.lineTo(gate.x, y + 12);
        ctx.fill();
    }
    ctx.restore();
}

function render() {
    if (cachedCanvasWidth === 0 || cachedCanvasHeight === 0 || canvas.width !== cachedCanvasWidth) {
        updateCanvasViewport();
    }

    const scale = cachedScale;
    const offsetX = cachedOffsetX;
    const offsetY = cachedOffsetY;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const frameDt = game.lastFrameDelta || 0.016;

    if (game.screenShake > 0) {
        ctx.translate((Math.random() - 0.5) * game.screenShake, (Math.random() - 0.5) * game.screenShake);
        game.screenShake *= Math.pow(0.88, frameDt * 60);
        if (game.screenShake < 0.3) game.screenShake = 0;
    }

    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    // Render state interpolation between physics sub-steps for smooth 60/120/144/240Hz
    const alpha = (game.renderAlpha !== undefined) ? game.renderAlpha : 1.0;
    const p = game.player;
    if (p.prevX === undefined || isNaN(p.prevX) || Math.abs(p.x - p.prevX) > 100) p.prevX = p.x;
    if (p.prevY === undefined || isNaN(p.prevY) || Math.abs(p.y - p.prevY) > 100) p.prevY = p.y;
    p.renderX = p.prevX + (p.x - p.prevX) * alpha;
    p.renderY = p.prevY + (p.y - p.prevY) * alpha;
    if (isNaN(p.renderX) || !isFinite(p.renderX)) p.renderX = p.x = 100;
    if (isNaN(p.renderY) || !isFinite(p.renderY)) p.renderY = p.y = 356;

    const targetCameraX = p.renderX - 220 + Math.max(0, (p.vx - 280) * 0.22);
    if (game.cameraX === undefined || isNaN(game.cameraX)) {
        game.cameraX = targetCameraX;
    } else {
        const camBlend = 1 - Math.exp(-22 * frameDt);
        game.cameraX += (targetCameraX - game.cameraX) * camBlend;
        if (isNaN(game.cameraX)) game.cameraX = targetCameraX;
    }
    const cameraX = game.cameraX;

    const lvl = game.level || LEVELS[0];

    if (lvl.dimension === 2) {
        drawDimension2Background(cameraX);
    } else {
        drawCyberBackground(cameraX);
    }
    ctx.save();
    ctx.translate(-cameraX, 0);

    // 1. Platforms
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = lvl.color;
    ctx.lineWidth = 2;
    for (let i = 0; i < lvl.platforms.length; i++) {
        const plat = lvl.platforms[i];
        if (plat.x + plat.w > cameraX && plat.x < cameraX + V_WIDTH) {
            if (plat.phase && plat.phase !== 'NEUTRAL') {
                const isActive = plat.phase === game.phaseColor;
                const pColor = plat.phase === 'CYAN' ? '#06b6d4' : '#ec4899';
                ctx.save();
                ctx.globalAlpha = isActive ? 1.0 : 0.22;
                ctx.fillStyle = isActive ? '#0f172a' : '#1e1b4b';
                ctx.strokeStyle = pColor;
                ctx.lineWidth = isActive ? 2.5 : 1;
                ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
                ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);
                ctx.fillStyle = pColor;
                ctx.fillRect(plat.x, plat.y, plat.w, 4);
                ctx.restore();
            } else {
                ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
                ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);
                ctx.fillStyle = lvl.color;
                ctx.fillRect(plat.x, plat.y, plat.w, 3);
                ctx.fillStyle = '#0f172a';
            }
        }
    }

    // 2. Glitch Phasing Platforms
    if (lvl.glitchPlatforms) {
        const nowSec = game.runTime;
        for (let i = 0; i < lvl.glitchPlatforms.length; i++) {
            const gp = lvl.glitchPlatforms[i];
            if (gp.x + gp.w > cameraX && gp.x < cameraX + V_WIDTH) {
                const cyclePos = ((nowSec + (gp.offset || 0)) % gp.period) / gp.period;
                const isSolid = cyclePos < gp.activeRatio;
                ctx.fillStyle = isSolid ? '#1e293b' : 'rgba(30, 41, 59, 0.2)';
                ctx.strokeStyle = isSolid ? '#a855f7' : 'rgba(168, 85, 247, 0.25)';
                ctx.strokeRect(gp.x, gp.y, gp.w, gp.h);
                ctx.fillRect(gp.x, gp.y, gp.w, gp.h);
            }
        }
    }

    // 3. Speed Booster Pads
    if (lvl.speedPads) {
        for (let i = 0; i < lvl.speedPads.length; i++) {
            const sp = lvl.speedPads[i];
            if (sp.x + sp.w > cameraX && sp.x < cameraX + V_WIDTH) {
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(sp.x, sp.y, sp.w, 6);
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.moveTo(sp.x + 15, sp.y + 3);
                ctx.lineTo(sp.x + 30, sp.y - 4);
                ctx.lineTo(sp.x + 30, sp.y + 10);
                ctx.fill();
            }
        }
    }

    // 4. Trampolines
    if (lvl.trampolines) {
        for (let i = 0; i < lvl.trampolines.length; i++) {
            const tp = lvl.trampolines[i];
            if (tp.x + tp.w > cameraX && tp.x < cameraX + V_WIDTH) {
                ctx.fillStyle = '#10b981';
                ctx.fillRect(tp.x, tp.y, tp.w, 8);
                ctx.strokeStyle = '#34d399';
                ctx.lineWidth = 2;
                ctx.strokeRect(tp.x, tp.y, tp.w, 8);
            }
        }
    }

    // 5. Spikes
    for (let i = 0; i < lvl.spikes.length; i++) {
        const s = lvl.spikes[i];
        if (s.x + s.w > cameraX && s.x < cameraX + V_WIDTH) {
            drawSpike(s.x, s.y, s.w, s.h, s.inverted);
        }
    }

    // 6. Lasers
    for (let i = 0; i < lvl.lasers.length; i++) {
        const l = lvl.lasers[i];
        if (l.x + l.w > cameraX && l.x < cameraX + V_WIDTH) {
            drawLaser(l);
        }
    }

    // 7. Jump Rings
    for (let i = 0; i < lvl.rings.length; i++) {
        const r = lvl.rings[i];
        if (r.x + r.r > cameraX && r.x - r.r < cameraX + V_WIDTH) {
            drawRing(r);
        }
    }

    // Phase Gates
    if (lvl.phaseGates) {
        for (let i = 0; i < lvl.phaseGates.length; i++) {
            const gate = lvl.phaseGates[i];
            if (gate.x + 30 > cameraX && gate.x - 30 < cameraX + V_WIDTH) {
                drawPhaseGate(gate);
            }
        }
    }

    // Chrono Orbs
    if (lvl.chronoOrbs) {
        for (let i = 0; i < lvl.chronoOrbs.length; i++) {
            const orb = lvl.chronoOrbs[i];
            if (!orb.taken && orb.x + 30 > cameraX && orb.x - 30 < cameraX + V_WIDTH) {
                drawChronoOrb(orb);
            }
        }
    }

    // Sentinel Chase Death Wall
    if (game.sentinelX > -9000) {
        drawSentinelDeathWall(cameraX);
    }

    // 8. Gravity Portals
    for (let i = 0; i < lvl.portals.length; i++) {
        const prt = lvl.portals[i];
        if (prt.x + prt.w > cameraX && prt.x < cameraX + V_WIDTH) {
            drawPortal(prt);
        }
    }

    // 9. Secret Shards
    for (let i = 0; i < lvl.shards.length; i++) {
        const sh = lvl.shards[i];
        if (!sh.taken && sh.x + 20 > cameraX && sh.x - 20 < cameraX + V_WIDTH) {
            drawShard(sh.x, sh.y);
        }
    }

    // 10. Finish Gate Indicator (Only on non-endless stages)
    if (!game.isEndless) {
        drawFinishGate(lvl.length);
    }

    drawPlayerTrail();
    drawAcrobaticHuman(game.player);

    // Render Ghost Replay Phantom
    if (game.ghostActive && typeof drawGhostRunner === 'function') {
        drawGhostRunner(ctx);
    }

    // Render Live Multiplayer Rival Hologram
    if (game.isMultiplayer && typeof drawRivalRunner === 'function') {
        drawRivalRunner(ctx);
    }

    drawParticles();
    drawShockwaves();
    if (game.player.vx > 410 || game.player.isInvulnerable) {
        drawSpeedLines();
    }

    ctx.restore();
    ctx.restore();
}

function drawShockwaves() {
    if (!game.shockwaves) return;
    const dt = game.lastFrameDelta || 0.016;
    const rate = dt * 60;
    for (let i = game.shockwaves.length - 1; i >= 0; i--) {
        const sw = game.shockwaves[i];
        sw.r += 2.8 * rate;
        sw.alpha = Math.max(0, 1 - (sw.r / sw.maxR));
        if (sw.alpha <= 0 || sw.r >= sw.maxR) {
            game.shockwaves.splice(i, 1);
            continue;
        }
        ctx.save();
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha * 0.85;
        ctx.lineWidth = 3;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

function drawSpeedLines() {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1.5;
    const now = Date.now() * 0.02;
    const px = game.player.renderX !== undefined ? game.player.renderX : game.player.x;
    for (let i = 0; i < 6; i++) {
        const y = 60 + ((i * 75 + (now * 25) % 150) % (V_HEIGHT - 120));
        const x = px + 150 + ((i * 120 + now * 40) % 500);
        const len = 40 + (i % 3) * 35;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + len, y);
        ctx.stroke();
    }
    ctx.restore();
}

function drawCyberBackground(cameraX) {
    ctx.fillStyle = getCyberBgGrad() || '#020617';
    ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

    // Parallax City Skyline
    ctx.fillStyle = '#090d16';
    const bOffset = (cameraX * 0.15) % 180;
    for (let x = -bOffset - 180; x < V_WIDTH + 180; x += 90) {
        const height = 140 + Math.sin(x * 12.3) * 60;
        ctx.fillRect(x, 400 - height, 75, height);
    }

    // Synth Grid Lines
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.lineWidth = 1;
    const gridOffset = (cameraX * 0.5) % 50;
    for (let x = -gridOffset; x < V_WIDTH; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 400);
        ctx.lineTo(x, V_HEIGHT);
        ctx.stroke();
    }
}

function drawSpike(x, y, w, h, inverted) {
    ctx.save();
    ctx.fillStyle = '#dc2626';
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (inverted) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w / 2, y + h);
    } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w / 2, y - h);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawLaser(l) {
    ctx.save();
    ctx.fillStyle = '#475569';
    ctx.fillRect(l.x - 4, l.y - 8, 4, l.h + 16);
    ctx.fillRect(l.x + l.w, l.y - 8, 4, l.h + 16);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.88)';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.fillRect(l.x, l.y, l.w, l.h);
    ctx.restore();
}

function drawRing(r) {
    ctx.save();
    const pulse = Math.sin(Date.now() * 0.008) * 2;
    const outerR = (r.r || 24) + pulse;

    if (r.type === 'GRAVITY') {
        // Geometry Dash Blue Orb (Gravity Inversion Ring)
        // 1. Outer cyan glow ring
        ctx.strokeStyle = '#38bdf8';
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 18;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, outerR, 0, Math.PI * 2);
        ctx.stroke();

        // 2. Inner royal blue ring
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, outerR * 0.65, 0, Math.PI * 2);
        ctx.stroke();

        // 3. Glowing translucent blue orb center
        ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
        ctx.beginPath();
        ctx.arc(r.x, r.y, outerR * 0.65, 0, Math.PI * 2);
        ctx.fill();

        // 4. Directional chevrons showing flip direction
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        const arrowDir = (r.targetGravity === -1) ? -1 : 1;
        const tipY = r.y + (arrowDir * 5);
        const baseY = r.y - (arrowDir * 5);
        ctx.beginPath();
        ctx.moveTo(r.x - 7, baseY);
        ctx.lineTo(r.x, tipY);
        ctx.lineTo(r.x + 7, baseY);
        ctx.stroke();
    } else {
        // Geometry Dash-style Jump Ring (Yellow / Green / Cyan / Pink / Red)
        // 1. Pulsing outer ring
        ctx.strokeStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 16;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, outerR, 0, Math.PI * 2);
        ctx.stroke();

        // 2. Translucent colored core fill
        ctx.fillStyle = r.color;
        ctx.globalAlpha = 0.22;
        ctx.beginPath();
        ctx.arc(r.x, r.y, outerR * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // 3. Inner accent ring & bright center dot
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, outerR * 0.45, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function drawPortal(prt) {
    ctx.save();
    const color = prt.targetGravity === -1 ? '#8b5cf6' : '#06b6d4';
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.lineWidth = 3;
    ctx.strokeRect(prt.x, prt.y, prt.w, prt.h);
    ctx.restore();
}

function drawShard(x, y) {
    ctx.save();
    const now = Date.now();
    const floatY = y + Math.sin(now * 0.005) * 6;
    const spin = Math.sin(now * 0.004);
    const width = 11 * Math.abs(spin) + 3;

    // Outer pink glow
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 16;

    // Diamond facets
    ctx.fillStyle = spin >= 0 ? '#ec4899' : '#f472b6';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, floatY - 14);
    ctx.lineTo(x + width, floatY);
    ctx.lineTo(x, floatY + 14);
    ctx.lineTo(x - width, floatY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inner highlight facet
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.beginPath();
    ctx.moveTo(x, floatY - 10);
    ctx.lineTo(x + width * 0.5, floatY);
    ctx.lineTo(x, floatY + 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function drawFinishGate(x) {
    ctx.save();
    const lvl = game.level;
    let isLocked = false;
    if (lvl && lvl.objective && lvl.objective.type === 'CORE_HUNTER' && game.shardsCollected.size < 3) {
        isLocked = true;
    } else if (lvl && lvl.objective && lvl.objective.type === 'RING_CHAIN' && (game.maxRingStreak || 0) < 8) {
        isLocked = true;
    }

    const gateColor = isLocked ? '#ef4444' : '#10b981';
    ctx.strokeStyle = gateColor;
    ctx.fillStyle = isLocked ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.2)';
    ctx.lineWidth = 3;
    ctx.shadowColor = gateColor;
    ctx.shadowBlur = 15;
    ctx.strokeRect(x, 150, 20, 250);
    ctx.fillRect(x, 150, 20, 250);
    ctx.restore();
}

function drawPlayerTrail() {
    const dt = game.lastFrameDelta || 0.016;
    for (let i = game.player.trail.length - 1; i >= 0; i--) {
        const tr = game.player.trail[i];
        ctx.fillStyle = tr.color;
        ctx.globalAlpha = Math.max(0, tr.alpha * 0.4);
        ctx.fillRect(tr.x, tr.y, 20, tr.h);
        tr.alpha -= dt * 2.6;
        if (tr.alpha <= 0) {
            game.player.trail.splice(i, 1);
        }
    }
    ctx.globalAlpha = 1;
}

function drawAcrobaticHuman(p) {
    ctx.save();
    let drawX = (p.renderX !== undefined && !isNaN(p.renderX)) ? p.renderX : p.x;
    let drawY = (p.renderY !== undefined && !isNaN(p.renderY)) ? p.renderY : p.y;
    if (isNaN(drawX) || !isFinite(drawX)) drawX = 100;
    if (isNaN(drawY) || !isFinite(drawY)) drawY = 356;
    ctx.translate(drawX + p.w / 2, drawY + p.h / 2);

    if (p.gravityDir === -1) {
        ctx.scale(1, -1);
    }

    const skin = getActiveSkinData();
    const mainColor = p.isInvulnerable ? '#ffffff' : skin.color;
    ctx.strokeStyle = mainColor;
    ctx.fillStyle = mainColor;
    ctx.shadowColor = skin.glow;
    ctx.shadowBlur = p.isInvulnerable ? 20 : 12;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';

    if (dailySystem.activeSkin === 'apex_gold') {
        ctx.save();
        ctx.fillStyle = '#fde047';
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-5, -23);
        ctx.lineTo(-2, -19);
        ctx.lineTo(2, -23);
        ctx.lineTo(6, -19);
        ctx.lineTo(9, -23);
        ctx.lineTo(7, -17);
        ctx.lineTo(-3, -17);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    if (p.isSliding) {
        ctx.beginPath();
        ctx.arc(8, -2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(4, 0);
        ctx.lineTo(-8, 5);
        ctx.lineTo(14, 8);
        ctx.stroke();
    } else if (!p.isGrounded) {
        ctx.beginPath();
        ctx.arc(0, -16, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(-2, 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-1, -6);
        ctx.lineTo(8, -12);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-2, 4);
        ctx.lineTo(-10, 14);
        ctx.stroke();
    } else {
        const legSwing = Math.sin(p.runCycle) * 12;
        const armSwing = Math.cos(p.runCycle) * 10;
        ctx.beginPath();
        ctx.arc(3, -16, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(2, -10);
        ctx.lineTo(-2, 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(1, -6);
        ctx.lineTo(1 + armSwing, 1);
        ctx.moveTo(1, -6);
        ctx.lineTo(1 - armSwing, 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-2, 4);
        ctx.lineTo(-2 + legSwing, 18);
        ctx.moveTo(-2, 4);
        ctx.lineTo(-2 - legSwing, 18);
        ctx.stroke();
    }
    ctx.restore();
}

function drawParticles() {
    const dt = game.lastFrameDelta || 0.016;
    for (let i = game.particles.length - 1; i >= 0; i--) {
        const part = game.particles[i];
        ctx.fillStyle = part.color;
        ctx.globalAlpha = Math.max(0, part.life / part.maxLife);
        ctx.fillRect(part.x, part.y, part.size, part.size);
        part.x += part.vx * dt;
        part.y += part.vy * dt;
        part.life -= dt;
        if (part.life <= 0) {
            game.particles.splice(i, 1);
        }
    }
    ctx.globalAlpha = 1;
}

// ============================================================================
// 11B. ENDLESS MARATHON ENGINE & PROCEDURAL CHUNK GENERATOR
// ============================================================================
const ENDLESS_CHUNKS = [
    {
        name: "CYBER HIGHWAY",
        width: 1100,
        platforms: [
            { relX: 0, y: 400, w: 1100, h: 40 },
            { relX: 420, y: 300, w: 260, h: 20 }
        ],
        spikes: [
            { relX: 480, y: 400, w: 40, h: 20 }
        ],
        lasers: [],
        speedPads: [
            { relX: 180, y: 400, w: 90, boostVx: 220 }
        ],
        trampolines: [
            { relX: 780, y: 400, w: 60, launchVy: -620 }
        ],
        rings: [
            { relX: 550, y: 220, r: 24, type: 'JUMP', boostY: -580 }
        ],
        shards: [
            { relX: 550, y: 180 }
        ]
    },
    {
        name: "LASER CORRIDOR",
        width: 1200,
        platforms: [
            { relX: 0, y: 400, w: 1200, h: 40 },
            { relX: 560, y: 310, w: 500, h: 20 }
        ],
        spikes: [
            { relX: 580, y: 400, w: 50, h: 20 }
        ],
        lasers: [
            { relX: 240, y: 345, w: 220, h: 20 },
            { relX: 840, y: 345, w: 200, h: 20 }
        ],
        speedPads: [
            { relX: 100, y: 400, w: 90, boostVx: 200 }
        ],
        trampolines: [],
        rings: [],
        shards: [
            { relX: 660, y: 250 }
        ]
    },
    {
        name: "CHASM LEAP",
        width: 1300,
        platforms: [
            { relX: 0, y: 400, w: 320, h: 40 },
            { relX: 420, y: 270, w: 180, h: 20 },
            { relX: 700, y: 290, w: 180, h: 20 },
            { relX: 960, y: 400, w: 340, h: 40 }
        ],
        spikes: [],
        lasers: [],
        speedPads: [],
        trampolines: [
            { relX: 240, y: 400, w: 60, launchVy: -660 }
        ],
        rings: [
            { relX: 510, y: 190, r: 24, type: 'JUMP', boostY: -580 }
        ],
        shards: [
            { relX: 790, y: 230 }
        ]
    },
    {
        name: "GRAVITY FLUX RIFT",
        width: 1200,
        platforms: [
            { relX: 0, y: 400, w: 380, h: 40 },
            { relX: 340, y: 140, w: 520, h: 20 },
            { relX: 820, y: 400, w: 380, h: 40 }
        ],
        spikes: [
            { relX: 560, y: 140, w: 40, h: 20, inverted: true }
        ],
        lasers: [],
        speedPads: [],
        trampolines: [],
        rings: [
            { relX: 290, y: 310, r: 28, type: 'GRAVITY', targetGravity: -1, flipVy: 340 },
            { relX: 780, y: 230, r: 28, type: 'GRAVITY', targetGravity: 1, flipVy: 340 }
        ],
        portals: [
            { relX: 840, y: 0, w: 30, h: 540, targetGravity: 1 }
        ],
        shards: [
            { relX: 640, y: 200 }
        ]
    },
    {
        name: "MULTI-TIERED RUNWAY",
        width: 1200,
        platforms: [
            { relX: 0, y: 400, w: 1200, h: 40 },
            { relX: 260, y: 280, w: 720, h: 20 }
        ],
        spikes: [
            { relX: 380, y: 400, w: 60, h: 20 },
            { relX: 760, y: 400, w: 60, h: 20 }
        ],
        lasers: [],
        speedPads: [
            { relX: 420, y: 280, w: 90, boostVx: 240 }
        ],
        trampolines: [
            { relX: 180, y: 400, w: 60, launchVy: -620 }
        ],
        rings: [
            { relX: 640, y: 200, r: 24, type: 'JUMP', boostY: -580 }
        ],
        shards: [
            { relX: 520, y: 220 }
        ]
    },
    {
        name: "PHASE BARRIER VAULT",
        width: 1200,
        platforms: [
            { relX: 0, y: 400, w: 320, h: 40 },
            { relX: 440, y: 270, w: 240, h: 20 },
            { relX: 760, y: 400, w: 440, h: 40 }
        ],
        spikes: [
            { relX: 840, y: 400, w: 40, h: 20 }
        ],
        lasers: [
            { relX: 380, y: 280, w: 25, h: 120 }
        ],
        speedPads: [
            { relX: 500, y: 270, w: 80, boostVx: 220 }
        ],
        trampolines: [
            { relX: 240, y: 400, w: 60, launchVy: -720 }
        ],
        rings: [],
        shards: [
            { relX: 620, y: 210 }
        ]
    },
    {
        name: "TRAMPOLINE SKYWAY",
        width: 1300,
        platforms: [
            { relX: 0, y: 400, w: 260, h: 40 },
            { relX: 360, y: 260, w: 180, h: 20 },
            { relX: 620, y: 210, w: 200, h: 20 },
            { relX: 900, y: 400, w: 400, h: 40 }
        ],
        spikes: [],
        lasers: [],
        speedPads: [],
        trampolines: [
            { relX: 190, y: 400, w: 60, launchVy: -740 },
            { relX: 460, y: 260, w: 60, launchVy: -680 }
        ],
        rings: [
            { relX: 420, y: 170, r: 24, type: 'JUMP', boostY: -580 }
        ],
        shards: [
            { relX: 720, y: 150 }
        ]
    },
    {
        name: "QUANTUM OVERCLOCK",
        width: 1200,
        platforms: [
            { relX: 0, y: 400, w: 1200, h: 40 }
        ],
        spikes: [
            { relX: 520, y: 400, w: 50, h: 20 }
        ],
        lasers: [
            { relX: 260, y: 345, w: 150, h: 20 }
        ],
        speedPads: [
            { relX: 660, y: 400, w: 90, boostVx: 260 }
        ],
        trampolines: [],
        rings: [
            { relX: 840, y: 240, r: 24, type: 'JUMP', boostY: -580 }
        ],
        shards: [
            { relX: 740, y: 340 }
        ]
    }
];

let lastEndlessChunkIdx = -1;
function spawnNextEndlessChunk() {
    if (!game.level) return;
    let idx = Math.floor(Math.random() * ENDLESS_CHUNKS.length);
    if (idx === lastEndlessChunkIdx && ENDLESS_CHUNKS.length > 1) {
        idx = (idx + 1) % ENDLESS_CHUNKS.length;
    }
    lastEndlessChunkIdx = idx;
    const chunk = ENDLESS_CHUNKS[idx];
    const sx = game.endlessLastSpawnX;

    if (chunk.platforms) {
        chunk.platforms.forEach(p => {
            game.level.platforms.push({
                x: sx + p.relX,
                y: p.y,
                w: p.w,
                h: p.h || 20,
                phase: p.phase || p.isPhase,
                isPhase: p.isPhase,
                isOneWay: p.isOneWay
            });
        });
    }
    if (chunk.spikes) {
        chunk.spikes.forEach(s => {
            game.level.spikes.push({
                x: sx + s.relX,
                y: s.y,
                w: s.w,
                h: s.h,
                inverted: !!s.inverted
            });
        });
    }
    if (chunk.lasers) {
        chunk.lasers.forEach(l => {
            game.level.lasers.push({
                x: sx + l.relX,
                y: l.y,
                w: l.w,
                h: l.h
            });
        });
    }
    if (chunk.speedPads) {
        chunk.speedPads.forEach(sp => {
            game.level.speedPads.push({
                x: sx + sp.relX,
                y: sp.y,
                w: sp.w,
                boostVx: sp.boostVx || 220
            });
        });
    }
    if (chunk.trampolines) {
        chunk.trampolines.forEach(tr => {
            game.level.trampolines.push({
                x: sx + tr.relX,
                y: tr.y,
                w: tr.w,
                launchVy: tr.launchVy || -640
            });
        });
    }
    if (chunk.rings) {
        chunk.rings.forEach(r => {
            game.level.rings.push({
                x: sx + r.relX,
                y: r.y,
                r: r.r || 24,
                radius: r.r || 24,
                type: r.type || (r.targetDir !== undefined && r.targetDir !== 1 ? 'GRAVITY' : (r.targetGravity !== undefined && r.targetGravity !== 1 ? 'GRAVITY' : 'JUMP')),
                targetGravity: r.targetGravity !== undefined ? r.targetGravity : (r.targetDir !== undefined ? r.targetDir : 1),
                targetDir: r.targetDir,
                boostY: r.boostY || -580,
                flipVy: r.flipVy || 340,
                lastHitTime: 0
            });
        });
    }
    if (chunk.portals) {
        chunk.portals.forEach(pt => {
            game.level.portals.push({
                x: sx + pt.relX,
                y: pt.y,
                w: pt.w,
                h: pt.h,
                targetGravity: pt.targetGravity !== undefined ? pt.targetGravity : 1
            });
        });
    }
    if (chunk.shards) {
        chunk.shards.forEach(sh => {
            game.level.shards.push({
                x: sx + sh.relX,
                y: sh.y,
                taken: false,
                id: Math.random()
            });
        });
    }

    game.endlessLastSpawnX += chunk.width;
}

function startEndlessMode() {
    audio.init();
    game.isEndless = true;
    game.currentLevelIdx = -1;
    game.inMainMenu = false;
    game.victory = false;
    game.attempts = 1;
    game.runTime = 0;
    setPause(false);

    game.level = {
        name: "CYBER OVERDRIVE // ENDLESS MARATHON",
        theme: "cyber",
        bpm: 140,
        startSpeed: 310,
        maxSpeed: 680,
        length: 999999999,
        color: '#06b6d4',
        platforms: [
            { x: 0, y: 400, w: 1400, h: 40 }
        ],
        spikes: [],
        lasers: [],
        speedPads: [],
        trampolines: [],
        rings: [],
        shards: [],
        chronoOrbs: [],
        phaseGates: [],
        portals: []
    };

    game.endlessDistance = 0;
    game.endlessLastSpawnX = 1400;
    game.endlessNextWarpMeters = 1000;
    try {
        const storedPB = localStorage.getItem('neon_pulse_endless_best');
        game.endlessBestDistance = storedPB ? parseInt(storedPB, 10) || 0 : 0;
    } catch(e) {
        game.endlessBestDistance = 0;
    }

    for (let i = 0; i < 3; i++) {
        spawnNextEndlessChunk();
    }

    resetPlayerState();

    const mainMenu = document.getElementById('screen-main-menu');
    const ingameHeader = document.getElementById('ingame-header');
    const endlessBadge = document.getElementById('hud-endless-badge');
    const hudLevelName = document.getElementById('hud-level-name');
    const hudPct = document.getElementById('hud-pct-text');
    const hudFill = document.getElementById('hud-progress-fill');
    const objPill = document.getElementById('hud-objective-pill');

    const modalMenu = document.getElementById('modal-menu');
    const modalLb = document.getElementById('modal-leaderboard');
    const modalDaily = document.getElementById('modal-daily');
    const modalHow = document.getElementById('modal-howtoplay');
    const modalVic = document.getElementById('modal-victory');
    const modalMp = document.getElementById('modal-multiplayer');

    const allModals = [modalMenu, modalLb, modalDaily, modalHow, modalVic, modalMp];
    allModals.forEach(m => {
        if (m) {
            m.classList.add('hidden');
            m.style.display = 'none';
        }
    });

    if (mainMenu) {
        mainMenu.classList.add('hidden');
        mainMenu.style.display = 'none';
    }
    if (ingameHeader) {
        ingameHeader.classList.remove('hidden');
        ingameHeader.style.display = '';
    }
    if (endlessBadge) endlessBadge.classList.remove('hidden');
    if (objPill) objPill.classList.add('hidden');
    if (hudLevelName) hudLevelName.innerText = "⚡ ENDLESS MARATHON";
    if (hudPct) hudPct.innerText = "0m";
    if (hudFill) hudFill.style.width = "100%";

    updateAbilityHUD();
    startVisualRaceCountdown({
        isMultiplayer: false,
        title: "⚡ ENDLESS MARATHON",
        bpm: 140
    });
}

function updateEndlessMode(dt) {
    const p = game.player;
    game.endlessDistance = Math.max(0, Math.floor(p.x / 10));

    if (game.endlessDistance > game.endlessBestDistance) {
        game.endlessBestDistance = game.endlessDistance;
        try {
            localStorage.setItem('neon_pulse_endless_best', game.endlessBestDistance);
        } catch(e) {}
    }

    p.vx = Math.min(680, 310 + Math.pow(game.endlessDistance / 80, 0.65) * 25);

    const distText = document.getElementById('hud-endless-dist');
    const hudPct = document.getElementById('hud-pct-text');
    if (distText) distText.innerText = `${game.endlessDistance}m`;
    if (hudPct) hudPct.innerText = `${game.endlessDistance}m (PB: ${game.endlessBestDistance}m)`;

    while (game.endlessLastSpawnX < p.x + 2200) {
        spawnNextEndlessChunk();
    }

    if (game.level.platforms.length > 45) {
        const pruneThreshold = p.x - 1200;
        game.level.platforms = game.level.platforms.filter(el => el.x + (el.w || 40) > pruneThreshold);
        if (game.level.spikes) game.level.spikes = game.level.spikes.filter(el => el.x + el.w > pruneThreshold);
        if (game.level.lasers) game.level.lasers = game.level.lasers.filter(el => el.x + el.w > pruneThreshold);
        if (game.level.speedPads) game.level.speedPads = game.level.speedPads.filter(el => el.x + el.w > pruneThreshold);
        if (game.level.trampolines) game.level.trampolines = game.level.trampolines.filter(el => el.x + el.w > pruneThreshold);
        if (game.level.rings) game.level.rings = game.level.rings.filter(el => el.x + 30 > pruneThreshold);
        if (game.level.portals) game.level.portals = game.level.portals.filter(el => el.x + (el.w || 30) > pruneThreshold);
        if (game.level.shards) game.level.shards = game.level.shards.filter(el => el.x + 30 > pruneThreshold);
    }

    if (game.endlessDistance >= game.endlessNextWarpMeters) {
        game.endlessNextWarpMeters += 1000;
        triggerDimensionWarp();
    }
}

function triggerDimensionWarp() {
    audio.playBoostPad();
    audio.playChrono();
    game.screenShake = 16;

    const overlay = document.getElementById('warp-overlay');
    if (overlay) {
        overlay.classList.remove('hidden', 'dimension-warp-active');
        void overlay.offsetWidth;
        overlay.classList.add('dimension-warp-active');
        setTimeout(() => {
            overlay.classList.add('hidden');
            overlay.classList.remove('dimension-warp-active');
        }, 700);
    }

    const p = game.player;
    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 120 + Math.random() * 320;
        game.particles.push({
            x: p.x + p.w / 2,
            y: p.y + p.h / 2,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            life: 0.6,
            maxLife: 0.6,
            color: Math.random() < 0.5 ? '#a855f7' : '#06b6d4',
            size: Math.random() * 5 + 3
        });
    }

    if (!game.shockwaves) game.shockwaves = [];
    game.shockwaves.push({
        x: p.x + p.w / 2,
        y: p.y + p.h / 2,
        r: 10,
        maxR: 350,
        alpha: 1,
        color: '#38bdf8'
    });

    game.level.theme = game.level.theme === 'cyber' ? 'cosmic' : 'cyber';
    showNotification(`🌀 DIMENSIONAL WARP! ENTERING ${game.level.theme.toUpperCase()} REALM!`);
}

// ============================================================================
// 11C. GHOST CHALLENGE & ASYNC REPLAY ENGINE
// ============================================================================
function drawGhostRunner(ctx) {
    if (!game.ghostActive || !game.ghostData || !game.ghostData.path || game.ghostData.path.length === 0) return;
    const path = game.ghostData.path;
    const t = game.runTime;

    let frame = path[0];
    if (t >= path[path.length - 1].t) {
        frame = path[path.length - 1];
    } else {
        for (let i = 0; i < path.length - 1; i++) {
            if (path[i].t <= t && path[i + 1].t >= t) {
                const ratio = (t - path[i].t) / (path[i + 1].t - path[i].t || 0.001);
                frame = {
                    x: path[i].x + (path[i + 1].x - path[i].x) * ratio,
                    y: path[i].y + (path[i + 1].y - path[i].y) * ratio,
                    s: path[i].s
                };
                break;
            }
        }
    }

    ctx.save();
    ctx.translate(frame.x + 11, frame.y + (frame.s ? 10 : 22));
    ctx.globalAlpha = 0.55;

    ctx.strokeStyle = '#38bdf8';
    ctx.fillStyle = '#0284c7';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    if (frame.s) {
        ctx.beginPath();
        ctx.arc(8, -2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(4, 0);
        ctx.lineTo(-8, 5);
        ctx.lineTo(14, 8);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.arc(0, -16, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(-2, 4);
        ctx.lineTo(8, -12);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-2, 4);
        ctx.lineTo(-8, 16);
        ctx.stroke();
    }

    ctx.font = "bold 9px 'JetBrains Mono', monospace";
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    if (ctx.fillText) ctx.fillText(`👻 ${game.ghostData.tag || 'GHOST'}`, 0, -26);

    ctx.restore();
}

function exportGhostRun() {
    if (!game.lastCompletedGhost || !game.lastCompletedGhost.path || game.lastCompletedGhost.path.length === 0) {
        showNotification("⚠️ COMPLETE A RUN FIRST TO SHARE GHOST!");
        return;
    }
    try {
        const payload = JSON.stringify(game.lastCompletedGhost);
        const encoded = btoa(encodeURIComponent(payload));
        const url = `${window.location.origin}${window.location.pathname}#challenge=${encoded}`;
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification("🔗 CHALLENGE LINK COPIED TO CLIPBOARD!");
            }).catch(() => {
                prompt("Copy your Challenge URL:", url);
            });
        } else {
            prompt("Copy your Challenge URL:", url);
        }
    } catch(e) {
        showNotification("⚠️ FAILED TO ENCODE GHOST RUN");
    }
}

function loadGhostChallenge(raw) {
    if (!raw) {
        showNotification("⚠️ ENTER A GHOST LINK OR CODE");
        return false;
    }
    try {
        let encoded = raw.trim();
        if (encoded.includes('#challenge=')) {
            encoded = encoded.split('#challenge=')[1];
        } else if (encoded.includes('challenge=')) {
            encoded = encoded.split('challenge=')[1];
        }
        const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
        if (!decoded || !decoded.path || !Array.isArray(decoded.path)) {
            throw new Error("Invalid structure");
        }
        game.ghostData = decoded;
        game.ghostActive = true;
        showNotification(`👻 LOADED GHOST: ${decoded.tag} (${formatTime(decoded.time)})!`);

        const mpModal = document.getElementById('modal-multiplayer');
        if (mpModal) mpModal.classList.add('hidden');

        startLevel(decoded.stage !== undefined ? decoded.stage : 0);
        return true;
    } catch(e) {
        showNotification("⚠️ INVALID OR CORRUPT GHOST LINK");
        return false;
    }
}

// ============================================================================
// 11C. RACE COUNTDOWN SYSTEM (3-2-1-GO & 50/50 Track Roulette)
// ============================================================================
let activeCountdownTimers = [];
function clearActiveCountdowns() {
    activeCountdownTimers.forEach(id => {
        clearTimeout(id);
        clearInterval(id);
    });
    activeCountdownTimers = [];
    const overlay = document.getElementById('overlay-race-countdown');
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.style.display = 'none';
    }
}

function startVisualRaceCountdown(config = {}) {
    clearActiveCountdowns();

    const overlay = document.getElementById('overlay-race-countdown');
    if (!overlay) return;

    const roundBadge = document.getElementById('countdown-round-badge');
    const seriesScore = document.getElementById('countdown-series-score');
    const rouletteBox = document.getElementById('countdown-roulette-box');
    const hostTag = document.getElementById('countdown-host-tag');
    const rivalTag = document.getElementById('countdown-rival-tag');
    const rouletteTrack = document.getElementById('countdown-roulette-track');
    const roulettePickBy = document.getElementById('countdown-roulette-pickby');
    const bigNum = document.getElementById('countdown-big-num');
    const subHint = document.getElementById('countdown-sub-hint');
    const pauseModal = document.getElementById('modal-pause');

    if (pauseModal) pauseModal.classList.add('hidden');

    // Freeze runner and stopwatch during countdown
    game.isCountingDown = true;
    game.isPaused = false;
    game.victory = false;
    game.runTime = 0;
    const stopwatch = document.getElementById('hud-stopwatch');
    if (stopwatch) stopwatch.innerText = "00:00.000";

    const p = game.player;
    if (p) {
        p.x = 80;
        p.y = 356;
        p.prevX = 80;
        p.prevY = 356;
        p.renderX = 80;
        p.renderY = 356;
        p.vx = 0;
        p.vy = 0;
        p.runCycle = 0;
        p.isGrounded = true;
        p.isSliding = false;
        p.isJumping = false;
    }

    if (game.mpRival) {
        game.mpRival.x = 80;
        game.mpRival.y = 356;
        game.mpRival.renderX = 80;
        game.mpRival.renderY = 356;
        game.mpRival.vx = 0;
        game.mpRival.vy = 0;
        game.mpRival.s = 0;
        game.mpRival.finishTime = null;
    }

    // Stop music during countdown so countdown beeps are distinct
    audio.stopMusic();

    overlay.classList.remove('hidden');
    overlay.style.display = '';

    const isMultiplayer = !!config.isMultiplayer;
    if (isMultiplayer) {
        if (seriesScore) seriesScore.classList.remove('hidden');
        if (rouletteBox) rouletteBox.classList.remove('hidden');
        if (roundBadge) {
            roundBadge.innerText = config.title || 'BEST OF 3 SERIES';
            const isDecider = config.isDecider;
            roundBadge.className = isDecider 
                ? 'px-4 py-1 rounded-full bg-amber-950/90 border border-amber-500 text-amber-300 font-cyber font-bold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse'
                : 'px-4 py-1 rounded-full bg-rose-950/90 border border-rose-500/80 text-rose-300 font-cyber font-bold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(244,63,94,0.4)]';
        }
        if (hostTag) hostTag.innerText = `YOU [ ${MP.series ? MP.series.myScore : 0} ]`;
        if (rivalTag) rivalTag.innerText = `[ ${MP.series ? MP.series.rivalScore : 0} ] ${(game.mpRival && game.mpRival.tag) || 'RIVAL'}`;
        if (typeof MP !== 'undefined' && MP.updateHUDSeriesBadge) MP.updateHUDSeriesBadge();

        const trackIdx = (config.chosenTrack !== undefined) ? config.chosenTrack : 0;
        const trackName = (LEVELS[trackIdx] && LEVELS[trackIdx].name) || `STAGE ${trackIdx + 1}`;
        if (bigNum) {
            bigNum.innerText = "🎲";
            bigNum.className = "text-6xl font-cyber text-amber-400 animate-pulse tracking-wider";
        }
        if (subHint) subHint.innerText = "50/50 TRACK SELECTION ROLLING...";

        // Quick roulette roll (6 ticks over ~660ms)
        let rouletteTicks = 0;
        const rouletteInterval = setInterval(() => {
            rouletteTicks++;
            const randomLvl = LEVELS[Math.floor(Math.random() * LEVELS.length)];
            if (rouletteTrack) rouletteTrack.innerText = randomLvl.name;
            audio.playJump(false);
            if (rouletteTicks >= 6) {
                clearInterval(rouletteInterval);
                if (rouletteTrack) {
                    rouletteTrack.innerText = trackName;
                    rouletteTrack.className = "text-xs font-cyber font-bold text-cyan-300 tracking-wide text-center drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]";
                }
                if (roulettePickBy) {
                    roulettePickBy.innerHTML = `<span>SELECTED BY 50/50 FLIP: <span class="text-amber-400 font-bold">${(config.chosenBy || 'HOST').toUpperCase()}'S CHOICE</span></span>`;
                }
                if (subHint) subHint.innerText = "TRACK LOCKED! PREPARE TO RACE!";
                const timerId = setTimeout(() => runCountdownSequence(), 400);
                activeCountdownTimers.push(timerId);
            }
        }, 110);
        activeCountdownTimers.push(rouletteInterval);
    } else {
        // Single player mode / campaign / endless
        if (seriesScore) seriesScore.classList.add('hidden');
        if (rouletteBox) rouletteBox.classList.add('hidden');
        if (roundBadge) {
            roundBadge.innerText = config.title || (game.level && game.level.name) || 'SPEEDRUN TRIAL';
            roundBadge.className = 'px-4 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/80 text-cyan-300 font-cyber font-bold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.4)]';
        }
        runCountdownSequence();
    }

    function runCountdownSequence() {
        let count = 3;
        const updateTick = () => {
            if (!bigNum) return;
            if (count === 3) {
                audio.playJump(false);
                bigNum.innerText = "3";
                bigNum.className = "text-7xl font-cyber font-extrabold text-rose-500 tracking-wider scale-125 transition-transform duration-200 drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]";
                if (subHint) subHint.innerText = "ON YOUR MARK...";
                const animT = setTimeout(() => { if (bigNum) bigNum.className = "text-7xl font-cyber font-extrabold text-rose-500 tracking-wider scale-100 transition-transform duration-200 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]"; }, 150);
                activeCountdownTimers.push(animT);
                count--;
                const nextT = setTimeout(updateTick, 1000);
                activeCountdownTimers.push(nextT);
            } else if (count === 2) {
                audio.playJump(false);
                bigNum.innerText = "2";
                bigNum.className = "text-7xl font-cyber font-extrabold text-amber-400 tracking-wider scale-125 transition-transform duration-200 drop-shadow-[0_0_25px_rgba(245,158,11,0.9)]";
                if (subHint) subHint.innerText = "GET SET...";
                const animT = setTimeout(() => { if (bigNum) bigNum.className = "text-7xl font-cyber font-extrabold text-amber-400 tracking-wider scale-100 transition-transform duration-200 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"; }, 150);
                activeCountdownTimers.push(animT);
                count--;
                const nextT = setTimeout(updateTick, 1000);
                activeCountdownTimers.push(nextT);
            } else if (count === 1) {
                audio.playJump(true);
                bigNum.innerText = "1";
                bigNum.className = "text-7xl font-cyber font-extrabold text-yellow-300 tracking-wider scale-125 transition-transform duration-200 drop-shadow-[0_0_25px_rgba(253,224,71,0.9)]";
                if (subHint) subHint.innerText = "ENGAGE BOOSTERS!";
                const animT = setTimeout(() => { if (bigNum) bigNum.className = "text-7xl font-cyber font-extrabold text-yellow-300 tracking-wider scale-100 transition-transform duration-200 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]"; }, 150);
                activeCountdownTimers.push(animT);
                count--;
                const nextT = setTimeout(updateTick, 1000);
                activeCountdownTimers.push(nextT);
            } else {
                audio.playBoostPad();
                bigNum.innerText = "GO!";
                bigNum.className = "text-8xl font-cyber font-extrabold text-emerald-400 tracking-wider scale-135 transition-transform duration-200 drop-shadow-[0_0_35px_rgba(52,211,153,1)]";
                if (subHint) subHint.innerText = "SPRINT FOR THE FINISH!";

                // The game starts NOW!
                game.isCountingDown = false;
                game.isPaused = false;
                game.runTime = 0;
                game.lastTime = (typeof performance !== 'undefined') ? performance.now() : Date.now();
                game.physicsAccumulator = 0;

                const startSpd = (game.level && game.level.startSpeed) ? game.level.startSpeed : 320;
                if (game.player) game.player.vx = startSpd;
                if (game.mpRival) game.mpRival.vx = startSpd;

                const musicBpm = config.bpm || (game.level && game.level.bpm) || 135;
                if (!audio.muted) audio.startMusic(musicBpm);

                showNotification("🏁 GO! SPRINT!");

                if (config.onComplete) {
                    config.onComplete();
                }

                const hideT = setTimeout(() => {
                    if (overlay) {
                        overlay.classList.add('hidden');
                        overlay.style.display = 'none';
                    }
                }, 400);
                activeCountdownTimers.push(hideT);
            }
        };
        updateTick();
    }
}

// ============================================================================
// 11D. LIVE 1V1 MULTIPLAYER ENGINE (Local Relay + WebRTC PeerJS + AI Rival)
// ============================================================================
const MP = {
    peer: null,
    conn: null,
    channel: null,
    clientId: 'CLIENT_' + Math.random().toString(36).substring(2, 9),
    isHost: false,
    roomCode: '',
    connected: false,
    rivalData: null,
    lastBroadcast: 0,
    myFinishTime: null,
    rivalFinishTime: null,

    series: {
        active: true,
        bestOf: 3,
        targetWins: 2,
        currentRound: 1,
        myScore: 0,
        rivalScore: 0,
        hostTrack: 'RANDOM_ALL',
        guestTrack: 'RANDOM_ALL',
        activeTrackIdx: 0,
        chosenBy: 'HOST',
        playedTracks: []
    },

    rematch: {
        myVote: null,
        rivalVote: null,
        status: 'idle',
        decisionTimer: null
    },

    resetRematch() {
        if (this.rematch && this.rematch.decisionTimer) {
            clearTimeout(this.rematch.decisionTimer);
            this.rematch.decisionTimer = null;
        }
        this.rematch = {
            myVote: null,
            rivalVote: null,
            status: 'idle',
            decisionTimer: null
        };
        this.updateRematchUI();
    },

    resetSeries() {
        this.series.currentRound = 1;
        this.series.myScore = 0;
        this.series.rivalScore = 0;
        this.series.playedTracks = [];
        this.resetRematch();
        this.updateHUDSeriesBadge();
    },

    updateRematchUI() {
        const panel = document.getElementById('race-rematch-panel');
        const roundActions = document.getElementById('race-round-actions');
        const myStatus = document.getElementById('rematch-my-status');
        const rivalStatus = document.getElementById('rematch-rival-status');
        const feedback = document.getElementById('rematch-feedback-msg');
        const btnYes = document.getElementById('btn-rematch-yes');
        const btnNo = document.getElementById('btn-rematch-no');

        if (!panel) return;

        const seriesOver = this.series.myScore >= 2 || this.series.rivalScore >= 2;
        if (!seriesOver || this.rematch.status === 'idle') {
            panel.classList.add('hidden');
            panel.style.display = 'none';
            if (roundActions) {
                roundActions.classList.remove('hidden');
                roundActions.style.display = 'flex';
            }
            return;
        }

        panel.classList.remove('hidden');
        panel.style.display = 'flex';
        if (roundActions) {
            roundActions.classList.add('hidden');
            roundActions.style.display = 'none';
        }

        if (myStatus) {
            if (this.rematch.myVote === true) {
                myStatus.innerHTML = `<span class="text-emerald-400 font-bold">✓ VOTED YES</span>`;
            } else if (this.rematch.myVote === false) {
                myStatus.innerHTML = `<span class="text-rose-400 font-bold">✗ VOTED NO</span>`;
            } else {
                myStatus.innerHTML = `<span class="text-neutral-400">WAITING FOR YOU...</span>`;
            }
        }

        if (rivalStatus) {
            if (this.rematch.rivalVote === true) {
                rivalStatus.innerHTML = `<span class="text-emerald-400 font-bold">✓ WANTS REMATCH</span>`;
            } else if (this.rematch.rivalVote === false) {
                rivalStatus.innerHTML = `<span class="text-rose-400 font-bold">✗ DECLINED</span>`;
            } else {
                rivalStatus.innerHTML = `<span class="text-neutral-400">THINKING...</span>`;
            }
        }

        if (btnYes && btnNo) {
            if (this.rematch.myVote !== null) {
                btnYes.disabled = true;
                btnYes.classList.add('opacity-50', 'cursor-not-allowed');
                if (this.rematch.myVote === true) {
                    btnYes.innerText = "⏳ WAITING FOR RIVAL...";
                }
            } else {
                btnYes.disabled = false;
                btnYes.classList.remove('opacity-50', 'cursor-not-allowed');
                btnYes.innerText = "🔥 YES, REMATCH!";
            }

            if (this.rematch.myVote === false || this.rematch.status === 'declined' || this.rematch.status === 'accepted') {
                btnNo.disabled = true;
                btnNo.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                btnNo.disabled = false;
                btnNo.classList.remove('opacity-50', 'cursor-not-allowed');
                btnNo.innerText = "❌ NO, LEAVE";
            }
        }

        if (feedback) {
            if (this.rematch.status === 'accepted') {
                feedback.classList.remove('hidden');
                feedback.className = "text-xs font-cyber font-bold text-emerald-400 text-center animate-pulse py-1 bg-emerald-950/60 border border-emerald-500/50 rounded";
                feedback.innerText = "🔥 BOTH PLAYERS AGREED! PREPARING NEW BEST-OF-3 MATCH...";
            } else if (this.rematch.status === 'declined') {
                feedback.classList.remove('hidden');
                feedback.className = "text-xs font-cyber font-bold text-rose-400 text-center py-1 bg-rose-950/60 border border-rose-500/50 rounded";
                feedback.innerText = "❌ REMATCH DECLINED — ENDING MULTIPLAYER SESSION...";
            } else if (this.rematch.myVote === true && this.rematch.rivalVote === null) {
                feedback.classList.remove('hidden');
                feedback.className = "text-[11px] font-cyber text-cyan-300 text-center py-1";
                feedback.innerText = "⏳ You voted YES! Awaiting rival's decision...";
            } else if (this.rematch.myVote === null && this.rematch.rivalVote === true) {
                feedback.classList.remove('hidden');
                feedback.className = "text-[11px] font-cyber text-amber-300 text-center py-1 animate-pulse";
                feedback.innerText = "⚡ Rival wants a rematch! Vote YES to go again, or NO to exit.";
            } else {
                feedback.classList.add('hidden');
            }
        }
    },

    castRematchVote(vote) {
        if (this.rematch.status === 'accepted' || this.rematch.status === 'declined') return;
        if (this.rematch.myVote !== null) return;

        this.rematch.myVote = !!vote;
        this.rematch.status = 'voting';

        this.sendMsg({
            type: 'REMATCH_VOTE',
            vote: this.rematch.myVote
        });

        if (this.rematch.myVote) {
            showNotification("🔥 YOU VOTED YES FOR A REMATCH!");
        } else {
            showNotification("❌ YOU DECLINED THE REMATCH");
        }

        if (game.mpRival && game.mpRival.isAI) {
            setTimeout(() => {
                if (this.rematch.myVote === true) {
                    this.handleRivalRematchVote(true);
                } else {
                    this.handleRivalRematchVote(false);
                }
            }, 400);
        }

        this.updateRematchUI();
        this.checkRematchDecision();
    },

    handleRivalRematchVote(vote) {
        if (this.rematch.status === 'accepted' || this.rematch.status === 'declined') return;

        this.rematch.rivalVote = !!vote;
        if (this.rematch.rivalVote) {
            showNotification(`🔥 RIVAL VOTED YES FOR REMATCH!`);
        } else {
            showNotification(`❌ RIVAL DECLINED REMATCH`);
        }

        this.updateRematchUI();
        this.checkRematchDecision();
    },

    checkRematchDecision() {
        // If either player says NO: ends the session anyway!
        if (this.rematch.myVote === false || this.rematch.rivalVote === false) {
            this.rematch.status = 'declined';
            this.updateRematchUI();

            if (this.rematch.decisionTimer) clearTimeout(this.rematch.decisionTimer);
            this.rematch.decisionTimer = setTimeout(() => {
                showNotification("🚪 SESSION ENDED — RETURNING TO MENU");
                this.connected = false;
                game.isMultiplayer = false;
                game.mpRival = null;
                const modal = document.getElementById('modal-race-result');
                if (modal) {
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                }
                returnToMainMenu();
            }, 1800);
            return;
        }

        // If BOTH players say YES: go again!
        if (this.rematch.myVote === true && this.rematch.rivalVote === true) {
            this.rematch.status = 'accepted';
            this.updateRematchUI();

            if (this.rematch.decisionTimer) clearTimeout(this.rematch.decisionTimer);
            this.rematch.decisionTimer = setTimeout(() => {
                const modal = document.getElementById('modal-race-result');
                if (modal) {
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                }
                this.resetSeries();
                this.resetRematch();

                if (game.mpRival && game.mpRival.isAI) {
                    this.hostTriggerStartRound();
                } else if (this.isHost) {
                    this.hostTriggerStartRound();
                } else {
                    showNotification("⏳ STARTING NEW BEST-OF-3 SERIES...");
                }
            }, 1400);
        }
    },

    handleRivalLeft() {
        this.rematch.status = 'declined';
        this.rematch.rivalVote = false;
        this.updateRematchUI();
        showNotification("⚠️ RIVAL LEFT — MULTIPLAYER SESSION CONCLUDED");
        setTimeout(() => {
            const modal = document.getElementById('modal-race-result');
            if (modal) {
                modal.classList.add('hidden');
                modal.style.display = 'none';
            }
            this.connected = false;
            game.isMultiplayer = false;
            game.mpRival = null;
            returnToMainMenu();
        }, 1500);
    },

    formatTrackChoiceLabel(choice) {
        if (choice === 'RANDOM_ALL' || choice === 'RANDOM' || choice === undefined || choice === null || choice === '') {
            return '🎲 RANDOM (ALL 20 MODES)';
        }
        if (choice === 'RANDOM_DIM1') {
            return '🌌 RANDOM DIM-α (01–10)';
        }
        if (choice === 'RANDOM_DIM2') {
            return '🌀 RANDOM DIM-β (11–20)';
        }
        const idx = parseInt(choice, 10);
        if (!isNaN(idx) && LEVELS[idx]) {
            return LEVELS[idx].name;
        }
        return '🎲 RANDOM (ALL MODES)';
    },

    resolveTrackIndex(choice, excluded = []) {
        let pool = [];
        if (choice === 'RANDOM_DIM1') {
            pool = Array.from({ length: 10 }, (_, i) => i);
        } else if (choice === 'RANDOM_DIM2') {
            pool = Array.from({ length: 10 }, (_, i) => i + 10);
        } else if (choice === 'RANDOM_ALL' || choice === 'RANDOM' || choice === undefined || choice === null || choice === '' || isNaN(parseInt(choice, 10))) {
            pool = Array.from({ length: LEVELS.length }, (_, i) => i);
        } else {
            const idx = parseInt(choice, 10);
            if (idx >= 0 && idx < LEVELS.length) {
                return idx;
            }
            pool = Array.from({ length: LEVELS.length }, (_, i) => i);
        }

        let available = pool.filter(idx => !excluded.includes(idx));
        if (available.length === 0) {
            available = pool;
        }
        return available[Math.floor(Math.random() * available.length)];
    },

    updateHUDSeriesBadge() {
        const badge = document.getElementById('hud-series-badge');
        const score = document.getElementById('hud-series-score');
        if (badge && score) {
            if (game.isMultiplayer) {
                badge.classList.remove('hidden');
                score.innerText = `${this.series.myScore} - ${this.series.rivalScore} (R${this.series.currentRound}/3)`;
            } else {
                badge.classList.add('hidden');
            }
        }
    },

    peerConfig: {
        debug: 0,
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' }
            ]
        }
    },

    initChannel() {
        if (typeof BroadcastChannel !== 'undefined' && !this.channel) {
            try {
                this.channel = new BroadcastChannel('neon_pulse_p2p_channel');
                this.channel.onmessage = (event) => {
                    this.handleBroadcastMessage(event.data);
                };
            } catch (e) {
                console.warn('BroadcastChannel error:', e);
            }
        }
    },

    sendMsg(msg) {
        msg.sender = this.clientId;
        msg.roomCode = this.roomCode;
        if (this.channel) {
            try {
                this.channel.postMessage(msg);
            } catch(e) {}
        }
        if (this.conn && this.conn.open) {
            try {
                this.conn.send(msg);
            } catch(e) {}
        }
    },

    handleBroadcastMessage(data) {
        if (!data || !data.roomCode || data.roomCode !== this.roomCode) return;
        if (data.sender === this.clientId) return; // ignore own broadcast

        if (data.type === 'JOIN_REQUEST' && this.isHost) {
            this.connected = true;
            game.isMultiplayer = true;
            this.rivalData = {
                tag: data.tag || 'RIVAL',
                skin: data.skin || 'neon_rose',
                x: 80,
                y: 356,
                renderX: 80,
                renderY: 356,
                vx: 320,
                vy: 0,
                s: 0,
                g: 1
            };
            game.mpRival = this.rivalData;
            const choice = data.trackChoice !== undefined ? data.trackChoice : data.trackIdx;
            if (choice !== undefined) {
                this.series.guestTrack = choice;
                this.updateRivalTrackDisplay(choice);
            }

            // Acknowledge to client
            this.sendMsg({
                type: 'JOIN_ACCEPT',
                tag: game.pilotTag,
                skin: dailySystem.activeSkin,
                hostTrack: this.series.hostTrack,
                trackChoice: this.series.hostTrack
            });

            const hostStatus = document.getElementById('mp-opponent-status');
            const btnStart = document.getElementById('btn-mp-start-race');
            if (hostStatus) {
                hostStatus.innerHTML = `<span class="text-emerald-400 font-bold">● ${data.tag || 'RIVAL'} CONNECTED!</span>`;
            }
            if (btnStart) {
                btnStart.disabled = false;
                btnStart.className = "mt-1 w-full py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-cyber font-bold text-xs rounded transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer";
                btnStart.innerText = "🏁 START BEST OF 3 MATCH!";
            }
            showNotification(`⚔️ ${data.tag || 'RIVAL'} JOINED YOUR ROOM!`);
        } else if (data.type === 'JOIN_ACCEPT' && !this.isHost) {
            this.connected = true;
            game.isMultiplayer = true;
            this.rivalData = {
                tag: data.tag || 'HOST',
                skin: data.skin || 'neon_cyan',
                x: 80,
                y: 356,
                renderX: 80,
                renderY: 356,
                vx: 320,
                vy: 0,
                s: 0,
                g: 1
            };
            game.mpRival = this.rivalData;
            const choice = data.trackChoice !== undefined ? data.trackChoice : data.hostTrack;
            if (choice !== undefined) {
                this.series.hostTrack = choice;
                this.updateHostTrackDisplay(choice);
            }

            const joinStatus = document.getElementById('mp-join-status');
            const guestLobby = document.getElementById('mp-guest-lobby-view');
            if (joinStatus) {
                joinStatus.innerHTML = `<span class="text-emerald-400 font-bold">● CONNECTED TO HOST (${data.tag || 'HOST'})!</span> Ready for Best of 3...`;
            }
            if (guestLobby) guestLobby.classList.remove('hidden');
            showNotification(`⚔️ CONNECTED TO ROOM ${this.roomCode}!`);
        } else {
            this.handleMessage(data);
        }
    },

    updateRivalTrackDisplay(trackChoice) {
        const rivalTrackDisplay = document.getElementById('mp-rival-track-display');
        if (rivalTrackDisplay) {
            rivalTrackDisplay.innerText = this.formatTrackChoiceLabel(trackChoice);
        }
    },

    updateHostTrackDisplay(trackChoice) {
        const hostTrackDisplay = document.getElementById('mp-guest-host-track-display');
        if (hostTrackDisplay) {
            hostTrackDisplay.innerText = this.formatTrackChoiceLabel(trackChoice);
        }
    },

    generateRoomCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },

    createRoom() {
        this.roomCode = this.generateRoomCode();
        this.isHost = true;
        this.resetSeries();
        this.resetMatch();
        this.initChannel();

        const codeDisplay = document.getElementById('mp-room-code');
        const hostStatus = document.getElementById('mp-opponent-status');
        const btnStart = document.getElementById('btn-mp-start-race');

        if (codeDisplay) codeDisplay.innerText = this.roomCode;
        if (hostStatus) hostStatus.innerText = "WAITING FOR RIVAL TO CONNECT...";
        if (btnStart) {
            btnStart.disabled = true;
            btnStart.className = "mt-1 w-full py-2.5 bg-neutral-800 text-neutral-500 font-cyber font-bold text-xs rounded transition flex items-center justify-center gap-1.5";
            btnStart.innerText = "WAITING FOR OPPONENT TO CONNECT...";
        }

        const stageSelect = document.getElementById('mp-stage-select');
        if (stageSelect) this.series.hostTrack = stageSelect.value || 'RANDOM_ALL';

        if (typeof Peer !== 'undefined') {
            if (this.peer) {
                try { this.peer.destroy(); } catch(e) {}
            }

            const peerId = `NEON-${this.roomCode}`;
            try {
                this.peer = new Peer(peerId, this.peerConfig);
                this.peer.on('open', (id) => {
                    if (codeDisplay) codeDisplay.innerText = this.roomCode;
                    const netStatus = document.getElementById('mp-network-status');
                    if (netStatus) {
                        netStatus.innerHTML = `<span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span>ROOM ONLINE: ${this.roomCode}</span></span><span class="text-neutral-500">WebRTC + Local Relay</span>`;
                    }
                });

                this.peer.on('connection', (c) => {
                    this.conn = c;
                    this.setupConnection();
                    if (hostStatus) {
                        hostStatus.innerHTML = `<span class="text-emerald-400 font-bold">● RIVAL CONNECTED!</span>`;
                    }
                    if (btnStart) {
                        btnStart.disabled = false;
                        btnStart.className = "mt-1 w-full py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-cyber font-bold text-xs rounded transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer";
                        btnStart.innerText = "🏁 START BEST OF 3 MATCH!";
                    }
                    showNotification("⚔️ RIVAL JOINED YOUR ROOM!");
                });

                this.peer.on('error', (err) => {
                    if (err.type === 'unavailable-id') {
                        this.createRoom();
                    } else if (hostStatus && !this.connected) {
                        hostStatus.innerText = `Room active (${this.roomCode}). Ready for rival...`;
                    }
                });
            } catch(e) {
                console.warn('Peer init error:', e);
            }
        }
    },

    joinRoom(code) {
        if (!code) {
            showNotification("⚠️ ENTER A ROOM CODE");
            return;
        }
        this.isHost = false;
        this.resetSeries();
        this.resetMatch();
        const joinStatus = document.getElementById('mp-join-status');

        let cleanCode = code.trim();
        if (cleanCode.includes('race=') || cleanCode.includes('room=')) {
            const m = cleanCode.match(/(?:race|room)=([A-Za-z0-9]+)/i);
            if (m && m[1]) cleanCode = m[1];
        }
        cleanCode = cleanCode.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
        this.roomCode = cleanCode;

        if (joinStatus) joinStatus.innerText = `Connecting to Room ${cleanCode}...`;

        const guestSelect = document.getElementById('mp-guest-stage-select');
        if (guestSelect) this.series.guestTrack = guestSelect.value || 'RANDOM_ALL';

        this.initChannel();
        // Send JOIN_REQUEST on BroadcastChannel (for instant multi-tab communication)
        this.sendMsg({
            type: 'JOIN_REQUEST',
            roomCode: cleanCode,
            tag: game.pilotTag,
            skin: dailySystem.activeSkin,
            trackIdx: this.series.guestTrack,
            trackChoice: this.series.guestTrack
        });

        // Also initiate WebRTC connection if PeerJS is available
        if (typeof Peer !== 'undefined') {
            if (this.peer) {
                try { this.peer.destroy(); } catch(e) {}
            }
            try {
                this.peer = new Peer(this.peerConfig);
                this.peer.on('open', () => {
                    const conn = this.peer.connect(`NEON-${cleanCode}`, { reliable: true });
                    this.conn = conn;
                    this.setupConnection();
                });
                this.peer.on('error', (err) => {
                    if (!this.connected && joinStatus) {
                        joinStatus.innerText = `Searching relay & WebRTC... (${err.type || 'Retrying'})`;
                    }
                });
            } catch(e) {
                console.warn('Peer error:', e);
            }
        }
    },

    setupConnection() {
        if (!this.conn) return;

        this.conn.on('open', () => {
            this.connected = true;
            game.isMultiplayer = true;
            const joinStatus = document.getElementById('mp-join-status');
            const guestLobby = document.getElementById('mp-guest-lobby-view');
            if (joinStatus) {
                joinStatus.innerHTML = `<span class="text-emerald-400 font-bold">● CONNECTED TO HOST!</span> Ready for Best of 3...`;
            }
            if (guestLobby) guestLobby.classList.remove('hidden');

            const guestSelect = document.getElementById('mp-guest-stage-select');
            if (guestSelect) this.series.guestTrack = guestSelect.value || 'RANDOM_ALL';

            this.conn.send({
                type: 'HANDSHAKE',
                tag: game.pilotTag,
                skin: dailySystem.activeSkin,
                trackIdx: this.isHost ? this.series.hostTrack : this.series.guestTrack,
                trackChoice: this.isHost ? this.series.hostTrack : this.series.guestTrack
            });
        });

        this.conn.on('data', (data) => {
            this.handleMessage(data);
        });

        this.conn.on('close', () => {
            if (!this.channel) {
                this.connected = false;
                game.isMultiplayer = false;
                showNotification("⚠️ RIVAL DISCONNECTED");
            }
        });
    },

    copyInviteLink() {
        if (!this.roomCode) return;
        const url = `${window.location.origin}${window.location.pathname}#race=${this.roomCode}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification(`📋 INVITE LINK COPIED! SHARE WITH YOUR FRIEND`);
            }).catch(() => {
                prompt("Copy invite link:", url);
            });
        } else {
            prompt("Copy invite link:", url);
        }
    },

    spawnPracticeBot() {
        this.connected = true;
        game.isMultiplayer = true;
        this.rivalData = {
            isAI: true,
            difficulty: 'EXPERT',
            tag: '🤖 PRACTICE-BOT',
            skin: 'neon_rose',
            x: 80,
            y: 356,
            renderX: 80,
            renderY: 356,
            vx: 320,
            vy: 0,
            s: 0,
            g: 1,
            finishTime: null
        };
        game.mpRival = this.rivalData;
        this.series.guestTrack = 'RANDOM_ALL';
        this.updateRivalTrackDisplay(this.series.guestTrack);

        const hostStatus = document.getElementById('mp-opponent-status');
        const btnStart = document.getElementById('btn-mp-start-race');
        if (hostStatus) {
            hostStatus.innerHTML = `<span class="text-emerald-400 font-bold">● PRACTICE BOT READY!</span>`;
        }
        if (btnStart) {
            btnStart.disabled = false;
            btnStart.className = "mt-1 w-full py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-cyber font-bold text-xs rounded transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer";
            btnStart.innerText = "🏁 START BEST OF 3 MATCH!";
        }
        showNotification("🤖 PRACTICE BOT LOADED IN ROOM!");
    },

    startAiRivalMatch(stageIdx, difficulty = 'EXPERT') {
        const mpModal = document.getElementById('modal-multiplayer');
        const pauseModal = document.getElementById('modal-pause');
        if (mpModal) mpModal.classList.add('hidden');
        if (pauseModal) pauseModal.classList.add('hidden');

        this.connected = true;
        game.isMultiplayer = true;
        this.resetSeries();
        this.resetMatch();

        const botName = difficulty === 'DEMON' ? '⚡ DEMON-BOT' : difficulty === 'NOVICE' ? '🤖 CADET-AI' : '⚔️ CYBER-RIVAL';
        this.rivalData = {
            isAI: true,
            difficulty: difficulty,
            tag: botName,
            skin: 'neon_rose',
            x: 80,
            y: 356,
            renderX: 80,
            renderY: 356,
            vx: 320,
            vy: 0,
            s: 0,
            g: 1,
            finishTime: null
        };
        game.mpRival = this.rivalData;

        const stageSelect = document.getElementById('mp-stage-select');
        this.series.hostTrack = stageIdx !== undefined ? stageIdx : (stageSelect ? stageSelect.value : 'RANDOM_ALL');
        this.series.guestTrack = 'RANDOM_ALL';
        this.updateRivalTrackDisplay(this.series.guestTrack);

        this.hostTriggerStartRound();
    },

    hostTriggerStart() {
        this.resetSeries();
        this.hostTriggerStartRound();
    },

    hostTriggerStartRound() {
        if (!this.connected) {
            showNotification("⚠️ NO RIVAL CONNECTED YET");
            return;
        }

        this.series.playedTracks = this.series.playedTracks || [];

        const stageSelect = document.getElementById('mp-stage-select');
        const hostChoice = (stageSelect && stageSelect.value) ? stageSelect.value : (this.series.hostTrack || 'RANDOM_ALL');
        this.series.hostTrack = hostChoice;

        // If AI, AI randomly selects from all 20 modes
        let guestChoice = this.series.guestTrack || 'RANDOM_ALL';
        if (game.mpRival && game.mpRival.isAI) {
            guestChoice = 'RANDOM_ALL';
            this.series.guestTrack = guestChoice;
        }

        // Resolve non-repeating track candidates for both host and guest
        const hostActualTrack = this.resolveTrackIndex(hostChoice, this.series.playedTracks);
        const guestActualTrack = this.resolveTrackIndex(guestChoice, [...this.series.playedTracks, hostActualTrack]);

        // 50/50 Coin Flip / Roulette Decision
        const roll = Math.random() < 0.5;
        const chosenTrack = roll ? hostActualTrack : guestActualTrack;
        const chosenBy = roll 
            ? (game.mpRival && game.mpRival.isAI ? 'YOUR' : 'HOST')
            : (game.mpRival && game.mpRival.isAI ? 'AI RIVAL' : 'GUEST');

        this.series.playedTracks.push(chosenTrack);
        this.series.activeTrackIdx = chosenTrack;
        this.series.chosenBy = chosenBy;

        // Send synchronized 50/50 countdown instruction to peer
        this.sendMsg({
            type: 'START_ROUND_COUNTDOWN',
            round: this.series.currentRound,
            hostScore: this.series.myScore,
            guestScore: this.series.rivalScore,
            hostTrack: hostActualTrack,
            guestTrack: guestActualTrack,
            chosenTrack: chosenTrack,
            chosenBy: chosenBy
        });

        this.playVisualCountdown(chosenTrack, chosenBy);
    },

    handleMessage(data) {
        if (!data || !data.type) return;

        if (data.type === 'HANDSHAKE') {
            this.rivalData = {
                tag: data.tag || 'RIVAL',
                skin: data.skin || 'neon_cyan',
                x: 80,
                y: 356,
                renderX: 80,
                renderY: 356,
                vx: 280,
                vy: 0,
                s: 0,
                g: 1
            };
            game.mpRival = this.rivalData;
            const choice = data.trackChoice !== undefined ? data.trackChoice : data.trackIdx;
            if (choice !== undefined) {
                if (this.isHost) {
                    this.series.guestTrack = choice;
                    this.updateRivalTrackDisplay(choice);
                } else {
                    this.series.hostTrack = choice;
                    this.updateHostTrackDisplay(choice);
                }
            }
            showNotification(`⚔️ RIVAL IDENTIFIED: ${data.tag}!`);
        } else if (data.type === 'GUEST_TRACK_CHOICE') {
            const choice = data.trackChoice !== undefined ? data.trackChoice : data.trackIdx;
            this.series.guestTrack = choice;
            this.updateRivalTrackDisplay(choice);
        } else if (data.type === 'HOST_TRACK_CHOICE') {
            const choice = data.trackChoice !== undefined ? data.trackChoice : data.trackIdx;
            this.series.hostTrack = choice;
            this.updateHostTrackDisplay(choice);
        } else if (data.type === 'START_ROUND_COUNTDOWN') {
            this.series.currentRound = data.round;
            if (this.isHost) {
                this.series.myScore = data.hostScore;
                this.series.rivalScore = data.guestScore;
            } else {
                this.series.myScore = data.guestScore;
                this.series.rivalScore = data.hostScore;
            }
            this.series.activeTrackIdx = data.chosenTrack;
            this.playVisualCountdown(data.chosenTrack, data.chosenBy);
        } else if (data.type === 'READY_NEXT_ROUND') {
            if (this.isHost) {
                this.hostTriggerStartRound();
            }
        } else if (data.type === 'READY_NEW_MATCH') {
            if (this.isHost) {
                this.resetSeries();
                this.hostTriggerStartRound();
            }
        } else if (data.type === 'REMATCH_VOTE') {
            this.handleRivalRematchVote(data.vote);
        } else if (data.type === 'PLAYER_LEFT') {
            this.handleRivalLeft();
        } else if (data.type === 'SYNC') {
            if (!this.rivalData) {
                this.rivalData = { tag: data.tag, skin: data.skin };
                game.mpRival = this.rivalData;
            }
            this.rivalData.prevX = this.rivalData.x;
            this.rivalData.prevY = this.rivalData.y;
            this.rivalData.x = data.x;
            this.rivalData.y = data.y;
            this.rivalData.renderX = data.x;
            this.rivalData.renderY = data.y;
            this.rivalData.vx = data.vx;
            this.rivalData.vy = data.vy;
            this.rivalData.s = data.s;
            this.rivalData.g = data.g;
            this.rivalData.t = data.t;
        } else if (data.type === 'FINISH') {
            this.rivalFinishTime = data.time;
            if (this.myFinishTime !== null) {
                if (this.finishTimeout) clearTimeout(this.finishTimeout);
                this.finishTimeout = setTimeout(() => this.showPodium(), 500);
            } else {
                showNotification(`⚠️ RIVAL FINISHED IN ${formatTime(data.time)}! RUN!`);
            }
        }
    },

    broadcastState() {
        if (!this.connected) return;
        const now = (typeof performance !== 'undefined') ? performance.now() : Date.now();
        if (now - this.lastBroadcast < 33) return; // ~30Hz
        this.lastBroadcast = now;

        const p = game.player;
        this.sendMsg({
            type: 'SYNC',
            x: Math.round(p.x),
            y: Math.round(p.y),
            vx: Math.round(p.vx),
            vy: Math.round(p.vy),
            s: p.isSliding ? 1 : 0,
            g: p.gravityDir,
            t: game.runTime,
            tag: game.pilotTag,
            skin: dailySystem.activeSkin
        });
    },

    broadcastFinish(time) {
        this.myFinishTime = time;
        this.sendMsg({ type: 'FINISH', time: time });
        if (this.finishTimeout) clearTimeout(this.finishTimeout);

        if (this.rivalFinishTime !== null) {
            this.finishTimeout = setTimeout(() => this.showPodium(), 500);
        } else if (game.mpRival && game.mpRival.isAI) {
            const lvl = game.level;
            const r = game.mpRival;
            if (lvl && r && r.x < lvl.length) {
                const remainingDist = Math.max(1, lvl.length - r.x);
                const estTime = time + (remainingDist / Math.max(100, r.vx || 320));
                this.rivalFinishTime = estTime;
                this.finishTimeout = setTimeout(() => this.showPodium(), 600);
            } else {
                this.finishTimeout = setTimeout(() => this.showPodium(), 500);
            }
        } else {
            // Safety fallback: if remote peer doesn't finish within 4s, display podium anyway
            showNotification("🏁 WAITING FOR RIVAL TO CROSS...");
            this.finishTimeout = setTimeout(() => {
                if (this.rivalFinishTime === null) {
                    this.rivalFinishTime = time + 5;
                }
                this.showPodium();
            }, 4000);
        }
    },

    playVisualCountdown(stageIdx, chosenBy) {
        game.isMultiplayer = true;
        const mpModal = document.getElementById('modal-multiplayer');
        const resModal = document.getElementById('modal-race-result');
        const pauseModal = document.getElementById('modal-pause');
        if (mpModal) {
            mpModal.classList.add('hidden');
            mpModal.style.display = 'none';
        }
        if (resModal) {
            resModal.classList.add('hidden');
            resModal.style.display = 'none';
        }
        if (pauseModal) {
            pauseModal.classList.add('hidden');
            pauseModal.style.display = 'none';
        }

        this.resetMatch();
        this.series.activeTrackIdx = stageIdx;
        startLevel(stageIdx, true);
        game.isMultiplayer = true;

        const isDecider = (this.series.currentRound === 3) || (this.series.myScore === 1 && this.series.rivalScore === 1);
        startVisualRaceCountdown({
            isMultiplayer: true,
            title: isDecider ? '🔥 FINAL DECIDING ROUND 3' : `ROUND ${this.series.currentRound} OF 3`,
            isDecider: isDecider,
            chosenTrack: stageIdx,
            chosenBy: chosenBy,
            bpm: (LEVELS[stageIdx] && LEVELS[stageIdx].bpm) || 135
        });
    },

    showPodium() {
        if (this.finishTimeout) {
            clearTimeout(this.finishTimeout);
            this.finishTimeout = null;
        }
        if (this.roundFinished) return;
        this.roundFinished = true;

        const modal = document.getElementById('modal-race-result');
        if (!modal) return;

        const icon = document.getElementById('race-result-icon');
        const title = document.getElementById('race-result-title');
        const subtitle = document.getElementById('race-result-subtitle');
        const myName = document.getElementById('race-my-name');
        const myTime = document.getElementById('race-my-time');
        const rivalName = document.getElementById('race-rival-name');
        const rivalTime = document.getElementById('race-rival-time');
        const banner = document.getElementById('race-gap-banner');

        const roundStatus = document.getElementById('race-bo3-round-status');
        const myScoreDisplay = document.getElementById('bo3-my-score-display');
        const rivalScoreDisplay = document.getElementById('bo3-rival-score-display');
        const seriesStatus = document.getElementById('race-bo3-series-status');
        const btnNextRound = document.getElementById('btn-next-round');
        const btnRaceAgain = document.getElementById('btn-race-again');

        const iWonRound = (this.myFinishTime || 999) <= (this.rivalFinishTime || 999);
        if (iWonRound) {
            this.series.myScore++;
        } else {
            this.series.rivalScore++;
        }

        const currentRoundNum = this.series.currentRound;
        const seriesWon = this.series.myScore >= 2;
        const seriesLost = this.series.rivalScore >= 2;
        const seriesOver = seriesWon || seriesLost;

        if (myScoreDisplay) myScoreDisplay.innerText = `YOU: ${this.series.myScore}`;
        if (rivalScoreDisplay) rivalScoreDisplay.innerText = `RIVAL: ${this.series.rivalScore}`;

        // Update Bo3 Pips
        const pipMe1 = document.getElementById('pip-me-1');
        const pipMe2 = document.getElementById('pip-me-2');
        const pipRival1 = document.getElementById('pip-rival-1');
        const pipRival2 = document.getElementById('pip-rival-2');

        if (pipMe1) pipMe1.className = this.series.myScore >= 1 ? "w-2.5 h-2.5 rounded-full bg-cyan-400 border border-cyan-300 shadow-[0_0_8px_rgba(6,182,212,1)]" : "w-2.5 h-2.5 rounded-full border border-cyan-400 bg-neutral-800";
        if (pipMe2) pipMe2.className = this.series.myScore >= 2 ? "w-2.5 h-2.5 rounded-full bg-cyan-400 border border-cyan-300 shadow-[0_0_8px_rgba(6,182,212,1)]" : "w-2.5 h-2.5 rounded-full border border-cyan-400 bg-neutral-800";
        if (pipRival1) pipRival1.className = this.series.rivalScore >= 1 ? "w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-400 shadow-[0_0_8px_rgba(244,63,94,1)]" : "w-2.5 h-2.5 rounded-full border border-rose-400 bg-neutral-800";
        if (pipRival2) pipRival2.className = this.series.rivalScore >= 2 ? "w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-400 shadow-[0_0_8px_rgba(244,63,94,1)]" : "w-2.5 h-2.5 rounded-full border border-rose-400 bg-neutral-800";

        if (roundStatus) roundStatus.innerText = `ROUND ${currentRoundNum} COMPLETE`;

        if (seriesOver) {
            if (seriesWon) {
                if (icon) icon.innerText = "👑";
                if (title) {
                    title.innerText = `MATCH CHAMPION! (2 - ${this.series.rivalScore})`;
                    title.className = "text-2xl font-cyber font-bold text-cyan-400 tracking-wider";
                }
                if (subtitle) subtitle.innerText = "SERIES VICTORY! YOU OUTPLAYED YOUR OPPONENT!";
                if (seriesStatus) seriesStatus.innerText = `MATCH CONCLUDED — SERIES WON 2 - ${this.series.rivalScore}!`;
            } else {
                if (icon) icon.innerText = "🥈";
                if (title) {
                    title.innerText = `SERIES DEFEAT (${this.series.myScore} - 2)`;
                    title.className = "text-2xl font-cyber font-bold text-rose-500 tracking-wider";
                }
                if (subtitle) subtitle.innerText = "OPPONENT SECURED 2 ROUND WINS";
                if (seriesStatus) seriesStatus.innerText = `MATCH CONCLUDED — OPPONENT WON 2 - ${this.series.myScore}!`;
            }
            if (btnNextRound) {
                btnNextRound.classList.add('hidden');
                btnNextRound.style.display = 'none';
            }
            if (btnRaceAgain) {
                btnRaceAgain.classList.add('hidden');
                btnRaceAgain.style.display = 'none';
            }
            this.rematch.status = 'voting';
            this.rematch.myVote = null;
            this.rematch.rivalVote = null;
            this.updateRematchUI();
        } else {
            // Series continues!
            this.series.currentRound++;
            const nextRound = this.series.currentRound;

            if (icon) icon.innerText = iWonRound ? "🏆" : "🥈";
            if (title) {
                title.innerText = iWonRound ? `ROUND ${currentRoundNum} VICTORY!` : `ROUND ${currentRoundNum} DEFEAT!`;
                title.className = iWonRound ? "text-2xl font-cyber font-bold text-cyan-400 tracking-wider" : "text-2xl font-cyber font-bold text-rose-500 tracking-wider";
            }
            if (subtitle) subtitle.innerText = `SERIES SCORE: ${this.series.myScore} - ${this.series.rivalScore} (FIRST TO 2 WINS)`;
            if (seriesStatus) {
                seriesStatus.innerText = nextRound === 3 ? "🔥 DECIDING ROUND 3 AHEAD! WINNER TAKES ALL!" : "ROUND 2 AHEAD — 50/50 ROULETTE TRACK ROLL!";
            }

            if (btnNextRound) {
                btnNextRound.classList.remove('hidden');
                btnNextRound.style.display = '';
                btnNextRound.innerText = nextRound === 3 ? "🔥 START FINAL ROUND 3 (DECIDER)" : "🏁 START ROUND 2";
            }
            if (btnRaceAgain) {
                btnRaceAgain.classList.add('hidden');
                btnRaceAgain.style.display = 'none';
            }
            this.rematch.status = 'idle';
            this.updateRematchUI();
        }

        if (myName) myName.innerText = game.pilotTag;
        if (myTime) myTime.innerText = formatTime(this.myFinishTime || 0);
        if (rivalName) rivalName.innerText = (this.rivalData && this.rivalData.tag) || (game.mpRival && game.mpRival.tag) || "RIVAL";
        if (rivalTime) rivalTime.innerText = formatTime(this.rivalFinishTime || 0);

        const diff = Math.abs((this.myFinishTime || 0) - (this.rivalFinishTime || 0));
        if (banner) {
            banner.innerText = iWonRound ? `DELTA: +${diff.toFixed(3)}s AHEAD` : `DELTA: -${diff.toFixed(3)}s BEHIND`;
            banner.className = iWonRound ? "text-[11px] font-mono text-emerald-400 mt-1 font-bold" : "text-[11px] font-mono text-rose-400 mt-1 font-bold";
        }

        this.updateHUDSeriesBadge();
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    },

    resetMatch() {
        if (this.finishTimeout) {
            clearTimeout(this.finishTimeout);
            this.finishTimeout = null;
        }
        this.myFinishTime = null;
        this.rivalFinishTime = null;
        this.roundFinished = false;
    }
};
window.MP = MP;

function updateAiRival(dt) {
    if (!game.isMultiplayer || !game.mpRival || !game.mpRival.isAI) return;
    const r = game.mpRival;
    const lvl = game.level;
    if (!lvl) return;
    if (r.finishTime !== null) return;

    // Base forward pacing
    let targetSpeed = lvl.startSpeed || 320;
    if (r.difficulty === 'NOVICE') {
        targetSpeed *= 0.88;
    } else if (r.difficulty === 'DEMON') {
        targetSpeed *= 1.08;
    } else {
        // EXPERT: adaptive rubber-band
        const delta = game.player.x - r.x;
        if (delta > 180) {
            targetSpeed += Math.min(75, delta * 0.15);
        } else if (delta < -180) {
            targetSpeed -= Math.min(50, -delta * 0.1);
        }
    }

    r.vx += (targetSpeed - r.vx) * Math.min(1, dt * 4);
    r.x += r.vx * dt;

    // Vertical physics
    r.vy = (r.vy || 0) + 1250 * dt;
    r.y = (r.y || 356) + r.vy * dt;

    // Find platform / floor under rival
    let groundY = 356;
    if (lvl.platforms) {
        for (let i = 0; i < lvl.platforms.length; i++) {
            const plat = lvl.platforms[i];
            if (plat.phase && plat.phase !== 'NEUTRAL' && plat.phase !== game.phaseColor) continue;
            if (r.x + 22 > plat.x && r.x < plat.x + plat.w) {
                const pTop = plat.y - 44;
                if (r.y >= pTop - 15 && r.y <= pTop + 25 && r.vy >= 0) {
                    groundY = pTop;
                    break;
                }
            }
        }
    }

    if (r.y >= groundY) {
        r.y = groundY;
        r.vy = 0;
        r.isGrounded = true;
    } else {
        r.isGrounded = false;
    }

    // AI obstacle reactions
    const lookahead = Math.max(90, r.vx * 0.3);

    // 1. Lasers -> Slide
    if (r.slideTimer && r.slideTimer > 0) {
        r.slideTimer -= dt;
        if (r.slideTimer <= 0) r.s = 0;
    } else if (lvl.lasers) {
        for (let i = 0; i < lvl.lasers.length; i++) {
            const l = lvl.lasers[i];
            if (l.x + l.w > r.x && l.x - r.x < lookahead) {
                if (l.h <= 35 && l.y <= 360) {
                    r.s = 1;
                    r.slideTimer = 0.45;
                    break;
                }
            }
        }
    }

    // 2. Spikes -> Jump
    if (r.isGrounded && lvl.spikes) {
        for (let i = 0; i < lvl.spikes.length; i++) {
            const s = lvl.spikes[i];
            if (s.x > r.x && s.x - r.x < lookahead) {
                if (!s.inverted && Math.abs((r.y + 44) - s.y) < 25) {
                    r.vy = -450;
                    r.isGrounded = false;
                    break;
                }
            }
        }
    }

    // 3. Jump Rings
    if (lvl.rings) {
        for (let i = 0; i < lvl.rings.length; i++) {
            const ring = lvl.rings[i];
            if (ring.x > r.x && ring.x - r.x < 70 && Math.abs(r.y - ring.y) < 90) {
                if (r.isGrounded || (r.vy > 0 && Math.abs(r.y - ring.y) < 50)) {
                    r.vy = -480;
                    break;
                }
            }
        }
    }

    // 4. Trampolines / Springs
    if (lvl.trampolines) {
        for (let i = 0; i < lvl.trampolines.length; i++) {
            const tp = lvl.trampolines[i];
            if (r.x + 22 > tp.x && r.x < tp.x + tp.w && Math.abs((r.y + 44) - tp.y) < 20) {
                r.vy = -620;
                break;
            }
        }
    }

    // 5. Speed Pads
    if (lvl.speedPads) {
        for (let i = 0; i < lvl.speedPads.length; i++) {
            const pad = lvl.speedPads[i];
            if (r.x + 22 > pad.x && r.x < pad.x + pad.w && Math.abs((r.y + 44) - pad.y) < 25) {
                r.vx += (pad.boostVx || 180);
                break;
            }
        }
    }

    r.renderX = r.x;
    r.renderY = r.y;

    // Victory finish check
    if (!game.isEndless && r.x >= lvl.length && r.finishTime === null) {
        r.finishTime = game.runTime;
        MP.handleMessage({ type: 'FINISH', time: r.finishTime });
    }
}

function drawRivalRunner(ctx) {
    if (!game.isMultiplayer || !game.mpRival) return;
    const r = game.mpRival;
    const drawX = r.renderX !== undefined ? r.renderX : r.x;
    const drawY = r.renderY !== undefined ? r.renderY : r.y;

    ctx.save();
    ctx.translate(drawX + 11, drawY + (r.s ? 10 : 22));
    ctx.globalAlpha = 0.9;

    const isDemon = r.difficulty === 'DEMON';
    const mainColor = isDemon ? '#f97316' : '#f43f5e';
    const glowColor = isDemon ? '#ea580c' : '#e11d48';

    ctx.strokeStyle = mainColor;
    ctx.fillStyle = glowColor;
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = 14;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';

    if (r.s) {
        ctx.beginPath();
        ctx.arc(8, -2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(4, 0);
        ctx.lineTo(-8, 5);
        ctx.lineTo(14, 8);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.arc(0, -16, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(-2, 4);
        ctx.lineTo(8, -12);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-2, 4);
        ctx.lineTo(-10, 14);
        ctx.stroke();
    }

    ctx.font = "bold 9px 'JetBrains Mono', monospace";
    ctx.fillStyle = isDemon ? '#fdba74' : '#fda4af';
    ctx.textAlign = 'center';
    if (ctx.fillText) ctx.fillText(`${r.tag || 'RIVAL'}`, 0, -28);

    ctx.restore();
}

function populateMultiplayerStageSelect() {
    const selects = [
        document.getElementById('mp-stage-select'),
        document.getElementById('mp-guest-stage-select')
    ];
    selects.forEach(select => {
        if (!select) return;
        select.innerHTML = '';

        // 1. RANDOM CHOICES (Default)
        const optRandomAll = document.createElement('option');
        optRandomAll.value = 'RANDOM_ALL';
        optRandomAll.innerText = '🎲 RANDOM (ALL 20 MODES & STAGES)';
        optRandomAll.selected = true;
        select.appendChild(optRandomAll);

        const optRandomDim1 = document.createElement('option');
        optRandomDim1.value = 'RANDOM_DIM1';
        optRandomDim1.innerText = '🌌 RANDOM DIM-α (SPEEDRUN FLOW 01–10)';
        select.appendChild(optRandomDim1);

        const optRandomDim2 = document.createElement('option');
        optRandomDim2.value = 'RANDOM_DIM2';
        optRandomDim2.innerText = '🌀 RANDOM DIM-β (SPECIAL MECHANICS 11–20)';
        select.appendChild(optRandomDim2);

        // 2. DIMENSION 1 INDIVIDUAL STAGES
        const groupDim1 = document.createElement('optgroup');
        groupDim1.label = '── DIMENSION α (SPEEDRUN FLOW) ──';
        for (let i = 0; i < 10 && i < LEVELS.length; i++) {
            const opt = document.createElement('option');
            opt.value = String(i);
            opt.innerText = LEVELS[i].name;
            groupDim1.appendChild(opt);
        }
        select.appendChild(groupDim1);

        // 3. DIMENSION 2 INDIVIDUAL STAGES (WITH OBJECTIVE LABELS)
        const groupDim2 = document.createElement('optgroup');
        groupDim2.label = '── DIMENSION β (SPECIAL MECHANICS) ──';
        for (let i = 10; i < 20 && i < LEVELS.length; i++) {
            const opt = document.createElement('option');
            opt.value = String(i);
            const objInfo = LEVELS[i].objective ? ` [${LEVELS[i].objective.title}]` : '';
            opt.innerText = `${LEVELS[i].name}${objInfo}`;
            groupDim2.appendChild(opt);
        }
        select.appendChild(groupDim2);
    });
}

function playRandomStage(dim = null) {
    let pool = [];
    if (dim === 1) {
        pool = Array.from({ length: 10 }, (_, i) => i);
    } else if (dim === 2) {
        pool = Array.from({ length: 10 }, (_, i) => i + 10);
    } else {
        pool = Array.from({ length: LEVELS.length }, (_, i) => i);
    }
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    startLevel(chosen);
    showNotification(`🎲 RANDOM STAGE SELECTED: ${LEVELS[chosen].name}`);
}
window.playRandomStage = playRandomStage;

// ============================================================================
// 12. LEVEL FLOW & STAGE MATRIX POPULATION
// ============================================================================
function startLevel(idx, skipCountdown = false) {
    game.inMainMenu = false;
    game.isEndless = false;
    game.isCountingDown = false;
    game.currentLevelIdx = idx;
    if (!skipCountdown) {
        game.isMultiplayer = false;
        game.mpRival = null;
        const raceBadge = document.getElementById('hud-race-badge');
        const seriesBadge = document.getElementById('hud-series-badge');
        if (raceBadge) raceBadge.classList.add('hidden');
        if (seriesBadge) seriesBadge.classList.add('hidden');
    }
    game.level = JSON.parse(JSON.stringify(LEVELS[idx]));
    game.currentDimensionTab = game.level.dimension || 1;
    updateDimensionTabsUI();
    game.attempts = 1;
    game.victory = false;
    game.shardsCollected.clear();
    setPause(false);
    resetPlayerState();

    const mainMenu = document.getElementById('screen-main-menu');
    const ingameHeader = document.getElementById('ingame-header');
    const endlessBadge = document.getElementById('hud-endless-badge');
    if (mainMenu) {
        mainMenu.classList.add('hidden');
        mainMenu.style.display = 'none';
    }
    if (ingameHeader) {
        ingameHeader.classList.remove('hidden');
        ingameHeader.style.display = '';
    }
    if (endlessBadge) endlessBadge.classList.add('hidden');

    const hudLevelName = document.getElementById('hud-level-name');
    const hudPct = document.getElementById('hud-pct-text');
    const hudFill = document.getElementById('hud-progress-fill');

    if (hudLevelName) hudLevelName.innerText = game.level.name;
    if (hudPct) hudPct.innerText = "0%";
    if (hudFill) hudFill.style.width = "0%";

    const modalVic = document.getElementById('modal-victory');
    const modalMenu = document.getElementById('modal-menu');
    const modalLb = document.getElementById('modal-leaderboard');
    const modalDaily = document.getElementById('modal-daily');
    const modalHow = document.getElementById('modal-howtoplay');
    const modalMp = document.getElementById('modal-multiplayer');
    const pauseModal = document.getElementById('modal-pause');

    const allModals = [modalVic, modalMenu, modalLb, modalDaily, modalHow, modalMp, pauseModal];
    allModals.forEach(m => {
        if (m) {
            m.classList.add('hidden');
            m.style.display = 'none';
        }
    });

    updateShardHUD();
    updateAbilityHUD();

    if (skipCountdown || game.isMultiplayer) {
        if (!game.isMultiplayer) {
            audio.startMusic(game.level.bpm);
        }
    } else {
        startVisualRaceCountdown({
            isMultiplayer: false,
            title: game.level.name,
            bpm: game.level.bpm
        });
    }
}

function returnToMainMenu() {
    clearActiveCountdowns();
    game.inMainMenu = true;
    game.isPaused = false;
    game.isCountingDown = false;
    game.isEndless = false;
    game.isMultiplayer = false;
    game.victory = false;
    game.openedLeaderboardFrom = null;
    game.mpRival = null;
    if (typeof MP !== 'undefined') {
        MP.connected = false;
        MP.resetRematch();
    }
    audio.stopMusic();

    const ingameHeader = document.getElementById('ingame-header');
    const mainMenu = document.getElementById('screen-main-menu');
    const pauseModal = document.getElementById('modal-pause');
    const modalMenu = document.getElementById('modal-menu');
    const modalLb = document.getElementById('modal-leaderboard');
    const modalDaily = document.getElementById('modal-daily');
    const modalVictory = document.getElementById('modal-victory');
    const modalHow = document.getElementById('modal-howtoplay');
    const modalMp = document.getElementById('modal-multiplayer');
    const modalRaceResult = document.getElementById('modal-race-result');
    const endlessBadge = document.getElementById('hud-endless-badge');
    const raceBadge = document.getElementById('hud-race-badge');
    const seriesBadge = document.getElementById('hud-series-badge');
    const countdownOverlay = document.getElementById('overlay-race-countdown');

    const allModals = [pauseModal, modalMenu, modalLb, modalDaily, modalVictory, modalHow, modalMp, modalRaceResult];
    allModals.forEach(m => {
        if (m) {
            m.classList.add('hidden');
            m.style.display = 'none';
        }
    });

    if (ingameHeader) {
        ingameHeader.classList.add('hidden');
        ingameHeader.style.display = 'none';
    }
    if (endlessBadge) endlessBadge.classList.add('hidden');
    if (raceBadge) raceBadge.classList.add('hidden');
    if (seriesBadge) seriesBadge.classList.add('hidden');
    if (countdownOverlay) {
        countdownOverlay.classList.add('hidden');
        countdownOverlay.style.display = 'none';
    }
    if (mainMenu) {
        mainMenu.classList.remove('hidden');
        mainMenu.style.display = '';
    }

    const pilotDisplay = document.getElementById('main-pilot-display');
    if (pilotDisplay) pilotDisplay.innerText = game.pilotTag;

    dailySystem.updateBadge();
}
window.returnToMainMenu = returnToMainMenu;

function setPause(paused, showModal = true) {
    if (game.inMainMenu || game.isCountingDown) return;
    game.isPaused = paused;
    const pauseModal = document.getElementById('modal-pause');
    if (pauseModal) {
        if (game.isPaused) {
            audio.pauseMusic();
            if (showModal) {
                pauseModal.classList.remove('hidden');
                pauseModal.style.display = '';
            } else {
                pauseModal.classList.add('hidden');
                pauseModal.style.display = 'none';
            }
        } else {
            pauseModal.classList.add('hidden');
            pauseModal.style.display = 'none';
            game.lastTime = (typeof performance !== 'undefined') ? performance.now() : Date.now();
            game.physicsAccumulator = 0;
            audio.resumeMusic();
        }
    }
}


function updateObjectiveHUD() {
    const dimTag = document.getElementById('hud-dim-tag');
    if (dimTag) {
        if (game.level && game.level.dimension === 2) {
            dimTag.innerText = 'DIM-β';
            dimTag.className = 'text-[9px] font-cyber px-1.5 py-0.5 rounded bg-purple-950 border border-purple-500/60 text-purple-300 font-bold shadow-[0_0_8px_rgba(168,85,247,0.4)]';
        } else {
            dimTag.innerText = 'DIM-α';
            dimTag.className = 'text-[9px] font-cyber px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-bold';
        }
    }

    const objPill = document.getElementById('hud-objective-pill');
    if (objPill) {
        const lvl = game.level;
        if (lvl && lvl.objective) {
            objPill.classList.remove('hidden');
            let statusText = '';
            if (lvl.objective.type === 'CORE_HUNTER') {
                statusText = `CORES: ${game.shardsCollected.size}/3`;
            } else if (lvl.objective.type === 'SPEED_LOCK') {
                const spd = Math.round(game.player.vx);
                statusText = `${spd} PX/S ${spd < 380 ? '⚠️ LOW!' : '⚡ OK'}`;
            } else if (lvl.objective.type === 'NO_DOUBLE_JUMP') {
                statusText = `THRUSTERS JAMMED (SLIDE ONLY)`;
            } else if (lvl.objective.type === 'CHRONO_COUNTDOWN') {
                statusText = `COLLAPSE: ${Math.max(0, game.chronoTimer).toFixed(1)}s`;
            } else if (lvl.objective.type === 'ZERO_G') {
                statusText = `LOW-G FLOAT (3x THRUST)`;
            } else if (lvl.objective.type === 'SENTINEL_CHASE') {
                const dist = Math.max(0, Math.round(game.player.x - game.sentinelX));
                statusText = `SENTINEL DIST: ${dist}m`;
            } else if (lvl.objective.type === 'PHASE_SHIFT') {
                statusText = `PHASE: ${game.phaseColor}`;
            } else if (lvl.objective.type === 'RING_CHAIN') {
                statusText = `RING CHAIN: ${game.ringStreak || 0}/8 (MAX: ${game.maxRingStreak || 0})`;
            } else if (lvl.objective.type === 'POLARITY_FLUX') {
                statusText = `POLARITY: ${game.player.gravityDir === 1 ? 'DOWN ↓' : 'UP ↑'}`;
            } else if (lvl.objective.type === 'THE_OMNI_RIFT') {
                statusText = `CHRONO: ${Math.max(0, game.chronoTimer).toFixed(1)}s | 3x THRUST`;
            }
            objPill.innerHTML = `<span>${lvl.objective.icon || '🎯'}</span> <span class="text-neutral-300">${lvl.objective.title}:</span> <span class="text-purple-300 font-bold">${statusText}</span>`;
        } else {
            objPill.classList.add('hidden');
        }
    }
}

function updateDimensionTabsUI() {
    const tab1 = document.getElementById('dim-tab-1');
    const tab2 = document.getElementById('dim-tab-2');
    const currentDim = game.currentDimensionTab || 1;

    if (tab1) {
        if (currentDim === 1) {
            tab1.className = "flex-1 py-1.5 px-3 rounded text-xs font-cyber font-bold tracking-wider transition bg-cyan-950 text-cyan-300 border border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2";
        } else {
            tab1.className = "flex-1 py-1.5 px-3 rounded text-xs font-cyber font-bold tracking-wider transition bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-cyan-500 hover:text-cyan-300 flex items-center justify-center gap-2";
        }
    }
    if (tab2) {
        if (currentDim === 2) {
            tab2.className = "flex-1 py-1.5 px-3 rounded text-xs font-cyber font-bold tracking-wider transition bg-purple-950 text-purple-300 border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2";
        } else {
            tab2.className = "flex-1 py-1.5 px-3 rounded text-xs font-cyber font-bold tracking-wider transition bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-purple-500 hover:text-purple-300 flex items-center justify-center gap-2";
        }
    }
}

function populateSectorTabs() {
    const bar = document.getElementById('sector-tabs-bar');
    if (!bar) return;
    bar.innerHTML = '';

    const currentDim = game.currentDimensionTab || 1;
    const sectorsForDim = SECTORS.filter(s => s.dimension === currentDim);

    const allBtn = document.createElement('button');
    const isAll = game.currentSectorFilter === 'all';
    allBtn.className = `sector-tab px-2.5 py-1 rounded transition font-bold ${
        isAll 
            ? (currentDim === 2 ? 'bg-purple-950 border border-purple-500 text-purple-300' : 'bg-cyan-950 border border-cyan-500 text-cyan-300')
            : 'bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-neutral-400'
    }`;
    allBtn.innerText = 'ALL SECTORS';
    allBtn.addEventListener('click', () => {
        game.currentSectorFilter = 'all';
        populateSectorTabs();
        populateStageMenu();
    });
    bar.appendChild(allBtn);

    sectorsForDim.forEach(sec => {
        const secBtn = document.createElement('button');
        const isSelected = String(game.currentSectorFilter) === String(sec.id);
        secBtn.className = `sector-tab px-2.5 py-1 rounded transition whitespace-nowrap ${
            isSelected 
                ? (currentDim === 2 ? 'bg-purple-950 border border-purple-500 text-purple-300 font-bold' : 'bg-cyan-950 border border-cyan-500 text-cyan-300 font-bold')
                : 'bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-neutral-400'
        }`;
        secBtn.innerText = `S${sec.id} // ${sec.name}`;
        secBtn.addEventListener('click', () => {
            game.currentSectorFilter = String(sec.id);
            populateSectorTabs();
            populateStageMenu();
        });
        bar.appendChild(secBtn);
    });
}

function populateStageMenu() {
    const container = document.getElementById('stage-cards-container');
    if (!container) return;
    container.innerHTML = '';

    updateDimensionTabsUI();
    populateSectorTabs();
    LEVELS.forEach((lvl, idx) => {
        const dim = lvl.dimension || 1;
        if (dim !== (game.currentDimensionTab || 1)) return;
        if (game.currentSectorFilter !== 'all' && String(lvl.sectorId) !== String(game.currentSectorFilter)) {
            return;
        }

        let pbTime = null;
        let bestShards = 0;
        try {
            const stored = localStorage.getItem(`neon_pulse_pb_${idx}`);
            if (stored) pbTime = parseFloat(stored);
            const storedShards = localStorage.getItem(`neon_pulse_shards_${idx}`);
            if (storedShards) bestShards = parseInt(storedShards, 10) || 0;
        } catch(e) {}

        const card = document.createElement('div');
        const isCurrent = idx === game.currentLevelIdx;
        card.className = `p-2.5 rounded-lg border transition cursor-pointer flex flex-col justify-between ${
            isCurrent 
                ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900'
        }`;

        card.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="text-[9px] font-cyber font-bold px-1.5 py-0.5 rounded" style="background:${lvl.color}22; color:${lvl.color}; border:1px solid ${lvl.color}44;">
                    S${lvl.sectorId}
                </span>
                <span class="text-[9px] font-cyber ${lvl.difficulty === 'DEMON' || lvl.difficulty === 'NEARLY IMPOSSIBLE' ? 'text-pink-400 font-bold' : 'text-neutral-400'}">
                    ${lvl.difficulty}
                </span>
            </div>
            <div class="my-1.5">
                <div class="text-xs font-cyber font-bold text-neutral-100 truncate">${lvl.name}</div>
                ${lvl.objective ? `<div class="text-[9px] font-cyber px-1.5 py-0.5 rounded bg-purple-950/70 border border-purple-500/40 text-purple-300 mt-1 flex items-center gap-1"><span class="text-[10px]">${lvl.objective.icon || '🎯'}</span> <span class="truncate">${lvl.objective.title}</span></div>` : ''}
                <div class="text-[10px] text-neutral-400 font-mono flex items-center justify-between mt-0.5">
                    <span>BEST:</span>
                    <span class="${pbTime ? 'text-amber-400 font-bold' : 'text-neutral-600'}">
                        ${pbTime ? formatTime(pbTime) : '--:--.---'}
                    </span>
                </div>
            </div>
            <div class="flex items-center justify-between text-[10px] border-t border-neutral-800/80 pt-1.5 mt-0.5">
                <span class="text-pink-400 font-bold">${'◆'.repeat(bestShards)}${'◇'.repeat(3 - bestShards)}</span>
                <button class="px-2 py-0.5 bg-neutral-900 hover:bg-cyan-600 hover:text-white border border-neutral-700 text-neutral-300 rounded text-[10px] font-cyber transition">
                    RUN ▶
                </button>
            </div>
        `;

        card.addEventListener('click', () => {
            startLevel(idx);
        });

        container.appendChild(card);
    });
}

function populateDailyModal() {
    const grid = document.getElementById('daily-cards-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const currentStreak = dailySystem.streak;
    const claimReady = dailySystem.isClaimReady();

    DAILY_REWARDS_DATA.forEach((reward) => {
        const isPast = reward.day < currentStreak;
        const isToday = reward.day === currentStreak;

        const card = document.createElement('div');
        card.className = `p-2.5 rounded-lg border flex flex-col items-center text-center justify-between min-h-[140px] transition ${
            isToday 
                ? (claimReady ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-pulse' : 'bg-neutral-900 border-amber-500/50')
                : isPast 
                    ? 'bg-neutral-950/80 border-neutral-800 opacity-60' 
                    : 'bg-neutral-950 border-neutral-800 opacity-40'
        }`;

        card.innerHTML = `
            <div class="text-[9px] font-cyber font-bold ${isToday ? 'text-amber-400' : 'text-neutral-400'}">
                DAY ${reward.day}
            </div>
            <div class="text-2xl my-1">${reward.icon}</div>
            <div class="text-[10px] font-cyber font-bold text-neutral-100 leading-tight">${reward.title}</div>
            <div class="text-[8px] text-neutral-400 mt-1 leading-snug">${reward.desc}</div>
            <div class="mt-2 text-[9px] font-cyber font-bold">
                ${isPast ? '<span class="text-emerald-400">✓ CLAIMED</span>' : isToday ? (claimReady ? '<span class="text-amber-400">READY!</span>' : '<span class="text-neutral-500">TODAY</span>') : '<span class="text-neutral-600">LOCKED</span>'}
            </div>
        `;
        grid.appendChild(card);
    });

    const select = document.getElementById('skin-select-dropdown');
    if (select) {
        select.innerHTML = '';
        SKINS.forEach(skin => {
            const isUnlocked = dailySystem.unlockedSkins.has(skin.id);
            const opt = document.createElement('option');
            opt.value = skin.id;
            opt.innerText = isUnlocked ? skin.name : `🔒 ${skin.name} (Day ${skin.unlockDay})`;
            opt.disabled = !isUnlocked;
            if (skin.id === dailySystem.activeSkin) opt.selected = true;
            select.appendChild(opt);
        });
    }

    const equippedName = document.getElementById('equipped-skin-name');
    if (equippedName) {
        equippedName.innerText = getActiveSkinData().name;
        equippedName.style.color = getActiveSkinData().color;
    }

    const claimBtn = document.getElementById('btn-claim-daily');
    if (claimBtn) {
        if (claimReady) {
            claimBtn.disabled = false;
            claimBtn.className = "py-2 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-cyber font-bold text-xs tracking-wider rounded shadow-[0_0_20px_rgba(245,158,11,0.5)] transition cursor-pointer";
            claimBtn.innerText = "CLAIM DAY REWARD";
        } else {
            claimBtn.disabled = true;
            claimBtn.className = "py-2 px-5 bg-neutral-800 text-neutral-500 font-cyber font-bold text-xs tracking-wider rounded cursor-not-allowed border border-neutral-700";
            claimBtn.innerText = "CLAIMED FOR TODAY";
        }
    }
}

function toggleBotDemo(forceState) {
    game.botDemo = forceState !== undefined ? forceState : !game.botDemo;
    const btn = document.getElementById('btn-bot');
    const banner = document.getElementById('bot-active-banner');
    if (game.botDemo) {
        if (btn) btn.className = "px-2 py-1 bg-cyan-950 border border-cyan-400 text-cyan-300 font-cyber text-[11px] rounded transition";
        if (banner) banner.classList.remove('hidden');
    } else {
        if (btn) btn.className = "px-2 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-cyber text-[11px] rounded transition";
        if (banner) banner.classList.add('hidden');
    }
}

// ============================================================================
// 13. INPUT & EVENT LISTENERS
// ============================================================================
window.addEventListener('keydown', (e) => {
    audio.init();

    if (e.repeat) return;

    if (e.code === 'Escape' || e.code === 'KeyP') {
        if (game.isCountingDown) return;
        e.preventDefault();
        const menuModal = document.getElementById('modal-menu');
        const lbModal = document.getElementById('modal-leaderboard');
        const dailyModal = document.getElementById('modal-daily');
        const howModal = document.getElementById('modal-howtoplay');
        const mpModal = document.getElementById('modal-multiplayer');

        const anyOpen = (menuModal && !menuModal.classList.contains('hidden')) ||
                        (lbModal && !lbModal.classList.contains('hidden')) ||
                        (dailyModal && !dailyModal.classList.contains('hidden')) ||
                        (howModal && !howModal.classList.contains('hidden')) ||
                        (mpModal && !mpModal.classList.contains('hidden'));

        if (anyOpen) {
            if (menuModal) { menuModal.classList.add('hidden'); menuModal.style.display = 'none'; }
            if (lbModal) { closeLeaderboardModal(); }
            if (dailyModal) { dailyModal.classList.add('hidden'); dailyModal.style.display = 'none'; }
            if (howModal) { howModal.classList.add('hidden'); howModal.style.display = 'none'; }
            if (mpModal) { mpModal.classList.add('hidden'); mpModal.style.display = 'none'; }
            if (!game.inMainMenu && !game.victory) setPause(false);
            return;
        }

        if (game.inMainMenu) return;

        setPause(!game.isPaused);
        return;
    }

    if (game.inMainMenu) {
        if (e.code === 'Space' || e.code === 'Enter') {
            startLevel(game.currentLevelIdx);
        }
        return;
    }

    if (game.isPaused || game.isCountingDown) return;

    if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (e.repeat) return; // Prevent OS key-repeat from consuming double jumps while holding space
        game.inputs.jumpHeld = true;
        game.inputs.jumpPressedThisFrame = true;
        game.inputs.jumpBufferTime = 0.16; // 160ms responsive jump buffer
        if (game.botDemo) toggleBotDemo(false);
    }

    if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        e.preventDefault();
        game.inputs.slideHeld = true;
        if (game.botDemo) toggleBotDemo(false);
    }

    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        e.preventDefault();
        triggerPhaseDash();
    } else if (e.code === 'KeyE') {
        e.preventDefault();
        triggerThrusterBurst();
    } else if (e.code === 'KeyQ' || e.code === 'KeyF') {
        e.preventDefault();
        triggerChronoPulse();
    }

    if (e.code === 'KeyB') toggleBotDemo();
    if (e.code === 'KeyR') resetPlayerState();
    if (e.code === 'KeyM') {
        populateStageMenu();
        const menuModal = document.getElementById('modal-menu');
        if (menuModal) menuModal.classList.remove('hidden');
        setPause(true);
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        game.inputs.jumpHeld = false;
    }
    if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        game.inputs.slideHeld = false;
    }
});

canvas.addEventListener('pointerdown', () => {
    audio.init();
    if (game.inMainMenu) {
        startLevel(game.currentLevelIdx);
        return;
    }
    if (game.isCountingDown) return;
    if (game.isPaused) {
        setPause(false);
        return;
    }
    game.inputs.jumpHeld = true;
    game.inputs.jumpPressedThisFrame = true;
    game.inputs.jumpBufferTime = 0.16;
    if (game.botDemo) toggleBotDemo(false);
});

window.addEventListener('pointerup', () => {
    game.inputs.jumpHeld = false;
});

const touchJump = document.getElementById('touch-jump');
const touchSlide = document.getElementById('touch-slide');
const touchAbility = document.getElementById('touch-ability');
const touchDash = document.getElementById('touch-dash');
const touchThrust = document.getElementById('touch-thrust');
const touchChrono = document.getElementById('touch-chrono');

if (touchJump) {
    touchJump.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        audio.init();
        if (game.isPaused || game.isCountingDown) return;
        game.inputs.jumpHeld = true;
        game.inputs.jumpPressedThisFrame = true;
        game.inputs.jumpBufferTime = 0.16;
        if (game.botDemo) toggleBotDemo(false);
    });
    touchJump.addEventListener('pointerup', () => { game.inputs.jumpHeld = false; });
}

if (touchSlide) {
    touchSlide.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        audio.init();
        if (game.isPaused || game.isCountingDown) return;
        game.inputs.slideHeld = true;
        if (game.botDemo) toggleBotDemo(false);
    });
    touchSlide.addEventListener('pointerup', () => { game.inputs.slideHeld = false; });
}

if (touchDash) {
    touchDash.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        audio.init();
        if (game.isPaused || game.isCountingDown) return;
        triggerPhaseDash();
    });
}

if (touchThrust) {
    touchThrust.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        audio.init();
        if (game.isPaused || game.isCountingDown) return;
        triggerThrusterBurst();
    });
}

if (touchChrono) {
    touchChrono.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        audio.init();
        if (game.isPaused || game.isCountingDown) return;
        triggerChronoPulse();
    });
}

if (touchAbility) {
    touchAbility.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        audio.init();
        if (game.isPaused || game.isCountingDown) return;
        triggerAbility();
    });
}

const bindClick = (id, fn) => {
    const el = document.getElementById(id);
    if (el) {
        let lastFired = 0;
        const handler = (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            const now = Date.now();
            if (now - lastFired < 180) return;
            lastFired = now;
            fn(e);
        };
        el.addEventListener('pointerdown', handler);
        el.addEventListener('click', handler);
    }
};

bindClick('btn-main-play', () => {
    audio.init();
    startLevel(game.currentLevelIdx);
});

bindClick('btn-main-random', () => {
    audio.init();
    playRandomStage();
});

bindClick('btn-menu-random-stage', () => {
    audio.init();
    const menuModal = document.getElementById('modal-menu');
    if (menuModal) {
        menuModal.classList.add('hidden');
        menuModal.style.display = 'none';
    }
    playRandomStage();
});

bindClick('btn-main-stages', () => {
    populateStageMenu();
    const menuModal = document.getElementById('modal-menu');
    if (menuModal) {
        menuModal.classList.remove('hidden');
        menuModal.style.display = '';
    }
});

bindClick('btn-main-ranks', () => {
    game.openedLeaderboardFrom = 'main';
    populateLeaderboard(game.currentLevelIdx);
    const lbModal = document.getElementById('modal-leaderboard');
    if (lbModal) {
        lbModal.classList.remove('hidden');
        lbModal.style.display = '';
    }
});

bindClick('btn-main-daily', () => {
    populateDailyModal();
    const dailyModal = document.getElementById('modal-daily');
    if (dailyModal) {
        dailyModal.classList.remove('hidden');
        dailyModal.style.display = '';
    }
});

bindClick('btn-main-dim2', () => {
    audio.init();
    const mainMenu = document.getElementById('screen-main-menu');
    if (mainMenu) {
        mainMenu.classList.add('hidden');
        mainMenu.style.display = 'none';
    }
    game.currentDimensionTab = 2;
    game.currentSectorFilter = 'all';
    populateStageMenu();
    const menuModal = document.getElementById('modal-menu');
    if (menuModal) {
        menuModal.classList.remove('hidden');
        menuModal.style.display = '';
    }
});

bindClick('dim-tab-1', () => {
    game.currentDimensionTab = 1;
    game.currentSectorFilter = 'all';
    populateStageMenu();
});

bindClick('dim-tab-2', () => {
    game.currentDimensionTab = 2;
    game.currentSectorFilter = 'all';
    populateStageMenu();
});

bindClick('btn-main-howtoplay', () => {
    const howModal = document.getElementById('modal-howtoplay');
    if (howModal) {
        howModal.classList.remove('hidden');
        howModal.style.display = '';
    }
});

bindClick('btn-close-howtoplay', () => {
    const howModal = document.getElementById('modal-howtoplay');
    if (howModal) {
        howModal.classList.add('hidden');
        howModal.style.display = 'none';
    }
});

bindClick('btn-howtoplay-confirm', () => {
    const howModal = document.getElementById('modal-howtoplay');
    if (howModal) {
        howModal.classList.add('hidden');
        howModal.style.display = 'none';
    }
    audio.init();
    startLevel(game.currentLevelIdx);
});

bindClick('btn-menu-audio', () => {
    audio.init();
    audio.muted = !audio.muted;
    const menuAudioText = document.getElementById('menu-audio-text');
    const menuAudioIcon = document.getElementById('menu-audio-icon');
    const inGameAudioBtn = document.getElementById('btn-audio');
    if (menuAudioText) menuAudioText.innerText = audio.muted ? "AUDIO: OFF" : "AUDIO: ON";
    if (menuAudioIcon) menuAudioIcon.innerText = audio.muted ? "🔇" : "🔊";
    if (inGameAudioBtn) inGameAudioBtn.innerText = audio.muted ? "🔇 MUTED" : "🔊 SFX";
    if (audio.muted) audio.stopMusic();
    else if (!game.inMainMenu && !game.isPaused) audio.startMusic(game.level.bpm);
});

bindClick('btn-menu', () => {
    setPause(true);
    populateStageMenu();
    const menuModal = document.getElementById('modal-menu');
    if (menuModal) {
        menuModal.classList.remove('hidden');
        menuModal.style.display = '';
    }
});

function closeMenuModal() {
    const menuModal = document.getElementById('modal-menu');
    if (menuModal) {
        menuModal.classList.add('hidden');
        menuModal.style.display = 'none';
    }
    if (!game.inMainMenu) setPause(false);
}
window.closeMenuModal = closeMenuModal;

function closeLeaderboardModal() {
    const lbModal = document.getElementById('modal-leaderboard');
    if (lbModal) {
        lbModal.classList.add('hidden');
        lbModal.style.display = 'none';
    }
    if (game.openedLeaderboardFrom === 'victory') {
        const vicModal = document.getElementById('modal-victory');
        if (vicModal) {
            vicModal.classList.remove('hidden');
            vicModal.style.display = '';
        }
        game.openedLeaderboardFrom = null;
    } else if (game.openedLeaderboardFrom === 'pause') {
        const pauseModal = document.getElementById('modal-pause');
        if (pauseModal) {
            pauseModal.classList.remove('hidden');
            pauseModal.style.display = '';
        }
        game.openedLeaderboardFrom = null;
    } else if (!game.inMainMenu) {
        setPause(false);
    }
}
window.closeLeaderboardModal = closeLeaderboardModal;
window.returnToMainMenu = returnToMainMenu;

bindClick('btn-close-menu', closeMenuModal);

bindClick('btn-menu-back-main', () => {
    closeMenuModal();
    returnToMainMenu();
});

bindClick('btn-daily-open', () => {
    setPause(true);
    populateDailyModal();
    const dailyModal = document.getElementById('modal-daily');
    if (dailyModal) {
        dailyModal.classList.remove('hidden');
        dailyModal.style.display = '';
    }
});

bindClick('btn-close-daily', () => {
    const dailyModal = document.getElementById('modal-daily');
    if (dailyModal) {
        dailyModal.classList.add('hidden');
        dailyModal.style.display = 'none';
    }
    if (!game.inMainMenu) setPause(false);
});

bindClick('btn-leaderboard-open', () => {
    game.openedLeaderboardFrom = 'inGame';
    setPause(true);
    populateLeaderboard(game.currentLevelIdx);
    const lbModal = document.getElementById('modal-leaderboard');
    if (lbModal) {
        lbModal.classList.remove('hidden');
        lbModal.style.display = '';
    }
});

bindClick('btn-close-leaderboard', closeLeaderboardModal);

bindClick('btn-leaderboard-back-main', () => {
    const lbModal = document.getElementById('modal-leaderboard');
    if (lbModal) {
        lbModal.classList.add('hidden');
        lbModal.style.display = 'none';
    }
    returnToMainMenu();
});

const lbModalEl = document.getElementById('modal-leaderboard');
if (lbModalEl) {
    lbModalEl.addEventListener('click', (e) => {
        if (e.target === lbModalEl) closeLeaderboardModal();
    });
}
const menuModalEl = document.getElementById('modal-menu');
if (menuModalEl) {
    menuModalEl.addEventListener('click', (e) => {
        if (e.target === menuModalEl) closeMenuModal();
    });
}

const pauseBtn = document.getElementById('btn-pause');
if (pauseBtn) {
    pauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setPause(!game.isPaused);
    });
    pauseBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
    });
}
bindClick('btn-pause-resume', () => setPause(false));
bindClick('btn-pause-restart', () => {
    setPause(false);
    resetPlayerState();
});

bindClick('btn-pause-stages', () => {
    const pauseModal = document.getElementById('modal-pause');
    if (pauseModal) {
        pauseModal.classList.add('hidden');
        pauseModal.style.display = 'none';
    }
    populateStageMenu();
    const menuModal = document.getElementById('modal-menu');
    if (menuModal) {
        menuModal.classList.remove('hidden');
        menuModal.style.display = '';
    }
});

bindClick('btn-pause-main-menu', () => returnToMainMenu());
bindClick('btn-bot', () => toggleBotDemo());

bindClick('btn-audio', () => {
    audio.init();
    audio.muted = !audio.muted;
    const audioBtn = document.getElementById('btn-audio');
    const menuAudioText = document.getElementById('menu-audio-text');
    const menuAudioIcon = document.getElementById('menu-audio-icon');
    if (audioBtn) audioBtn.innerText = audio.muted ? "🔇 MUTED" : "🔊 SFX";
    if (menuAudioText) menuAudioText.innerText = audio.muted ? "AUDIO: OFF" : "AUDIO: ON";
    if (menuAudioIcon) menuAudioIcon.innerText = audio.muted ? "🔇" : "🔊";
    if (audio.muted) audio.stopMusic();
    else if (!game.inMainMenu && !game.isPaused) audio.startMusic(game.level.bpm);
});

bindClick('btn-victory-main-menu', () => {
    const vicModal = document.getElementById('modal-victory');
    if (vicModal) {
        vicModal.classList.add('hidden');
        vicModal.style.display = 'none';
    }
    returnToMainMenu();
});

bindClick('btn-victory-replay', () => {
    startLevel(game.currentLevelIdx);
});

bindClick('btn-victory-next', () => {
    const nextIdx = (game.currentLevelIdx + 1) % LEVELS.length;
    startLevel(nextIdx);
});

bindClick('btn-victory-ranks', () => {
    game.openedLeaderboardFrom = 'victory';
    const vicModal = document.getElementById('modal-victory');
    if (vicModal) {
        vicModal.classList.add('hidden');
        vicModal.style.display = 'none';
    }
    populateLeaderboard(game.currentLevelIdx);
    const lbModal = document.getElementById('modal-leaderboard');
    if (lbModal) {
        lbModal.classList.remove('hidden');
        lbModal.style.display = '';
    }
});

const skinSelect = document.getElementById('skin-select-dropdown');
if (skinSelect) {
    skinSelect.addEventListener('change', (e) => {
        const selected = e.target.value;
        if (dailySystem.unlockedSkins.has(selected)) {
            dailySystem.activeSkin = selected;
            dailySystem.save();
            populateDailyModal();
            showNotification(`EXOSUIT EQUIPPED: ${getActiveSkinData().name}`);
        }
    });
}

bindClick('btn-claim-daily', () => {
    const reward = dailySystem.claim();
    if (reward) {
        audio.playBoostPad();
        showNotification(`🎁 CLAIMED: ${reward.title} // ${reward.desc}!`);
        populateDailyModal();
    }
});

bindClick('btn-instant-streak-test', () => {
    dailySystem.forceSimulatePassage();
    populateDailyModal();
    showNotification("⏱️ +24H SIMULATED: REWARD IS NOW READY TO CLAIM!");
});

document.querySelectorAll('.sector-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const sector = tab.getAttribute('data-sector');
        game.currentSectorFilter = sector;
        document.querySelectorAll('.sector-tab').forEach(t => {
            t.className = "sector-tab px-2.5 py-1 bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-neutral-300 rounded transition";
        });
        tab.className = "sector-tab px-3 py-1 bg-cyan-950 border border-cyan-500 text-cyan-300 rounded font-bold transition";
        populateStageMenu();
    });
});

document.querySelectorAll('.ability-card').forEach(btn => {
    btn.addEventListener('click', () => {
        const ability = btn.getAttribute('data-ability');
        game.selectedAbility = ability;
        document.querySelectorAll('.ability-card').forEach(c => {
            c.className = "ability-card flex-1 py-1 px-2 bg-neutral-900 border border-neutral-700 rounded flex items-center justify-center gap-1 text-[11px] font-cyber text-neutral-300";
        });
        btn.className = "ability-card flex-1 py-1 px-2 bg-neutral-900 border-2 border-cyan-500 rounded flex items-center justify-center gap-1 text-[11px] font-cyber text-cyan-300";
        updateAbilityHUD();
    });
});

// ============================================================================
// ENDLESS & MULTIPLAYER EVENT LISTENERS
// ============================================================================
bindClick('btn-main-endless', () => {
    startEndlessMode();
});

bindClick('dim-tab-endless', () => {
    const menuModal = document.getElementById('modal-menu');
    if (menuModal) menuModal.classList.add('hidden');
    startEndlessMode();
});

const openMultiplayerModal = () => {
    setPause(true, false);
    const pauseModal = document.getElementById('modal-pause');
    if (pauseModal) {
        pauseModal.classList.add('hidden');
        pauseModal.style.display = 'none';
    }
    if (typeof populateMultiplayerStageSelect === 'function') {
        populateMultiplayerStageSelect();
    }
    const mpModal = document.getElementById('modal-multiplayer');
    if (mpModal) {
        mpModal.classList.remove('hidden');
        mpModal.style.display = '';
    }
    if (typeof MP !== 'undefined' && (!MP.peer || !MP.roomCode)) {
        MP.createRoom();
    }
};

bindClick('btn-main-multiplayer', openMultiplayerModal);
bindClick('btn-multiplayer-open', openMultiplayerModal);

bindClick('btn-close-multiplayer', () => {
    const mpModal = document.getElementById('modal-multiplayer');
    if (mpModal) {
        mpModal.classList.add('hidden');
        mpModal.style.display = 'none';
    }
    if (!game.inMainMenu) setPause(false);
});

bindClick('mp-tab-live', () => {
    const tabLive = document.getElementById('mp-tab-live');
    const tabGhost = document.getElementById('mp-tab-ghost');
    const panelLive = document.getElementById('mp-panel-live');
    const panelGhost = document.getElementById('mp-panel-ghost');
    if (tabLive) tabLive.className = "flex-1 py-1.5 rounded text-xs font-cyber font-bold transition bg-rose-950 text-rose-300 border border-rose-500/70";
    if (tabGhost) tabGhost.className = "flex-1 py-1.5 rounded text-xs font-cyber font-bold transition bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-cyan-500 hover:text-cyan-300";
    if (panelLive) panelLive.classList.remove('hidden');
    if (panelGhost) panelGhost.classList.add('hidden');
});

bindClick('mp-tab-ghost', () => {
    const tabLive = document.getElementById('mp-tab-live');
    const tabGhost = document.getElementById('mp-tab-ghost');
    const panelLive = document.getElementById('mp-panel-live');
    const panelGhost = document.getElementById('mp-panel-ghost');
    if (tabGhost) tabGhost.className = "flex-1 py-1.5 rounded text-xs font-cyber font-bold transition bg-cyan-950 text-cyan-300 border border-cyan-500/70";
    if (tabLive) tabLive.className = "flex-1 py-1.5 rounded text-xs font-cyber font-bold transition bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-rose-500 hover:text-rose-300";
    if (panelLive) panelLive.classList.add('hidden');
    if (panelGhost) panelGhost.classList.remove('hidden');
});

bindClick('btn-mp-host-mode', () => {
    const btnHost = document.getElementById('btn-mp-host-mode');
    const btnJoin = document.getElementById('btn-mp-join-mode');
    const boxHost = document.getElementById('mp-host-box');
    const boxJoin = document.getElementById('mp-join-box');
    if (btnHost) btnHost.className = "py-2 px-3 bg-neutral-950 border border-rose-500 text-rose-300 font-cyber font-bold text-xs rounded transition flex items-center justify-center gap-1.5";
    if (btnJoin) btnJoin.className = "py-2 px-3 bg-neutral-950 border border-neutral-800 text-neutral-400 font-cyber font-bold text-xs rounded transition flex items-center justify-center gap-1.5";
    if (boxHost) boxHost.classList.remove('hidden');
    if (boxJoin) boxJoin.classList.add('hidden');
    if (typeof MP !== 'undefined' && !MP.roomCode) MP.createRoom();
});

bindClick('btn-mp-join-mode', () => {
    const btnHost = document.getElementById('btn-mp-host-mode');
    const btnJoin = document.getElementById('btn-mp-join-mode');
    const boxHost = document.getElementById('mp-host-box');
    const boxJoin = document.getElementById('mp-join-box');
    if (btnJoin) btnJoin.className = "py-2 px-3 bg-neutral-950 border border-rose-500 text-rose-300 font-cyber font-bold text-xs rounded transition flex items-center justify-center gap-1.5";
    if (btnHost) btnHost.className = "py-2 px-3 bg-neutral-950 border border-neutral-800 text-neutral-400 font-cyber font-bold text-xs rounded transition flex items-center justify-center gap-1.5";
    if (boxHost) boxHost.classList.add('hidden');
    if (boxJoin) boxJoin.classList.remove('hidden');
});

bindClick('btn-copy-room-code', () => {
    const code = document.getElementById('mp-room-code');
    if (code && code.innerText && code.innerText !== 'GENERATING...') {
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code.innerText).then(() => {
                showNotification(`📋 ROOM CODE ${code.innerText} COPIED!`);
            });
        } else {
            prompt("Room Code:", code.innerText);
        }
    }
});

bindClick('btn-copy-invite-link', () => {
    if (typeof MP !== 'undefined') {
        MP.copyInviteLink();
    }
});

bindClick('btn-mp-quick-ai', () => {
    const diffEl = document.getElementById('mp-ai-difficulty');
    const diff = diffEl ? diffEl.value : 'EXPERT';
    const stageSelect = document.getElementById('mp-stage-select');
    const stageChoice = (stageSelect && stageSelect.value) ? stageSelect.value : 'RANDOM_ALL';
    if (typeof MP !== 'undefined') {
        MP.startAiRivalMatch(stageChoice, diff);
    }
});

bindClick('btn-mp-spawn-ai-rival', () => {
    if (typeof MP !== 'undefined') {
        MP.spawnPracticeBot();
    }
});

bindClick('btn-mp-start-race', () => {
    if (typeof MP !== 'undefined') {
        MP.hostTriggerStart();
    }
});

bindClick('btn-mp-connect', () => {
    const input = document.getElementById('input-room-code');
    if (input && typeof MP !== 'undefined') {
        MP.joinRoom(input.value);
    }
});

bindClick('btn-load-ghost-challenge', () => {
    const input = document.getElementById('input-ghost-link');
    if (input) loadGhostChallenge(input.value);
});

bindClick('btn-victory-share-ghost', () => {
    exportGhostRun();
});

function handleNextRoundClick() {
    const modal = document.getElementById('modal-race-result');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
    if (typeof MP !== 'undefined') {
        if (game.mpRival && game.mpRival.isAI) {
            MP.hostTriggerStartRound();
        } else if (MP.isHost) {
            MP.hostTriggerStartRound();
        } else {
            MP.sendMsg({ type: 'READY_NEXT_ROUND' });
            showNotification("⏳ WAITING FOR HOST TO START NEXT ROUND...");
        }
    }
}
window.handleNextRoundClick = handleNextRoundClick;
bindClick('btn-next-round', handleNextRoundClick);

function handleRematchVote(vote) {
    if (typeof MP !== 'undefined') {
        MP.castRematchVote(vote);
    }
}
window.handleRematchVote = handleRematchVote;
bindClick('btn-rematch-yes', () => handleRematchVote(true));
bindClick('btn-rematch-no', () => handleRematchVote(false));

function handleRaceAgainClick() {
    handleRematchVote(true);
}
window.handleRaceAgainClick = handleRaceAgainClick;
bindClick('btn-race-again', handleRaceAgainClick);

const hostStageSelect = document.getElementById('mp-stage-select');
if (hostStageSelect) {
    hostStageSelect.addEventListener('change', (e) => {
        const trackChoice = e.target.value;
        if (typeof MP !== 'undefined') {
            MP.series.hostTrack = trackChoice;
            if (MP.connected && (!game.mpRival || !game.mpRival.isAI)) {
                MP.sendMsg({ type: 'HOST_TRACK_CHOICE', trackChoice, trackIdx: trackChoice });
            }
        }
    });
}

const guestStageSelect = document.getElementById('mp-guest-stage-select');
if (guestStageSelect) {
    guestStageSelect.addEventListener('change', (e) => {
        const trackChoice = e.target.value;
        if (typeof MP !== 'undefined') {
            MP.series.guestTrack = trackChoice;
            if (MP.connected) {
                MP.sendMsg({ type: 'GUEST_TRACK_CHOICE', trackChoice, trackIdx: trackChoice });
            }
        }
    });
}

function handleRaceCloseClick() {
    const modal = document.getElementById('modal-race-result');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
    if (typeof MP !== 'undefined') {
        if (MP.connected && (!game.mpRival || !game.mpRival.isAI)) {
            MP.sendMsg({ type: 'PLAYER_LEFT', tag: game.pilotTag });
        }
        MP.connected = false;
        game.isMultiplayer = false;
        game.mpRival = null;
        MP.resetRematch();
    }
    returnToMainMenu();
}
window.handleRaceCloseClick = handleRaceCloseClick;
bindClick('btn-race-close', handleRaceCloseClick);

// ============================================================================
// 14. GAME LOOP & BOOTSTRAP
// ============================================================================
const FIXED_DT = 1 / 120;
function mainLoop(timestamp) {
    if (!game.lastTime) game.lastTime = timestamp;
    const frameDelta = Math.min(0.06, (timestamp - game.lastTime) / 1000);
    game.lastTime = timestamp;
    game.lastFrameDelta = frameDelta;

    if (!game.isPaused && !game.inMainMenu && !game.isCountingDown) {
        game.physicsAccumulator += frameDelta;
        if (game.physicsAccumulator > 0.2) game.physicsAccumulator = 0.2;
        while (game.physicsAccumulator >= FIXED_DT) {
            updatePhysics(FIXED_DT);
            game.physicsAccumulator -= FIXED_DT;
        }
        game.renderAlpha = Math.max(0, Math.min(1, game.physicsAccumulator / FIXED_DT));
    } else {
        game.renderAlpha = 1.0;
    }

    render();
    requestAnimationFrame(mainLoop);
}

window.onload = function() {
    updateCanvasViewport();
    populateStageMenu();
    if (typeof populateMultiplayerStageSelect === 'function') {
        populateMultiplayerStageSelect();
    }
    game.currentLevelIdx = 0;
    game.level = JSON.parse(JSON.stringify(LEVELS[0]));
    resetPlayerState();
    returnToMainMenu();

    if (typeof window !== 'undefined' && window.location && window.location.hash) {
        if (window.location.hash.includes('challenge=')) {
            loadGhostChallenge(window.location.hash);
        } else if (window.location.hash.includes('race=') || window.location.hash.includes('room=')) {
            const match = window.location.hash.match(/(?:race|room)=([A-Za-z0-9]+)/i);
            if (match && match[1]) {
                openMultiplayerModal();
                const btnJoin = document.getElementById('btn-mp-join-mode');
                if (btnJoin) btnJoin.click();
                const input = document.getElementById('input-room-code');
                if (input) input.value = match[1];
                setTimeout(() => {
                    if (typeof MP !== 'undefined') MP.joinRoom(match[1]);
                }, 400);
            }
        }
    }

    requestAnimationFrame(mainLoop);
};
