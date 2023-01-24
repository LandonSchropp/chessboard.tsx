import { Player } from "../types";
import { parseFENPosition } from "../utilities/fen";
import { Piece } from "./piece";

type PiecesProps = {
  fen: string,
  orientation: Player;
}

export function Pieces({ fen, orientation }: PiecesProps) {
  const pieces = parseFENPosition(fen).map(({ square, piece }) => {
    return <Piece
      key={ square }
      square={ square }
      piece={ piece }
      orientation={ orientation }
    />;
  });

  return <>{ pieces }</>;
}
