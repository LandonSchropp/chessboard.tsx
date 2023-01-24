import { ComponentProps } from "react";

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
import BLACK_BISHOP_SPRITE from "../images/black-bishop.svg";
import BLACK_KING_SPRITE from "../images/black-king.svg";
import BLACK_KNIGHT_SPRITE from "../images/black-knight.svg";
import BLACK_PAWN_SPRITE from "../images/black-pawn.svg";
import BLACK_QUEEN_SPRITE from "../images/black-queen.svg";
import BLACK_ROOK_SPRITE from "../images/black-rook.svg";
import WHITE_BISHOP_SPRITE from "../images/white-bishop.svg";
import WHITE_KING_SPRITE from "../images/white-king.svg";
import WHITE_KNIGHT_SPRITE from "../images/white-knight.svg";
import WHITE_PAWN_SPRITE from "../images/white-pawn.svg";
import WHITE_QUEEN_SPRITE from "../images/white-queen.svg";
import WHITE_ROOK_SPRITE from "../images/white-rook.svg";
import { PieceComponent } from "../types";

// TODO: Replace this with SVGR components so the images are inlined.
const SPRITES = {
  [BLACK_BISHOP]: BLACK_BISHOP_SPRITE,
  [BLACK_KING]: BLACK_KING_SPRITE,
  [BLACK_KNIGHT]: BLACK_KNIGHT_SPRITE,
  [BLACK_PAWN]: BLACK_PAWN_SPRITE,
  [BLACK_QUEEN]: BLACK_QUEEN_SPRITE,
  [BLACK_ROOK]: BLACK_ROOK_SPRITE,
  [WHITE_BISHOP]: WHITE_BISHOP_SPRITE,
  [WHITE_KING]: WHITE_KING_SPRITE,
  [WHITE_KNIGHT]: WHITE_KNIGHT_SPRITE,
  [WHITE_PAWN]: WHITE_PAWN_SPRITE,
  [WHITE_QUEEN]: WHITE_QUEEN_SPRITE,
  [WHITE_ROOK]: WHITE_ROOK_SPRITE
} as const;

/**
 * This component renders the chess sprites created by Colin Burnett and available on [Wikimedia
 * Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces) under the CC BY-SA 3.0
 * license.
 */
export function CburnettPiece({ piece, square, ...attributes }: ComponentProps<PieceComponent>) {
  return <image
    href={ SPRITES[piece] }
    data-piece={ piece }
    data-square={ square }
    { ...attributes }
  />;
}
