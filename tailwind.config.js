/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#efeee9',
      },
      fontFamily: {
        prompt: ['"Prompt"', 'sans-serif'],
        thai: ['"Prompt"', '"IBM Plex Sans Thai"', '"Noto Sans Thai"', 'sans-serif'],
        inter: ['"Inter"', '"Helvetica Neue ME"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        hn: ['"Helvetica Neue ME"', '"Prompt"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['"Prompt"', '"Inter"', '"IBM Plex Sans Thai"', 'sans-serif'],
        serif: ['"Helvetica Neue ME"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
