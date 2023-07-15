import "../../styles/square.sass";

import classNames from "classnames";

import { SVG_SQUARE_SIZE } from "../constants";
import { Player, Square as SquareType } from "../types";
import { squareColor } from "../utilities/squares";
import { squareToSVGCoordinates } from "../utilities/svg";

type SquareProps = {

  /** The square's coordinates. */
  square: SquareType,

  /** The player the board is oriented toward. */
  orientation: Player
};

/**
 * A single square on the chessboard. The square's color will be determined by its rank and file.
 */
export function Square({ square, orientation }: SquareProps) {
  const [ x, y ] = squareToSVGCoordinates(square, orientation);
  const color = squareColor(square);

  const className = classNames(
    "chessboard__square",
    `chessboard__square--${ color }`
  );

  return <rect
    className={ className }
    x={ x }
    y={ y }
    width={ SVG_SQUARE_SIZE }
    height={ SVG_SQUARE_SIZE }
    data-square={ square }
    data-square-color={ color }
    data-test-id="square"
  />;
}
