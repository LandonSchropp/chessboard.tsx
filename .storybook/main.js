// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  stories: [ "../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)" ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: [ "style-loader", "css-loader", "sass-loader" ],
      include: path.resolve(__dirname, "../")
    });
    return config;
  },
  docs: {
    autodocs: true
  }
};
