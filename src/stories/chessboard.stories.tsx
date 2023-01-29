import { Chessboard } from "../components/chessboard";
import { EMPTY_POSITION, WHITE } from "../constants";

export default {
  title: "Chessboard",
  component: Chessboard
};

export function EmptyChessboard() {
  return <Chessboard fen={ EMPTY_POSITION } orientation={ WHITE } />;
}
