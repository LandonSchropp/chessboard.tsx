import { useState } from "react";

import { Highlight, Move } from "../types";

/**
 * This is a _super_ simple implementation of a hook that returns the last move played on the
 * chessboard. It works be returning a function that can be called to update the last move. If the
 * function is called with `null`, the last move is cleared.
 *
 * @returns An tuple containing the last move (or null if there was none), an array of highlights
 * for the last move, and a handler to call to update the move.
 */
export function useLastMove(): [ Move | null, Highlight[], (move: Move | null) => void ] {
  const [ lastMove, setLastMove ] = useState<Move | null>(null);

  function updateMove(move: Move | null) {
    setLastMove(move);
  }

  return [
    lastMove,
    lastMove
      ? [
        { square: lastMove.from, shape: "square", type: "last" },
        { square: lastMove.to, shape: "square", type: "last" }
      ]
      : [],
    updateMove
  ];
}
