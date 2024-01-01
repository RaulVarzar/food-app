module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '101': '1.01',
        '103': '1.03',
        '98': '0.98'
      },
      height:{
        'svh':'100svh'
      },
      screens: { // remove hover on mobile
        'betterhover': {'raw': '(hover: hover)'},
    }
    }
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ["sunset", "dark", "black", "night", "dracula", "coffee"],
  },
  // daisyui: {
  //   themes: [
  //     {
  //       black: {
  //         ...require("daisyui/src/theming/themes")["[data-theme=black]"],
  //         "primary-content": "#141110",
  //         "neutral-content": "#1C1817",
  //         "neutral": "#101010",
  //         "accent":"#C18C5D",
  //         "base-100": "#080808",
  //         "secondary": "#255957"
  //       }
  //     },
      
  //   ],
  // }
}