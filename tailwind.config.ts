import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0E1C36', soft: '#17315C' },
        mist: '#F4F7FB',
        line: '#E3E8F0',
        accent: { DEFAULT: '#1C6AE4', dark: '#124EAB' },
      },
      boxShadow: {
        card: '0 16px 40px rgba(14, 28, 54, 0.08)',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
