import { Decorator, Parameters } from "@storybook/react";
import React from "react";

import { SVG_BOARD_SIZE } from "../src/constants";

export const parameters: Parameters = {
  // Assume anything that begins with "on" is an action.
  actions: { argTypesRegex: "^on[A-Z].*" },

  // Make the chessboard stories take up the full width of the screen.
  layout: "fullscreen",

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
  },

  backgrounds: {
    grid: {
      cellAmount: 4
    }
  }
};

// Enable the grid by default.
export const globals = {
  backgrounds: {
    grid: true
  }
};

export const decorators: Decorator[] = [
  (Story) => {
    return <svg viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }>
      <Story />
    </svg>;
  }
];
