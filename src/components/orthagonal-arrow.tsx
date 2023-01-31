import { ArrowComponentProps, Vector } from "../types";
import { squareToSVGCoordinates } from "../utilities/svg";
import { ArrowLine } from "./arrow-line";
import { ArrowTriangle } from "./arrow-triangle";

export function OrthagonalArrow({ className, from, to, orientation, type }: ArrowComponentProps) {
  const fromCoordinates = squareToSVGCoordinates(from, orientation);
  const toCoordinates = squareToSVGCoordinates(to, orientation);

  const [ fromX, fromY ] = fromCoordinates;
  const [ toX, toY ] = toCoordinates;

  const differenceX = toX - fromX;
  const differenceY = toY - fromY;

  const midpointCoordinates = Math.abs(differenceX) > Math.abs(differenceY)
    ? [ fromX + differenceX, fromY ] as Vector
    : [ fromX, fromY + differenceY ] as Vector;

  return <g
    className={ className }
    data-from={ from }
    data-to={ to }
    data-orientation={ orientation }
    data-type={ type }
  >
    <ArrowLine from={ fromCoordinates } to={ midpointCoordinates } shortenStart />
    <ArrowLine from={ midpointCoordinates } to={ toCoordinates } shortenEnd />
    <ArrowTriangle from={ midpointCoordinates } to={ toCoordinates } />
  </g>;
}
