module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    stylelint: {
      configFile: 'stylelint.config.js',
    },
    'postcss-extend': {},
    'postcss-preset-env': {},
    'postcss-nested': {},
    autoprefixer: {},
    'postcss-reporter': {},
  },
}
