import { FILES, PIECES, PLAYERS, RANKS, SQUARE_COLORS, SQUARES } from "./constants";

export type Player = typeof PLAYERS[number]
export type Rank = typeof RANKS[number]
export type File = typeof FILES[number]
export type SquareColor = typeof SQUARE_COLORS[number]
export type Square = typeof SQUARES[number]
export type Piece = typeof PIECES[number]

export type Highlight = {
  square: Square,
  type: string
}

export type Marker = {
  square: Square,
  type: string
}

export type HighlightMarker = Highlight | Marker

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
  className: string,
  x: number,
  y: number,
  width: number,
  height: number,
  square: Square,
  piece: Piece,
  orientation: Player,
  opacity: number
}

export type PieceComponent = React.ComponentType<PieceComponentProps>

export type HighlightComponentProps = {
  className: string,
  x: number,
  y: number,
  width: number,
  height: number,
  square: Square,
  orientation: Player,
  squareColor: SquareColor,
  type: string,
}

export type HighlightComponent = React.ComponentType<HighlightComponentProps>

export type MarkerComponentProps = {
  className: string,
  x: number,
  y: number,
  width: number,
  height: number,
  square: Square,
  orientation: Player,
  squareColor: SquareColor,
  type: string,
}

export type MarkerComponent = React.ComponentType<MarkerComponentProps>

export type ArrowComponentProps = {
  className: string, x: number,
  y: number,
  width: number,
  height: number,
  from: Square,
  to: Square,
  orientation: Player,
  type: string
}

export type ArrowComponent = React.ComponentType<ArrowComponentProps>
