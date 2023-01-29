import classNames from "classnames";

import { SVG_BOARD_SIZE } from "../constants";
import { Arrow, Piece, Player, Square } from "../types";
import { Coordinates } from "./coordinates";
import { Squares } from "./squares";

/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * Represents a modifier key that's held down by the user when adding an arrow or highlight.
 */
type Modifier = "alt" | "shift" | "control" | null

/**
 * @typedef ChessboardProps
 */
type ChessboardProps = {

  /** Any additional classes you'd like to add to the chessboard. */
  className?: string,

  /** The player the board should be oriented toward.  */
  orientation: Player

  /** The FEN to display on the chessboard. */
  fen: string,

  /** The arrows to render on the chessboard. */
  arrows?: Arrow[],

  /** The highlights to render on the chessboard. Highlights are rendered _below_ the pieces. */
  highlights?: Arrow[],

  /** The markers to render on the chessboard. Markers are rendered _above_ the pieces. */
  markers?: Arrow[],

  /**
   * Called when the player completed a move, either by releasing a drag or by clicking on a square.
   * @param move An object represent the move.
   * @param move.from The square the piece is being moved from.
   * @param move.piece The piece being moved.
   * @returns Return true if you'd like to allow the move, and false if you'd like to cancel it.
   */
  onMoveStart: (move: { from: Square, piece: Piece }) => boolean,

  /**
   * Called when the player completed a move, either by releasing a drag or by clicking on a square.
   * If you'd like to allow the move, you'll need to update the FEN for the chessboard.
   * @param move An object represent the move.
   * @param move.from The square the piece was moved from.
   * @param move.to The square the piece was moved to.
   * @param move.piece The piece that was moved.
   * @param move.promotion If the piece was a pawn that was promoted, this will be the piece the
   * pawn was promoted to.
   */
  onMoveDone: (move: {
    from: Square,
    to: Square,
    piece: Piece,
    promotion: Piece | undefined
  }) => void,

  /**
   * Called when the player moves a pawn to the back rank.
   * @param promotion An object representing the promotion.
   * @param promotion.square The square the promotion occurs on.
   * @param promotion.piece The piece being promoted. This will always be a pawn.
   * @returns Return true if you'd like to allow promotion, and false if you'd like to prevent it.
   * If this function returns false, then the pawn will be moved instead.
   */
  onPromotionStart: (promotion: { square: Square, piece: Piece }) => boolean,

  /**
   * Called when the player moves a pawn to the back rank. The `onMoveDone` callback will be called
   * after this, so unless you need some special promotion logic, you can likely exclude this
   * callback.
   * @param promotion An object representing the promotion.
   * @param promotion.square The square the promotion occurs on.
   * @param promotion.piece The piece that was promoted. This will always be a pawn.
   * @param promotion.promotion The piece the pawn was promoted to.
   */
  onPromotionDone: (promotion: {
    square: Square,
    piece: Piece,
    promotion: Piece
  }) => void,

  /**
   * Called when a piece is selected.
   * @param selection An object representing the selection.
   * @param selection.square The square the selected piece occupies.
   * @param selection.piece The piece that was selected.
   * @returns Return true to allow the selection and false to now allow the section.
   */
  onSelect: (selection: { square: Square, piece: Piece }) => boolean,

  /**
   * Called when a piece is deselected.
   * @param deselection An object representing the deselection.
   * @param deselection.square The square the deselected piece occupies.
   * @param deselection.piece The piece that was deselected.
   */
  onDeselect: (deselection: { square: Square, piece: Piece }) => void,

  /**
   * Called when a square is highlighted. Since this library renders whatever is present in the
   * `highlights` property, it's up to the user of this library to consume this callback and add or
   * remove the highlight directly to the array.
   * @param highlight An object representing the highlight.
   * @param deselection.square The square the deselected piece occupies.
   * @param deselection.piece The piece that was deselected.
   */
  onHighlight: (highlight: { square: Square, modifier: Modifier }) => void

  /**
   * Called when an arrow is added between two squares. Since this library renders whatever is
   * present in the `arrows` property, it's up to the user of this library to consume this callback
   * and add or remove the arrow directly to the array.
   * @param deselection An object representing the deselection.
   * @param deselection.square The square the deselected piece occupies.
   * @param deselection.piece The piece that was deselected.
   */
  onArrow: (arrow: { from: Square, to: Square, modifier: Modifier }) => void
}

/**
 * A clean, simple, highly-customizable Chessboard component.
 * @param {ChessboardProps} props
 */
export function Chessboard({
  className,
  orientation,
  fen,
  arrows = [],
  highlights = [],
  markers = [],
  onMoveStart = () => true,
  onMoveDone = () => {},
  onPromotionStart = () => true,
  onPromotionDone = () => {},
  onSelect = () => true,
  onDeselect = () => {},
  onHighlight = () => {},
  onArrow = () => {}
}: ChessboardProps) {
  return <svg
    className={ classNames("chessboard", className) }
    viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }
  >
    <Squares orientation={ orientation } />
    <Coordinates orientation={ orientation } />
  </svg>;
}
