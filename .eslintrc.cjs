/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', '@vue/eslint-config-airbnb-with-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    camelcase: 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-use-before-define': 'off',
    curly: ['error', 'all'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    '@typescript-eslint/no-duplicate-enum-values': 'off',
  },
  ignorePatterns: [
    // Root
    'node_modules/',
    'dist/',
    // Amplify
    'amplify',
  ],
};
