import { Coordinate } from "../components/coordinate";
import { BOARD_SIZE, WHITE } from "../constants";
import { times } from "../utilities/array";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Coordinate",
  component: Coordinate
};

export function BoottomCoordinates() {
  return <StorySVGContainer>
    {
      times(BOARD_SIZE, (index) => {
        return <Coordinate orientation={ WHITE } position="bottom" index={ index } />;
      })
    }
  </StorySVGContainer>;
}

export function LeftCoordinates() {
  return <StorySVGContainer>
    {
      times(BOARD_SIZE, (index) => {
        return <Coordinate orientation={ WHITE } position="left" index={ index } />;
      })
    }
  </StorySVGContainer>;
}
