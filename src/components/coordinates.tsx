import { BOARD_SIZE } from "../constants";
import { Player } from "../types";
import { times } from "../utilities/array";
import { Coordinate } from "./coordinate";

type CoordinatesProps = {

  /** The player the chessboard is oriented toward. */
  orientation: Player
};

/**
 * The coordinates of the chessboard.
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
