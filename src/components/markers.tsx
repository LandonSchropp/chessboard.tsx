import { Marker as MarkerType, MarkerComponent, Player } from "../types";
import { Marker } from "./marker";

type MarkersProps = {
  markers: MarkerType[],
  orientation: Player

  /** The component used to render the marker. */
  markerComponent: MarkerComponent
}

export function Markers({
  markers,
  orientation,
  markerComponent
}: MarkersProps) {
  return <g className="chessboard__markers">
    {
      markers.map(marker => {
        return <Marker
          key={ `${ marker.type }-${ marker.square }` }
          marker={ marker }
          orientation={ orientation }
          markerComponent={ markerComponent }
        />;
      })
    }
  </g>;
}
