import { useState } from "react";

import { Highlight, HighlightEvent, HighlightHandler } from "../types";
import { matches, negate } from "../utilities/function";

/**
 * A reducer that toggles highlights.
 */
function toggleHighlightReducer(
  state: Highlight[],
  { square, modifier: type }: HighlightEvent
): Highlight[] {

  // Create the predicate functions.
  const matchesEvent = matches<Highlight>({ square, type });
  const doesntMatchEvent = negate(matchesEvent);
  const doesntMatchSquare = negate(matches<Highlight>({ square }));

  // If the state has an exact match, remove it.
  if (state.some(matchesEvent)) {
    return state.filter(doesntMatchEvent);
  }

  // If there are any other highlights on the same square, remove them.
  state = state.filter(doesntMatchSquare);

  // Add the new highlight.
  return [ ...state, { square, type, shape: "square" } ];
}

/**
 * A hook that managed highlights for a chessboard. This returns a tuple containing the current
 * highlights and a function that can be called to toggle the highlight for a specific square.
 */
export function useHighlights(): [ Highlight[], HighlightHandler, () => void ] {
  const [ highlights, setHighlights ] = useState<Highlight[]>([]);

  function toggleHighlight(event: HighlightEvent) {
    setHighlights((oldHighlights) => toggleHighlightReducer(oldHighlights, event));
  }

  function clearHighlights() {
    setHighlights([]);
  }

  return [ highlights, toggleHighlight, clearHighlights ];
}
