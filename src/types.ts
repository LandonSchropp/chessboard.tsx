import { FILES, PIECES, PLAYERS, RANKS, SQUARE_COLORS, SQUARES } from "./constants";

export type Player = typeof PLAYERS[number]
export type Rank = typeof RANKS[number]
export type File = typeof FILES[number]
export type SquareColor = typeof SQUARE_COLORS[number]
export type Square = typeof SQUARES[number]
export type Piece = typeof PIECES[number]

export type HighlightShape = "square" | "circle" | "dot"

export type Highlight = {
  square: Square,
  type: string
  shape: HighlightShape
}

export type Arrow = {
  from: Square,
  to: Square,
  type: string
}

export type Vector = [
  number,
  number
];

export type PieceComponentProps = {
  x: number,
  y: number,
  width: number,
  height: number,
  square: Square,
  piece: Piece,
  orientation: Player
}

export type PieceComponent = React.ComponentType<PieceComponentProps>
