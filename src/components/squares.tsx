import { BOARD_SIZE } from "../constants";
import { times } from "../utilities/array";
import { Square } from "./square";

/**
 * The squares on the chessboard.
 */
export function Squares() {
  return <g className="chessboard__squares">
    {
      times(BOARD_SIZE, (fileIndex) => {
        return times(BOARD_SIZE, (rankIndex) => {
          return <Square
            key={ `${ fileIndex }-${ rankIndex }` }
            fileIndex={ fileIndex }
            rankIndex={ rankIndex }
          />;
        });
      })
    }
  </g>;
}
