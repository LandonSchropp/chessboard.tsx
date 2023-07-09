import { Squares as SquaresComponent } from "../components/squares";
import { WHITE } from "../constants";

export default {
  title: "Squares",
  component: SquaresComponent
};

export function Squares() {
  return <SquaresComponent orientation={ WHITE } />;
}
