module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    module: 'readonly',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx', '.ts'] },
    ],
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'all', argsIgnorePattern: '^_' },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
