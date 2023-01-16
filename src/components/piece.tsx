import { SVG_SQUARE_SIZE } from "../constants";
import { Piece as PieceType, Player, Sprites, Square } from "../types";
import { squareToSVGCoordinates } from "../utilities/svg";

type PieceProps = {
  square: Square,
  piece: PieceType,
  orientation: Player,
  sprites: Sprites
}

export function Piece({ square, piece, orientation, sprites }: PieceProps) {
  const [ x, y ] = squareToSVGCoordinates(square, orientation);
  const Sprite = sprites[piece];

  const attributes = {
    x,
    y,
    width: SVG_SQUARE_SIZE,
    height: SVG_SQUARE_SIZE
  };

  return typeof Sprite === "string"
    ? <image href={ Sprite } { ...attributes } />
    : <Sprite { ...attributes } />;
}
