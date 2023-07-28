import { useReducer } from "react";

import { Arrow, ArrowEvent } from "../types";
import { matches, negate } from "../utilities/function";

/**
 * A reducer that toggles arrows.
 */
function arrowReducer(state: Arrow[], { from, to, modifier: type }: ArrowEvent): Arrow[] {

  // Create the predicate functions.
  const matchesEvent = matches<Arrow>({ from, to, type });
  const doesntMatchEvent = negate(matchesEvent);
  const doesntMatchSquares = negate(matches<Arrow>({ from, to }));

  // If the state has an exact match, remove it.
  if (state.some(matchesEvent)) {
    return state.filter(doesntMatchEvent);
  }

  // If there are any other arrows on the same square, remove them.
  state = state.filter(doesntMatchSquares);

  // Add the new arrow.
  return [ ...state, { from, to, type } ];
}

/**
 * Creates a reducer that houses an array of arrows. This returns a tuple containing an array of
 * arrows and a dispatch function that toggles the arrows.
 */
export function useArrows() {
  return useReducer(arrowReducer, []);
}
