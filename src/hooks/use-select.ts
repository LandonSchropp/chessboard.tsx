import { Square } from "chess.js";
import { useState } from "react";

import { DeselectHandler, Highlight, SelectHandler, SquareEvent } from "../types";

/**
 * A hook that returns handles and highlights for the currently selected square.
 * @returns Returns an array containing the currently selected square, highlights for the currently
 * selected square, a handler for `onSelect` and a handler for `onDeselect`.
 */
export function useSelect(): [ Square | null, Highlight[], SelectHandler, DeselectHandler ] {
  const [ square, setSquare ] = useState<Square | null>(null);

  function handleSelect(event: SquareEvent) {
    setSquare(event.square);
  }

  function handleDeselect() {
    setSquare(null);
  }

  return [
    square,
    square ? [ { square, type: "select", shape: "square" } ] : [],
    handleSelect,
    handleDeselect
  ];
}
