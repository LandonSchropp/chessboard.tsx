import { BOARD_SIZE, DARK, FILES, LIGHT, PLAYERS, RANKS, WHITE } from "../constants";
import { File, Player, Rank, Square, SquareColor, Vector } from "../types";

function validateIndices(indices: Vector) {
  const [ fileIndex, rankIndex ] = indices;

  if (fileIndex < 0 || fileIndex >= BOARD_SIZE || rankIndex < 0 || rankIndex >= BOARD_SIZE) {
    throw new Error(`The board indices [ ${ fileIndex }, ${ rankIndex } ] are out of bounds.`);
  }
}

/**
 * Converts the rank and file coordinates of a chess square to board indices.
 * @param square The square to convert
 * @return Returns an array of coordinates between 0–7 inclusive.
 */
export function squareToIndices(square: Square): Vector {

  const file = square[0] as unknown as File;
  const rank = square[1] as unknown as Rank;
  const result = [ FILES.indexOf(file), RANKS.indexOf(rank) ];

  if (result.includes(-1)) {
    throw new Error(`The square ${ square } is not valid.`);
  }

  return result as Vector;
}

export function indicesToSquare(indices: Vector): Square {
  validateIndices(indices);
  const [ fileIndex, rankIndex ] = indices;
  return `${ FILES[fileIndex] }${ RANKS[rankIndex] }` as Square;
}

/**
 * Reverses the coordinate system for a single board index.
 */
function reverseIndex(index: number): number {
  return BOARD_SIZE - 1 - index;
}

/**
 * Since SVGs are drawn from the top-left and chessboards' coordinates are from the bottom left, we
 * have to reverse the y-coordinate.
 */
export function reverseYIndex(indices: Vector): Vector {
  validateIndices(indices);
  const [ fileIndex, rankIndex ] = indices;
  return [ fileIndex, reverseIndex(rankIndex) ];
}

/**
 * If the orientation is from black's perspective, we have to flip the indices.
 */
export function orientIndices(indices: Vector, orientation: Player): Vector {
  validateIndices(indices);
  const [ fileIndex, rankIndex ] = indices;

  if (!PLAYERS.includes(orientation)) {
    throw new Error(`The orientation ${ orientation } is not valid.`);
  }

  return orientation === WHITE
    ? [ fileIndex, rankIndex ]
    : [ reverseIndex(fileIndex), reverseIndex(rankIndex) ];
}

/**
 * Returns true if the move was a knight move.
 * @from A string representing the from square.
 * @to A string representing the to Square.
 */
export function isKnightMove(from: Square, to: Square) {
  const fromIndices = squareToIndices(from);
  const toIndices = squareToIndices(to);

  const xDifference = Math.abs(fromIndices[0] - toIndices[0]);
  const yDifference = Math.abs(fromIndices[1] - toIndices[1]);

  return xDifference === 1 && yDifference === 2 || xDifference === 2 && yDifference === 1;
}

/**
 * Returns the color of the given square (light or dark).
 */
export function squareColor(square: Square): SquareColor {
  const indicies = squareToIndices(square);
  return (indicies[0] + indicies[1]) % 2 === 0 ? DARK : LIGHT;
}
