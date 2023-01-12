import classNames from "classnames";

import { SVG_BOARD_SIZE } from "../constants";
import { Player } from "../types";
import { Coordinates } from "./coordinates";
import { Squares } from "./squares";

/**
 * @typedef ChessboardProps
 * @prop [className] A class name to append to the Chessboard's default class.
 * @prop orientation The player the chessboard is oriented toward.
 */
type ChessboardProps = {
  className?: string,
  orientation: Player
}

/**
 * A clean, simple, highly-customizable Chessboard component.
 * @param {ChessboardProps} props
 */
export function Chessboard({ className, orientation }: ChessboardProps) {
  return <svg
    className={ classNames("chessboard", className) }
    viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }
  >
    <Squares />
    <Coordinates orientation={ orientation } />
  </svg>;
}
