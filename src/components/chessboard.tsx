import classNames from "classnames";

import { SVG_BOARD_SIZE } from "../constants";
import { useInteraction } from "../hooks/use-interaction";
import {
  Arrow,
  ArrowHandler,
  DeselectHandler,
  Highlight,
  HighlightHandler,
  MoveHandler,
  Player,
  RemoveHandler,
  SelectHandler
} from "../types";
import { ALWAYS_FALSE, NOOP } from "../utilities/function";
import { Coordinates } from "./coordinates";
import { Highlights } from "./highlights";
import { Pieces } from "./pieces";
import { Squares } from "./squares";

type ChessboardProps = {

  /** A class name to append to the Chessboard's default classes. */
  className?: string,

  /** The player the chessboard is oriented toward. */
  orientation: Player,

  /** The current position of the chessboard. */
  fen: string,

  /**
   * Determines whether the chessboard is interactive or not. In an interactive chessboard, _all_
   * pieces are movable. Disabling interaction will also disable the highlight and arrow handlers.
   */
  interactive?: boolean,

  /**
   * Determines if the promotion dialog is displayed when a chess piece is moved to the end of the
   * board.
   */
  promotion?: boolean,

  /** The highlights to display on the chessboard. */
  highlights?: Highlight[],

  /** The arrows to display on the chessboard. */
  arrows?: Arrow[],

  /** Triggered when a square is right clicked. */
  onHighlight?: HighlightHandler,

  /** Triggered when a square is right clicked and then drug to another square. */
  onArrow?: ArrowHandler,

  /**
   * Triggered when a piece is selected. **Selected pieces can be moved, so if you don't want a
   * piece to be movable, then don't allow it to be selected.**
   */
  onSelect?: SelectHandler,

  /**
   * Triggered when a piece is deselected. In order to deselect a piece, the user must click on the
   * selected piece or a different piece.
   */
  onDeselect?: DeselectHandler,

  /**
   * Triggered when a move is about to complete. In certain circumstances (such as when a piece is
   * selected and another piece is clicked), it's ambiguous whether the user is moving the
   * previously selected piece or selecting the newly clicked piece. In order to disambiguate, this
   * function returns a boolean that indicates whether the piece should be moved or not.
   */
  onMove?: MoveHandler,

  /** Triggered when piece is removed from the board. */
  onRemove?: RemoveHandler,
}

/**
 * A clean, simple, highly-customizable Chessboard component.
 */
export function Chessboard({
  className,
  orientation,
  fen,
  highlights = [],
  onHighlight = NOOP,
  onArrow = NOOP,
  onSelect = NOOP,
  onDeselect = NOOP,
  onMove = ALWAYS_FALSE
}: ChessboardProps) {
  // Generate the interaction handlers.
  const { handleContextMenu, handleMouseDown, handleMouseUp, handleClick } = useInteraction({
    orientation,
    fen,
    onHighlight,
    onArrow,
    onSelect,
    onDeselect,
    onMove
  });

  return <svg
    className={ classNames("chessboard", className) }
    viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }
    onContextMenu={ handleContextMenu }
    onMouseDown={ handleMouseDown }
    onMouseUp={ handleMouseUp }
    onClick={ handleClick }
  >
    <Squares orientation={ orientation } />
    <Coordinates orientation={ orientation } />
    <Highlights orientation={ orientation } highlights={ highlights } />
    <Pieces orientation={ orientation } fen={ fen } />
  </svg>;
}
