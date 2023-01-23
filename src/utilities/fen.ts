import { Piece } from "../types";
import { times } from "./array";

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

type NullablePiece = Piece | null;

type ParsedRank = [
  NullablePiece,
  NullablePiece,
  NullablePiece,
  NullablePiece,
  NullablePiece,
  NullablePiece,
  NullablePiece,
  NullablePiece
]

type ParsedBoard = [
  ParsedRank,
  ParsedRank,
  ParsedRank,
  ParsedRank,
  ParsedRank,
  ParsedRank,
  ParsedRank,
  ParsedRank
]

/**
 * Parses a single FEN rank.
 */
function parseFENRank(fenRank: string): ParsedRank {
  const parsedFENRank = fenRank.split("").reduce((accumulator, value) => {
    return /\d+/.test(value)
      ? [ ...accumulator, ...times(parseInt(value, 10), () => null) ]
      : [ ...accumulator, value as Piece ];
  }, [] as NullablePiece[]);

  if (parsedFENRank.length !== 8) {
    throw new Error(`The FEN rank '${ fenRank }' does not have the correct number of file.`);
  }

  return parsedFENRank as ParsedRank;
}

/**
 * Parses the position in the given FEN.
 * @param fen The FEN to parse. Since this function is only concerned about the *position* in the
 * FEN, the rest of the FEN is ignored.
 * @return returns an array objects that contain helpful data about the pieces in the position.
 */
export function parseFENPosition(fen: string): ParsedBoard {
  fen = fen.trim();

  if (!FEN_REGEX.test(fen)) {
    throw new Error(`The FEN '${ fen }' is not valid.`);
  }

  const parsedFENPosition = fen
    .split(REQUIRED_WHITESPACE_REGEX)[0]!
    .split(FEN_RANK_SEPARATOR)
    .map(parseFENRank);

  if (parsedFENPosition.length !== 8) {
    throw new Error(`The FEN '${ fen }' does not have the correct number of ranks.`);
  }

  return parsedFENPosition as ParsedBoard;
}
