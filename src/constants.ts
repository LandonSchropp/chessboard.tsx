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
