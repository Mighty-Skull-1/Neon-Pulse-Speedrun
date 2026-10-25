// Tailwind is pre-built into vendor/tailwind.css so the game works offline.
// After adding new Tailwind classes to index.html or game.js, run:  npm run build:css
module.exports = {
    content: ['./index.html', './game.js'],
    theme: { extend: {} },
    plugins: []
};
