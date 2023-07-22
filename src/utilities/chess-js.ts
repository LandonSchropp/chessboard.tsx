import {
  BISHOP,
  BLACK,
  KING,
  KNIGHT,
  Move as ChessJsMove,
  PAWN,
  QUEEN,
  ROOK,
  WHITE } from "chess.js";

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
import { Move } from "../types";

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
 * Converts a Chess.js `Move` object to this repo's `Move` type.
 */
export function convertChessJsMoveToMove({ from, to, color, piece }: ChessJsMove): Move {
  return { from, to, piece: CHESS_JS_PIECES[color][piece] };
}
