/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        'primary-1': 'var(--primary-1)',
        'primary-2': 'var(--primary-2)',
        'primary-3': 'var(--primary-3)',
        'primary-4': 'var(--primary-4)',
        'primary-5': 'var(--primary-5)',
        'primary-6': 'var(--primary-6)',
        'primary-7': 'var(--primary-7)',
      },
    },
  },
  plugins: [],
}

