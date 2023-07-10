import "../../styles/arrow.sass";

import classNames from "classnames";

import { SVG_SQUARE_SIZE } from "../constants";
import { Arrow as ArrowType, Player, Vector } from "../types";
import { addConstant, lengthenSegment, radiansToDegrees } from "../utilities/math";
import { isKnightMove } from "../utilities/squares";
import { squareToSVGCoordinates } from "../utilities/svg";

const STROKE_WIDTH = 0.2 * SVG_SQUARE_SIZE;
const TRIANGLE_WIDTH = 0.6 * SVG_SQUARE_SIZE;
const TRIANGLE_HEIGHT = 0.45 * SVG_SQUARE_SIZE;
const START_OFFSET = 0.45 * SVG_SQUARE_SIZE;

type TriangleProps = {
  from: Vector,
  to: Vector
}

function Triangle({ from, to }: TriangleProps) {

  const [ fromX, fromY ] = addConstant(from, SVG_SQUARE_SIZE * 0.5);
  const [ toX, toY ] = addConstant(to, SVG_SQUARE_SIZE * 0.5);

  const height = toX - fromX < 0 ? -TRIANGLE_HEIGHT : TRIANGLE_HEIGHT;

  const trianglePoints = [
    [ toX, toY ],
    [ toX - TRIANGLE_WIDTH / 2, toY + height ],
    [ toX + TRIANGLE_WIDTH / 2, toY + height ]
  ];

  const rotationAngle = radiansToDegrees(Math.atan((toY - fromY) / (toX - fromX))) + 90;

  return <polygon
    transform={ `rotate(${ rotationAngle } ${ toX } ${ toY })` }
    className="chessboard__arrow-triangle"
    points={ trianglePoints.map(point => point.join(",")).join(" ") }
  />;
}

type LineProps = {
  from: Vector,
  to: Vector,
  shortenStart?: boolean,
  shortenEnd?: boolean
}

function Line({ from, to, shortenStart, shortenEnd }: LineProps) {

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

type StraightArrowProps = {
  from: Vector,
  to: Vector
}

function StraightArrow({ from, to }: StraightArrowProps) {
  return <>
    <Line from={ from } to={ to } shortenStart shortenEnd />
    <Triangle from={ from } to={ to } />
  </>;
}

type OrthagonalArrowProps = {
  from: Vector,
  to: Vector
}

function OrthagonalArrow({ from, to }: OrthagonalArrowProps) {

  const [ fromX, fromY ] = from;
  const [ toX, toY ] = to;

  const differenceX = toX - fromX;
  const differenceY = toY - fromY;

  const midpointIndices = Math.abs(differenceX) > Math.abs(differenceY)
    ? [ fromX + differenceX, fromY ] as Vector
    : [ fromX, fromY + differenceY ] as Vector;

  return <>
    <Line from={ from } to={ midpointIndices } shortenStart />
    <Line from={ midpointIndices } to={ to } shortenEnd />
    <Triangle from={ midpointIndices } to={ to } />
  </>;
}

type ArrowProps = {
  arrow: ArrowType,
  orientation: Player
}

/**
 * Renders an arrow on top of a chessboard.
 */
export function Arrow({ arrow, orientation }: ArrowProps) {

  if (arrow.from === arrow.to) {
    throw new Error("An arrow can not begin and end on the same square!");
  }

  // Convert the squares to SVG coordinate space.
  const from = squareToSVGCoordinates(arrow.from, orientation);
  const to = squareToSVGCoordinates(arrow.to, orientation);

  return <g
    className={
      classNames("chessboard__arrow", `chessboard__arrow--${ arrow.type }`)
    }
    data-from={ arrow.from }
    data-to={ arrow.to }
    data-type={ arrow.type }
  >
    {
      isKnightMove(arrow.from, arrow.to)
        ? <OrthagonalArrow from={ from } to={ to } />
        : <StraightArrow from={ from } to={ to } />
    }
  </g>;
}
