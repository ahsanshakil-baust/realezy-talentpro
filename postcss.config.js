module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-font-magician': {
      variant: {
        Roboto: {
          300: [],
          400: [],
          500: [],
          700: [],
        },
      },
      foundries: ['google'],
    },
    tailwindcss: {},
    autoprefixer: {},
  },
}
