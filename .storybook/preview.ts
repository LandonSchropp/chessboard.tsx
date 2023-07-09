import { Parameters } from "@storybook/react";

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      small: {
        name: "Small",
        styles: {
          width: "320px",
          height: "320px"
        }
      },
      medium: {
        name: "Medium",
        styles: {
          width: "640px",
          height: "640px"
        }
      },
      large: {
        name: "Large",
        styles: {
          width: "100%",
          aspectRatio: 1
        }
      }
    },
    defaultViewport: "medium"
  }
};
