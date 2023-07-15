import { Decorator } from "@storybook/react";
import React from "react";

import { Square } from "../../src/components/square";
import { Squares } from "../../src/components/squares";
import { SVG_BOARD_SIZE, SVG_SQUARE_SIZE, WHITE } from "../../src/constants";
import { squareToSVGCoordinates } from "../../src/utilities/svg";

export const SVGBoardDecorator: Decorator = (Story) => {
  return <div className="svg-board-decorator">
    <svg viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }>
      <Squares orientation={ WHITE } />
      <Story />
    </svg>
  </div>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function recursivelyFindArgument(key: string, args: Record<string, any>) {
  for (const argKey in args) {
    if (argKey === key) {
      return args[argKey];
    }
  }

  for (const argKey in args) {
    if (typeof args[argKey] === "object") {
      return recursivelyFindArgument(key, args[argKey]);
    }
  }
}

export const SVGSquareDecorator: Decorator = (Story, context) => {
  const { args } = context;

  const orientation = recursivelyFindArgument("orientation", args);
  const square = recursivelyFindArgument("square", args);

  if (!orientation || !square) {
    throw new Error(
      "SVGSquareDecorator must be used with a story that has both an 'orientation' and 'square' "
        + `argument! The included arguments were:\n${ JSON.stringify(args, null, 2) }`
    );
  }

  const [ x, y ] = squareToSVGCoordinates(square, orientation);

  return <div className="svg-square-decorator">
    <svg viewBox={ `${ x } ${ y } ${ SVG_SQUARE_SIZE } ${ SVG_SQUARE_SIZE }` }>
      <Square square={ square } orientation={ orientation } />
      <Story />
    </svg>
  </div>;
};
