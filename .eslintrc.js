module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: 'standard',
  rules: {
    'space-before-function-paren': 0
  },
  globals: {
    '__DEV__': true,
    'module': true
  }
}
