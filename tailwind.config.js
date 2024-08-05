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
        'light-violet': '#393f6e',
        violet: '#343964',
        gray: '#e2e4f3',
        'dark-gray': '#8b8eab',
        'light-blue': '#3e9fff',
        red: '#dd524c',
        skin: '#ffecc8',
      },
    },
  },
  plugins: [],
};
