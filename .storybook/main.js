const path = require("path");

module.exports = {
  core: {
    builder: "webpack5"
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: [ "style-loader", "css-loader", "sass-loader" ],
      include: path.resolve(__dirname, "../")
    });
    return config;
  }
};
