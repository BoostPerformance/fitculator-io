import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      animation: {
        marquee: 'marquee 120s linear infinite',
        marquee2: 'marquee2 120s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      fontFamily: {
        pretendard: ['var(--pretendard)'],
      },
      colors: {
        blue: {
          DEFAULT: '#EBF8FF',
          1: '#0066FF',
          2: '#00BBF5',
        },
        gray: {
          DEFAULT: '#F2F2F2',
          1: '#625C5C',
          2: '#F9F9F9',
          3: '#D9D9D9',
          4: '#A3AAAD;',
          5: '#5E5A5A',
          6: '#686868',
          7: '#9E9E9E',
          8: '#F6F6F6',
          9: '#E0E0E0',
          10: '#BDBDBD',
        },
      },
    },
    fontSize: {
      '0.625-500': [' 0.625rem', { fontWeight: 500 }],
      '0.875-500': [' 0.875rem', { fontWeight: 500 }],
      '0.875-700': [' 0.875rem', { fontWeight: 700 }],
      '0.7-700': ['0.7rem', { fontWeight: 700 }],
      '0.75-500': ['0.75rem', { fontWeight: 500 }],
      '1-500': ['1rem', { fontWeight: 500 }],
      '1-700': ['1rem', { fontWeight: 700 }],
      '1.125-700': ['1.125rem', { fontWeight: 700 }],
      '1.25-500': ['1.25rem', { fontWeight: 500 }],
      '1.25-700': ['1.125rem', { fontWeight: 700 }],
      '1.25-900': ['1.125rem', { fontWeight: 900 }],
      '1.5-500': ['1.5rem', { fontWeight: 500 }],
      '1.5-700': ['1.5rem', { fontWeight: 700 }],
      '1.5-900': ['1.5rem', { fontWeight: 900 }],
      '1.6-700': ['1.6rem', { fontWeight: 700 }],
      '1.75-500': ['1.75rem', { fontWeight: 500 }],
      '1.75-700': ['1.75rem', { fontWeight: 700 }],
      '1.75-900': ['1.75rem', { fontWeight: 900 }],
      '2-700': ['2rem', { fontWeight: 700 }],
      '2-900': ['2rem', { fontWeight: 900 }],
      '2.5-700': ['2.5rem', { fontWeight: 700 }],
      '2.5-900': ['2.5rem', { fontWeight: 900 }],
      '3-700': ['3rem', { fontWeight: 700 }],
      '3.7-900': ['3.7rem', { fontWeight: 900 }],
    },
    screens: {
      md: { max: '1024px' },
      sm: { max: '768px' },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
