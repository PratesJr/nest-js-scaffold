module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-multi-spaces': ['warn'],
    semi: ['error', 'always'],
    'space-before-blocks': ['warn', 'always'],
    'block-spacing': ['warn', 'always'],
    'no-plusplus': ['warn'],
    'no-return-await': ['error'],
    'no-unused-vars': ['warn'],
    'no-empty-function': ['error'],
    'no-eq-null': ['error'],
    'no-console': ['warn'],
    eqeqeq: ['error', 'always'],
    camelcase: 'error',
    'for-direction': 'error',
    'no-const-assign': 'error',
    'no-irregular-whitespace': ['warn', { skipComments: true }],
  },
};
