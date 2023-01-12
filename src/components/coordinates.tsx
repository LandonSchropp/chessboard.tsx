import { BOARD_SIZE } from "../constants";
import { Player } from "../types";
import { times } from "../utilities/array";
import { Coordinate } from "./coordinate";

/**
 * @typedef CoordinatesProps
 * @prop orientation Which player the board is oriented toward.
 */
type CoordinatesProps = {
  orientation: Player
};

/**
 * The coordinates of the chessboard.
 * @param {CoordinatesProps} props
 */
export function Coordinates({ orientation }: CoordinatesProps) {
  return <g className="chessboard__coordinates">
    {
      times(BOARD_SIZE, (index: number) => {
        return <Coordinate
          key={ `left-${ index }` }
          index={ index }
          position="left"
          orientation={ orientation }
        />;
      })
    }
    {
      times(BOARD_SIZE, (index: number) => {
        return <Coordinate
          key={ `bottom-${ index }` }
          index={ index }
          position="bottom"
          orientation={ orientation }
        />;
      })
    }
  </g>;
}
