/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Base colors
        'graphite': '#121212',
        'black': '#000000',
        'dark-grey': '#1a1a1a',
        'off-white': '#f0f0f0',
        
        // Gawx accent palette (for interactions only)
        'cyber-cyan': '#00f3ff',
        'error-red': '#ff0055',
        'acid-lime': '#ccff00',
        'orange-gold': '#ff9500',
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        // Hard shadow utilities (Neo-brutalism)
        'hard-sm': '2px 2px 0px #000',
        'hard': '4px 4px 0px #000',
        'hard-lg': '6px 6px 0px #000',
        'hard-xl': '8px 8px 0px #000',
        
        // Colored hard shadows for accent states
        'hard-cyan': '4px 4px 0px #00f3ff',
        'hard-red': '4px 4px 0px #ff0055',
        'hard-lime': '4px 4px 0px #ccff00',
        
        // Collapsed state (for active buttons)
        'hard-collapsed': '0px 0px 0px #000',
      },
      borderWidth: {
        'brutal': '2px',
        'brutal-lg': '4px',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
}
