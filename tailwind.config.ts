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
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        blue: {
          DEFAULT: '#E4EFF5',
        },
        gray: {
          DEFAULT: '#F2F2F2',
          1: '#625C5C',
        },
      },
    },
    fontSize: {
      '1.25-500': ['1.25', { fontWeight: 500 }],

      '1.75-500': ['1.75rem', { fontWeight: 500 }],
      '1.75-700': ['1.75rem', { fontWeight: 700 }],

      '2-700': ['2rem', { fontWeight: 700 }],

      '2.5-700': ['2.5rem', { fontWeight: 700 }],
      '2.5-900': ['2.5rem', { fontWeight: 900 }],

      '1.6-700': ['1.6rem', { fontWeight: 700 }],
    },
    screens: {
      mac: { max: '2300px' },
      md: { max: '1199px' },
      sm: { max: '743px' },
    },
  },
  plugins: [],
};
export default config;
