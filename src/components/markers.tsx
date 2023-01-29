import { Marker as MarkerType, Player } from "../types";
import { Marker } from "./marker";

type MarkersProps = {
  markers: MarkerType[],
  orientation: Player
}

export function Markers({
  markers,
  orientation
}: MarkersProps) {
  return <g>
    {
      markers.map(marker => {
        return <Marker
          key={ `${ marker.type }-${ marker.square }` }
          marker={ marker }
          orientation={ orientation }
        />;
      })
    }
  </g>;
}
