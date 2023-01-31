import { Highlight, HighlightComponent, Marker, MarkerComponent, Player } from "../types";
import { HighlightMarker } from "./highlight-marker";

type HighlightMarkersProps = {

  /** The highlights or markers to display. */
  highlightMarkers: (Highlight | Marker)[],

  /** The player the board is oriented toward. */
  orientation: Player

  /** The component used to render the highlight or marker. */
  highlightMarkerComponent: HighlightComponent | MarkerComponent

  /** Whether the component represents a highlight or a marker. */
  type: "highlight" | "marker"
}

/**
 * Represents the highlights or markers on the chessboard.
 * @param {HighlightMarkersProps} props The component props.
 */
export function HighlightMarkers({
  highlightMarkers,
  orientation,
  highlightMarkerComponent,
  type
}: HighlightMarkersProps) {
  return <g className={ `chessboard__${ type }s` }>
    {
      highlightMarkers.map(highlightMarker => {
        return <HighlightMarker
          key={ `${ highlightMarker.type }-${ highlightMarker.square }` }
          type={ type }
          highlightMarker={ highlightMarker }
          orientation={ orientation }
          highlightMarkerComponent={ highlightMarkerComponent }
        />;
      })
    }
  </g>;
}
