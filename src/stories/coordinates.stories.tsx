import { Coordinates as CoordinatesComponent } from "../components/coordinates";
import { BLACK, WHITE } from "../constants";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Coordinates",
  component: CoordinatesComponent
};

export function WhiteCoordinates() {
  return <StorySVGContainer>
    <CoordinatesComponent orientation={ WHITE } />
  </StorySVGContainer>;
}

export function BlackCoordinates() {
  return <StorySVGContainer>
    <CoordinatesComponent orientation={ BLACK } />
  </StorySVGContainer>;
}
