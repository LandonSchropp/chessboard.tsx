import classNames from "classnames";
import { useState } from "react";

import { SVG_BOARD_SIZE } from "../constants";
import {
  ArrowHandler,
  DeselectHandler,
  HighlightHandler,
  MoveHandler,
  Player,
  RemoveHandler,
  SelectHandler,
  Square
} from "../types";
import { pieceAtSquare } from "../utilities/fen";
import { eventToModifier, eventToSquare } from "../utilities/svg";
import { Coordinates } from "./coordinates";
import { Pieces } from "./pieces";
import { Squares } from "./squares";

const RIGHT_MOUSE_BUTTON = 2;

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
  onHighlight,
  onArrow,
  onSelect,
  onDeselect,
  onMove
}: ChessboardProps) {

  // TODO: Move all of the interactions into a hook so this file isn't so cluttered.

  // Keeps track of the from square for highlights and arrows.
  const [ from, setFrom ] = useState<Square | null>(null);

  // Keep track of the currently selected square for clicks.
  const [ selectedSquare, setSelectedSquare ] = useState<Square | null>(null);

  // A handler that prevents the context menu from appearing.
  const handleContextMenu = (event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
  };

  // If the user begins a _right_ click, this tracks the square.
  const handleMouseDown = (event: React.MouseEvent<SVGElement>) => {
    if (event.button !== RIGHT_MOUSE_BUTTON) {
      return;
    }

    setFrom(eventToSquare(event, orientation));
  };

  // If the user finishes a _right_ click, this determines the final square and then triggers the
  // appropriate handler.
  const handleMouseUp = (event: React.MouseEvent<SVGElement>) => {
    if (event.button !== RIGHT_MOUSE_BUTTON) {
      return;
    }

    const to = eventToSquare(event, orientation);
    const modifier = eventToModifier(event);

    if (from === to) {
      onHighlight?.({ square: to, modifier });
    }
    else {
      onArrow?.({ from: from as Square, to, modifier });
    }

    setFrom(null);
  };

  const handleClick = (event: React.MouseEvent<SVGElement>) => {

    // Grab the square that was clicked.
    const square = eventToSquare(event, orientation);

    if (selectedSquare) {

      // No matter what, the current square should be deselected.
      setSelectedSquare(null);
      onDeselect?.();

      // If the current selection matches the square, then we don't need to do anything.
      if (square === selectedSquare) {
        return;
      }

      // Attempt to trigger a move. If the move is successful, then we're done.
      if (onMove?.({ from: selectedSquare as Square, to: square })) {
        return;
      }
    }

    // If the new square contains a piece, then select it.
    if (pieceAtSquare(fen, square)) {
      setSelectedSquare(square);
      onSelect?.({ square });
    }
  };

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
    <Pieces orientation={ orientation } fen={ fen } />
  </svg>;
}
