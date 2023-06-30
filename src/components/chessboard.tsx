import classNames from "classnames";

import { SVG_BOARD_SIZE } from "../constants";
import {
  ArrowHandler,
  DeselectHandler,
  HighlightHandler,
  MoveHandler,
  Player,
  RemoveHandler,
  SelectHandler
} from "../types";
import { Coordinates } from "./coordinates";
import { Squares } from "./squares";

type ChessboardProps = {

  /** A class name to append to the Chessboard's default classes. */
  className?: string,

  /** The player the chessboard is oriented toward. */
  orientation: Player,

  /** Triggered when a square is right clicked. */
  onHighlight?: HighlightHandler,

  /** Triggered when a square is right clicked and then drug to another square. */
  onArrow?: ArrowHandler,

  /**
   * Triggered when a piece is selected. **Selected pieces can be moved, so if you don't want a
   * piece to be movable, then don't allow it to be selected.**
   */
  onSelect: SelectHandler,

  /**
   * Triggered when a piece is deselected. In order to deselect a piece, the user must click on the
   * selected piece or a different piece.
   */
  onDeselect: DeselectHandler,

  /** Triggered when a move is completed. */
  onMove?: MoveHandler,

  /** Triggered when piece is removed from the board. */
  onRemove: RemoveHandler,
}

/**
 * A clean, simple, highly-customizable Chessboard component.
 */
export function Chessboard({ className, orientation }: ChessboardProps) {
  return <svg
    className={ classNames("chessboard", className) }
    viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }
  >
    <Squares orientation={ orientation } />
    <Coordinates orientation={ orientation } />
  </svg>;
}
