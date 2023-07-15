import { Square } from "../src/components/square";
import { WHITE } from "../src/constants";
import { SVGSquareDecorator } from "./decorators/svg-decorators";

export default {
  title: "Internal/Square",
  component: Square,
  decorators: [ SVGSquareDecorator ]
};

/**
 * A light square.
 */
export const LightSquare = {
  args: {
    square: "b1",
    orientation: WHITE
  }
};

/**
 * A dark square.
 */
export const DarkSquare = {
  args: {
    square: "a1",
    orientation: WHITE
  }
};
