module.exports = {
  '*.js': ['eslint --fix'],
  '*.md': ['prettier --write'],
  '*package.json': ['prettier-package-json --write'],
};
