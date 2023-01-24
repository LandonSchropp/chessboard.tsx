import { Piece } from "../components/piece";
import { BLACK, PIECES, SQUARES, WHITE } from "../constants";
import { Player } from "../types";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Piece",
  component: Piece
};

function Pieces({ orientation }: { orientation: Player }) {
  return <StorySVGContainer>
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
  </StorySVGContainer>;
}

export function WhitePieces() {
  return <Pieces orientation={ WHITE } />;
}

WhitePieces.storyName = "Pieces (White)";

export function BlackPieces() {
  return <Pieces orientation={ BLACK } />;
}

BlackPieces.storyName = "Pieces (Black)";
