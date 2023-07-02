import { BOARD_SIZE, SVG_SQUARE_SIZE } from "../constants";
import { Player, Square, Vector } from "../types";
import { indicesToSquare, orientIndices, squareToIndices } from "./squares";

export function squareToSVGCoordinates(square: Square, orientation: Player): Vector {
  const [ fileIndex, rankIndex ] = orientIndices(squareToIndices(square), orientation);
  return [ fileIndex * SVG_SQUARE_SIZE, (BOARD_SIZE - rankIndex - 1) * SVG_SQUARE_SIZE ] as Vector;
}

/**
 * Given a mouse event inside of a container, this event will determine which square inside the
 * container the event is for.
 */
export function eventToSquare(event: React.MouseEvent<SVGElement>, orientation: Player) {

  // Get the square's bounding rectangle
  const rect = event.currentTarget.getBoundingClientRect();

  const squareWidth = rect.width;
  const squareHeight = rect.height;

  // Calculate the relative position of the click within the squares from the bottom left.
  const clickX = event.clientX - rect.left;
  const clickY = squareHeight - (event.clientY - rect.top);

  // Calculate the indices based on the relative position
  const indexX = Math.floor(clickX / squareWidth * BOARD_SIZE);
  const indexY = Math.floor(clickY / squareHeight * BOARD_SIZE);

  return indicesToSquare(orientIndices([ indexX, indexY ], orientation) as Vector);
}
