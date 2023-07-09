import { useReducer } from "react";

import { Highlight, HighlightEvent } from "../types";
import { matches, negate } from "../utilities/function";
import { modifierToColorType } from "../utilities/modifier";

/**
 * A reducer that toggles highlights.
 */
function highlightReducer(state: Highlight[], event: HighlightEvent): Highlight[] {

  // Convert the modifier key to a color type.
  const type = modifierToColorType(event.modifier);

  // Create the predicate functions.
  const matchesEvent = matches<Highlight>({ square: event.square, type });
  const doesntMatchEvent = negate(matchesEvent);
  const doesntMatchSquare = negate(matches<Highlight>({ square: event.square }));

  // If the state has an exact match, remove it.
  if (state.some(matchesEvent)) {
    return state.filter(doesntMatchEvent);
  }

  // If there are any other highlights on the same square, remove them.
  state = state.filter(doesntMatchSquare);

  // Add the new highlight.
  return [ ...state, { square: event.square, type, shape: "square" } ];
}

/**
 * Creates a reducer that houses an array of highlights. This returns a tuple containing an array of
 * highlights and a dispatch function that toggles the highlights.
 */
export function useHighlightReducer() {
  return useReducer(highlightReducer, []);
}
