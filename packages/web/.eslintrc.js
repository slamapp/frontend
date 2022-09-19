module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "react/display-name": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
  },
}
