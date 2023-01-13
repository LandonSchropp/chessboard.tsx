import "../styles/highlight.sass";

import classNames from "classnames";

import { SVG_SQUARE_SIZE } from "../constants";
import { Highlight as HighlightType, Player } from "../types";
import { squareColor as squareToSquareColor } from "../utilities/squares";
import { squareToSVGCoordinates } from "../utilities/svg";

const DOT_RADIUS = 0.2;

/**
 * @typedef HighlightProps
 * @prop highlight The object representing the highlight.
 * @prop orientation The player the board is oriented toward.
 */
type HighlightProps = {
  highlight: HighlightType,
  orientation: Player
}

/**
 * Represents a highlight/marker on the chessboard.
 * @param {HighlightProps} props
 */
export function Highlight({ highlight, orientation }: HighlightProps) {
  const [ x, y ] = squareToSVGCoordinates(highlight.square, orientation);
  const squareColor = squareToSquareColor(highlight.square);

  const attributes = {
    className: classNames(
      "chessboard__highlight",
      `chessboard__highlight--${ highlight.type }`,
      `chessboard__highlight--${ highlight.shape }`,
      `chessboard__highlight--${ squareColor }`
    ),
    "data-square": highlight.square,
    "data-type": highlight.type,
    "data-shape": "square",
    "data-square-color": squareColor
  };

  switch (highlight.shape) {
    case "square":
      return <rect
        x={ x }
        y={ y }
        width={ SVG_SQUARE_SIZE }
        height={ SVG_SQUARE_SIZE }
        { ...attributes }
      />;
    case "circle":
    case "dot":
      return <circle
        cx={ x + SVG_SQUARE_SIZE / 2 }
        cy={ y + SVG_SQUARE_SIZE / 2 }
        r={ SVG_SQUARE_SIZE * (highlight.shape === "dot" ? DOT_RADIUS : 0.5) }
        { ...attributes }
      />;
  }
}
