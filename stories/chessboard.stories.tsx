import { Chess } from "chess.js";
import { merge } from "lodash";
import { useReducer } from "react";

import { Chessboard } from "../src/components/chessboard";
import { EMPTY_POSITION, STARTING_POSITION, WHITE } from "../src/constants";
import { useArrowReducer } from "../src/hooks/use-arrow-reducer";
import { useHighlightReducer } from "../src/hooks/use-highlight-reducer";
import { useSelectHighlight } from "../src/hooks/use-select-highlight";
import { MoveEvent } from "../src/types";
import { SVGBoardDecorator } from "./decorators/svg-decorators";

export default {
  title: "Chessboard",
  component: Chessboard,
  decorators: [ SVGBoardDecorator ]
};

/**
 * An empty chessboard.
 */
export const Empty = {
  args: {
    fen: EMPTY_POSITION,
    orientation: WHITE
  }
};

/**
 * A non-interactive chessboard.
 */
export const Static = merge({}, Empty, {
  args: {
    fen: STARTING_POSITION
  }
});

/**
 * A reducer that takes a FEN string and a move event and returns a new FEN string with the move
 * applied. This reducer does not check for move legality.
 */
function moveReducer(fen: string, move: MoveEvent): string {
  const chess = new Chess(fen);

  const piece = chess.remove(move.from);
  chess.put(piece, move.to);

  return chess.fen();
}

function InteractiveChessboard() {
  const [ highlights, handleHighlight ] = useHighlightReducer();
  const [ arrows, handleArrow ] = useArrowReducer();
  const [ fen, dispatchMove ] = useReducer(moveReducer, STARTING_POSITION);
  const [ selectHighlights, handleSelect, handleDeselect ] = useSelectHighlight();

  function handleMove(move: MoveEvent) {
    dispatchMove(move);
    return true;
  }

  return <Chessboard
    fen={ fen }
    interactive
    highlights={ [ ...selectHighlights, ...highlights ] }
    arrows={ arrows }
    onHighlight={ handleHighlight }
    onArrow={ handleArrow }
    onMove={ handleMove }
    onSelect={ handleSelect }
    onDeselect={ handleDeselect }
    orientation={ WHITE }
  />;
}

/**
 * Moveable pieces, highlights, and arrows.
 */
export const Interactive = {
  render: () => <InteractiveChessboard />
};
