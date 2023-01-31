import { ArrowComponentProps } from "../types";
import { squareToSVGCoordinates } from "../utilities/svg";
import { ArrowLine } from "./arrow-line";
import { ArrowTriangle } from "./arrow-triangle";

export function StraightArrow({ className, from, to, orientation, type }: ArrowComponentProps) {
  const fromCoordinates = squareToSVGCoordinates(from, orientation);
  const toCoordinates = squareToSVGCoordinates(to, orientation);

  return <g
    className={ className }
    data-from={ from }
    data-to={ to }
    data-orientation={ orientation }
    data-type={ type }
  >
    <ArrowLine from={ fromCoordinates } to={ toCoordinates } shortenStart shortenEnd />
    <ArrowTriangle from={ fromCoordinates } to={ toCoordinates } />
  </g>;
}
