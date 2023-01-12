// Players
export const WHITE = "white";
export const BLACK = "black";
export const PLAYERS = [ WHITE, BLACK ] as const;

// Square colors
export const LIGHT_SQUARE = "lightSquare";
export const DARK_SQUARE = "darkSquare";
export const SQUARE_COLORS = [ LIGHT_SQUARE, DARK_SQUARE ] as const;

// Ranks and files
export const FILES = [ "a", "b", "c", "d", "e", "f", "g", "h" ] as const;
export const RANKS = [ "1", "2", "3", "4", "5", "6", "7", "8" ] as const;

// Board constants
export const BOARD_SIZE = 8;

// SVG Constants
export const SVG_SQUARE_SIZE = 100;
export const SVG_BOARD_SIZE = BOARD_SIZE * SVG_SQUARE_SIZE;

// Squares
export const SQUARES = [
  "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8",
  "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8",
  "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",
  "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8",
  "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8",
  "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8",
  "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8",
  "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"
] as const;
