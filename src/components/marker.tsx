import "../styles/marker.sass";

import classNames from "classnames";

import { SVG_SQUARE_SIZE } from "../constants";
import { Marker as MarkerType, MarkerComponent as MarkerComponentType, Player } from "../types";
import { squareColor as squareToSquareColor } from "../utilities/squares";
import { squareToSVGCoordinates } from "../utilities/svg";

/**
 * @typedef MarkerProps
 */
type MarkerProps = {

  /** The object representing the marker. */
  marker: MarkerType,

  /** The player the board is oriented toward. */
  orientation: Player

  /** The component used to render the marker. */
  markerComponent: MarkerComponentType
}

/**
 * Represents a marker/marker on the chessboard.
 * @param {MarkerProps} props
 */
export function Marker({
  marker,
  orientation,
  markerComponent: MarkerComponent
}: MarkerProps) {
  const [ x, y ] = squareToSVGCoordinates(marker.square, orientation);
  const squareColor = squareToSquareColor(marker.square);

  const className = classNames(
    "chessboard__marker",
    `chessboard__marker--${ marker.type }`,
    `chessboard__marker--${ squareColor }`
  );

  return <MarkerComponent
    className={ className }
    x={ x }
    y={ y }
    width={ SVG_SQUARE_SIZE }
    height={ SVG_SQUARE_SIZE }
    orientation={ orientation }
    squareColor={ squareColor }
    { ...marker }
  />;
}
