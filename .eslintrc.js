module.exports = {
  'root': true,
  extends: 'standard',
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  plugins: [
    'html'
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  'rules': {
    'no-undef': 0,
    'no-unused-vars': 1,
    'no-new': 0,
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
