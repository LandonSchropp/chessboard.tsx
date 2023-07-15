import { Highlight as HighlightType, Player } from "../types";
import { Highlight } from "./highlight";

type HighlightsProps = {

  /** The objects representing the highlights. */
  highlights: HighlightType[],

  /** The player the board is oriented toward. */
  orientation: Player
}

export function Highlights({ highlights, orientation }: HighlightsProps) {
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
