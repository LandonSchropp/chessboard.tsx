import { SimplifiedChessboard } from "../components/simplified-chessboard";
import { EMPTY_POSITION, STARTING_POSITION, WHITE } from "../constants";

export default {
  title: "SimplifiedChessboard",
  component: SimplifiedChessboard
};

export function EmptyChessboard() {
  return <SimplifiedChessboard
    fen={ EMPTY_POSITION }
    orientation={ WHITE }
  />;
}

export function StaticChessboard() {
  return <SimplifiedChessboard
    fen={ STARTING_POSITION }
    orientation={ WHITE }
  />;
}
