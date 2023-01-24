import { SVG_SQUARE_SIZE } from "../constants";
import { Piece as PieceType, PieceComponent as PieceComponentType, Player, Square } from "../types";
import { squareToSVGCoordinates } from "../utilities/svg";
import { CburnettPiece } from "./cburnette-piece";

type PieceProps = {
  square: Square,
  piece: PieceType,
  orientation: Player,
  pieceComponent?: PieceComponentType
}

export function Piece({
  square,
  piece,
  orientation,
  pieceComponent: PieceComponent = CburnettPiece
}: PieceProps) {
  const [ x, y ] = squareToSVGCoordinates(square, orientation);

  return <PieceComponent
    x={ x }
    y={ y }
    width={ SVG_SQUARE_SIZE }
    height={ SVG_SQUARE_SIZE }
    square={ square }
    piece={ piece }
    orientation={ orientation }
  />;
}
