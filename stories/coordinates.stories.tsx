import { Coordinates as CoordinatesComponent } from "../src/components/coordinates";
import { BLACK, WHITE } from "../src/constants";

export default {
  title: "Coordinates",
  component: CoordinatesComponent
};

export function WhiteCoordinates() {
  return <CoordinatesComponent orientation={ WHITE } />;
}

export function BlackCoordinates() {
  return <CoordinatesComponent orientation={ BLACK } />;
}
