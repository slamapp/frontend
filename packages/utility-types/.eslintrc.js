module.exports = {
  ...require('@slam/eslint/common.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}
