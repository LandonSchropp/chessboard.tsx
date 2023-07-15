import { StoryObj } from "@storybook/react";

import { Coordinates as CoordinatesComponent } from "../src/components/coordinates";
import { BLACK, WHITE } from "../src/constants";
import { SVGBoardDecorator } from "./decorators/svg-decorators";

export default {
  title: "Internal/Coordinates",
  component: CoordinatesComponent,
  decorators: [ SVGBoardDecorator ]
};

/**
 * The coordinates from white's perspective.
 */
export const WhiteCoordinates: StoryObj<typeof CoordinatesComponent> = {
  args: {
    orientation: WHITE
  }
};

/**
 * The coordinates from black's perspective.
 */
export const BlackCoordinates: StoryObj<typeof CoordinatesComponent> = {
  args: {
    orientation: BLACK
  }
};
