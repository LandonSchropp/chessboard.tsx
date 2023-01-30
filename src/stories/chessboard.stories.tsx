import { Chessboard } from "../components/chessboard";
import { EMPTY_POSITION, WHITE } from "../constants";

const ITALIAN_OPENING = "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3";

export default {
  title: "Chessboard",
  component: Chessboard
};

export function EmptyChessboard() {
  return <Chessboard fen={ EMPTY_POSITION } orientation={ WHITE } />;
}

export function StaticChessboard() {
  return <Chessboard fen={ ITALIAN_OPENING } orientation={ WHITE } />;
}

export function EditableChessboard() {
  return null;
}

export function RulesChessboard() {
  return null;
}
