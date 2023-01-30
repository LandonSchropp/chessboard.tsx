import { Highlight as HighlightType, HighlightComponent, Player } from "../types";
import { Highlight } from "./highlight";

type HighlightsProps = {
  highlights: HighlightType[],
  orientation: Player,
  highlightComponent: HighlightComponent
}

export function Highlights({
  highlights,
  orientation,
  highlightComponent
}: HighlightsProps) {
  return <g>
    {
      highlights.map(highlight => {
        return <Highlight
          key={ `${ highlight.type }-${ highlight.square }` }
          highlight={ highlight }
          orientation={ orientation }
          highlightComponent={ highlightComponent }
        />;
      })
    }
  </g>;
}
