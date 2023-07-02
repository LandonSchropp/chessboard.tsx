import { Piece, Square } from "../types";
import { times } from "./array";
import { indicesToSquare, reverseYIndex } from "./squares";

// FEN constants
const FEN_RANK_SEPARATOR = "/";

// Whitespace regular expressions
const BEGINNING_REGEX = /^/;
const ENDING_REGEX = /$/;
const REQUIRED_WHITESPACE_REGEX = /\s+/;

// FEN regular expression components
const FEN_RANK_REGEX = /[pnbrqkPNBRQK1-8]{1,8}/;
const FEN_SEPERATOR_REGEX = /\//;
const FEN_PIECE_PLACEMENT_REGEX = new RegExp(
  `(${ FEN_RANK_REGEX.source }${ FEN_SEPERATOR_REGEX.source }){7}${ FEN_RANK_REGEX.source }`
);
const FEN_ACTIVE_COLOR_REGEX = /(b|w)/;
const FEN_CASTLING_AVAILABILITY_REGEX = /(-|KQ?k?q?|K?Qk?q?|K?Q?kq?|K?Q?k?q)/;
const FEN_EN_PASSANT_TARGET_SQUARE_REGEX = /(-|[a-h][3-6])/;
const FEN_HALF_MOVE_CLOCK_REGEX = /\d+/;
const FEN_FULL_MOVE_NUMBER_REGEX = /\d+/;

// The complete FEN regular expression
const FEN_REGEX = new RegExp([
  BEGINNING_REGEX.source,
  FEN_PIECE_PLACEMENT_REGEX.source,
  REQUIRED_WHITESPACE_REGEX.source,
  FEN_ACTIVE_COLOR_REGEX.source,
  REQUIRED_WHITESPACE_REGEX.source,
  FEN_CASTLING_AVAILABILITY_REGEX.source,
  REQUIRED_WHITESPACE_REGEX.source,
  FEN_EN_PASSANT_TARGET_SQUARE_REGEX.source,
  REQUIRED_WHITESPACE_REGEX.source,
  FEN_HALF_MOVE_CLOCK_REGEX.source,
  REQUIRED_WHITESPACE_REGEX.source,
  FEN_FULL_MOVE_NUMBER_REGEX.source,
  ENDING_REGEX.source
].join(""));

type ParsedPiece = { square: Square, piece: Piece }

type NullablePiece = Piece | null;

/**
 * Parses a single FEN rank.
 */
function parseFENRank(fenRank: string, rankIndex: number): ParsedPiece[] {
  // Parse the rank into pieces.
  const parsedFENRank = fenRank.split("").reduce((accumulator, value) => {
    return /\d+/.test(value)
      ? [ ...accumulator, ...times(parseInt(value, 10), () => null) ]
      : [ ...accumulator, value as Piece ];
  }, [] as NullablePiece[]);

  // Ensure the rank has the correct number of items.
  if (parsedFENRank.length !== 8) {
    throw new Error(`The FEN rank '${ fenRank }' does not have the correct number of files.`);
  }

  // Reduce the rank into an array of parsed pieces.
  return parsedFENRank.reduce((accumulator, piece, fileIndex) => {

    // If the piece is null, don't bother adding it to the returned value.
    if (!piece) {
      return accumulator;
    }

    // Add the piece to the accumulator.
    const square = indicesToSquare(reverseYIndex([ fileIndex, rankIndex ]));
    accumulator.push({ piece, square });
    return accumulator;
  }, [] as ParsedPiece[]);
}

/**
 * Parses the position in the given FEN.
 * @param fen The FEN to parse. Since this function is only concerned about the *position* in the
 * FEN, the rest of the FEN is ignored.
 * @return returns an array objects that contain helpful data about the pieces in the position.
 */
export function parseFENPosition(fen: string): ParsedPiece[] {
  fen = fen.trim();

  // Ensure the FEN is valid.
  if (!FEN_REGEX.test(fen)) {
    throw new Error(`The FEN '${ fen }' is not valid.`);
  }

  // Parse the FEN into a 2D array.
  const parsedFENPosition = fen
    .split(REQUIRED_WHITESPACE_REGEX)[0]!
    .split(FEN_RANK_SEPARATOR)
    .map(parseFENRank);

  // Ensure the FEN has the correct number of ranks.
  if (parsedFENPosition.length !== 8) {
    throw new Error(`The FEN '${ fen }' does not have the correct number of ranks.`);
  }

  // Finally, flatten the parsed objects.
  return parsedFENPosition.flat();
}

/**
 * Returns the piece on the given square in the given FEN. If the square is empty, null is returned.
 */
export function pieceAtSquare(fen: string, square: Square): Piece | null {
  return parseFENPosition(fen)
    .find(({ square: pieceSquare }) => pieceSquare === square)
    ?.piece ?? null;
}
