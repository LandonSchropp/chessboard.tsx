import { FILES, PLAYERS, RANKS, SQUARE_COLORS } from "./constants";

export type Player = typeof PLAYERS[number]
export type Rank = typeof RANKS[number]
export type File = typeof FILES[number]
export type SquareColor = typeof SQUARE_COLORS[number]
