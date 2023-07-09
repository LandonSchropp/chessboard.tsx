import { Coordinates as CoordinatesComponent } from "../components/coordinates";
import { BLACK, WHITE } from "../constants";

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
