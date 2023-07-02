import { Chessboard } from "../components/chessboard";
import { EMPTY_POSITION, STARTING_POSITION, WHITE } from "../constants";

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

export function MovableChessboard() {
  return <Chessboard
    fen={ STARTING_POSITION }
    orientation={ WHITE }
    interactive
    onHighlight={ ({ square }) => console.log(`Highlighting ${ square }`) }
    onArrow={ ({ from, to }) => console.log(`Arrow from ${ from } to ${ to }`) }
    onSelect={ ({ square }) => console.log(`Selecting ${ square }`) }
    onDeselect={ () => console.log(`Deselecting`) }
    onMove={ ({ from, to }) => { console.log(`Moving from ${ from } to ${ to }`); return false; } }
  />;
}
