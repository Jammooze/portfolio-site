module.exports = {
  extends: ["eslint:recommended", "next", "turbo", "prettier", "google"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "object-curly-spacing": "off",
    "quotes": ["error", "double"],
    "prettier/prettier": ["error", {endOfLine: "auto"}],
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
