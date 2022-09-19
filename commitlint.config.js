const commitizenConfig = require("./.cz-config")

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      commitizenConfig.types.map(({ value }) => value),
    ],
    "type-case": [2, "always", "lower-case"],
    "scope-empty": [2, "never"],
  },
}
