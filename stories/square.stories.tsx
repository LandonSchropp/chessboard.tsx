import { Square } from "../src/components/square";
import { DARK, LIGHT, SQUARES, WHITE } from "../src/constants";
import { squareColor } from "../src/utilities/squares";

export default {
  title: "Square",
  component: Square
};

export function LightSquare() {
  return <>
    {
      SQUARES
        .filter(square => squareColor(square) === LIGHT)
        .map(square => <Square key={ square } square={ square } orientation={ WHITE } />)
    }
  </>;
}

export function DarkSquare() {
  return <>
    {
      SQUARES
        .filter(square => squareColor(square) === DARK)
        .map(square => <Square key={ square } square={ square } orientation={ WHITE } />)
    }
  </>;
}
