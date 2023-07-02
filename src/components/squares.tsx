import { useState } from "react";

import { SQUARES } from "../constants";
import { ArrowHandler, HighlightHandler, Player, Square as SquareType } from "../types";
import { eventToSquare } from "../utilities/svg";
import { Square } from "./square";

const RIGHT_MOUSE_BUTTON = 2;

/**
 * @prop orientation The player the board is oriented toward.
 */
type SquaresProps = {
  orientation: Player,
  onHighlight: HighlightHandler | undefined,
  onArrow: ArrowHandler | undefined
};

/**
 * The squares on the chessboard.
 */
export function Squares({ orientation, onHighlight, onArrow }: SquaresProps) {
  const [ from, setFrom ] = useState<SquareType | null>(null);

  const handleContextMenu = (event: React.MouseEvent<SVGElement>) => {
    event.preventDefault(); // Prevent the default context menu from showing up
  };

  const handleMouseDown = (event: React.MouseEvent<SVGElement>) => {
    if (event.button !== RIGHT_MOUSE_BUTTON) {
      return;
    }

    setFrom(eventToSquare(event, orientation));
  };

  const handleMouseUp = (event: React.MouseEvent<SVGElement>) => {
    if (event.button !== RIGHT_MOUSE_BUTTON) {
      return;
    }

    const to = eventToSquare(event, orientation);

    if (from === to) {
      onHighlight?.({ square: to, modifier: "none" });
    }
    else {
      onArrow?.({ from: from as SquareType, to, modifier: "none" });
    }

    setFrom(null);
  };

  return <g
    className="chessboard__squares"
    onContextMenu={ handleContextMenu }
    onMouseDown={ handleMouseDown }
    onMouseUp={ handleMouseUp }
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
