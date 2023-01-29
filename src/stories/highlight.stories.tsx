import { Highlight } from "../components/highlight";
import { BOARD_SIZE, SQUARES, WHITE } from "../constants";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Highlight",
  component: Highlight
};

const TYPES = [ "red", "green", "blue", "yellow" ];

export function Highlights() {
  return <StorySVGContainer>
    {
      SQUARES.map((square, index) => {
        const type = TYPES[(index + Math.floor(index / BOARD_SIZE)) % TYPES.length]!;

        return <Highlight
          key={ square }
          highlight={ { square, type } }
          orientation={ WHITE }
        />;
      })
    }
  </StorySVGContainer>;
}
