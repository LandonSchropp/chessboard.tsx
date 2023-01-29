import { Markers as MarkersComponent } from "../components/markers";
import { BOARD_SIZE, SQUARES, WHITE } from "../constants";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Markers",
  component: MarkersComponent
};

export function Markers() {
  const markers = SQUARES
    .filter((_, index) => (index + Math.floor(index / BOARD_SIZE)) % 2 === 0)
    .map((square) => ({ square, type: "legal" }));

  return <StorySVGContainer>
    <MarkersComponent markers={ markers } orientation={ WHITE } />
  </StorySVGContainer>;
}
