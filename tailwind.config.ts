import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F8F9FF',
          surface: '#FFFFFF',
          glass: 'rgba(255,255,255,0.6)',
        },
        accent: {
          primary: '#4F46E5',
          electric: '#6EE7F7',
          lime: '#A3E635',
          amber: '#FBBF24',
          coral: '#F87171',
          violet: '#8B5CF6',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        brand: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        button: '12px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(79,70,229,0.12)',
        glow: '0 0 0 2px #4F46E5',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        content: '1280px',
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
