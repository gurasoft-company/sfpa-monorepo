import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sfpa: {
          olive: '#6B8E23',
          terra: '#C46A4A',
          ocre: '#D9A441',
          bleu: '#2A6F97',
          sable: '#F5E9D6',
          anthracite: '#2B2B2B',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config