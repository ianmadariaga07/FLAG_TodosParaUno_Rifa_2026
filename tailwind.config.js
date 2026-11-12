/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueberry: '#4187fb',
        jaffa: '#ee7d31',
        maize: '#fde85f',
        magenta: '#f25fd0',
        offwhite: '#f8f8f6',
        powder: '#e3edfe',
        flagNavy: '#1a2542',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}