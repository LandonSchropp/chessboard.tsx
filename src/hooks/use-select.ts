import { Square } from "chess.js";
import { useCallback, useState } from "react";

import { DeselectHandler, Highlight, SelectHandler, SquareEvent } from "../types";

type UseSelectReturnType = [
  selectedSquare: Square | null,
  selectedSquareHighlights: Highlight[],
  handleSelect: SelectHandler,
  handleDeselect: DeselectHandler,
]

/**
 * A hook that returns handles and highlights for the currently selected square.
 * @returns Returns an array containing the currently selected square, highlights for the currently
 * selected square, a handler for `onSelect` and a handler for `onDeselect`.
 */
export function useSelect(): UseSelectReturnType {
  const [ square, setSquare ] = useState<Square | null>(null);

  const handleSelect = useCallback((event: SquareEvent) => {
    setSquare(event.square);
  }, []);

  const handleDeselect = useCallback(() => {
    setSquare(null);
  }, []);

  return [
    square,
    square ? [ { square, type: "select", shape: "square" } ] : [],
    handleSelect,
    handleDeselect
  ];
}
