module.exports = {
  extends: ["eslint:recommended", "next", "turbo", "prettier", "google"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "quotes": ["error", "double"],
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
