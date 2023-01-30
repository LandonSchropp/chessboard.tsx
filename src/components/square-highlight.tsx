import classNames from "classnames";

import { HighlightComponentProps } from "../types";

/**
 * A highlight in the shape of a square.
 * @param {HighlightComponentProps} props The component's props.
 */
export function SquareHighlight({
  square,
  orientation,
  squareColor,
  type,
  ...attributes
}: HighlightComponentProps) {
  const additionalAttributes = {
    className: classNames(
      "chessboard__highlight",
      `chessboard__highlight--${ type }`,
      `chessboard__highlight--${ squareColor }`
    ),
    "data-square": square,
    "data-type": type,
    "data-square-color": squareColor,
    "data-orientation": orientation
  };

  return <rect
    { ...attributes }
    { ...additionalAttributes }
  />;
}
