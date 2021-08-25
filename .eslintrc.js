module.exports = {
  parser: 'babel-eslint',
  extends: 'yoctol',
  env: {
    node: true,
    jest: true,
    browser: true,
  },
  rules: {
    'react/sort-prop-types': 'off',
  },
};
