import { BISHOP, BLACK, Chess, KING, KNIGHT, PAWN, QUEEN, ROOK, WHITE } from "chess.js";
import { useMemo } from "react";

import { Highlight, Move, Square } from "../../src/types";
import {
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  WHITE_BISHOP,
  WHITE_KING,
  WHITE_KNIGHT,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK
} from "../constants";

const CHESS_JS_PIECES = {
  [WHITE]: {
    [KING]: WHITE_KING,
    [QUEEN]: WHITE_QUEEN,
    [ROOK]: WHITE_ROOK,
    [BISHOP]: WHITE_BISHOP,
    [KNIGHT]: WHITE_KNIGHT,
    [PAWN]: WHITE_PAWN
  },
  [BLACK]: {
    [KING]: BLACK_KING,
    [QUEEN]: BLACK_QUEEN,
    [ROOK]: BLACK_ROOK,
    [BISHOP]: BLACK_BISHOP,
    [KNIGHT]: BLACK_KNIGHT,
    [PAWN]: BLACK_PAWN
  }
} as const;

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
        .map(({ from, to, piece, color }) => ({ from, to, piece: CHESS_JS_PIECES[color][piece] }));

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
