import { useReducer } from "react";

import { Highlight, HighlightEvent } from "../types";
import { matches, negate } from "../utilities/function";
import { modifierToColorType } from "../utilities/modifier";

/**
 * A reducer that toggles highlights.
 */
function highlightReducer(state: Highlight[], event: HighlightEvent): Highlight[] {
  const actionType = modifierToColorType(event.modifier);

  // Create the predicate functions.
  const matchesSquareAndType = matches<Highlight>({ square: event.square, type: actionType });
  const doesntMatchSquareAndType = negate(matchesSquareAndType);
  const doesntMatchSquare = negate(matches<Highlight>({ square: event.square }));

  // If the state has an exact match, remove it.
  if (state.some(matchesSquareAndType)) {
    return state.filter(doesntMatchSquareAndType);
  }

  // If there are any other highlights on the same square, remove them.
  state = state.filter(doesntMatchSquare);

  // Add the new highlight.
  return [ ...state, { square: event.square, type: actionType, shape: "square" } ];
}

/**
 * Creates a reducer that houses an array of highlights. This returns a tuple containing an array of
 * highlights and a dispatch function that toggles the highlights.
 */
export function useHighlightReducer() {
  return useReducer(highlightReducer, []);
}
