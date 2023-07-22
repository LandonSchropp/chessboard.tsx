import { Chess } from "chess.js";
import { useMemo } from "react";

import { Highlight, Move, Square } from "../../src/types";
import { convertChessJsMoveToMove } from "../utilities/chess-js";

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
export function useLegalMoves(
  fen: string,
  square: Square | null
): [ legalMoves: Move[], legalMoveHighlights: Highlight[] ] {
  return useMemo(
    () => {
      if (square === null) {
        return [ [], [] ];
      }

      const legalMoves: Move[] = new Chess(fen)
        .moves({ square, verbose: true })
        .map(convertChessJsMoveToMove);

      const highlights = legalMoves.map(({ to }) => ({
        square: to,
        shape: "dot" as const,
        type: "legal"
      }));

      return [ legalMoves, highlights ];
    },
    [ fen, square ]
  );
}
