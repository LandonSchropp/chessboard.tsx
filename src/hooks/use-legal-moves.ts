import { Highlight, Move, Square } from "../../src/types";

/**
 * This hook uses the `fen` and `square` to determine the legal moves a player can make.
 *
 * *This hook relies on the optional dependency of
 * [Chess.js](https://github.com/jhlywa/chess.js/blob/master/README.md). If you do not have Chess.js
 * installed and you don't want to incorporate it into your project, you can't use this hook.*
 *
 * @param fen The FEN of the current position.
 * @param square The square to get legal moves for. If `null`, no moves will be returned.
 * @returns An tuple containing an array of moves that can be made from the current position, as
 * well as an array of highlights that represent the legal moves for the provided square.
 */
export function useLegalMoves(fen: string, square: Square | null): [ Move[], Highlight[] ] {
  return [ [], [] ];
}
