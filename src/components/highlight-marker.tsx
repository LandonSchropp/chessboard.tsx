import "../styles/highlight.sass";
import "../styles/marker.sass";

import classNames from "classnames";

import { SVG_SQUARE_SIZE } from "../constants";
import {
  Highlight,
  HighlightComponent,
  Marker,
  MarkerComponent,
  Player
} from "../types";
import { squareColor as squareToSquareColor } from "../utilities/squares";
import { squareToSVGCoordinates } from "../utilities/svg";

/**
 * @typedef HighlightMarkerProps
 */
type HighlightMarkerProps = {

  /** The object representing the highlight or marker. */
  highlightMarker: Highlight | Marker,

  /** The player the board is oriented toward. */
  orientation: Player

  /** Whether the component represents a highlight or a marker. */
  type: "highlight" | "marker",

  /** The component used to render the marker. */
  highlightMarkerComponent: HighlightComponent | MarkerComponent
}

/**
 * Represents a marker/marker on the chessboard.
 * @param {HighlightMarkerProps} props The component props.
 */
export function HighlightMarker({
  highlightMarker,
  orientation,
  type,
  highlightMarkerComponent: HighlightMarkerComponent
}: HighlightMarkerProps) {
  const [ x, y ] = squareToSVGCoordinates(highlightMarker.square, orientation);
  const squareColor = squareToSquareColor(highlightMarker.square);

  const className = classNames(
    `chessboard__${ type }`,
    `chessboard__${ type }--${ highlightMarker.type }`,
    `chessboard__${ type }--${ squareColor }`
  );

  return <HighlightMarkerComponent
    className={ className }
    x={ x }
    y={ y }
    width={ SVG_SQUARE_SIZE }
    height={ SVG_SQUARE_SIZE }
    orientation={ orientation }
    squareColor={ squareColor }
    { ...highlightMarker }
  />;
}
