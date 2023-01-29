import { Marker } from "../components/marker";
import { BOARD_SIZE, SQUARES, WHITE } from "../constants";
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
        />;
      })
    }
  </StorySVGContainer>;
}
