import { SQUARES } from "../constants";
import { Player } from "../types";
import { Square } from "./square";

/**
 * @prop orientation The player the board is oriented toward.
 */
type SquaresProps = {
  orientation: Player,
};

/**
 * The squares on the chessboard.
 */
export function Squares({ orientation }: SquaresProps) {

  return <g
    className="chessboard__squares"
  >
    {
      SQUARES.map(square => {
        return <Square
          key={ square }
          square={ square }
          orientation={ orientation }
        />;
      })
    }
  </g>;
}
