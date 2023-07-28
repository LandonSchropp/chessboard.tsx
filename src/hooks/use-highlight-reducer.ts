import { useReducer } from "react";

import { Highlight, HighlightEvent } from "../types";
import { matches, negate } from "../utilities/function";

/**
 * A reducer that toggles highlights.
 */
function highlightReducer(
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
 * Creates a reducer that houses an array of highlights. This returns a tuple containing an array of
 * highlights and a dispatch function that toggles the highlights.
 */
export function useHighlightReducer() {
  return useReducer(highlightReducer, []);
}
