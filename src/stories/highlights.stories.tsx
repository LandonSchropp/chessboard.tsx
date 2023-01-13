import { Highlights as HighlightsComponent } from "../components/highlights";
import { BOARD_SIZE, SQUARES, WHITE } from "../constants";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Highlights",
  component: HighlightsComponent
};

const TYPES = [ "red", "green", "blue", "yellow" ] as const;
const SHAPES = [ "square", "circle", "dot" ] as const;

export function Highlights() {
  const highlights = SQUARES.map((square, index) => {
    const shape = SHAPES[index % SHAPES.length]!;
    const type = TYPES[(index + Math.floor(index / BOARD_SIZE)) % TYPES.length]!;

    return { square, shape, type };
  });

  return <StorySVGContainer>
    <HighlightsComponent highlights={ highlights } orientation={ WHITE } />
  </StorySVGContainer>;
}
