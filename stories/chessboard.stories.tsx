import { Chess } from "chess.js";
import { merge, sample } from "lodash";
import { useCallback, useEffect, useReducer } from "react";

import { Chessboard } from "../src/components/chessboard";
import { EMPTY_POSITION, STARTING_POSITION, WHITE } from "../src/constants";
import { useArrowReducer } from "../src/hooks/use-arrow-reducer";
import { useHighlights } from "../src/hooks/use-highlights";
import { useLastMove } from "../src/hooks/use-last-move";
import { useLegalMoves } from "../src/hooks/use-legal-moves";
import { useSelect } from "../src/hooks/use-select";
import { Move, MoveEvent } from "../src/types";
import { convertChessJsMoveToMove } from "../src/utilities/chess-js";
import { playerTurn } from "../src/utilities/fen";
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
function reduceAnyMove(fen: string, move: MoveEvent): string {
  const chess = new Chess(fen);

  const piece = chess.remove(move.from);
  chess.put(piece, move.to);

  return chess.fen();
}

function InteractiveChessboard() {
  const [ highlights, handleHighlight ] = useHighlights();
  const [ arrows, handleArrow ] = useArrowReducer();
  const [ , lastMoveHighlights, updateLastMove ] = useLastMove();
  const [ , selectHighlights, handleSelect, handleDeselect ] = useSelect();
  const [ fen, makeMove ] = useReducer(reduceAnyMove, STARTING_POSITION);

  function handleMove(move: MoveEvent) {
    makeMove(move);
    updateLastMove(move);
    return true;
  }

  return <Chessboard
    fen={ fen }
    interactive
    highlights={ [ ...lastMoveHighlights, ...selectHighlights, ...highlights ] }
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
 * Returns true if the move is legal from the FEN position.
 */
function isLegalMove(fen: string, { from, to }: Move): boolean {
  const chess = new Chess(fen);

  try {
    chess.move({ from, to });
  }
  catch (error) {
    if (error instanceof Error && error.message.startsWith("Invalid move")) {
      return false;
    }

    throw error;
  }

  return true;
}

/**
 * A reducer that takes a FEN string and a move event and returns a new FEN string with the move
 * applied. This reducer will not allow illegal moves.
 */
function reduceLegalMove(fen: string, move: MoveEvent): string {
  if (!isLegalMove(fen, move)) {
    return fen;
  }

  const chess = new Chess(fen);
  chess.move({ from: move.from, to: move.to });
  return chess.fen();
}

/**
 * Moveable pieces, highlights, and arrows.
 */
export const Interactive = {
  render: () => <InteractiveChessboard />
};

function LegalMovesChessboard() {
  const [ highlights, handleHighlight ] = useHighlights();
  const [ arrows, handleArrow ] = useArrowReducer();
  const [ , lastMoveHighlights, updateLastMove ] = useLastMove();
  const [ selectedSquare, selectHighlights, handleSelect, handleDeselect ] = useSelect();
  const [ fen, makeMove ] = useReducer(reduceLegalMove, STARTING_POSITION);
  const [ , legalMoveHighlights ] = useLegalMoves(fen, selectedSquare);

  function handleMove(move: MoveEvent) {
    if (!isLegalMove(fen, move)) {
      return false;
    }

    makeMove(move);
    updateLastMove(move);

    return true;
  }

  return <Chessboard
    fen={ fen }
    interactive
    highlights={
      [
        ...lastMoveHighlights,
        ...selectHighlights,
        ...legalMoveHighlights,
        ...highlights
      ]
    }
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
 * An interactive chessboard that only allows legal chess moves.
 */
export const LegalMoves = {
  render: () => <LegalMovesChessboard />
};

/**
 * Returns a random legal move from the FEN position, or null if there are no legal moves available.
 */
function randomLegalMove(fen: string): Move | null {
  const moves = new Chess(fen).moves({ verbose: true });
  const move = sample(moves);

  if (!move) {
    return null;
  }

  return convertChessJsMoveToMove(move);
}

function RandomGameChessboard() {
  const [ highlights, handleHighlight ] = useHighlights();
  const [ arrows, handleArrow ] = useArrowReducer();
  const [ , lastMoveHighlights, updateLastMove ] = useLastMove();
  const [ selectedSquare, selectHighlights, handleSelect, handleDeselect ] = useSelect();
  const [ fen, makeMove ] = useReducer(reduceLegalMove, STARTING_POSITION);
  const [ , legalMoveHighlights ] = useLegalMoves(fen, selectedSquare);

  const handleMove = useCallback((move: MoveEvent) => {
    if (!isLegalMove(fen, move)) {
      return false;
    }

    makeMove(move);
    updateLastMove(move);

    return true;
  }, [ fen, makeMove, updateLastMove ]);

  useEffect(() => {
    if (playerTurn(fen) === WHITE) {
      return;
    }

    setTimeout(() => {
      const move = randomLegalMove(fen);

      if (!move) {
        return;
      }

      handleMove(move);
    }, 1000);
  }, [ fen, handleMove ]);

  return <Chessboard
    fen={ fen }
    interactive
    highlights={
      [
        ...lastMoveHighlights,
        ...selectHighlights,
        ...legalMoveHighlights,
        ...highlights
      ]
    }
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
 * A chess game where the computer opponent plays random moves.
 */
export const RandomGame = {
  render: () => <RandomGameChessboard />
};
