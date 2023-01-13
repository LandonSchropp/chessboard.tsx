import { Highlight as HighlightType, Player } from "../types";
import { Highlight } from "./highlight";

type HighlightsProps = {
  highlights: HighlightType[],
  orientation: Player
}

export function Highlights({
  highlights,
  orientation
}: HighlightsProps) {
  return <g>
    {
      highlights.map(highlight => {
        return <Highlight
          key={ `${ highlight.type }-${ highlight.square }` }
          highlight={ highlight }
          orientation={ orientation }
        />;
      })
    }
  </g>;
}
