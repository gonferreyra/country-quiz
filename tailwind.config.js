/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Be Vietnam Pro, sans-serif',
    },
    extend: {
      backgroundImage: {
        'bg-image': 'url("/bg.jpg")',
      },
      colors: {
        lightViolet: '#393f6e',
        violet: '#343964',
        gray: '#e2e4f3',
        darkGray: '#8b8eab',
        lightBlue: '#3e9fff',
        red: '#dd524c',
        skin: '#ffecc8',
        gradient1: '#e65895',
        gradient2: '#bc6be8',
      },
    },
  },
  plugins: [],
};
