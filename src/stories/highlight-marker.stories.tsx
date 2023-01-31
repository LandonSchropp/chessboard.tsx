import { DotMarker } from "../components/dot-marker";
import { HighlightMarker } from "../components/highlight-marker";
import { SquareHighlight } from "../components/square-highlight";
import { BOARD_SIZE, SQUARES, WHITE } from "../constants";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Highlight",
  component: HighlightMarker
};

const TYPES = [ "red", "green", "blue", "yellow" ];

export function Highlights() {
  return <StorySVGContainer>
    {
      SQUARES.map((square, index) => {
        const type = TYPES[(index + Math.floor(index / BOARD_SIZE)) % TYPES.length]!;

        return <HighlightMarker
          key={ square }
          type="highlight"
          highlightMarker={ { square, type } }
          orientation={ WHITE }
          highlightMarkerComponent={ SquareHighlight }
        />;
      })
    }
  </StorySVGContainer>;
}

export function Markers() {
  return <StorySVGContainer>
    {
      SQUARES.map((square) => {
        return <HighlightMarker
          key={ square }
          type="marker"
          highlightMarker={ { square, type: "legal" } }
          orientation={ WHITE }
          highlightMarkerComponent={ DotMarker }
        />;
      })
    }
  </StorySVGContainer>;
}
