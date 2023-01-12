import { Chessboard } from "../components/chessboard";
import { WHITE } from "../constants";

export default {
  title: "Chessboard",
  component: Chessboard
};

export function EmptyChessboard() {
  return <Chessboard orientation={ WHITE } />;
}
