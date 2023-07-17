import { Highlight, Move } from "../types";

/**
 * This hook uses the FEN to return the highlights for the last move. It determines the last move by
 * using a diff of the last position and the current position, and then storing the results. If
 * you provide a FEN that's been previously seen, this hook will use the previously-calculated last
 * position. If more than one piece on the board was moved, this function will return an empty
 * array (with the exception of castling, where the king's move is returned).
 *
 * This is a "dumb" hook. It's not capable of handling more complex use cases, such as jumping
 * between positions or handling branching positions. However, for simple cases, it works well.
 *
 * @param fen The FEN of the current position. As the FEN updates, you should provide the updated
 * FEN to this hook similar to how you'd use `useMemo`.
 * @returns An tuple containing the last move (or null if there was none) and an array of highlights
 * for the last move.
 */
export function useLastMove(fen: string): [ Move | null, Highlight[] ] {
  return [ null, [] ];
}
