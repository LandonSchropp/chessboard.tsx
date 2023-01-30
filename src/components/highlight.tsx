import "../styles/highlight.sass";

import { SVG_SQUARE_SIZE } from "../constants";
import {
  Highlight as HighlightType,
  HighlightComponent as HighlightComponentType,
  Player
} from "../types";
import { squareColor as squareToSquareColor } from "../utilities/squares";
import { squareToSVGCoordinates } from "../utilities/svg";

/**
 * @typedef HighlightProps
 */
type HighlightProps = {

  /** The object representing the highlight. */
  highlight: HighlightType,

  /** The player the board is oriented toward. */
  orientation: Player

  /** The component used to render the highlight. */
  highlightComponent: HighlightComponentType
}

/**
 * Represents a highlight/marker on the chessboard.
 * @param {HighlightProps} props The highlight component's props.
 */
export function Highlight({
  highlight,
  orientation,
  highlightComponent: HighlightComponent
}: HighlightProps) {
  const [ x, y ] = squareToSVGCoordinates(highlight.square, orientation);
  const squareColor = squareToSquareColor(highlight.square);

  return <g>
    <HighlightComponent
      x={ x }
      y={ y }
      width={ SVG_SQUARE_SIZE }
      height={ SVG_SQUARE_SIZE }
      orientation={ orientation }
      squareColor={ squareColor }
      { ...highlight }
    />
  </g>;
}
