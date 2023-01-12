module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [ "@typescript-eslint" ],
  extends: [
    "plugin:storybook/recommended",
    "@landonschropp",
    "@landonschropp/react",
    "plugin:@typescript-eslint/recommended"
  ],
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  ignorePatterns: [ "types", "dist", "!.storybook" ],
  rules: {
    "react/default-props-match-prop-types": "off",

    // TODO: Make sure the  no-global-assign and no-shadow-restricted-names rules are set at the top
    // level so undefined can't be set.
    "no-undefined": "off",

    // TODO: Determine if my code should be updated and this rule should be turned back on.
    "react/jsx-no-bind": [ "warn", { allowFunctions: true, allowArrowFunctions: true } ],

    // Use the TypeScript version of this rule instead.
    "no-extra-parens": "off",
    "@typescript-eslint/no-extra-parens": "warn",

    // This is handled automatically by the custom observer component.
    "react/display-name": "off",

    // These should be used sparingly, but there are times where a non-null assertion is handy.
    "@typescript-eslint/no-non-null-assertion": "off",

    // Useless returns are sometimes required to ensure components have the correct return type.
    "react/jsx-no-useless-fragment": "off",

    // React does *not* need to be in scope in Next.js projects.
    "react/react-in-jsx-scope": "off",

    // This rule is trigger happy in Next.js API requests that read from the session.
    "require-atomic-updates": "off",

    // Turn off the annoying end of file newline rule added by Storybook.
    "eol-last": "off"
  }
};
