import { Squares as SquaresComponent } from "../src/components/squares";
import { WHITE } from "../src/constants";
import { SVGBoardDecorator } from "./decorators/svg-decorators";

export default {
  title: "Internal/Squares",
  component: SquaresComponent,
  decorators: [ SVGBoardDecorator ]
};

export const Squares = {
  args: {
    orientation: WHITE
  }
};
