import "../styles/marker.sass";

import classNames from "classnames";

import { SVG_SQUARE_SIZE } from "../constants";
import { Marker as MarkerType, Player } from "../types";
import { squareColor as squareToSquareColor } from "../utilities/squares";
import { squareToSVGCoordinates } from "../utilities/svg";

const DOT_RADIUS = 0.2;

/**
 * @typedef MarkerProps
 */
type MarkerProps = {

  /** The object representing the marker. */
  marker: MarkerType,

  /** The player the board is oriented toward. */
  orientation: Player
}

/**
 * Represents a marker/marker on the chessboard.
 * @param {MarkerProps} props
 */
export function Marker({ marker, orientation }: MarkerProps) {
  const [ x, y ] = squareToSVGCoordinates(marker.square, orientation);
  const squareColor = squareToSquareColor(marker.square);

  const attributes = {
    className: classNames(
      "chessboard__marker",
      `chessboard__marker--${ marker.type }`,
      `chessboard__marker--${ squareColor }`
    ),
    "data-square": marker.square,
    "data-type": marker.type,
    "data-square-color": squareColor
  };

  return <circle
    cx={ x + SVG_SQUARE_SIZE / 2 }
    cy={ y + SVG_SQUARE_SIZE / 2 }
    r={ SVG_SQUARE_SIZE * DOT_RADIUS }
    { ...attributes }
  />;
}
