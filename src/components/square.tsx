import "../styles/square.sass";

import classNames from "classnames";

import { SVG_SQUARE_SIZE } from "../constants";

/**
 * @typedef SquareProps
 * @prop fileIndex The index of the file the square should be rendered on.
 * @prop rowIndex The index of the row the square should be rendered on.
 */
type SquareProps = {
  fileIndex: number,
  rankIndex: number
};

/**
 * A single square on the chessboard. The square's color will be determined by its rank and file.
 * @param {SquareProps} props
 */
export function Square({ fileIndex, rankIndex }: SquareProps) {
  const isLightSquare = (fileIndex + rankIndex) % 2 === 0;

  const className = classNames("chessboard__square", {
    "chessboard__square--light": isLightSquare,
    "chessboard__square--dark": !isLightSquare
  });

  return <rect
    className={ className }
    x={ fileIndex * SVG_SQUARE_SIZE }
    y={ rankIndex * SVG_SQUARE_SIZE }
    width={ SVG_SQUARE_SIZE }
    height={ SVG_SQUARE_SIZE }
  />;
}
