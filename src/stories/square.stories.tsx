import { Square } from "../components/square";
import { BOARD_SIZE, DARK, LIGHT, SQUARES, WHITE } from "../constants";
import { times } from "../utilities/array";
import { squareColor } from "../utilities/squares";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Square",
  component: Square
};

export function LightSquare() {
  return <StorySVGContainer>
    {
      SQUARES
        .filter(square => squareColor(square) === LIGHT)
        .map(square => <Square key={ square } square={ square } orientation={ WHITE } />)
    }
  </StorySVGContainer>;
}

export function DarkSquare() {
  return <StorySVGContainer>
    {
      SQUARES
        .filter(square => squareColor(square) === DARK)
        .map(square => <Square key={ square } square={ square } orientation={ WHITE } />)
    }
  </StorySVGContainer>;
}
