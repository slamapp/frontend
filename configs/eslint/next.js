module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['next', 'airbnb', 'airbnb-typescript', 'plugin:import/recommended', 'plugin:import/typescript', 'prettier'],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': { typescript: { alwaysTryTypes: true, project: ['apps/*/tsconfig.json'] } },
  },
  rules: {
    'class-methods-use-this': ['warn'],
    'no-param-reassign': ['warn'],
    'prettier/prettier': ['error'],
    'no-nested-ternary': ['off'],
    'consistent-return': ['off'],
    'arrow-body-style': ['off'],
    'prefer-arrow-callback': ['off'],
    'jsx-a11y/click-events-have-key-events': ['warn'],
    'jsx-a11y/no-static-element-interactions': ['warn'],
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'react/jsx-no-constructed-context-values': ['warn'],
    'react/jsx-props-no-spreading': ['off'],
    'react/destructuring-assignment': ['off'],
    'react/state-in-constructor': ['off'],
    'react/require-default-props': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-no-useless-fragment': ['off'],
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/no-unstable-nested-components': ['off'],
    'react/prop-types': ['off'],
    'react/no-array-index-key': ['warn'],
    'import/prefer-default-export': ['off'],
    'import/no-cycle': ['warn'],
    '@typescript-eslint/no-shadow': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/display-name': ['error'],
    '@next/next/no-html-link-for-pages': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@chakra-ui/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@emotion/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'next', 'next/**', '@emotion/**'],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules', 'public', 'styles', '.next', 'coverage', 'dist', '.turbo'],
}
