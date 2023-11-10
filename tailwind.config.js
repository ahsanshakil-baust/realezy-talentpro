module.exports = {
  import: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    screens: {
      xs: '320px',
      //   xs: '375px',
      // => @media (min-width: 320px) { ... }
      sm: '768px',
      //   sm: '540px',
      //   sm: '600px',
      // => @media (min-width: 576px) { ... }
      md: '1024px',
      //   md: '900px',
      //   md: '720px',
      // => @media (min-width: 768px) { ... }
      lg: '1280px',
      //   lg: '1200px',
      //   lg: '960px',
      // => @media (min-width: 992px) { ... }
      xl: '1536px',
      //   xl: '1536px',
      //   xl: '1140px',
      sxl: '1360px',
      // => @media (min-width: 1200px) { ... }
      '2xl': '1920px',
      //   '2xl': '1320px',
      // => @media (min-width: 1400px) { ... }
    },
    fontFamily: {
      sans: ['Arial', 'sans-serif'],
      segoe: ['"Segoe UI"', 'sans-serif'],
      serif: ['Garamond', 'serif'],
      // roboto: ['"Roboto"', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        22: ['1.375rem', '1.6875rem'], // [fontSize, lineHeight]
        17: ['1.1rem', '1.8rem'], // [fontSize, lineHeight]
      },
      colors: {
        black: '#212b36',
        dark: '#090E34',
        'dark-700': '#090e34b3',
        primary: '#034EA1',
        secondary: '#00adee',
        primaryTheme: '#034EA1',
        secondaryTheme: '#00adee',
        'body-color': '#637381',
        warning: '#FBBF24',
        district: '#9AB8D9',
        common: '#A1A1A1',
        mrtStation: '#6C2E96',
        detailsCard: '#F1F7FF',
        textColor: '#7A7A7A',
        textValueColor: '#202020',
        optionColor: '#959FA1',
        davysGrey: '#505050',
        darkBlue: '#0354a6',
        lavender: '#E9EFFF',
        battleshipGray: '#8B8B8B',
        forestGreen: '#059400',
        gamboge: '#E99400',
        uranianBlue: '#B1D6FF',
        royalPurple: '#7B549B',
        earthYellow: '#D9A85B',
        blueGray: '#6495CC',
        battleshipGrayLight: '#999999',
        dangerRed: '#E21B1B',
        antiFlashWhite: '#F8FBFF',
      },
      boxShadow: {
        input: '0px 7px 20px rgba(0, 0, 0, 0.03)',
        pricing: '0px 39px 23px -27px rgba(0, 0, 0, 0.04)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
        testimonial: '0px 60px 120px -20px #EBEFFD',
        navigator: '0px 2px 10px #00000029',
      },
      backgroundColor: {
        downloadApp: 'transparent linear-gradient(107deg, #000000 0%, #034EA1 100%) 0% 0% no-repeat padding-box',
      },
      backgroundImage: {
        'android-app': "url('/download/google-play-store.png')",
        'ios-app': "url('/download/google-play-store.png')",
        radial: 'radial-gradient(at top right, rgba(212, 232, 255, 1) 0%, rgba(248, 251, 255, 1) 60%)',
        allianz: "url('/download/allianz-bk-new.png')",
        lch: "url('/download/lch-logo-new.png')",
        aardvark: "url('/download/aardvark-logo.png')",
      },
      margin: {
        navbar: '100px',
      },

      skew: {
        30: '30deg',
        34: '34deg',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('tw-elements/dist/plugin.cjs')],
  corePlugins: {
    preflight: false,
  },
}
