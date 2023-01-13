import { FILES, PLAYERS, RANKS, SQUARE_COLORS, SQUARES } from "./constants";

export type Player = typeof PLAYERS[number]
export type Rank = typeof RANKS[number]
export type File = typeof FILES[number]
export type SquareColor = typeof SQUARE_COLORS[number]
export type Square = typeof SQUARES[number]

export type HighlightShape = "square" | "circle" | "dot"

export type Highlight = {
  square: Square,
  type: string
  shape: HighlightShape
}

export type Vector = [
  number,
  number
];
