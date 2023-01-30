import { Highlights as HighlightsComponent } from "../components/highlights";
import { SquareHighlight } from "../components/square-highlight";
import { BOARD_SIZE, SQUARES, WHITE } from "../constants";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Highlights",
  component: HighlightsComponent
};

const TYPES = [ "red", "green", "blue", "yellow" ] as const;

export function Highlights() {
  const highlights = SQUARES.map((square, index) => {
    const type = TYPES[(index + Math.floor(index / BOARD_SIZE)) % TYPES.length]!;

    return { square, type };
  });

  return <StorySVGContainer>
    <HighlightsComponent
      highlights={ highlights }
      orientation={ WHITE }
      highlightComponent={ SquareHighlight }
    />
  </StorySVGContainer>;
}
