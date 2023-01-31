import { DotMarker } from "../components/dot-marker";
import { HighlightMarkers as HighlightMarkersComponent } from "../components/highlight-markers";
import { SquareHighlight } from "../components/square-highlight";
import { BOARD_SIZE, SQUARES, WHITE } from "../constants";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Highlights",
  component: HighlightMarkersComponent
};

const TYPES = [ "red", "green", "blue", "yellow" ] as const;

export function Highlights() {
  const highlights = SQUARES.map((square, index) => {
    const type = TYPES[(index + Math.floor(index / BOARD_SIZE)) % TYPES.length]!;

    return { square, type };
  });

  return <StorySVGContainer>
    <HighlightMarkersComponent
      type="highlight"
      highlightMarkers={ highlights }
      orientation={ WHITE }
      highlightMarkerComponent={ SquareHighlight }
    />
  </StorySVGContainer>;
}

export function Markers() {
  const markers = SQUARES
    .filter((_, index) => (index + Math.floor(index / BOARD_SIZE)) % 2 === 0)
    .map((square) => ({ square, type: "legal" }));

  return <StorySVGContainer>
    <HighlightMarkersComponent
      type="marker"
      highlightMarkers={ markers }
      orientation={ WHITE }
      highlightMarkerComponent={ DotMarker }
    />
  </StorySVGContainer>;
}
