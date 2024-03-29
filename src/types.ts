import { FILES, MODIFIERS, PIECES, PLAYERS, RANKS, SQUARE_COLORS, SQUARES } from "./constants";

// Chess

export type Player = typeof PLAYERS[number]
export type Rank = typeof RANKS[number]
export type File = typeof FILES[number]
export type SquareColor = typeof SQUARE_COLORS[number]
export type Square = typeof SQUARES[number]
export type Piece = typeof PIECES[number]

// Math

export type Vector = [
  number,
  number
];

// Moves

export type Move = {
  piece: Piece,
  from: Square,
  to: Square
};

// Highlights and Arrows

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

// Components

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

// Events

export type Modifier = typeof MODIFIERS[number]

export type HighlightEvent = {
  square: Square,
  modifier: Modifier
}

export type ArrowEvent = {
  from: Square,
  to: Square,
  modifier: Modifier
}

export type SquareEvent = {
  square: Square
}

export type MoveEvent = Move

export type RemoveEvent = {
  from: Square,
  piece: Piece
}

// Handlers

export type HighlightHandler = (event: HighlightEvent) => void
export type ArrowHandler = (event: ArrowEvent) => void
export type SquareHandler = (event: SquareEvent) => void
export type SelectHandler = SquareHandler
export type DeselectHandler = () => void
export type MoveHandler = (event: Move) => boolean
export type RemoveHandler = SquareHandler
