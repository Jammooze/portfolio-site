/* eslint-disable prettier/prettier */
module.exports = {
  extends: ["eslint:recommended", "next", "turbo", "prettier", "google"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "object-curly-spacing": "off",
    "quotes": ["error", "double"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "require-jsdoc": "off",
    "new-cap": "off",
    "indent": "off",
    "linebreak-style": 0,
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  plugins: ["eslint-plugin-prettier"],
};
