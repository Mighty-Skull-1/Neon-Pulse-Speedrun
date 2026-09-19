# ⚡ NEON PULSE: PRECISION SPEEDRUN EDITION

[![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-Synthesizer-68217A?logo=audiomack&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![WebRTC Multiplayer](https://img.shields.io/badge/WebRTC-1v1%20Live%20Rival-009688?logo=webrtc&logoColor=white)](https://webrtc.org/)
[![Pure Vanilla JS](https://img.shields.io/badge/Pure%20Vanilla%20JS-Zero%20Dependencies-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Neon Pulse** is a high-octane, neon-drenched precision platformer and speedrun racing game built entirely in pure vanilla JavaScript and HTML5 Canvas. Experience fluid sub-frame acrobatic physics, a collective 3-ability exosuit matrix, 20 curated campaign stages spanning two dimensions, an infinite procedural marathon mode, and real-time 1v1 WebRTC multiplayer racing.

---

## 🎮 Key Features

### 🌌 20 Curated Stages Across 2 Dimensions
- **Dimension 1 (Stages 1–10)**: *Highline Metropolis, Kinetic Labs, Quantum Core, Synthwave Skyway, Apex Demons*. Pure precision speedrun platforming with speed booster pads, kinetic jump pads, laser vaults, and geometry gravity rings.
- **Dimension 2 (Stages 11–20)**: *Cosmic Gateway, Astral Abyss, Event Horizon, Quantum Fracture, Singularity Core*. Advanced objective mechanics including:
  - 🕒 **Chrono Collapse**: Race against an aggressive countdown timer by snatching Chrono Orbs.
  - ⚡ **Speed Lock**: Keep speed above 380 px/s or face catastrophic overload.
  - 🏃 **Pacifist Slide**: Clear tight laser corridors without jumping.
  - 🛸 **Zero-G Float**: Altered gravity with multi-jump thrusters.
  - 👾 **Sentinel Pursuit**: Outrun a lethal hyper-velocity death wall.
  - 🔄 **Polarity Acrobatics**: Blue Geometry Dash gravity inversion orbs.
  - 🌀 **The Omni-Rift**: The ultimate 20th stage grand finale combining all mechanics simultaneously.

---

### ⚡ Collective Exosuit Ability Matrix
Master three abilities equipped simultaneously with independent real-time cooldowns:
- **Phase Dash `[SHIFT]`**: Instant forward teleport with 0.24s invulnerability to phase through spikes and laser barriers.
- **Thruster Burst `[E]`**: High-impulse vertical thruster launch for emergency chasm recovery and height scaling.
- **Chrono Pulse `[Q / F]`**: Temporal slowdown matrix (0.45x time dilation) for frame-perfect hazard threading. Cooldowns recover in real-time even during slow motion.

---

### 🏃 Endless Cyber Marathon Mode
- Procedural endless runner powered by 8 hand-tuned chunk architectures (*Cyber Highway, Laser Corridor, Chasm Leap, Gravity Flux Rift, Multi-Tiered Runway, Phase Barrier Vault, Trampoline Skyway, Quantum Overclock*).
- **Flat-Memory Entity Recycling**: Automatically prunes distant off-screen platforms and hazards to maintain a fixed memory footprint.
- **Dimension Shifts**: Screen-shattering chromatic warps trigger dynamically every 1,000 meters, rotating audio tempos and visual dimensions.
- **NaN-Proof Physics Shield**: Hard-sanitized physics vectors preventing coordinate drift or rendering detachment.

---

### 🌐 Live 1v1 WebRTC Multiplayer & Ghost Challenge Links
- **Peer-to-Peer 1v1 Racing**: Host or join private multiplayer lobbies using 4-character room codes. Synchronizes rival positions at 30Hz with smooth Hermite interpolation and a live ahead/behind distance delta badge.
- **Shareable Ghost Challenge URLs**: Exports 15Hz replay recordings into base64 challenge URLs. Share run replay links with friends to race against their translucent hologram ghosts.

---

### 🎨 Acrobatic Articulation & Exosuit Customization
- **Full Kinetic Skeleton**: Procedurally animated running limbs, slide compression, variable Celeste-style jump curve, and gravity flips.
- **7 Unlockable Exosuits**: *Cyber Cyan, Phantom Violet, Neo Emerald, Solar Flare, Blood Crimson, Glitch Shifter*, and *Apex Champion* (with animated golden royal crown).
- **Dynamic Synth Engine**: Procedural Web Audio API synthesizer generating responsive beats, jump chords, laser swooshes, and ring resonance.

---

## 🕹️ Controls

| Action | Primary Key | Alternative |
|---|---|---|
| **Jump / Double Jump** | `[SPACE]` | `[W]` / `[UP]` / `[CLICK]` |
| **Slide / Air Dive** | `[S]` | `[DOWN]` |
| **Phase Dash** | `[SHIFT]` | — |
| **Thruster Burst** | `[E]` | — |
| **Chrono Pulse** | `[Q]` | `[F]` |
| **Toggle Autonomous Bot Demo** | `[B]` | Click `DEMO` |
| **Pause / Resume** | `[ESC]` | `[P]` |

---

## 🚀 Quick Start / Local Play

Neon Pulse requires **zero build steps** and **zero dependencies**. It runs natively in any modern web browser.

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Mighty-Skull-1/Neon-Pulse-Speedrun.git
   ```
2. **Open the game**:
   - Double-click `index.html` to open it directly in your browser, or
   - Serve via any local HTTP server (required for WebRTC multiplayer):
     ```bash
     npx serve .
     # or
     python -m http.server 8080
     ```
3. Navigate to `http://localhost:8080` and start running!

---

## 🧪 Architecture & Tech Stack

- **Graphics**: Hardware-accelerated HTML5 2D Canvas with sub-frame render state interpolation (`renderX`, `renderY`).
- **Physics**: Discrete fixed-timestep Euler integrator with coyote time (120ms) and Celeste-style jump buffering (160ms).
- **Audio**: Web Audio API Procedural Synthesizer (sine, square, sawtooth, and noise oscillators with dynamic envelope filtering).
- **Network**: WebRTC DataChannels via PeerJS for peer-to-peer telemetry and zero-server latency.
- **Styling**: Tailwind CSS CDN + custom glassmorphic cybernetic CSS filters and glow animations.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
