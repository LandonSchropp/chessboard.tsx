import { Squares as SquaresComponent } from "../src/components/squares";
import { WHITE } from "../src/constants";

export default {
  title: "Squares",
  component: SquaresComponent
};

export function Squares() {
  return <SquaresComponent orientation={ WHITE } />;
}
