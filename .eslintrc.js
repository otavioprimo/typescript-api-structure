module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  plugins: ["@typescript-eslint", "mocha"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:mocha/recommended",
    "airbnb-base"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    "class-methods-use-this": 0,
    "no-extra-semi": 0,
    semi: 0,
    'refer-destructuring': 0
  }
};
