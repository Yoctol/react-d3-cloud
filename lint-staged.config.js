module.exports = {
  '*package.json': ['prettier-package-json --write'],
  '*.(js|ts)': ['eslint --fix'],
  '*.(md|json|yml)': ['prettier --write'],
};
