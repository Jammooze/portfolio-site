module.exports = {
  extends: ["eslint:recommended", "next", "turbo", "prettier", "google"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "object-curly-spacing": "off",
    // eslint-disable-next-line prettier/prettier
    "quotes": ["error", "double"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "require-jsdoc": "off",
    "new-cap": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  plugins: ["eslint-plugin-prettier"],
};
