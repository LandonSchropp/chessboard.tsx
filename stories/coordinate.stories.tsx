import { Coordinate } from "../src/components/coordinate";
import { BOARD_SIZE, WHITE } from "../src/constants";
import { times } from "../src/utilities/array";

export default {
  title: "Coordinate",
  component: Coordinate
};

export function BoottomCoordinates() {
  return <>
    {
      times(BOARD_SIZE, (index) => {
        return <Coordinate orientation={ WHITE } position="bottom" index={ index } />;
      })
    }
  </>;
}

export function LeftCoordinates() {
  return <>
    {
      times(BOARD_SIZE, (index) => {
        return <Coordinate orientation={ WHITE } position="left" index={ index } />;
      })
    }
  </>;
}
