/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'base': 'var(--font-size)',
        'sm': 'calc(var(--font-size) * 0.875)',
        'lg': 'calc(var(--font-size) * 1.125)',
        'xl': 'calc(var(--font-size) * 1.25)',
        '2xl': 'calc(var(--font-size) * 1.5)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
