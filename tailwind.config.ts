import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Faustina', 'serif']
      }
    }
  },
  plugins: [require('@tailwindcss/postcss')]
} satisfies Config
