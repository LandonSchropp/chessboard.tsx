import { Motion, spring } from "react-motion";

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

const SPRING_SETTINGS = { stiffness: 360, damping: 32 };

export function Piece({
  square,
  piece,
  orientation,
  pieceComponent: PieceComponent = CburnettPiece
}: PieceProps) {
  const [ x, y ] = squareToSVGCoordinates(square, orientation);

  return <Motion
    defaultStyle={ { x, y } }
    style={ { x: spring(x, SPRING_SETTINGS), y: spring(y, SPRING_SETTINGS) } }
  >
    {
      (interpolatedParams) => {
        const interpolatedX = interpolatedParams.x!;
        const interpolatedY = interpolatedParams.y!;

        return <PieceComponent
          x={ interpolatedX }
          y={ interpolatedY }
          width={ SVG_SQUARE_SIZE }
          height={ SVG_SQUARE_SIZE }
          square={ square }
          piece={ piece }
          orientation={ orientation }
        />;
      }
    }
  </Motion>;
}
