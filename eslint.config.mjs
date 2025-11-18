import daStyle from "eslint-config-dicodingacademy";

export default [
  daStyle,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: true,
        document: true,
      },
    },
    rules: {
      quotes: ["off"],
      "linebreak-style": ["off"],
    },
  },
];
