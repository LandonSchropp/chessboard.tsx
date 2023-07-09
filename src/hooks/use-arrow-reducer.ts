import { useReducer } from "react";

import { Arrow, ArrowEvent } from "../types";
import { matches, negate } from "../utilities/function";
import { modifierToColorType } from "../utilities/modifier";

/**
 * A reducer that toggles arrows.
 */
function arrowReducer(state: Arrow[], event: ArrowEvent): Arrow[] {

  // Convert the modifier key to a color type.
  const type = modifierToColorType(event.modifier);

  // Create the predicate functions.
  const matchesEvent = matches<Arrow>({ from: event.from, to: event.to, type });
  const doesntMatchEvent = negate(matchesEvent);
  const doesntMatchSquares = negate(matches<Arrow>({ from: event.from, to: event.to }));

  // If the state has an exact match, remove it.
  if (state.some(matchesEvent)) {
    return state.filter(doesntMatchEvent);
  }

  // If there are any other arrows on the same square, remove them.
  state = state.filter(doesntMatchSquares);

  // Add the new arrow.
  return [ ...state, { from: event.from, to: event.to, type } ];
}

/**
 * Creates a reducer that houses an array of arrows. This returns a tuple containing an array of
 * arrows and a dispatch function that toggles the arrows.
 */
export function useArrowReducer() {
  return useReducer(arrowReducer, []);
}
