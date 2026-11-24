import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#160816', soft: '#2A1024' },
        mist: '#2A142C',
        line: '#6A3058',
        accent: { DEFAULT: '#FF2E97', dark: '#D4146E' },
      },
      boxShadow: {
        card: '0 18px 50px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 70, 160, 0.16)',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
