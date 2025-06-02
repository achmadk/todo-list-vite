/** @type {import('postcss').Postcss} */
// eslint-disable-next-line no-undef
export default {
  plugins: {
    // 'postcss-import': {},
    // 'tailwindcss/nesting': {},
    '@tailwindcss/postcss': {},
    'postcss-lightningcss': {
      browsers: '>= .25%'
    },
    // eslint-disable-next-line no-undef
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}
