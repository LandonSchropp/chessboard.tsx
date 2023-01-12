import { times } from "remeda";

import { BOARD_SIZE } from "../constants";
import { Square } from "./square";

/**
 * The squares on the chessboard.
 */
export function Squares() {
  return <g>
    {
      times(BOARD_SIZE, (fileIndex) => {
        return times(BOARD_SIZE, (rankIndex) => {
          return <Square
            key={ rankIndex }
            fileIndex={ fileIndex }
            rankIndex={ rankIndex }
          />;
        });
      })
    }
  </g>;
}
