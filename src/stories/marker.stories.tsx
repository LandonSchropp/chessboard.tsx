import { DotMarker } from "../components/dot-marker";
import { Marker } from "../components/marker";
import { SQUARES, WHITE } from "../constants";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Marker",
  component: Marker
};

export function Markers() {
  return <StorySVGContainer>
    {
      SQUARES.map((square) => {
        return <Marker
          key={ square }
          marker={ { square, type: "legal" } }
          orientation={ WHITE }
          markerComponent={ DotMarker }
        />;
      })
    }
  </StorySVGContainer>;
}
