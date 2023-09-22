/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffafbd',
        secondary: '#c9ffbf',
        tertiary: '#26394d',
      },
      fontFamily: {
        sniglet: ['Sniglet', 'cursive'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
        unbounded: ['Unbounded', 'cursive'],
        'dancing-script': ['Indie Flower', 'cursive'],
      },
      backgroundImage: {
        'gradient-hb': 'linear-gradient(to bottom, #ffafbd, #c9ffbf)',
        serpentine:
          'url("https://res.cloudinary.com/dxbbbewxt/image/upload/v1695152940/images-hb/img-hb_jt1z3f.webp")',
      },
      boxShadow: {
        custom: 'rgb(38, 57, 77) 0px 20px 30px -10px',
      },
    },
  },
  plugins: [],
};
