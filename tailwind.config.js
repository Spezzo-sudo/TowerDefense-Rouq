/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-magenta': '#ff00ff',
        'neon-pink': '#ff0080',
        'neon-blue': '#0088ff',
        'neon-green': '#00ff00',
        'neon-orange': '#ff6600',
        'bg-dark': '#0a0e27',
        'bg-darker': '#050810',
        'ui-text': '#00ffff',
        'ui-text-dim': '#0088aa',
        'hp-health': '#ff0044',
        'hp-armor': '#ffaa00',
        'hp-shield': '#0088ff',
      },
      fontFamily: {
        'mono': ['Courier New', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
}
