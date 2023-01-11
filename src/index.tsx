import classNames from "classnames";

/**
 * @typedef ChessboardProps
 * @prop [className] A class name to append to the Chessboard's default class.
 */
type ChessboardProps = {
  className?: string
}

/**
 * @param {ChessboardProps} props
 */
export function Chessboard({ className }: ChessboardProps) {
  return <svg className={ classNames("chessboard", className) } viewBox="0 0 100 100">
    <rect x="0" y="0" width="100" height="100" fill="blue" />
  </svg>;
}
