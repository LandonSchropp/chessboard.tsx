import classNames from "classnames";

import { Squares } from "./squares";

/**
 * @typedef ChessboardProps
 * @prop [className] A class name to append to the Chessboard's default class.
 */
type ChessboardProps = {
  className?: string
}

/**
 * A clean, simple, highly-customizable Chessboard component.
 * @param {ChessboardProps} props
 */
export function Chessboard({ className }: ChessboardProps) {
  return <svg className={ classNames("chessboard", className) } viewBox="0 0 100 100">
    <Squares />
  </svg>;
}
