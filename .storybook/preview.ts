import { Parameters } from "@storybook/react";

export const parameters: Parameters = {
  // Assume anything that begins with "on" is an action.
  actions: { argTypesRegex: "^on[A-Z].*" },

  // Make the chessboard stories take up the full width of the screen.
  layout: "fullscreen",

  // Disable the grid
  backgrounds: {
    default: "dark",
    grid: {
      disable: true
    }
  }
};
