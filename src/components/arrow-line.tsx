import { SVG_SQUARE_SIZE } from "../constants";
import { Vector } from "../types";
import { addConstant, lengthenSegment } from "../utilities/math";
import { TRIANGLE_HEIGHT } from "./arrow-triangle";

const STROKE_WIDTH = 0.2 * SVG_SQUARE_SIZE;
const START_OFFSET = 0.45 * SVG_SQUARE_SIZE;

type ArrowLineProps = {
  from: Vector,
  to: Vector,
  shortenStart?: boolean,
  shortenEnd?: boolean
}

export function ArrowLine({ from, to, shortenStart, shortenEnd }: ArrowLineProps) {

  from = addConstant(from, SVG_SQUARE_SIZE * 0.5);
  to = addConstant(to, SVG_SQUARE_SIZE * 0.5);

  // Shorten the line (if necessary)
  if (shortenStart) {
    from = lengthenSegment(to, from, -START_OFFSET);
  }

  if (shortenEnd) {
    to = lengthenSegment(from, to, -TRIANGLE_HEIGHT);
  }

  return <line
    className="chessboard__arrow-line"
    strokeWidth={ STROKE_WIDTH }
    strokeLinecap="square"
    x1={ from[0] }
    y1={ from[1] }
    x2={ to[0] }
    y2={ to[1] }
  />;
}
