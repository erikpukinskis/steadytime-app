module.exports = {
  "root": true,
  "plugins": [
    "import",
    "@typescript-eslint",
    "unused-imports"
  ],
  "ignorePatterns": [
    "*.js"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "warnOnUnsupportedTypeScriptVersion": false,
    "project": [
      "./tsconfig.json"
    ],
  },
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        "prefer": "type-imports",
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "args": "none",
        "varsIgnorePattern": "^_+$",
        "ignoreRestSiblings": true,
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "semi": [
      "error",
      "never"
    ],
    "react/prop-types": [
      "off"
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false,
        },
      },
    ],
    "react/react-in-jsx-scope": "off",
    "eol-last": [
      "error",
      "always"
    ],
    "array-element-newline": [
      "off"
    ],
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true,
        },
        "newlines-between": "never",
      },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          ".."
        ],
      },
    ],
    "@typescript-eslint/restrict-template-expressions": "off"
  },
}