import { Highlight } from "../components/highlight";
import { BOARD_SIZE, SQUARES, WHITE } from "../constants";
import { HighlightShape } from "../types";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Highlight",
  component: Highlight
};

const TYPES = [ "red", "green", "blue", "yellow" ];

function Highlights({ shape }: { shape: HighlightShape }) {
  return <StorySVGContainer>
    {
      SQUARES.map((square, index) => {
        const type = TYPES[(index + Math.floor(index / BOARD_SIZE)) % TYPES.length]!;

        return <Highlight
          key={ square }
          highlight={ { square, shape, type } }
          orientation={ WHITE }
        />;
      })
    }
  </StorySVGContainer>;
}

export function SquareHighlights() {
  return <Highlights shape="square" />;
}

export function CircleHighlights() {
  return <Highlights shape="circle" />;
}

export function DotHighlights() {
  return <Highlights shape="dot" />;
}