import { Squares as SquaresComponent } from "../components/squares";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Squares",
  component: SquaresComponent
};

export function Squares() {
  return <StorySVGContainer>
    <SquaresComponent />
  </StorySVGContainer>;
}
