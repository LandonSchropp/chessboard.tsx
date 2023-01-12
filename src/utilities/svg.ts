import { BOARD_SIZE, SVG_SQUARE_SIZE } from "../constants";
import { Player, Square, Vector } from "../types";
import { orientIndices, squareToIndices } from "./squares";

export function squareToSVGCoordinates(square: Square, orientation: Player): Vector {
  const [ fileIndex, rankIndex ] = orientIndices(squareToIndices(square), orientation);
  return [ fileIndex * SVG_SQUARE_SIZE, (BOARD_SIZE - rankIndex - 1) * SVG_SQUARE_SIZE ] as Vector;
}
