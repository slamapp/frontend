module.exports = {
  ...require('@slamapp/eslint/next.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}
