import { Piece } from "../components/piece";
import {
  BLACK,
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  PIECES,
  SQUARES,
  WHITE,
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
import { Player } from "../types";
import { StorySVGContainer } from "./story-svg-container";

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
};

console.log(SPRITES);

export default {
  title: "Piece",
  component: Piece
};

function Pieces({ orientation }: { orientation: Player }) {
  return <StorySVGContainer>
    {
      SQUARES.map((square, index) => {
        return <Piece
          key={ square }
          square={ square }
          piece={ PIECES[index % PIECES.length]! }
          orientation={ orientation }
          sprites={ SPRITES }
        />;
      })
    }
  </StorySVGContainer>;
}

export function WhitePieces() {
  return <Pieces orientation={ WHITE } />;
}

export function BlackPieces() {
  return <Pieces orientation={ BLACK } />;
}
