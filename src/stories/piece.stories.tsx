import { Piece } from "../components/piece";
import { BLACK, PIECES, SQUARES, WHITE } from "../constants";
import { Player } from "../types";

export default {
  title: "Piece",
  component: Piece
};

function Pieces({ orientation }: { orientation: Player }) {
  return <>
    {
      SQUARES.map((square, index) => {
        return <Piece
          key={ square }
          square={ square }
          piece={ PIECES[index % PIECES.length]! }
          orientation={ orientation }
        />;
      })
    }
  </>;
}

export function WhitePieces() {
  return <Pieces orientation={ WHITE } />;
}

WhitePieces.storyName = "Pieces (White)";

export function BlackPieces() {
  return <Pieces orientation={ BLACK } />;
}

BlackPieces.storyName = "Pieces (Black)";
