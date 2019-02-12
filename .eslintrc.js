module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "mocha": true
  },
  "plugins": ["mocha"], "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "sourceType": "module",
    ecmaVersion: 6,
    ecmaFeatures:
      {
        jsx: true,
        spread: true,
        "experimentalObjectRestSpread": true
      }
  },
  "rules":
    {
      "indent":
        [
          "error",
          2
        ],
      "quotes":
        [
          "error",
          "single"
        ],
      "semi":
        [
          "error",
          "always"
        ]
    }
}
;
