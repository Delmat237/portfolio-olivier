/** @type {import('eslint').Linter.Config} */
const config = {
  extends: 'next',
  ignorePatterns: ['src/generated/'],
};

module.exports = config;
