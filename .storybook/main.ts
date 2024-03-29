import type { StorybookConfig } from "@storybook/react-webpack5";
import { resolve } from "path";

const mainConfiguration: StorybookConfig = {
  stories: [ "../stories/**/*.stories.@(mdx|js|jsx|ts|tsx)" ],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        viewport: false,
        measure: false,
        outline: false
      }
    },
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async config => {
    config.module!.rules!.push({
      test: /\.s[ac]ss$/,
      use: [ "style-loader", "css-loader", "sass-loader" ],
      include: resolve(__dirname, "../")
    });
    return config;
  },
  docs: {
    autodocs: true
  }
};

export default mainConfiguration;
