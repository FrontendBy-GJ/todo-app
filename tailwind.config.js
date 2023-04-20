/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      josefin: ['Josefin Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: 'hsl(220, 98%, 61%)',
        gradient1: 'hsl(192, 100%, 67%)',
        gradient2: 'hsl(280, 87%, 65%)',
        lightTheme: {
          50: 'hsl(0, 0%, 98%)',
          100: 'hsl(236, 33%, 92%)',
          200: 'hsl(233, 11%, 84%)',
          300: 'hsl(236, 9%, 61%)',
          400: 'hsl(235, 19%, 35%)',
        },
        darkTheme: {
          50: 'hsl(234, 39%, 85%)',
          100: 'hsl(234, 11%, 52%)',
          200: 'hsl(233, 14%, 35%)',
          300: 'hsl(237, 14%, 26%)',
          400: 'hsl(235, 24%, 19%)',
          500: 'hsl(235, 21%, 11%)',
        },
      },
      backgroundImage: {
        'mobile-light': "url('./assets/bg-mobile-light.jpg')",
      },
    },
  },
  plugins: [],
};
