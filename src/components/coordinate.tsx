import "../styles/coordinate.sass";

import classNames from "classnames";

import {
  BOARD_SIZE,
  DARK_SQUARE,
  FILES,
  LIGHT_SQUARE,
  RANKS,
  SVG_SQUARE_SIZE,
  WHITE
} from "../constants";
import { Player } from "../types";

type Position = "bottom" | "left";

/**
 * @typedef CoordinateProps
 * @prop orientation Which player the board is oriented toward.
 * @prop position Whether the coordinate is positions on the left or the bottom.
 * @prop index The index of the coordinate along the rank or the file.
 */
type CoordinateProps = {
  orientation: Player,
  position: Position,
  index: number
};

const HORIZONTAL_OFFSET = SVG_SQUARE_SIZE / 32;
const VERTIAL_OFFSET = SVG_SQUARE_SIZE * 2 / 32;

/**
 * A single coordinate on the chessboard.
 * @param {CoordinateProps} props
 */
export function Coordinate({
  position,
  index,
  orientation
}: CoordinateProps) {
  const isRank = position === "left";

  const coordinate = isRank
    ? RANKS[orientation === WHITE ? BOARD_SIZE - 1 - index : index]
    : FILES[orientation === WHITE ? index : BOARD_SIZE - 1 - index];

  const x = isRank
    ? HORIZONTAL_OFFSET
    : SVG_SQUARE_SIZE * (index + 1) - HORIZONTAL_OFFSET;

  const y = isRank
    ? SVG_SQUARE_SIZE * index + VERTIAL_OFFSET
    : BOARD_SIZE * SVG_SQUARE_SIZE - VERTIAL_OFFSET;

  const square = (index + (isRank ? 1 : 0)) % 2 ? LIGHT_SQUARE : DARK_SQUARE;

  const className = classNames("chessboard__coordinate", {
    "chessboard__coordinate--left": position === "left",
    "chessboard__coordinate--bottom": position === "bottom",
    "chessboard__coordinate--light": square === LIGHT_SQUARE,
    "chessboard__coordinate--dark": square === DARK_SQUARE
  });

  return <text
    className={ className }
    x={ x }
    y={ y }
    data-position={ position }
    data-square={ square }
  >
    { coordinate }
  </text>;
}
