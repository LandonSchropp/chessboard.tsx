import { Chess } from "chess.js";
import { useReducer } from "react";

import { Chessboard } from "../src/components/chessboard";
import { EMPTY_POSITION, STARTING_POSITION, WHITE } from "../src/constants";
import { useArrowReducer } from "../src/hooks/use-arrow-reducer";
import { useHighlightReducer } from "../src/hooks/use-highlight-reducer";
import { MoveEvent } from "../src/types";

export default {
  title: "Chessboard",
  component: Chessboard
};

export function EmptyChessboard() {
  return <Chessboard
    fen={ EMPTY_POSITION }
    orientation={ WHITE }
  />;
}

export function StaticChessboard() {
  return <Chessboard
    fen={ STARTING_POSITION }
    orientation={ WHITE }
  />;
}

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

export function InteractiveChessboard() {
  const [ highlights, handleHighlight ] = useHighlightReducer();
  const [ arrows, handleArrow ] = useArrowReducer();
  const [ fen, dispatchMove ] = useReducer(moveReducer, STARTING_POSITION);

  function handleMove(move: MoveEvent) {
    dispatchMove(move);
    return true;
  }

  return <Chessboard
    fen={ fen }
    interactive
    highlights={ highlights }
    arrows={ arrows }
    onHighlight={ handleHighlight }
    onArrow={ handleArrow }
    onMove={ handleMove }
    orientation={ WHITE }
  />;
}
