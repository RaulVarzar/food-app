module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      scale: {
        101: '1.01',
        103: '1.03',
        98: '0.98',
      },
      height: {
        svh: '100svh',
      },
      screens: {
        // remove hover on mobile
        betterhover: { raw: '(hover: hover)' },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['sunset', 'dark', 'black', 'night', 'dracula', 'coffee'],
  },
  daisyui: {
    themes: [
      {
        black: {
          ...require('daisyui/src/theming/themes')['[data-theme=black]'],
          'primary-content': '#1b1818',
          neutral: '#303940',
          accent: '#C18C5D',
          'base-100': '#191615',
          'base-300': '#0d0b0a',
          secondary: '#807572',
        },
        // black: {
        //   ...require('daisyui/src/theming/themes')['[data-theme=black]'],
        //   'primary-content': '#252220',
        //   neutral: '#252930',
        //   accent: '#C18C5D',
        //   'base-100': '#191715',
        //   secondary: '#255957',
        // },
      },
    ],
  },
};
