import { useCallback, useState } from "react";

import {
  ArrowHandler,
  DeselectHandler,
  HighlightHandler,
  MoveHandler,
  Player,
  SelectHandler,
  Square
} from "../types";
import { pieceAtSquare } from "../utilities/fen";
import { eventToModifier, eventToSquare } from "../utilities/svg";

const RIGHT_MOUSE_BUTTON = 2;

type UseInteractionProps = {
  orientation: Player,
  fen: string,
  onHighlight: HighlightHandler,
  onArrow: ArrowHandler,
  onSelect: SelectHandler,
  onDeselect: DeselectHandler,
  onMove: MoveHandler
}

/**
 * This hook handles all the nitty-gritty details of interaction within components. Using a hook
 * allows the logic to be cleanly separated, and makes it easier to optimize functions using
 * memoization.
 */
export function useInteraction({
  orientation,
  fen,
  onHighlight,
  onArrow,
  onSelect,
  onDeselect,
  onMove
}: UseInteractionProps) {

  // Keeps track of the from square for highlights and arrows.
  const [ from, setFrom ] = useState<Square | null>(null);

  // Keep track of the currently selected square for clicks.
  const [ selectedSquare, setSelectedSquare ] = useState<Square | null>(null);

  // A handler that prevents the context menu from appearing.
  const handleContextMenu = useCallback((event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
  }, []);

  // If the user begins a _right_ click, this tracks the square.
  const handleMouseDown = useCallback((event: React.MouseEvent<SVGElement>) => {
    if (event.button !== RIGHT_MOUSE_BUTTON) {
      return;
    }

    setFrom(eventToSquare(event, orientation));
  }, [ orientation ]);

  // If the user finishes a _right_ click, this determines the final square and then triggers the
  // appropriate handler.
  const handleMouseUp = useCallback((event: React.MouseEvent<SVGElement>) => {
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
  }, [ from, onArrow, onHighlight, orientation ]);

  const handleClick = useCallback((event: React.MouseEvent<SVGElement>) => {

    // Grab the square that was clicked.
    const square = eventToSquare(event, orientation);
    const piece = pieceAtSquare(fen, square);

    if (selectedSquare) {

      // No matter what, the current square should be deselected.
      setSelectedSquare(null);
      onDeselect?.();

      // If the current selection matches the square, then we don't need to do anything.
      if (square === selectedSquare) {
        return;
      }

      // Attempt to trigger a move.
      const success = onMove?.({
        from: selectedSquare as Square,
        to: square,
        piece: pieceAtSquare(fen, selectedSquare)!
      });

      // If the move is successful, then we're done.
      if (success) {
        return;
      }
    }

    // If the new square contains a piece, then select it.
    if (piece) {
      setSelectedSquare(square);
      onSelect?.({ square });
    }
  }, [ fen, onDeselect, onSelect, onMove, orientation, selectedSquare ]);

  return {
    handleContextMenu,
    handleMouseDown,
    handleMouseUp,
    handleClick
  };
}
