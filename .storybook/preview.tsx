import { Decorator, Parameters } from "@storybook/react";
import React from "react";

import { SVG_BOARD_SIZE } from "../src/constants";

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },

  // Add viewport sizes that make more sense for a chessboard.
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

export const decorators: Decorator[] = [
  (Story) => {
    return <svg viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }>
      <Story />
    </svg>;
  }
];
